const r = (path: string): string => {
  return `chrome-extension://${chrome.i18n.getMessage(
    "@@extension_id"
  )}${path}`;
};

export default r;
