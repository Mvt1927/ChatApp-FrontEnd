import { Component } from "react";

class FunctionButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className={`flex items-center self-center hover:rounded-full ${this.props.hascolor=='true'?'':'hover:bg-f2f2f2'} cursor-pointer ${this.props.className} w-${this.props.wight} h-${this.props.height}`}
      >
        <div className={`icon`}>
          <i
            className={`${this.props.iconClassName} flex items-center justify-center ${this.props.iconSize}`}
          ></i>
        </div>
      </div>
    );
  }
}
export default FunctionButton;
