import React, { useState } from 'react';

function DietType({ step, setStep, selectedDiet, setSelectedDiet }) {
  

  const handleDietClick = (diet) => {
    setSelectedDiet(diet); // Set the selected diet
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <form className="p-5 d-flex flex-col rounded" style={{ boxShadow: "0 0 30px gray", maxWidth: "480px", minHeight: "500px", zIndex: "1", background: "rgba(255,255,255,0.8)" }}>
          <div className="form-group mb-3">
            <div className="form-label text-center font-bold">This is the final step!!</div>
            <p className='text-center'>Choose from the following diet types, this will help us curate the perfect meal plan for you!</p>
            <div className="button-container d-flex flex-col gap-2">
              {['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Jain'].map((diet) => (
                <button
                  key={diet}
                  type='button'
                  className={`form-button btn btn-light container-fluid d-flex flex-col justify-center p-3 ${selectedDiet === diet ? 'active' : ''}`} // Apply active class conditionally
                  style={{ border: selectedDiet === diet ? "2px solid purple" : "2px solid lightgray" }} // Change border based on selection
                  onClick={() => handleDietClick(diet)} // Handle button click
                >
                  <h6 className='mb-0 text-start'>{diet}</h6>
                  <p className='text-wrap text-start mb-0'>
                    {diet === 'Vegetarian' && 'I follow a plant-based diet, avoiding meat, poultry, and fish.'}
                    {diet === 'Non-Vegetarian' && 'I include meat, poultry, and fish in my diet.'}
                    {diet === 'Vegan' && 'I avoid all animal products, including meat, dairy, eggs, and honey.'}
                    {diet === 'Jain' && 'I follow a strict Jain diet, avoiding root vegetables and non-vegetarian food.'}
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

export default DietType;
