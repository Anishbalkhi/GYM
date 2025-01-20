import React, {useState} from 'react'
import SectionWrapper from './SectionWrapper'
import { SCHEMES, WORKOUTS } from '../utilites/swoldier.js'
import Button from './button.jsx'

const Header = (props) => {
  const {index , title , description} = props

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-center gap-2'>
        <p className=' text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400'>{index}</p>
        <h4 className='text-xl sm:text-2xl md:text-3xl'>{title}</h4>
      </div>
      <p className='text-sm sm:text-base mx-auto'>{description}</p>
    </div>
  )
}

const Generator = (props) => {
const [showModel, setShowModel] = useState(false)
const {muscles, setmuscles, poison, setPoison, goal, setGoal , updateWorkout} = props

function ToggleModal(){
  setShowModel(!showModel)
}

function updateMuscles(muscleGroup){
  if(muscles.includes(muscleGroup)){
    setmuscles(muscles.filter(val => val !==muscleGroup))
    return
  }

  if(muscles.length > 2){
    return 
  }
  if(poison !== 'individual'){
    setmuscles([muscleGroup])
    setShowModel(false)
    return
  }
  

  setmuscles([...muscles,muscleGroup])
  if(muscles.length === 2){
    setShowModel(false)
  }
}
  return (
    <SectionWrapper id={'generater'} header={"generate your workout"} 
    title={['It\'s', 'Huge', 'o\'clock']}>

    <Header index ={'01'}   title={'Pick your poison'} description={"Select the workout you wish to endure."}/>

    <div className='grid grid-cols-1 sm:grid-cols-4 gap-4'>

    {Object.keys(WORKOUTS).map((type , typeIndex) =>
    {
      return (
        <button onClick={()=>{
          setmuscles([])
          setPoison(type)

        }} className={'bg-slate-950 border  duration-200 px-4 hover:border-blue-600 py-3 rounded-lg mx-1 ' + (type === poison ? ' border-blue-300' : ' border-blue-100')} key={typeIndex}>

        <p className='capitalize'>{type.replaceAll('_', " ")}</p>
        
        </button>
      
    )})}

    </div>


    <Header index ={'02'}   title={'Lock on targets'} description={"Select the muscles judged for annihilation."}/>

    <div className='bg-slate-950  border border-solid
    border-blue-400 rounded-lg flex flex-col'>
    
      <button onClick={ToggleModal}  className='relative p-3  flex items-center justify-center  ' > 
      <p className='capitalize'>{muscles.length == 0 ? 'Select muscle groups' : muscles.join(' ')}</p>
    <i className="fa-solid fa-caret-down mx-2 absolute right-3 top-1/2 -translate-y-1/2 "></i>
    
      </button>
   
    
    {showModel && (
      <div className='flex flex-col px-3 pb-3'>
        {(poison === 'individual' ? WORKOUTS[poison] : Object.keys(WORKOUTS[poison])).map((muscleGroup, muscleGroupIndex) => {
                            return (
                                <button onClick={() => {
                                    updateMuscles(muscleGroup)
                                }} key={muscleGroupIndex} className={'hover:text-blue-400 duration-200 ' + (muscles.includes(muscleGroup) ? ' text-blue-400' : ' ')}>
                                    <p className='uppercase '>{muscleGroup.replaceAll('_', ' ')}</p>
                                </button>
                            )
                        })}
      </div>
    )}
    

    </div>

    <Header index ={'03'}   title={'Become the Hulk'} description={"Select your ultimate objective"}/>

    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>

    {Object.keys(SCHEMES).map((scheme , schemeIndex) =>
    {
      return (
        <button onClick={()=>{setGoal(scheme)}} className={'bg-slate-950 border px-3 duration-200  hover:border-blue-600 py-3 rounded-lg mx-1 ' + (scheme === goal ? ' border-blue-600' : ' border-blue-100')} key={schemeIndex}>

        <p className='capitalize'>{scheme.replaceAll('_', " ")}</p>
        
        </button>
      
    )})}

    </div>
    <Button func={updateWorkout} text={"Formulate"}></Button>
      
    </SectionWrapper>
   
  )
}

export default Generator
