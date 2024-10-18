import React from 'react'
import Animation from '../homepage/Animation'
function ActivityLevel({step,setStep}) {
  return (
    <div>
      <>
          {/* <Animation/> */}
          <div className="d-flex justify-content-center align-items-center vh-100">
          <form className="p-5 d-flex flex-col rounded bg-white"  style={{boxShadow:"0 0 30px gray", maxWidth:"480px",minHeight:"500px",zIndex:"1"}}>
            <div className="form-group mb-3">
              <div className="form-label text-center font-bold">What is your activity level?</div>
              <p className='text-center'>Select any one option. This includes gym/working out.</p>
              {/* <p className='text-center'>Let's get to know you a little!</p> */}
              <div className="button-container d-flex flex-col gap-2">
                <button className="btn btn-light container-fluid  d-flex flex-col justify-center p-3" style={{border:"2px solid lightgray"}}>
                    <h6 className='mb-0 text-start'>Sedentary</h6>
                    <p className='text-wrap text-start mb-0'>Little or no physical activity, mostly sitting throughout the day.</p>
                </button>
                <button className="btn btn-light container-fluid  d-flex flex-col justify-center p-3" style={{border:"2px solid lightgray"}}>
                    <h6 className='mb-0 text-start'>Lightly Active</h6>
                    <p className='text-wrap text-start mb-0'>Light exercise or physical activity 1-2 days per week.</p>
                </button>
                <button className="btn btn-light container-fluid  d-flex flex-col justify-center p-3" style={{border:"2px solid lightgray"}}>
                    <h6 className='mb-0 text-start'>Moderately Active</h6>
                    <p className='text-wrap text-start mb-0'>Moderate physical activity or exercise 3-4 days per week (e.g., walking, yoga).</p>
                </button>
                <button className="btn btn-light container-fluid  d-flex flex-col justify-center p-3" style={{border:"2px solid lightgray"}}>
                    <h6 className='mb-0 text-start'>Very Active</h6>
                    <p className='text-wrap text-start mb-0'>Regular intense exercise 5-6 days per week (e.g., running, strength training).</p>
                </button>
                
               
              </div>
              
            </div>
            <div className="container d-flex gap-4 mt-auto" >
            <button type="button" onClick={()=>setStep(step-1)} className="btn btn-outline-secondary w-100 h-[50px]">Back</button>
            <button type="button" onClick={()=>setStep(step+1)} className="btn btn-dark w-100 h-[50px]">Next</button>
            </div>
          </form>
        </div>
        </>
    </div>
  )
}

export default ActivityLevel
