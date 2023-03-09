import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from "./store";
import "./i18next";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    < Provider store={store}>
      <App />
    </Provider>
);

window.store= store;

