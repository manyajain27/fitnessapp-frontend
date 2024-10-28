import React from 'react'
import Homepage from '../homepage/Homepage'
import Animation from '../homepage/Animation'

function NameInput({step,setStep}) {
  return (
    <>
      {/* <Animation/> */}
      <div className="d-flex justify-content-center align-items-center vh-100">
      <form className="p-5 d-flex flex-col rounded"  style={{boxShadow:"0 0 30px gray", minWidth:"480px",minHeight:"500px",zIndex:"1",background:"rgba(255,255,255,0.8)"}}>
        <div className="form-group mb-3">
          <div className="form-label text-center font-bold">What's your name?</div>
          <p className='text-center mb-0'>Welcome to your first step towards fitness</p>
          <p className='text-center'>Let's get to know you a little!</p>
          <input
            type="text"
            className="form-control mt-[30px] h-[50px]"
            id="name"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="container flex justify-between gap-4 mt-auto" >
        <button type="button" disabled={step===0} onClick={()=>setStep(step-1)} className="btn btn-outline-secondary w-100 h-[50px]">Back</button>
        <button type="button" onClick={()=>setStep(step+1)} className="btn btn-dark w-100 h-[50px]">Next</button>
        </div>
      </form>
    </div>
    </>
  )
}

export default NameInput
