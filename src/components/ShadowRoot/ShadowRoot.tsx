import * as React from "react";
import root from 'react-shadow'

// eslint-disable-next-line
import duikItStyles from "!!raw-loader!./duik_it.txt";
// eslint-disable-next-line
import duikIconStyles from "!!raw-loader!./duik_icon.txt";

interface ShadowRootProps {
  children: any;
}

interface ShadowRootState {}

class ShadowRoot extends React.Component<ShadowRootProps, ShadowRootState> {
  render() {
    const { children } = this.props;
    return (
      <>
        <style>
          {`
          @font-face {
            font-family: "uikon";
            src: url(chrome-extension://${chrome.i18n.getMessage("@@extension_id")}/static/media/23a84f3596ea8ce60021f7540a422348.eot);
            src: url(chrome-extension://${chrome.i18n.getMessage("@@extension_id")}/static/media/23a84f3596ea8ce60021f7540a422348.eot#iefix) format("embedded-opentype"),
              url(chrome-extension://${chrome.i18n.getMessage("@@extension_id")}/static/media/182fadb541cdfa9b77620d8b4ea81926.ttf) format("truetype"),
              url(chrome-extension://${chrome.i18n.getMessage("@@extension_id")}/static/media/3ec057358075821566e03cdf079e3c56.woff) format("woff"),
              url(chrome-extension://${chrome.i18n.getMessage("@@extension_id")}/static/media/934c3c35cec81863f3598db8e7c0c0bc.svg#uikon) format("svg");
            font-weight: normal;
            font-style: normal;
          }
          `}
        </style>
          <root.div>
            <html>
              <head>
                <style>{duikItStyles}</style>
                <style>{duikIconStyles}</style>
              </head>
              <body>{children}</body>
            </html>
          </root.div>
      </>
    );
  }
}

export default ShadowRoot;
