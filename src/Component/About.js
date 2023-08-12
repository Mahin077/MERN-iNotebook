import React,{useContext,useEffect} from 'react'
import noteContext from '../context/noteContext'
function About() {
  const a = useContext(noteContext);
  useEffect(()=>{
    a.update();
  })
  return (
    <div>
      <h1>This is {a.state.name} from {a.state.class}</h1>
    </div>
  )
}

export default About
