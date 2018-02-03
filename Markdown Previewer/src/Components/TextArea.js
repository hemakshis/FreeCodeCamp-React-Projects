import React, { Component } from 'react'
import '../Styles/TextArea.css'

class TextArea extends Component {

  constructor() {
    super()
    this.onTextChange = this.onTextChange.bind(this)
  }

  onTextChange(e) {
    this.props.onChange(e.target.value)
  }

  render() {
    return (
      <textarea value={this.props.text} onChange={this.onTextChange}></textarea>
    );
  }
}

export default TextArea;
