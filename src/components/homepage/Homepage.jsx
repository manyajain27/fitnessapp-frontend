import React from 'react'
import Animation from './Animation'
import {ReactTyped as Typed} from "react-typed";

function Homepage() {
  return (
    <div>
      <div className='d-flex flex-col justify-center items-center w-[600px]' style={{ textAlign: "center", marginTop: "5vh", zIndex: 1, position: "relative",fontSize:"60px"}}>
                <h1 className="text-gray-100" style={{fontFamily:"",fontSize:"50px"}}>FitCut Fitness</h1>
                <h2 className="text-gray-100">
                    <Typed
                        strings={[
                            "Your AI-Powered Path to a Healthier You.",
                        ]}
                        typeSpeed={40}
                    />
                </h2>
            </div>
    </div>
  )
}

export default Homepage
