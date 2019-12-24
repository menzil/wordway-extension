import * as React from "react";
import { Helmet } from "react-helmet";
import {
  Button,
  FormGroupContainer,
  FormGroup,
  Divider,
  WidgetContainer,
  Widget,
  WidgetContent,
  Radio,
} from "@duik/it";
// import Icon from "@duik/icon";
import toastr from "toastr";

import { SelectTranslateEngine } from "../../components";

// import cls from "./Options.module.scss";

interface OptionsProps {}
interface OptionsState {
  highlightNewWordsMode: string;
  selectionTranslateMode: string;
  selectionTranslateEngine: string;
}

const defaultOptions = {
  highlightNewWordsMode: "",
  selectionTranslateMode: "enable-translate-tooltip",
  selectionTranslateEngine: "web-youdao"
};

class Options extends React.Component<OptionsProps, OptionsState> {
  constructor(props: OptionsProps, state: OptionsState) {
    super(props, state);

    this.state = {
      highlightNewWordsMode: "",
      selectionTranslateMode: "",
      selectionTranslateEngine: ""
    };
  }

  componentDidMount() {
    const keys = ["selectionTranslateMode", "selectionTranslateEngine"];
    const callback = (result: any) => this.setState({ ...result });
    chrome.storage.sync.get(keys, callback);
  }

  handleClickSubmit = (event: any) => {
    event.preventDefault();

    const { selectionTranslateMode, selectionTranslateEngine } = this.state;

    chrome.storage.sync.set(
      {
        selectionTranslateMode,
        selectionTranslateEngine
      },
      () => {
        toastr.success("选项已保存。");
      }
    );
  };

  handleClickReset = (event: any) => {
    event.preventDefault();

    chrome.storage.sync.set(
      {
        ...defaultOptions
      },
      () => {
        this.setState(defaultOptions);
        toastr.success("选项已重置。");
      }
    );
  };

  render() {
    const {
      highlightNewWordsMode,
      selectionTranslateMode,
      selectionTranslateEngine,
    } = this.state;
    return (
      <>
        <Helmet>
          <title>选项 | 一路背单词</title>
        </Helmet>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <WidgetContainer style={{ width: "768px" }}>
            <Widget>
              <WidgetContent>
                <FormGroupContainer horizontal>
                  <h3>扩展程序选项</h3>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <a
                      href="https://wordway.app"
                      target="__blank"
                    >
                      <img
                        src="./icon128.png"
                        alt="logo"
                        style={{ width: '26px' }}
                      />
                    </a>
                  </div>
                </FormGroupContainer>
              </WidgetContent>
              <Divider />
              <form
                onSubmit={this.handleClickSubmit}
                onReset={this.handleClickReset}
              >
                <WidgetContent>
                  <FormGroupContainer>
                    <h5>标记生词</h5>
                    <FormGroup
                      style={{
                        display: "flex",
                        flexDirection: "column"
                      }}
                    >
                      <span className="content-title">
                        高亮生词（在网页中时高亮显示你标记过的生词）
                      </span>
                      <Radio
                        checked={highlightNewWordsMode === "disabled"}
                        label="禁用该功能"
                        name="highlightNewWordsMode"
                        value="disabled"
                        onChange={(e) => {
                          this.setState({ highlightNewWordsMode: e.currentTarget.value });
                        }}
                      />
                      <Radio
                        checked={highlightNewWordsMode === "enable-001"}
                        label="显示标记线"
                        name="highlightNewWordsMode"
                        description="点击即可显示弹出式翻译。"
                        value="enable-001"
                        onChange={(e) => {
                          this.setState({ highlightNewWordsMode: e.currentTarget.value });
                        }}
                      />
                      <Radio
                        checked={highlightNewWordsMode === "enable-002"}
                        label="显示标记线及翻译"
                        name="highlightNewWordsMode"
                        description="在标记线上方显示翻译，点击即可显示弹出式翻译。"
                        value="enable-002"
                        onChange={(e) => {
                          this.setState({ highlightNewWordsMode: e.currentTarget.value });
                        }}
                      />
                    </FormGroup>
                  </FormGroupContainer>
                </WidgetContent>
                <WidgetContent>
                  <FormGroupContainer>
                    <h5>划词翻译</h5>
                    <FormGroup
                      style={{
                        display: "flex",
                        flexDirection: "column"
                      }}
                    >
                      <span className="content-title">
                        弹出翻译（在选中单词或短语时）
                      </span>
                      <Radio
                        checked={selectionTranslateMode === "disabled"}
                        label="禁用该功能"
                        name="selectionTranslateMode"
                        value="disabled"
                        onChange={(e) => {
                          this.setState({ selectionTranslateMode: e.currentTarget.value });
                        }}
                      />
                      <Radio
                        checked={selectionTranslateMode === "enable-translate-icon"}
                        label="显示图标"
                        name="selectionTranslateMode"
                        description="点击图标即可显示弹出式翻译。"
                        value="enable-translate-icon"
                        onChange={(e) => {
                          this.setState({ selectionTranslateMode: e.currentTarget.value });
                        }}
                      />
                      <Radio
                        checked={selectionTranslateMode === "enable-translate-tooltip"}
                        label="显示弹出式翻译"
                        name="selectionTranslateMode"
                        description="自动将选中的单词或短语发送至翻译引擎，以确定是否应显示翻译。"
                        value="enable-translate-tooltip"
                        onChange={(e) => {
                          this.setState({ selectionTranslateMode: e.currentTarget.value });
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <SelectTranslateEngine
                        block
                        label="翻译引擎"
                        activeOption={selectionTranslateEngine}
                        onOptionClick={({ value }: any) => {
                          this.setState({ selectionTranslateEngine: value });
                        }}
                      />
                    </FormGroup>
                  </FormGroupContainer>
                </WidgetContent>
                <WidgetContent style={{ display: "flex" }}>
                  <FormGroupContainer horizontal>
                    <Button type="submit" success>
                      保存
                    </Button>
                    <Button type="reset" transparent>
                      重置
                    </Button>
                  </FormGroupContainer>
                </WidgetContent>
              </form>
            </Widget>
          </WidgetContainer>
        </div>
      </>
    );
  }
}

export default Options;
