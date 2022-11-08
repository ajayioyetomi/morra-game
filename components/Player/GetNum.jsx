import React,{useEffect} from 'react'
import {useReach} from '../../hooks';
import css from '../../css/app.module.css';
import {Button} from '../../ui-components';

const arrHand = [
  0,1,2,3,4,5,6,7,8,9,10
]

const GetNum = () => {
  const {setTitle,setMessage,playNum,hand,playable} = useReach();

  const styles={
    padding:'10px',
  }

  const handleDisble = (arg)=>{
     let status = hand == 0?false: hand>arg?true:false;
     return status;
  }

  const handleHand = (arg) =>{
    playNum(arg.toString());
  }

  useEffect(()=>{
    setTitle(<>
    Guess the total numbers of Fingers played all together</>);
    setMessage(<>Select between 0 - 10 <br/><br/>Note: You will not be allowed to select any number lower than the number of finger you play yourself.</>);
    //console.log(hand);
  },[])
  return (
    <div className={css.getHand}>
      {arrHand.map(num => <Button  className={`${handleDisble(num)?css.disabled:''}`} key={num} 
      click={()=> handleHand(num)} 
      text={`${num} Finger${num <=1?'':'s'}`} 
      style={styles} disabled={handleDisble(num)} />)}
    </div>
  )
}



export default GetNum