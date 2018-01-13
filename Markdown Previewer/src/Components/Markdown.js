import React, { Component } from 'react'
import './Markdown.css'
var marked = require('marked')

class Markdown extends Component {
  render() {
    var myText = marked(this.props.text, {sanitize: true})
    return (
      <div className="MarkdownDiv" dangerouslySetInnerHTML={{__html: myText}}></div>
    );
  }
}

export default Markdown;
