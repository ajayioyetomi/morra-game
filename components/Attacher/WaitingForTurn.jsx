import React,{useEffect} from 'react'
import {useReach} from '../../hooks';
import css from '../../css/app.module.css';

const WaitingForTurn = () => {
  const {setTitle,setMessage} = useReach();

  useEffect(()=>{
    setTitle('');
    setMessage(<>Please Wait ...</>)
  },[])
  return (
    <div className={css.attaching}>
      Game will soon resume. Waiting for Turn!
    </div>
  )
}

export default WaitingForTurn