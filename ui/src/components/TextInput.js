import React from 'react';

export default class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { textInput: props.text };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    e.preventDefault();
    const newInput = e.target.value;
    const letters = /^[A-Za-z]+$/;
    if (newInput.match(letters) || newInput === '') {
      this.setState({ textInput: newInput });
    } else {
      alert('Please enter a valid input');
      e.target.value = this.state.textInput;
    }
  }

  render() {
    return (
      <input type="text" name="textInput" onChange={this.handleInputChange} value={this.state.textInput} />
    );
  }
}
