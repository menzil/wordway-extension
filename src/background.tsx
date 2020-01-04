// import * as React from "react";
// import * as ReactDOM from "react-dom";

import { sharedApiClient } from './networking';

// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // onMessage must return "true" if response is async.
  let isResponseAsync = false;

  const _handleMessageRequest = () => {
    const successCallback = (response: any) => sendResponse({ response });
    const failureCallback = (error: any) => sendResponse({ error });

    sharedApiClient
      .request(request.arguments, false)
      .then(successCallback)
      .catch(failureCallback);

    return true;
  };

  const _handleMessageOpenOptionsPage = () => {
    chrome.runtime.openOptionsPage();

    const { accessToken, currentUser } = request.arguments;

    chrome.storage.sync.set(
      {
        accessToken,
        currentUser
      },
      () => {}
    );

    return true;
  };

  const _handleMessagePlayAudio = () => {
    const { url } = request.arguments;

    const audio = new Audio(url);
    audio.play();

    return true;
  };

  const _handleMessageAccountLogin = () => {
    chrome.storage.sync.set(request.arguments, () => {});
    return true;
  };

  const _handleMessageAccountLogout = () => {
    chrome.storage.sync.remove(['accessToken', 'currentUser']);
    return true;
  };

  switch (request.method) {
    case 'request':
      return _handleMessageRequest();
    case 'openOptionsPage':
      return _handleMessageOpenOptionsPage();
    case 'playAudio':
      return _handleMessagePlayAudio();
    case 'accountLogin':
      return _handleMessageAccountLogin();
    case 'accountLogout':
      return _handleMessageAccountLogout();
    default:
      console.log(`Message not supported.`);
  }

  return isResponseAsync;
});
