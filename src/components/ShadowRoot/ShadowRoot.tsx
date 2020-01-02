import * as React from "react";
import root from "react-shadow";

// eslint-disable-next-line
import duikItStyles from "!!raw-loader!./duik_it.txt";

interface ShadowRootProps {
  children: any;
}

interface ShadowRootState {}

class ShadowRoot extends React.Component<ShadowRootProps, ShadowRootState> {
  render() {
    const { children } = this.props;
    return (
      <>
        <root.div>
          <>
            <html
              style={{
                borderRadius: "4px",
                overflow: "hidden"
              }}
            >
              <head>
                <style>{duikItStyles}</style>
              </head>
              <body>{children}</body>
            </html>
          </>
        </root.div>
      </>
    );
  }
}

export default ShadowRoot;
