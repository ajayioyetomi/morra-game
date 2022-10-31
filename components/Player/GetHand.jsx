import React,{useEffect} from 'react'
import {useReach} from '../../hooks';
import css from '../../css/app.module.css';
import {Button} from '../../ui-components';

const arrHand = [
  0,1,2,3,4,5
]

const GetHand = () => {
  const {setTitle,setMessage,playHand,playable} = useReach();

  const styles={
    padding:'10px',
  }

  const handleHand = (arg) =>{
    playHand(arg.toString());
  }

  useEffect(()=>{
    setTitle(<>Select numbers of Fingers you are playing</>);
    setMessage(<>Each options represent the numbers of fingers you want to play: 0 - 5</>)
  },[])
  return (
    <div className={css.getHand}>
      {arrHand.map(hand => <Button key={hand} 
      click={()=> handleHand(hand)} 
      text={`${hand} Finger${hand <=1?'':'s'}`} 
      style={styles} disabled={!playable} />)}
    </div>
  )
}

export default GetHand