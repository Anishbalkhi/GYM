import React , {useState} from "react"
import Generator from "./Components/Generator"
import Hero from "./Components/Hero"
import Workout from "./Components/Workout"
import {generateWorkout} from "./utilites/function"



function App() {
const [workout, setWorkout] = useState(null)
 const [poison , setPoison] = useState('individual')
 const [muscles, setmuscles] = useState([])
 const [goal , setGoal] = useState('strength_power')

 function updateWorkout(){
  if(muscles.length < 1){
    return
  }
  let newWorkout = generateWorkout({poison , muscles , goal});
  
  setWorkout(newWorkout)

  window.location.href = '#workout'
 }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base">
     <Hero/>
     <Generator
     poison={poison}
     setPoison={setPoison}
     muscles={muscles}
     setmuscles={setmuscles}
     goal={goal}
     setGoal={setGoal}
     updateWorkout={updateWorkout}
     />
      {workout && (<Workout workout={workout} />)}
    </main>
  )
}

export default App
