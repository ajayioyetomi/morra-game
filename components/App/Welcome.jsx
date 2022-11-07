import React,{useEffect,useRef} from 'react';
import {useReach} from '../../hooks';
import css from '../../css/app.module.css';

let start = false;
let count = 0;
let counter = null;
const STOPPAGE = 10;
let reverseCount = STOPPAGE;

const Welcome = () => {
  const {setViews} = useReach();
  const spanRef = useRef(null);
  useEffect(()=>{
    if(!start){
      start = true;
      counter = setInterval(()=>{
        count++;
        reverseCount--;
        if(spanRef && spanRef.current){
          spanRef.current.innerHTML = `${reverseCount}`;
        }
        if(count >= STOPPAGE){
          clearInterval(counter);
          setViews({
            view:"ConnectAccount",
          })
          
        }
      },1000)
    }
  },[])
  return (
    <>
      <div >Game starts in: <span className={css.count} ref={spanRef}>20</span></div>
    </>
  )
}

export default Welcome