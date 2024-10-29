import React, { useState } from 'react'; // Import useState
import Animation from '../homepage/Animation';

function FitnessGoals({ step, setStep, name, selectedGoals, setSelectedGoals }) {
  

  const firstLetterName = name.slice(0, 1).toUpperCase();
  const remainingName = name.toLowerCase().slice(1);
  const fullName = firstLetterName + remainingName;

  const goals = [
    'Lose weight',
    'Gain weight',
    'Maintain weight',
    'Gain Muscle',
    'Modify Diet',
    'Gain stamina',
    'Improve mental health'
  ];

  const handleGoalClick = (goal) => {
    setSelectedGoals((prevSelected) => {
      if (prevSelected.includes(goal)) {
        // If the goal is already selected, remove it
        return prevSelected.filter((item) => item !== goal);
      } else if (prevSelected.length < 3) {
        // If not selected and under limit, add the goal
        return [...prevSelected, goal];
      }
      return prevSelected; // Return the current state if limit reached
    });
  };

  return (
    <>
      {/* <Animation/> */}
      <div className="d-flex justify-content-center align-items-center vh-100">
        <form className="p-5 d-flex flex-col rounded" style={{ boxShadow: "0 0 30px gray", minWidth: "480px", minHeight: "500px", zIndex: "1", background: "rgba(255,255,255,0.8)" }}>
          <div className="form-group mb-3">
            <div className="form-label text-center font-bold">Thanks {fullName}! Now for your fitness goals.</div>
            <p className='text-center'>Select up to 3 fitness goals that are relevant to you!</p>
            <div className="button-container d-flex flex-col gap-2">
              {goals.map((goal) => (
                <button
                  key={goal}
                  type='button'
                  className={`form-button btn btn-light container-fluid h-[55px] ${selectedGoals.includes(goal) ? 'active' : ''}`} // Add active class conditionally
                  style={{ border: selectedGoals.includes(goal) ? "2px solid purple" : "2px solid lightgray" }} // Change border based on selection
                  onClick={() => handleGoalClick(goal)} // Handle button click
                >
                  {goal}
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
    </>
  );
}

export default FitnessGoals;
