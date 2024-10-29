import React, { useState } from 'react';
import Animation from '../homepage/Animation';

function HealthConditions({ step, setStep, selectedConditions, setSelectedConditions }) {
  

  const toggleCondition = (condition) => {
    // Check if the condition is already selected
    if (selectedConditions.includes(condition)) {
      // If it is, remove it from the selected conditions
      setSelectedConditions(selectedConditions.filter((item) => item !== condition));
    } else {
      // Otherwise, add it to the selected conditions
      setSelectedConditions([...selectedConditions, condition]);
    }
  };

  return (
    <div>
      {/* <Animation/> */}
      <div className="d-flex justify-content-center align-items-center vh-100">
        <form className="p-5 d-flex flex-col rounded" style={{ boxShadow: "0 0 30px gray", maxWidth: "480px", minHeight: "500px", zIndex: "1", background: "rgba(255,255,255,0.8)" }}>
          <div className="form-group mb-3">
            <div className="form-label text-center font-bold">Are you suffering from any health conditions?</div>
            <p className='text-center'>Select at least one of the below options</p>
            <div className="button-container d-flex flex-col gap-2">
              {[
                { label: 'Cardiovascular Issues', description: 'I have a heart condition or high blood pressure.' },
                { label: 'Joint or Mobility Problems', description: 'I experience issues with joints, arthritis, or mobility.' },
                { label: 'Respiratory Conditions', description: 'I have asthma or other breathing difficulties.' },
                { label: 'Chronic Pain or Injury', description: 'I suffer from chronic pain or have a recurring injury (e.g., back pain, sports injury).' },
                { label: 'None', description: 'I am not currently experiencing any health conditions.' },
              ].map((condition) => (
                <button
                  key={condition.label}
                  type='button'
                  className={`form-button btn btn-light container-fluid d-flex flex-col justify-center p-3 ${selectedConditions.includes(condition.label) ? 'active' : ''}`} // Apply active class conditionally
                  style={{ border: selectedConditions.includes(condition.label) ? "2px solid purple" : "2px solid lightgray" }} // Change border based on selection
                  onClick={() => toggleCondition(condition.label)} // Handle button click
                >
                  <h6 className='mb-0 text-start'>{condition.label}</h6>
                  <p className='text-wrap text-start mb-0'>{condition.description}</p>
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

export default HealthConditions;
