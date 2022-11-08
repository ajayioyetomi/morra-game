import React,{useEffect,useState} from 'react'
import { useReach } from '../../hooks'
import css from '../../css/app.module.css';
import {Button} from '../../ui-components';
const ConnectAccount = () => {
  const {setTitle,setMessage,connecAccount} = useReach();
  const [disabledBtn,setDisableBtn] = useState(false);
  const handleBtn = ()=>{
     connecAccount();
     setDisableBtn(true);
  }
  useEffect(()=>{
    setTitle('');
    setMessage('');
    setDisableBtn(false);
  },[])
  return (
    <div className={css.connecAccount}>
			<p>
        Click the button below to connect to your account. If this takes more than a few seconds, there may be something wrong.
      </p>
			<div>
				<Button click={()=>handleBtn()} disabled={disabledBtn} text='Connect Algo Wallet'/>
			</div>
		</div>
  )
}

export default ConnectAccount