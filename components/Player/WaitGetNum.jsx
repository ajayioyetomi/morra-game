import React,{useEffect} from 'react'
import { useReach } from '../../hooks'
import css from '../../css/app.module.css';

const WaitGetNum = () => {
  const {setTitle,setMessage} = useReach();
  useEffect(()=>{
    setTitle('');
    setMessage('');
  },[]); 
  return (
    <div className={css.waiting}>Waiting to get Num</div>
  )
}

export default WaitGetNum