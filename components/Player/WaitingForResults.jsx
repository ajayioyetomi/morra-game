import React,{useEffect} from 'react'
import { useReach } from '../../hooks'
import css from '../../css/app.module.css';

const WaitingforResults = () => {
  const {setTitle,setMessage} = useReach();
  useEffect(()=>{
    setTitle('');
    setMessage('');
  },[]); 
  return (
    <div className={css.waiting}>Waiting for Results</div>
  )
}

export default WaitingforResults