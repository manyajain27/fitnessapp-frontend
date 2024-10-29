import React, { useState } from 'react';
import Animation from '../homepage/Animation';

function ActivityLevel({ step, setStep, selectedActivity, setSelectedActivity}) {
  

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity); // Set the selected activity
  };

  return (
    <div>
      {/* <Animation/> */}
      <div className="d-flex justify-content-center align-items-center vh-100">
        <form className="p-5 d-flex flex-col rounded" style={{ boxShadow: "0 0 30px gray", maxWidth: "480px", minHeight: "500px", zIndex: "1", background: "rgba(255,255,255,0.8)" }}>
          <div className="form-group mb-3">
            <div className="form-label text-center font-bold">What is your activity level?</div>
            <p className='text-center'>Select any one option. This includes gym/working out.</p>
            <div className="button-container d-flex flex-col gap-2">
              {['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active'].map((activity) => (
                <button
                  key={activity}
                  type='button'
                  className={`form-button btn btn-light container-fluid d-flex flex-col justify-center p-3 ${selectedActivity === activity ? 'active' : ''}`} // Apply active class conditionally
                  style={{ border: selectedActivity === activity ? "2px solid purple" : "2px solid lightgray" }} // Change border based on selection
                  onClick={() => handleActivityClick(activity)} // Handle button click
                >
                  <h6 className='mb-0 text-start'>{activity}</h6>
                  <p className='text-wrap text-start mb-0'>
                    {activity === 'Sedentary' && 'Little or no physical activity, mostly sitting throughout the day.'}
                    {activity === 'Lightly Active' && 'Light exercise or physical activity 1-2 days per week.'}
                    {activity === 'Moderately Active' && 'Moderate physical activity or exercise 3-4 days per week (e.g., walking, yoga).'}
                    {activity === 'Very Active' && 'Regular intense exercise 5-6 days per week (e.g., running, strength training).'}
                  </p>
                </button>
              ))}
            </div>
          </div>
          <div className="container d-flex gap-4 mt-auto">
            <button type="button" onClick={() => setStep(step - 1)} className="btn btn-outline-secondary w-100 h-[50px]">Back</button>
            <button type="button" onClick={() => setStep(step + 1)} className="btn btn-dark w-100 h-[50px]">Next</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ActivityLevel;
