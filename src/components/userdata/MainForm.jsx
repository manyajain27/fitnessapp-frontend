import React, {useState,useContext} from 'react'
import NameInput from './NameInput';
import FitnessGoals from './FitnessGoals';
import ActivityLevel from './ActivityLevel';
import HealthCondtions from './HealthCondtions';
import GenderAge from './GenderAge';
import HeightWeight from './HeightWeight';
import DietType from './DietType';
import Animation from '../homepage/Animation';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../api/api';
import { AuthContext } from '../../auth/AuthContext';

function MainForm() {

const[step,setStep]=useState(0);
const[name,setName]=useState('');
const [selectedGoals, setSelectedGoals] = useState([]); // State to track selected goals
const [selectedActivity, setSelectedActivity] = useState(null); // State to track selected activity level
const [selectedDiet, setSelectedDiet] = useState(null); // State to track selected diet
const [selectedConditions, setSelectedConditions] = useState([]); // State to track selected health conditions
const [gender, setGender] = useState('');
const [birthdate, setBirthdate] = useState('');
const [country, setCountry] = useState('');
const [heightCm, setHeightCm] = useState('');
const [feet, setFeet] = useState('');
const [inch, setInch] = useState('');
const [currentWeight, setCurrentWeight] = useState('');
const [targetWeight, setTargetWeight] = useState('');
const [isMetric, setIsMetric] = useState(false); // State to toggle between units for height
const [isKilograms, setIsKilograms] = useState(true);
const navigate=useNavigate();
const {authTokens, user}=useContext(AuthContext);


const showStep = () => {
    switch (step) {
      case 0:
        return <NameInput step={step} setStep={setStep} setName={setName} />;
      case 1:
        return <FitnessGoals step={step} setStep={setStep} name={name} selectedGoals={selectedGoals} setSelectedGoals={setSelectedGoals} />;
      case 2:
        return <ActivityLevel step={step} setStep={setStep} selectedActivity={selectedActivity} setSelectedActivity={setSelectedActivity} />;
      case 3:
        return <HealthCondtions step={step} setStep={setStep} selectedConditions={selectedConditions} setSelectedConditions={setSelectedConditions} />;
      case 4:
        return <GenderAge step={step} setStep={setStep} gender={gender} setGender={setGender} birthdate={birthdate} setBirthdate={setBirthdate} country={country} setCountry={setCountry} />;
      case 5:
        return <HeightWeight step={step} setStep={setStep} heightCm={heightCm} feet={feet} setFeet={setFeet} inch={inch} setInch={setInch} setHeightCm={setHeightCm} currentWeight={currentWeight} setCurrentWeight={setCurrentWeight} targetWeight={targetWeight} setTargetWeight={setTargetWeight} isMetric={isMetric} setIsMetric={setIsMetric} isKilograms={isKilograms} setIsKilograms={setIsKilograms} />;
      case 6:
        return <DietType step={step} setStep={setStep} selectedDiet={selectedDiet} setSelectedDiet={setSelectedDiet} />;
      case 7:
        postFormData(); // Post the data to the backend instead of logging it
        navigate('/dashboard');
      default:
        return null;
    }
  };

  function convertHeightToCm(feet, inch) {
    return ((feet * 30.48) + (inch * 2.54)).toFixed(2);
  }

  function convertWeightToKg(weight) {
    return (weight / 2.20462).toFixed(2);
  }

  function calculateBMI(heightCm, weightKg) {
    return (weightKg / ((heightCm / 100) ** 2)).toFixed(2);
  }

  function calculateAge(birthdate) {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
  
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  
  
  function calculateCalorieIntake() {
    // Calculate calorie intake based on user's goals, activity level, and diet
  }

  function calculateMacros() {
    // Calculate macros based on user's goals, activity level, and diet
  }

  function calculateNutritionPlan() {
    // Calculate nutrition plan based on user's goals, activity level, and diet
  }


  const postFormData = async () => {
    // converting to snake case for models
    const activityMapping = {
        "Sedentary": "sedentary",
        "Lightly Active": "lightly_active",
        "Moderately Active": "moderately_active",
        "Very Active": "very_active",
    };
    
    const dietMapping = {
        "Vegetarian": "vegetarian",
        "Non-Vegetarian": "non_vegetarian",
        "Vegan": "vegan",
        "Jain": "jain",
    };

    const currentActivitySnake = activityMapping[selectedActivity] || selectedActivity;
    const selectedDietSnake = dietMapping[selectedDiet] || selectedDiet;

    console.log('Auth Token:', authTokens.access);
    console.log("Current User from Context:", user);
    console.log('Stored User in LocalStorage:', localStorage.getItem('user'));
    console.log('User id:', user.userId);
    console.log('Form Data:', {
        name,
        selectedGoals,
        selectedActivity: currentActivitySnake,
        selectedDiet: selectedDietSnake,
        selectedConditions,
        gender,
        birthdate,
        country,
        heightCm: parseFloat(isMetric ? heightCm : convertHeightToCm(feet, inch)),
        currentWeightKg: parseFloat(isKilograms ? currentWeight : convertWeightToKg(currentWeight)),
        targetWeight: parseFloat(isKilograms ? targetWeight : convertWeightToKg(targetWeight)),
        bmi: parseFloat(calculateBMI(isMetric ? heightCm : convertHeightToCm(feet, inch), isKilograms ? currentWeight : convertWeightToKg(currentWeight))),
        age: calculateAge(birthdate),
        user: user.userId
    })
    try {
      const formData = {
        name,
        selectedGoals,
        selectedActivity:currentActivitySnake,
        selectedDiet:selectedDietSnake,
        selectedConditions,
        gender,
        birthdate,
        country,
        heightCm: parseFloat(isMetric ? heightCm : convertHeightToCm(feet, inch)),
        currentWeightKg: parseFloat(isKilograms ? currentWeight : convertWeightToKg(currentWeight)),
        targetWeight: parseFloat(isKilograms ? targetWeight : convertWeightToKg(targetWeight)),
        bmi: parseFloat(calculateBMI(isMetric ? heightCm : convertHeightToCm(feet, inch), isKilograms ? currentWeight : convertWeightToKg(currentWeight))),
        age: calculateAge(birthdate),
        user: user.userId
      };

      const response = await axios.post(`${API_BASE_URL}/health-data/`, formData, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`, // Include the access token
        },
      });

      if (response.status === 201) {
        console.log('Data submitted successfully:', response.data);
      }
    } catch (error) {
      console.error('Error submitting form data:', error.response.data);
    }
  };

  return (
    <>
        <Animation/>
        <div>
        {showStep()}
        </div>
    </>
  )
}

export default MainForm
