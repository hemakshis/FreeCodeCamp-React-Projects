import React, { Component } from 'react';
import './AddRecipeForm.css';

class EditRecipeForm extends Component {
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
    this.props.onSubmit(this.refs.recipeTitle.value, this.refs.ingredients.value, this.props.recipeNo);
  }

  render () {
    const recipes = this.props.recipes;
    const recipeNo = this.props.recipeNo;
    let ingredients = '';
    const recipe = recipes[recipeNo];
    ingredients = recipe.ingredients[0];
    for (let i = 1; i < recipe.ingredients.length; i++) {
      ingredients += ',' + recipe.ingredients[i];
    }
    return (
      <div className="container">
        <div className="jumbotron">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input className="form-control" type="text" ref="recipeTitle" onChange={this.handleTitleChange} defaultValue={recipes[recipeNo].title} />
            </div>
            <div className="form-group">
              <label>Ingredients</label>
              <textarea className="form-control" ref="ingredients" defaultValue={ingredients}></textarea>
            </div>
            <button type="submit" className="btn btn-add-recipe float-right">Save!</button>
            <button type="button" className="btn btn-cancel-recipe mr-3 float-right" onClick={this.props.onCanelBtnClick}>Cancel</button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditRecipeForm;
