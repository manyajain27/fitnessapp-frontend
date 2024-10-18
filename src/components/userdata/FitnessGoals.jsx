import React from 'react'
import Animation from '../homepage/Animation'
function FitnessGoals({step,setStep}) {
    return (
        <>
          {/* <Animation/> */}
          <div className="d-flex justify-content-center align-items-center vh-100">
          <form className="p-5 d-flex flex-col rounded bg-white"  style={{boxShadow:"0 0 30px gray", minWidth:"480px",minHeight:"500px",zIndex:"1"}}>
            <div className="form-group mb-3">
              <div className="form-label text-center font-bold">Thanks manya! Now for your fitness goals. </div>
              <p className='text-center'>Select upto 3 fitness goals that are relevant to you!</p>
              {/* <p className='text-center'>Let's get to know you a little!</p> */}
              <div className="button-container d-flex flex-col gap-2">
                <button className="btn btn-light container-fluid h-[55px]" style={{border:"2px solid lightgray"}}>Lose weight</button>
                <button className="btn btn-light container-fluid h-[55px]" style={{border:"2px solid lightgray"}}>Gain weight</button>
                <button className="btn btn-light container-fluid h-[55px]" style={{border:"2px solid lightgray"}}>Maintain weight</button>
                <button className="btn btn-light container-fluid h-[55px]" style={{border:"2px solid lightgray"}}>Gain Muscle</button>
                <button className="btn btn-light container-fluid h-[55px]" style={{border:"2px solid lightgray"}}>Modify Diet</button>
                <button className="btn btn-light container-fluid h-[55px]" style={{border:"2px solid lightgray"}}>Gain stamina</button>
                <button className="btn btn-light container-fluid h-[55px]" style={{border:"2px solid lightgray"}}>Improve mental health</button>
              </div>
              
            </div>
            <div className="container d-flex gap-4 mt-auto" >
            <button type="button" onClick={()=>setStep(step-1)} className="btn btn-outline-secondary w-100 h-[50px]">Back</button>
            <button type="button" onClick={()=>setStep(step+1)} className="btn btn-dark w-100 h-[50px]">Next</button>
            </div>
          </form>
        </div>
        </>
      )
}

export default FitnessGoals
