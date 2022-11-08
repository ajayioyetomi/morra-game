import React,{useEffect,useState} from 'react'
import {useReach} from '../../hooks';
import css from '../../css/app.module.css';
import { Button } from '../../ui-components';

const WaitingForAttcher = () => {
  const {setTitle,setMessage,contract} = useReach();
  const [btnDisable,setBtnDisable] = useState(false);
  const [btnText,setBtnText] = useState('Copy Info');

  const handleCopyInfo =()=>{
    navigator.clipboard.writeText(contract.ctcInfoStr);
    setBtnDisable(true);
    setBtnText('Info Copied');
    let timer = setTimeout(()=>{
      setBtnText('Copy Info');
      setBtnDisable(false);
      clearTimeout(timer);
    },1000)
  }

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
          <div>
            Copy and send the info below to to Attcher<br/>
            {contract.ctcInfoStr}
          </div>
          <div>
            <Button text={btnText} disabled={btnDisable} click={()=>handleCopyInfo()} />
          </div>

        </div>
      </>:""}
    </>
    

  )
}

export default WaitingForAttcher