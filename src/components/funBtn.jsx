import { Component } from "react";

class FunctionButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className={`${this.props.className} w-${this.props.wight} h-${this.props.height} flex items-center self-center hover:rounded-full hover:bg-f2f2f2 cursor-pointer`}
      >
        <div className={`${this.props.className}-icon`}>
          <i
            className={`${this.props.iconClassName} flex items-center justify-center ${this.props.iconSize}`}
          ></i>
        </div>
      </div>
    );
  }
}
export default FunctionButton;
