import * as React from "react";
import * as ReactDOM from "react-dom";
import { Method } from "axios";
import { TranslateOverrides } from "@wordway/translate-api";

import { InjectTransTooltip } from "./components";
import { sharedApiClient } from "./networking";

const ELEMENT_ID = "___wordway";

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
    const method: Method = (init?.method || "GET") as Method;

    sharedApiClient
      .request({
        method,
        url
      })
      .then(successCallback)
      .catch(failureCallback);
  });
};

const onMouseUp = (e: any) => {
  if (e.path.length > 0) {
    const firstTagName = e.path[0].tagName;
    if (firstTagName === "INPUT" || firstTagName === "TEXTAREA") return;
    if (e.path.findIndex(({ id }: any) => id === ELEMENT_ID) >= 0) return;
  }

  let el = document.getElementById(ELEMENT_ID);

  let selection: any = document.getSelection();
  const q = selection.toString().trim();

  if (q.length === 0) {
    if (el) el.remove();
    return;
  }

  if (el && el.getAttribute("data-q") !== q) {
    el.remove();
    el = null;
  }

  if (!el) {
    el = document.createElement("div");
    el.setAttribute("id", ELEMENT_ID);
    el.setAttribute("data-q", q);

    document.body.appendChild(el);
  }

  const selectionRange = selection.getRangeAt(0);
  const selectionRect = selectionRange.getBoundingClientRect();

  ReactDOM.render(
    <InjectTransTooltip
      q={selection.toString().trim()}
      boundingClientRect={selectionRect}
      onShow={() => {}}
      onHide={() => {
        if (el) el.remove();
      }}
    />,
    el
  );
};

let mouseupTimer: any;
document.addEventListener("mouseup", (e: any) => {
  const keys = ["selectionTranslateMode"];
  const callback = ({ selectionTranslateMode }: any) => {
    if (selectionTranslateMode === "disabled") return;

    if (!mouseupTimer) clearTimeout(mouseupTimer);
    mouseupTimer = setTimeout(() => onMouseUp(e), 300);
  };
  chrome.storage.sync.get(keys, callback);
});

window.addEventListener("message", (e) => {
  const { source = '', payload } = e.data || {};
  if (source.indexOf('wordway-') === -1) return;

  chrome.runtime.sendMessage(payload);
});
