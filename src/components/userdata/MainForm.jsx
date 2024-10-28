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

const showStep=()=>{
    if(step===0){
        return(
            <NameInput step={step} setStep={setStep}/>
        )
    }
    else if(step===1){
        return(
            <FitnessGoals step={step} setStep={setStep}/>
        )
    }
    else if(step===2){
        return(
            <ActivityLevel step={step} setStep={setStep}/>
        )
    }
    else if(step===3){
        return(
            <HealthCondtions step={step} setStep={setStep}/>
        )
    }
    else if(step===4){
        return(
            <GenderAge step={step} setStep={setStep}/>
        )
    }
    else if(step===5){
        return(
            <HeightWeight step={step} setStep={setStep}/>
        )
    }
    else if(step===6){
        return(
            <DietType step={step} setStep={setStep}/>
        )
    }
}

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
