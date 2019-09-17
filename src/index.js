import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import store from './store'
import * as serviceWorker from './serviceWorker';
import App from './components/App';
import Firebase, {FirebaseContext} from "./components/Firebase";
ReactDOM.render(
	<Provider store={store}>
	<FirebaseContext.Provider value={new Firebase()}>
		<App />
	</FirebaseContext.Provider>
	</Provider>,
	document.getElementById('root'),
);
serviceWorker.unregister();