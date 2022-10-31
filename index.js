import * as AppViews from './components/App';
import * as Attacher from './components/Attacher';
import * as Deployer from './components/Deployer';
import * as PlayerViews from './components/Player';
import RenderViews, {renderDom} from './layout';
import AppContext from './context';
import './index.css';
import css from './css/app.module.css';

const Views = {
  ...AppViews,
  ...Attacher,
  ...Deployer,
  ...PlayerViews,
};

function App(){
  return(
    <div className={css.app}>
        <RenderViews {...Views}/>
    </div>
  )
}

renderDom(
  <AppContext>
      <App />
  </AppContext>
);