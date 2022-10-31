import React,{useState,useEffect} from 'react'
import {useReach} from '../../hooks';
import Button from '../../ui-components/Button';
import css from '../../css/app.module.css';

const AcceptTerms = () => {
  const [disabled, setDisabled] = useState(false);
	const { wager, standardUnit, termsAccepted,setTitle,setMessage } = useReach();
  useEffect(()=>{
    setTitle('');
    setMessage(<>Accept the Terms of the contract to play the Game!</>)
  },[])
	return (
		<div className={css.acceptTerms}>
			<div>
				The terms of the game are: Wager: <strong>{wager} {standardUnit}</strong>
			</div>
		    <div>
				<Button
					disabled={disabled}
					click={() => {
						setDisabled(true);
						termsAccepted();
					}}
					text='Accept terms and pay wager'
				/>
			</div>
			
		</div>
	);
}

export default AcceptTerms