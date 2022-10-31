import React,{useState,useEffect} from 'react';
import { useReach } from '../../hooks';
import css from '../../css/app.module.css';
import { Button } from '../../ui-components';

const Attach = () => {
  const [ctcInfoStr,setCtcInfoStr] = useState('');
  const {setTitle,setMessage,attach} = useReach();
  useEffect(()=>{
    setTitle('')
    setMessage(<>Wow!<br/> You are an Attacher</>)
  },[])
  return (
    <div className={css.attach}>
       <div>Attacher, Paste the contract info below and click the button below to attach to the contract</div>
       <div>
          <textarea
            spellCheck='false'
            className='ContractInfo'
            onChange={(e) => setCtcInfoStr(e.currentTarget.value)}
            placeholder='Enter contract info'
            colSpan='8'
          />
        <Button click={()=>attach(ctcInfoStr)} text='Attach'/>
       </div>

    </div>
  )
}

export default Attach