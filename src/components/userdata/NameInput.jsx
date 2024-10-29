import React, {useState} from 'react'
import Homepage from '../homepage/Homepage'
import Animation from '../homepage/Animation'




function NameInput({step,setStep,setName }) {

  const [localName, setLocalName] = useState('');

  function handleName(event) {
    const value = event.target.value;
    setLocalName(value); // Update local state
    setName(value);      // Update parent state
  }

  return (
    <>
      {/* <Animation/> */}
      <div className="d-flex flex-col justify-content-center align-items-center vh-100">
          <h2 className='text-center' style={{color:"lightgray"}}>Let's get to know you a little!</h2>
          <p className='text-gray-200'>To curate the perfect fitness and meal plan for you</p>
      <form className="p-5 d-flex flex-col rounded"  style={{boxShadow:"0 0 30px gray", minWidth:"480px",minHeight:"500px",zIndex:"1",background:"rgba(255,255,255,0.8)"}}>
        <div className="form-group mb-3">
          <div className="form-label text-center font-bold">What's your name?</div>
          <p className='text-center mb-0'>Welcome to your first step towards fitness</p>
          <input
            type="text"
            className="form-control mt-[30px] h-[50px]"
            id="name"
            placeholder="Your Name"
            value={localName}
            onChange={handleName}
            required
          />
        </div>
        <div className="container flex justify-between gap-4 mt-auto" >
        <button type="button" disabled={step===0} onClick={()=>setStep(step-1)} className="btn btn-outline-secondary w-100 h-[50px]">Back</button>
        <button type="submit" onClick={()=>setStep(step+1)} className="btn btn-dark w-100 h-[50px]">Next</button>
        </div>
      </form>
    </div>
    </>
  )
}

export default NameInput
