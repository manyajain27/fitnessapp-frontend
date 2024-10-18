import React from 'react'

function DietType({step,setStep}) {
  return (
    <div>
      <>
          {/* <Animation/> */}
          <div className="d-flex justify-content-center align-items-center vh-100">
          <form className="p-5 d-flex flex-col rounded bg-white"  style={{boxShadow:"0 0 30px gray", maxWidth:"480px",minHeight:"500px",zIndex:"1"}}>
            <div className="form-group mb-3">
              <div className="form-label text-center font-bold">This is the final step!!</div>
              <p className='text-center'>Choose from the following diet types, this will help us curate the perfect meal plan for you!</p>
              
              <div className="button-container d-flex flex-col gap-2">
                <button className="btn btn-light container-fluid  d-flex flex-col justify-center p-3" style={{border:"2px solid lightgray"}}>
                    <h6 className='mb-0 text-start'>Vegetarian</h6>
                    <p className='text-wrap text-start mb-0'>I follow a plant-based diet, avoiding meat, poultry, and fish.</p>
                </button>
                <button className="btn btn-light container-fluid  d-flex flex-col justify-center p-3" style={{border:"2px solid lightgray"}}>
                    <h6 className='mb-0 text-start'>Non-Vegetarian</h6>
                    <p className='text-wrap text-start mb-0'>I include meat, poultry, and fish in my diet.</p>
                </button>
                <button className="btn btn-light container-fluid  d-flex flex-col justify-center p-3" style={{border:"2px solid lightgray"}}>
                    <h6 className='mb-0 text-start'>Vegan</h6>
                    <p className='text-wrap text-start mb-0'>I avoid all animal products, including meat, dairy, eggs, and honey.</p>
                </button>
                <button className="btn btn-light container-fluid  d-flex flex-col justify-center p-3" style={{border:"2px solid lightgray"}}>
                    <h6 className='mb-0 text-start'>Jain</h6>
                    <p className='text-wrap text-start mb-0 '>I follow a strict Jain diet, avoiding root vegetables and non-vegetarian food.</p>
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

export default DietType
