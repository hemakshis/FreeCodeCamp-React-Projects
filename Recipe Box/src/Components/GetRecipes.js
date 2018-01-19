import React, { Component } from 'react';
import './GetRecipe.css';
import uuid from 'uuid';

function Ingredients (props) {
  let idx = props.idx;
  var ingredients = props.recipes[idx].ingredients.map(function(item){
                      return (
                        <li key={uuid.v4()}>{item}</li>
                      );
                    })
  return (
    <ul>
      {ingredients}
    </ul>
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
        count = 1
      } else {
        count = 3;
      }
      let recipe = [];
      while (count > 0 && recipeNo < totalRecipes && totalRecipes > 0) {
        recipe.push(
          <div className="col-xs-12 col-md-4 text-white recipe" key={recipes[recipeNo].id}>
            <h3>{recipes[recipeNo].title}</h3>
            <Ingredients recipes={recipes} idx={recipeNo} />
            <button className="btn btn-outline-info btn-edit-recipe mr-sm-3" onClick={this.onEdit.bind(this, recipeNo)}>Edit</button>
            <button className="btn btn-delete-recipe" onClick={this.onDelete.bind(this, recipeNo)}>Delete</button>
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
