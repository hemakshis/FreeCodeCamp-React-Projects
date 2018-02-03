import React, { Component } from 'react'
import '../Styles/Markdown.css'
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
