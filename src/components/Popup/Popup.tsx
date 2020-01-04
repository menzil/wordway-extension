import * as React from 'react';
import {
  Button,
  FormGroupContainer,
  FormGroup,
  TextField,
  Widget,
  WidgetContent
} from '@duik/it';

// import cls from "./Popup.module.scss";

interface PopupProps {}

interface PopupState {
  text: string;
}

class Popup extends React.Component<PopupProps, PopupState> {
  constructor(props: PopupProps, state: PopupState) {
    super(props, state);

    this.state = {
      text: ''
    };
  }

  render() {
    return (
      <Widget
        style={{
          border: 'none',
          // width: '380px',
          height: '100vh'
        }}
      >
        <WidgetContent>
          <form>
            <FormGroupContainer>
              <FormGroupContainer horizontal>
                <FormGroup>
                  <TextField />
                  <div style={{ width: 30 }}>
                    <Button>翻译2</Button>
                  </div>
                </FormGroup>
              </FormGroupContainer>
            </FormGroupContainer>
          </form>
        </WidgetContent>
        <WidgetContent>
          <p>{this.state.text}</p>
        </WidgetContent>
      </Widget>
    );
  }
}

export default Popup;
