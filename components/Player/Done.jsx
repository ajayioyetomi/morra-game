import React,{useEffect} from 'react'
import css from '../../css/app.module.css';
import {useReach} from '../../hooks';

const Done = () => {
  const {outcome,mode,setTitle,setMessage} = useReach();
  useEffect(()=>{
    setTitle(<>End Of Game</>);
    setMessage(<>{mode.name === outcome?'!!!Congratulations!!!':'Better lucky next time'}</>)
  },[])
  return (
    <div><strong>{outcome}</strong></div>
  )
}

export default Done