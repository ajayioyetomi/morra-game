import React from 'react';
import { useReach } from '../../hooks';

const Wrapper = ({children}) => {
  const {title,message} = useReach();
  
  return (
    <>
      <h1>MORRA</h1>
      <div>
        {title ?<h2>{title}</h2> :''}
        {message? <p>{message}</p>:''}
        {children}
      </div>
    </>
    
  )
}

export default Wrapper