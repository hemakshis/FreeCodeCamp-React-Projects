import React, { Component } from 'react';
import './GetRecipe.css';

function Ingredients (props) {
  let ingredients = '';
  const recipe = props.recipe;
  ingredients = recipe.ingredients[0];
  for (let i = 1; i < recipe.ingredients.length; i++) {
    ingredients += ', ' + recipe.ingredients[i];
  }
  return (
    <div>
      <h5>Ingredients:- </h5><p>{ingredients}</p>
    </div>
  );
}

class GetRecipes extends Component {
  onEdit (recipeNo) {
    this.props.onEdit(recipeNo);
  }

  onDelete (recipeNo) {
    this.props.onDelete(recipeNo);
  }

  render () {
      const totalRecipes = this.props.totalRecipes;
      let recipes = this.props.recipes;
      let recipeNo = this.props.startRecipeNo;
      let count = null;
      if (this.props.windowWidth < 768) {
        count = 1;
      } else {
        count = 3;
      }
      let recipe = [];
      while (count > 0 && recipeNo < totalRecipes && totalRecipes > 0) {
        recipe.push(
          <div className="col-xs-12 col-md-4 text-white recipe" key={recipes[recipeNo].id}>
            <div className="recipe-title text-center">
              <h3 className="mr-sm-3">{recipes[recipeNo].title}</h3>
                <div className="btn-div">
                  <button className="btn btn-edit-recipe" onClick={this.onEdit.bind(this, recipeNo)}><i className="fa fa-edit"></i></button>
                  <button className="btn btn-delete-recipe" onClick={this.onDelete.bind(this, recipeNo)}><i className="fa fa-trash"></i></button>
                </div>
            </div>
            <Ingredients recipe={recipes[recipeNo]} />
          </div>
        );
        count --;
        recipeNo ++;
      }

      return (
        <div className="row">
          {recipe}
        </div>
      );
  }
}

export default GetRecipes;
