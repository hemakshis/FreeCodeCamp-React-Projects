import React, { Component } from 'react'
import TextArea from './Components/TextArea'
import Markdown from './Components/Markdown'
import Footer from './Components/Footer'
import './App.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
    this.handleTextChange = this.handleTextChange.bind(this)
    this.onClearButtonClick = this.onClearButtonClick.bind(this)
    this.onHelpButtonClick = this.onHelpButtonClick.bind(this)
    this.setDefaultValue = this.setDefaultValue.bind(this)
  }

  componentWillMount() {
    this.setDefaultValue();
  }

  componentDidMount() {
    console.log('Component Mounted!')
  }

  setDefaultValue() {
    this.setState({
      text: '# H1\n## H2\n### H3\n#### H4\n##### H5\n###### H6\n\n------\n\n### Emphasis\n\nEmphasis, aka italics, with *asterisks* or _underscores_.\n\nStrong emphasis, aka bold, with **asterisks** or __underscores__.\n\nCombined emphasis with\n\n**asterisks and _underscores_**.\n\nStrikethrough uses two tildes. ~~Scratch this.~~\n\nShopping list:\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\n* Unordered list can also use asterisks\n- Or minuses\n+ Or pluses\n\n[I\'m an inline-style link](https://www.google.com)\n\n[I\'m an inline-style link with title](https://www.google.com "Google\'s Homepage")\n\nInline `code` has `back-ticks around` it.'
    })
  }

  handleTextChange(text) {
    this.setState({
      text: text
    })
  }

  onClearButtonClick() {
    this.setState({
      text: ''
    })
  }

  onHelpButtonClick() {
    this.setDefaultValue();
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row helperButtons">
            <div className="col-xs-12 col-md-3 col-lg-3 text-center">
              <button className="btn btn-primary" onClick={this.onClearButtonClick}>Clear</button>
            </div>
            <div className="col-xs-12 col-md-3 col-lg-3 text-center">
              <button className="btn btn-info" onClick={this.onHelpButtonClick}>Help</button>
            </div>
            <div className="col-xs-12 col-md-6 col-lg-6 text-center">
              <a className="btn btn-primary moreInfoA" rel="noopener noreferrer"  href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank">
                Complete Markdown Cheat Sheet
                &nbsp;
                <i className="fa fa-external-link"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row textRow">
            <div className="col-xs-12 col-md-6 col-lg-6 textCol1">
              <br />
              <TextArea text={this.state.text} onChange={this.handleTextChange} />
            </div>
            <div className="col-xs-12 col-md-6 col-lg-6 textCol2">
              <br />
              <Markdown text={this.state.text} />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row footerRow">
            <div className="col-xs-12 col-md-12 col-lg-12">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
