import React, { useState } from 'react';

function HeightWeight({ step, setStep }) {
  const [isMetric, setIsMetric] = useState(false); // State to toggle between units for height
  const [isKilograms, setIsKilograms] = useState(true); // State to toggle between units for weight

  // Function to handle unit toggle for height
  const handleHeightUnitToggle = () => {
    setIsMetric(!isMetric); // Toggle the height unit state
  };

  // Function to handle unit toggle for weight
  const handleWeightUnitToggle = () => {
    setIsKilograms(!isKilograms); // Toggle the weight unit state
  };

  return (
    <div>
      <>
        {/* <Animation/> */}
        <div className="d-flex justify-content-center align-items-center vh-100">
          <form
            className="p-5 d-flex flex-col rounded"
            style={{ boxShadow: '0 0 30px gray', minWidth: '510px', minHeight: '500px', zIndex: '1' ,background:"rgba(255,255,255,0.8)"}}
          >
            <div className="form-group mb-3">
              <h6 className="mb-3">How tall are you?</h6>

              {/* Conditional rendering based on height unit */}
              {!isMetric ? (
                <div className="d-flex gap-3">
                  <div>
                    <input
                      type="text"
                      name="feet"
                      id="feet"
                      className="h-[50px] p-2 mb-0"
                      placeholder="Height(feet)"
                      style={{ border: '1px solid black', borderRadius: '7px', position: 'relative' }}
                    />
                    <div style={{ position: 'relative', top: '-38px', left: '175px' }}>ft</div>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="inches"
                      id="inches"
                      className="h-[50px] p-2 mb-0"
                      placeholder="Height(inches)"
                      style={{ border: '1px solid black', borderRadius: '7px', position: 'relative' }}
                    />
                    <div style={{ position: 'relative', top: '-38px', left: '175px' }}>in</div>
                  </div>
                </div>
              ) : (
                <div>
                  <input
                    type="text"
                    name="centimeters"
                    id="centimeters"
                    className="h-[50px] p-2 mb-0"
                    placeholder="Height(cm)"
                    style={{ border: '1px solid black', borderRadius: '7px', position: 'relative' }}
                  />
                  <div style={{ position: 'relative', top: '-38px', left: '170px' }}>cm</div>
                </div>
              )}

              {/* Toggle height units */}
              <p
                className="text-blue-600 mb-0"
                style={{ position: 'relative', top: '-20px', cursor: 'pointer' }}
                onClick={handleHeightUnitToggle}
              >
                {isMetric ? 'Change units to feet/inches' : 'Change units to centimeters'}
              </p>

              <h6 className="mb-3">How much do you weigh currently?</h6>

              {/* Conditional rendering based on weight unit */}
              {isKilograms ? (
                <div>
                  <input
                    type="text"
                    name="currentweight"
                    id="currentweight"
                    className="h-[50px] p-2 mb-0"
                    placeholder="Current Weight"
                    style={{ border: '1px solid black', borderRadius: '7px', position: 'relative' }}
                  />
                  <div style={{ position: 'relative', top: '-38px', left: '170px' }}>kg</div>
                </div>
              ) : (
                <div>
                  <input
                    type="text"
                    name="currentweight"
                    id="currentweight"
                    className="h-[50px] p-2 mb-0"
                    placeholder="Current Weight"
                    style={{ border: '1px solid black', borderRadius: '7px', position: 'relative' }}
                  />
                  <div style={{ position: 'relative', top: '-38px', left: '170px' }}>lbs</div>
                </div>
              )}

              {/* Toggle weight units */}
              <p
                className="text-blue-600 mb-0"
                style={{ position: 'relative', top: '-20px', cursor: 'pointer' }}
                onClick={handleWeightUnitToggle}
              >
                {isKilograms ? 'Change units to pounds' : 'Change units to kilograms'}
              </p>

              <h6 className="mb-3">What is your target weight?</h6>

              {/* Conditional rendering for target weight */}
              {isKilograms ? (
                <div>
                  <input
                    type="text"
                    name="targetweight"
                    id="targetweight"
                    className="h-[50px] p-2 mb-0"
                    placeholder="Target Weight"
                    style={{ border: '1px solid black', borderRadius: '7px', position: 'relative' }}
                  />
                  <div style={{ position: 'relative', top: '-38px', left: '170px' }}>kg</div>
                </div>
              ) : (
                <div>
                  <input
                    type="text"
                    name="targetweight"
                    id="targetweight"
                    className="h-[50px] p-2 mb-0"
                    placeholder="Target Weight"
                    style={{ border: '1px solid black', borderRadius: '7px', position: 'relative' }}
                  />
                  <div style={{ position: 'relative', top: '-38px', left: '170px' }}>lbs</div>
                </div>
              )}
            </div>

            <div className="container d-flex gap-4 mt-auto">
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="btn btn-outline-secondary w-100 h-[50px]"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="btn btn-dark w-100 h-[50px]"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </>
    </div>
  );
}

export default HeightWeight;
