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
    if (this.props.hasOwnProperty('recipe')) {
      this.props.onSubmit(e.target[0].value, e.target[1].value, this.props.recipeNo);
    } else {
      this.props.onSubmit(e.target[0].value, e.target[1].value);
    }
  }

  render () {
    let title = '';
    let ingredients = '';
    let btnValue ='Add It!';
    if (this.props.hasOwnProperty('recipe')) {
      const recipe = this.props.recipe;
      title = this.props.recipe.title;
      ingredients = recipe.ingredients[0];
      for (let i = 1; i < recipe.ingredients.length; i++) {
        ingredients += ',' + recipe.ingredients[i];
      }
      btnValue = 'Save!';
    }
    return (
      <div className="container">
        <div className="jumbotron">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input className="form-control" placeholder="Give your recipe a name." type="text" onChange={this.handleTitleChange} defaultValue={title} />
            </div>
            <div className="form-group">
              <label>Ingredients</label>
              <textarea className="form-control" placeholder="Tell us what ingredients are required. Seperate them by spaces." defaultValue={ingredients}></textarea>
            </div>
            <button type="submit" className="btn btn-add-recipe float-right">{btnValue}</button>
            <button type="button" className="btn btn-cancel-recipe mr-3 float-right" onClick={this.props.onCanelBtnClick}>Cancel</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddRecipeForm;
