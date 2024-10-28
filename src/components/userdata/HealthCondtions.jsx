import React from 'react'
import Animation from '../homepage/Animation'
function HealthCondtions({step,setStep}) {
  return (
    <div>
      <>
          {/* <Animation/> */}
          <div className="d-flex justify-content-center align-items-center vh-100">
          <form className="p-5 d-flex flex-col rounded"  style={{boxShadow:"0 0 30px gray", maxWidth:"480px",minHeight:"500px",zIndex:"1",background:"rgba(255,255,255,0.8)"}}>
            <div className="form-group mb-3">
              <div className="form-label text-center font-bold">Are you suffering from any health conditions?</div>
              <p className='text-center'>Select atleast one of the below options</p>
              {/* <p className='text-center'>Let's get to know you a little!</p> */}
              <div className="button-container d-flex flex-col gap-2">
                <button className="btn btn-light container-fluid  d-flex flex-col justify-center p-3" style={{border:"2px solid lightgray"}}>
                    <h6 className='mb-0 text-start'>Cardiovascular Issues</h6>
                    <p className='text-wrap text-start mb-0'>I have a heart condition or high blood pressure.</p>
                </button>
                <button className="btn btn-light container-fluid  d-flex flex-col justify-center p-3" style={{border:"2px solid lightgray"}}>
                    <h6 className='mb-0 text-start'>Joint or Mobility Problems</h6>
                    <p className='text-wrap text-start mb-0'>I experience issues with joints, arthritis, or mobility.</p>
                </button>
                <button className="btn btn-light container-fluid  d-flex flex-col justify-center p-3" style={{border:"2px solid lightgray"}}>
                    <h6 className='mb-0 text-start'>Respiratory Conditions</h6>
                    <p className='text-wrap text-start mb-0'> I have asthma or other breathing difficulties.</p>
                </button>
                <button className="btn btn-light container-fluid  d-flex flex-col justify-center p-3" style={{border:"2px solid lightgray"}}>
                    <h6 className='mb-0 text-start'>Chronic Pain or Injury</h6>
                    <p className='text-wrap text-start mb-0'>I suffer from chronic pain or have a recurring injury (e.g., back pain, sports injury).</p>
                </button>
                <button className="btn btn-light container-fluid  d-flex flex-col justify-center p-3" style={{border:"2px solid lightgray"}}>
                    <h6 className='mb-0 text-start'>None</h6>
                    <p className='text-wrap text-start mb-0'> I am not currently experiencing any health conditions.</p>
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

export default HealthCondtions
