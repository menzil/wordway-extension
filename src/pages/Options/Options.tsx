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
  Dropdown,
  DropdownItem
} from "@duik/it";
import toastr from "toastr";

import { SelectTranslateEngine } from "../../components";

// import cls from "./Options.module.scss";

interface OptionsProps {}
interface OptionsState {
  selectionTranslateMode: string;
  selectionTranslateEngine: string;
}

const defaultOptions = {
  selectionTranslateMode: "enable-translate-tooltip",
  selectionTranslateEngine: "youdao-web"
};

class Options extends React.Component<OptionsProps, OptionsState> {
  constructor(props: OptionsProps, state: OptionsState) {
    super(props, state);

    this.state = {
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
    const { selectionTranslateMode, selectionTranslateEngine } = this.state;
    return (
      <>
        <Helmet>
          <title>选项 | 一路背单词（查词助手）</title>
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
                      display: "flex",
                      justifyContent: "flex-end"
                    }}
                  >
                    <Dropdown
                      buttonText="登录"
                      buttonProps={{
                        onClick: () => {
                          const urlSearchParams = new URLSearchParams(
                            Object.entries({
                              extensionId: chrome.i18n.getMessage("@@extension_id"),
                            })
                          );
                          chrome.tabs.create({
                            url: `https://wordway.app/account/login?${urlSearchParams}`
                          });
                        }
                      }}
                    >
                      <DropdownItem>你的资料</DropdownItem>
                      <DropdownItem>登出</DropdownItem>
                    </Dropdown>
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
                        onChange={e => {
                          this.setState({
                            selectionTranslateMode: e.currentTarget.value
                          });
                        }}
                      />
                      <Radio
                        checked={
                          selectionTranslateMode === "enable-translate-icon"
                        }
                        label="显示图标"
                        name="selectionTranslateMode"
                        description="点击图标即可显示弹出式翻译。"
                        value="enable-translate-icon"
                        onChange={e => {
                          this.setState({
                            selectionTranslateMode: e.currentTarget.value
                          });
                        }}
                      />
                      <Radio
                        checked={
                          selectionTranslateMode === "enable-translate-tooltip"
                        }
                        label="显示弹出式翻译"
                        name="selectionTranslateMode"
                        description="自动将选中的单词或短语发送至翻译引擎，以确定是否应显示翻译。"
                        value="enable-translate-tooltip"
                        onChange={e => {
                          this.setState({
                            selectionTranslateMode: e.currentTarget.value
                          });
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
