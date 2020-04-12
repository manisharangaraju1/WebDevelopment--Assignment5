import React from 'react';

export default class NumInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { num: props.number };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    e.preventDefault();
    const newInput = e.target.value;
    if (newInput.match(/^\d*$/)) {
      this.setState({ num: newInput });
    } else {
      alert('Please enter a number!');
      e.target.value = this.state.num;
    }
  }

  render() {
    return (
      <input type="text" name="NumberInput" onChange={this.handleInputChange} value={this.state.num} />
    );
  }
}
