import * as React from "react";
import { Button } from "@duik/it";
import Icon from "@duik/icon";
import Translate, { LookUpResult } from "@wordway/translate-api";
import IcibaEngine from "@wordway/translate-engine-iciba";
import WebYoudaoEngine from "@wordway/translate-engine-web-youdao";

import ShadowRoot from "../ShadowRoot";

interface InjectTransTooltipIconProps {
  q: string;
  onLoadComplete: any;
}
interface InjectTransTooltipIconState {
  selectionTranslateMode?: string;
  selectionTranslateEngine?: string;
  loading: boolean;
}

class InjectTransTooltipIcon extends React.Component<
  InjectTransTooltipIconProps,
  InjectTransTooltipIconState
> {
  private translate: Translate;

  constructor(
    props: InjectTransTooltipIconProps,
    state: InjectTransTooltipIconState
  ) {
    super(props, state);

    const icibaEngine = new IcibaEngine({
      key: "<key>"
    });
    const webYoudaoEngine = new WebYoudaoEngine();

    this.translate = new Translate([
      icibaEngine,
      webYoudaoEngine,
    ]);

    this.state = {
      selectionTranslateMode: "enable-translate-tooltip",
      selectionTranslateEngine: "web-youdao",
      loading: false,
    };
  }

  componentDidMount() {
    const keys = ["selectionTranslateMode", "selectionTranslateEngine"];
    const callback = (result: any) => {
      this.setState({ ...result });
      const { selectionTranslateMode } = result;
      if (selectionTranslateMode === 'enable-translate-tooltip') {
        this.reloadData();
      }
    };
    chrome.storage.sync.get(keys, callback);
  }

  reloadData = async () => {
    const { q, onLoadComplete } = this.props;
    const { selectionTranslateEngine } = this.state;

    let beginTime = new Date().getTime();

    this.setState({ loading: true });
    const lookUpResult: LookUpResult = await this.translate
      .engine(selectionTranslateEngine)
      .lookUp(q);

    const usedTime = new Date().getTime() - beginTime;
    setTimeout(() => {
      this.setState({ loading: false }, () => {
        onLoadComplete(lookUpResult);
      });
    }, usedTime > 200 ? 0 : 200 - usedTime);
  };

  render() {
    return (
      <ShadowRoot>
        <Button
          transparent
          square
          style={{
            border: "none",
          }}
          loading={this.state.loading}
          onClick={() => this.reloadData()}
          {...this.props}
        >
          <Icon>rocket</Icon>
        </Button>
      </ShadowRoot>
    );
  }
}

export default InjectTransTooltipIcon;
