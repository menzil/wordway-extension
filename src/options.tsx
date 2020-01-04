import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Options as OptionsPage } from './pages';

import './styles/global.scss';
import { TranslateOverrides } from '@wordway/translate-api';
import { sharedApiClient } from './networking';
import { Method } from 'axios';

TranslateOverrides.fetch = (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => {
  return new Promise<any>((resolve, reject) => {
    const successCallback = (response: any) => {
      resolve({
        headers: response.headers,
        ok: true,
        status: response.status,
        statusText: response.statusText,
        json: () => response.data,
        text: () => response.data
      });
    };
    const failureCallback = (error: any) => reject(error);

    const url = input.toString();
    const method: Method = (init?.method || 'GET') as Method;

    sharedApiClient
      .request({
        method,
        url
      })
      .then(successCallback)
      .catch(failureCallback);
  });
};

chrome.tabs.query({ active: true, currentWindow: true }, tab => {
  const el = document.getElementById('root');
  ReactDOM.render(<OptionsPage />, el);
});
