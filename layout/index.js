import React from 'react';
import ReactDOM from 'react-dom/client';
import { useReach } from '../hooks';
// import './index.css';
//import App from './App';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

export function renderDom(app){
    root.render(
    <React.StrictMode>
      {app}
    </React.StrictMode>
  );
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

const RenderViews = (Views)=>{
  const {views} = useReach();
  const View = Views[views.view];
  const Wrapper = views.wrapper?Views[views.wrapper]:Views['AppWrapper'];

  const content = <View />
  return <Wrapper >{content} </Wrapper>;
    
 }

 export default RenderViews;



