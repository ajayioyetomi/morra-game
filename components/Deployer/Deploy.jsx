import React,{useEffect,useState} from 'react';
import { useReach } from '../../hooks';
import css from '../../css/app.module.css';
import { Button } from '../../ui-components';

const Deploy = () => {
  const [disabled,setDisabled] = useState(false);

  const {setTitle,setMessage,setWager,wager,standardUnit,deploy} = useReach();

  const handleWager = (e)=>{
     let value = e.target.value;
     setWager(value)

  }

  useEffect(()=>{
    setTitle('')
    setMessage(<>Wow!<br/> You are a deloyer: you will pay a little token to deploy</>)
  },[])
  return (
    <div className={css.deploy}>
       <p>set the wager amount in the input below</p>
       <input disabled={disabled} value={wager} min='1' max='5' type="number" onChange={(e)=>handleWager(e)} />
       <div>Deployer, Pay to Deploy:  <strong>{wager}</strong> {standardUnit}</div>
       <div>
        <Button click={()=>{deploy();setDisabled(true)}} text='Click here to deploy'/>
       </div>

    </div>
  )
}

export default Deploy