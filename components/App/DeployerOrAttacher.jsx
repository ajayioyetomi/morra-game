import React,{useEffect} from 'react'
import { useReach } from '../../hooks'
import css from '../../css/app.module.css';
import {Button} from '../../ui-components';
const DeployerOrAttacher = () => {
  const {setMessage,setTitle,selectDeployer,selectAttacher} = useReach();
  useEffect(()=>{
    setTitle(<>Select Player Mode</>)
    setMessage(<>Do you want to Deploy the contact or Attach to a contract <br/>Note: Deloyer pays for deploying, and set the wager</>)
  },[])
  return (
    <div className={css.deployerOrAttacher}>
        <Button click={()=>selectDeployer()} text='Click here to be a Deployer' />
        <Button click={()=>selectAttacher()} text='Click here to be an Attacher' />
    </div>
  )
}

export default DeployerOrAttacher