import React, {useState} from 'react'
import NameInput from './NameInput';
import FitnessGoals from './FitnessGoals';
import ActivityLevel from './ActivityLevel';
import HealthCondtions from './HealthCondtions';
import GenderAge from './GenderAge';
import HeightWeight from './HeightWeight';
import DietType from './DietType';
import Animation from '../homepage/Animation';

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
        logFormData();
        return <div>Thank you! Your information has been submitted.</div>;
      default:
        return null;
    }
  };

  function convertHeightToCm(feet, inch) {
    return (feet * 30.48) + (inch * 2.54);
  }

  function convertWeightToKg(weight) {
    return weight / 2.20462;
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


  const logFormData = () => {
    console.log({
      name,
      selectedGoals,
      selectedActivity,
      selectedDiet,
      selectedConditions,
      gender,
      birthdate,
      country,
      heightCm: isMetric? heightCm : convertHeightToCm(feet,inch) ,
      currentWeightKg: isKilograms ? currentWeight : convertWeightToKg(currentWeight),
      targetWeight: isKilograms ? targetWeight : convertWeightToKg(targetWeight),
      bmi: calculateBMI(isMetric? heightCm : convertHeightToCm(feet,inch), isKilograms ? currentWeight : convertWeightToKg(currentWeight)),
      age: calculateAge(birthdate),
    });
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
