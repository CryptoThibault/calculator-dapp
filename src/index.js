import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Web3Provider } from 'web3-hooks'
import Dapp from './Dapp';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Web3Provider>
      <Dapp />
    </Web3Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
