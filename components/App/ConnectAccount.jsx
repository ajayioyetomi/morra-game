import React,{useEffect} from 'react'
import { useReach } from '../../hooks'
import css from '../../css/app.module.css';
import {Button} from '../../ui-components';
const ConnectAccount = () => {
  const {setTitle,setMessage,connecAccount} = useReach();
  useEffect(()=>{
    setTitle('');
    setMessage('')
  },[])
  return (
    <div className={css.connecAccount}>
			<p>
        Click the button below and<br/>
        Please wait while we connect to your account. If this takes more than a
			few seconds, there may be something wrong.
      </p>
			<div>
				<Button click={connecAccount} text='Connect Algo Wallet'/>
			</div>
		</div>
  )
}

export default ConnectAccount