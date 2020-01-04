import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Popup } from './components';

import './styles/global.scss';

chrome.tabs.query({ active: true, currentWindow: true }, tab => {
  const el = document.getElementById('root');
  ReactDOM.render(<Popup />, el);
});
