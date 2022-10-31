import React,{useEffect} from 'react'
import {useReach} from '../../hooks';
import css from '../../css/app.module.css';

const WaitingForAttcher = () => {
  const {setTitle,setMessage,contract} = useReach();
  useEffect(()=>{
    setTitle('');
    setMessage('');
  },[])
  return (
    <>
      <div className={css.waiting}>Waiting For Attcher</div>
      {contract && contract.ctcInfoStr ?
      <>
        <div>
          Copy and send the info below to to Attcher<br/>
          {contract.ctcInfoStr}
        </div>
      </>:""}
    </>
    

  )
}

export default WaitingForAttcher