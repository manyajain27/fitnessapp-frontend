import React from 'react'
import Animation from './Animation'
import {ReactTyped as Typed} from "react-typed";

function Homepage() {
  return (
    <div>
      <Animation/>
      <div style={{ textAlign: "center", marginTop: "30vh", zIndex: 1, position: "relative",fontSize:"60px"}}>
                <h1 className="text-white">FitCut Fitness</h1>
                <h2 className="text-slate-400">
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
