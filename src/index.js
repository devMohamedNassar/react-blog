import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import ScrollTop from './helpers/ScrollTop';

const app = <Provider store={store}>
				<BrowserRouter>
					<ScrollTop />
					<App />
				</BrowserRouter>
			</Provider>

ReactDOM.render(app, document.getElementById('root'));
