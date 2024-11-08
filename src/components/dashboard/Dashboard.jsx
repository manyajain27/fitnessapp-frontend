import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../api/api';
import Animation from '../homepage/Animation';

function Dashboard() {
  const { logoutUser } = useContext(AuthContext);
  const [data, setData] = useState({ userData: null });
  const [fitnessPlan, setFitnessPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDay, setActiveDay] = useState(1); // Track which day is being viewed
  const { authTokens, refreshAuthToken } = useContext(AuthContext);

  const createAxiosInstance = () => {
    const instance = axios.create({
      headers: {
        'Authorization': `Bearer ${authTokens.access}`,
        'Content-Type': 'application/json',
      },
    });

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newAccessToken = await refreshAuthToken();
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return instance(originalRequest);
          } catch (refreshError) {
            logoutUser();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return instance;
  };

  const fetchFitnessPlan = async () => {
    try {
      setLoading(true);
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(`${API_BASE_URL}/generate-fitness-plan/`);
      
      if (response.data.fitness_plan) {
        const [mealPlan, workoutPlan] = response.data.fitness_plan.split('WORKOUT PLAN:');
        
        // Process meal plan into days
        const daysRegex = /Day \d+:([\s\S]*?)(?=Day \d+:|$)/g;
        const mealDays = [...mealPlan.matchAll(daysRegex)].map(match => match[0].trim());
        
        // Process workout plan into days
        const workoutDays = workoutPlan.trim().split(/Day \d+:/).filter(Boolean);
        
        setFitnessPlan({
          meals: mealDays,
          workouts: workoutDays
        });
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch fitness plan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFitnessPlan();

    const REFRESH_INTERVAL = 9 * 60 * 1000;
    const refreshInterval = setInterval(() => {
      if (authTokens) {
        refreshAuthToken();
      }
    }, REFRESH_INTERVAL);

    return () => clearInterval(refreshInterval);
  }, [authTokens, refreshAuthToken]);

  const renderDayTabs = () => (
    <div className="flex overflow-x-auto mb-4 border-b">
      {[1, 2, 3, 4, 5, 6, 7].map((day) => (
        <button
          key={day}
          onClick={() => setActiveDay(day)}
          className={`px-4 py-2 mr-2 ${
            activeDay === day
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Day {day}
        </button>
      ))}
    </div>
  );

  const formatMealPlan = (dayContent) => {
    if (!dayContent) return null;
    
    return dayContent.split('\n').map((line, index) => {
      if (!line.trim()) return null;
      return (
        <div 
          key={index} 
          className={`${
            line.includes(':') ? 'font-semibold mb-2' : 'ml-4 mb-2'
          }`}
        >
          {line}
        </div>
      );
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Animation/>
      <h1 className="text-3xl font-bold mb-8">Your Fitness Plan</h1>
      
      {loading ? (
        <div className="text-center py-8">
          <p>Loading your fitness plan...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={fetchFitnessPlan}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      ) : fitnessPlan && (
        <div className="grid gap-8">
          {/* Day Selection Tabs */}
          {renderDayTabs()}

          {/* Daily Meal Plan */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Meal Plan - Day {activeDay}</h2>
            <div className="prose max-w-none">
              {formatMealPlan(fitnessPlan.meals[activeDay - 1])}
            </div>
          </div>

          {/* Daily Workout Plan */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Workout Plan - Day {activeDay}</h2>
            <div className="prose max-w-none">
              {formatMealPlan(fitnessPlan.workouts[activeDay - 1])}
            </div>
          </div>

          <button 
            onClick={fetchFitnessPlan}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full"
          >
            Generate New Plan
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

