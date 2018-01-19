import React, { Component } from 'react';
import './AddRecipeForm.css';

class AddRecipeForm extends Component {
  constructor (props) {
    super(props);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange (e) {
    this.props.onChange(e.target.value);
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.onSubmit(this.refs.recipeTitle.value, this.refs.ingredients.value);
  }

  render () {
    return (
      <div className="container">
        <div className="jumbotron">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input className="form-control" placeholder="Give your recipe a name." type="text" ref="recipeTitle" onChange={this.handleTitleChange} />
            </div>
            <div className="form-group">
              <label>Ingredients</label>
              <textarea className="form-control" placeholder="Tell us what ingredients are required. Seperate them by spaces." ref="ingredients"></textarea>
            </div>
            <button type="submit" className="btn btn-add-recipe float-right">Add it!</button>
            <button type="button" className="btn btn-cancel-recipe mr-3 float-right" onClick={this.props.onCanelBtnClick}>Cancel</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddRecipeForm;
