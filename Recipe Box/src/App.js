import React, { Component } from 'react';
import AddRecipeForm from './Components/AddRecipeForm';
import ViewRecipes from './Components/ViewRecipes';
import uuid from 'uuid';
import './Styles/App.css';

// The upper back button that is displayed in ViewRecipes Component
function Header(props) {
  if (props.backButton) {
    return (
      <div className="container-fluid text-white">
        <span className="float-left ml-sm-5">
          <button type="button" className="btn btn-back" onClick={props.onBackButtonClick}><i className="material-icons">arrow_back</i></button>
        </span>
        <h1 className="text-center main-header" style={{margin: '0% 10%'}}>{props.title}</h1>
      </div>
    );
  } else {
    return (
      <h1 className="text-center text-white main-header">{props.title}</h1>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    var recipes;
    // If no localStorage key is present with the name "RecipeBoxHemakshis add one with the following recipes"
    if (JSON.parse(localStorage.getItem('RecipeBoxHemakshis')) === null) {
      recipes = [
        {
          id: uuid.v4(),
          title: 'Omlete',
          ingredients: ['Egg', 'Onion', 'Corriander']
        },
        {
          id: uuid.v4(),
          title: 'French Fries',
          ingredients: ['Potato', 'Salt', 'Ketchup']
        },
        {
          id: uuid.v4(),
          title: 'Maggie',
          ingredients: ['maggie', 'water', 'maggie masala']
        },
        {
          id: uuid.v4(),
          title: 'Sandwich',
          ingredients: ['bread', 'butter', 'potato', 'spices']
        }
      ];

      localStorage.setItem('RecipeBoxHemakshis', JSON.stringify(recipes));
    } else {
      recipes = JSON.parse(localStorage.getItem('RecipeBoxHemakshis'));
    }

    this.state = {
      mainTitle: 'Recipe Box',
      displayAddRecipeForm: false,
      displayAllRecipes: false,
      displayEditRecipeForm: {
        display: false,
        recipeNo: null
      },
      recipes: recipes
    };

    this.goToMainPage = this.goToMainPage.bind(this);
    this.handleViewRecipesBtn = this.handleViewRecipesBtn.bind(this);
    this.handleAddRecipeBtn = this.handleAddRecipeBtn.bind(this);
    this.handleEditRecipeBtn = this.handleEditRecipeBtn.bind(this);
    this.handleSubmitRecipe = this.handleSubmitRecipe.bind(this);
    this.handleSaveRecipe = this.handleSaveRecipe.bind(this);
    this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
  }

  // When the backButton is clicked
  goToMainPage () {
    this.setState({
      mainTitle: 'Recipe Box',
      displayAddRecipeForm: false,
      displayAllRecipes: false,
      displayEditRecipeForm: {
        display: false,
        recipeNo: null
      }
    });
  }

  handleViewRecipesBtn () {
    this.setState({
      mainTitle: 'My Recipes',
      displayAddRecipeForm: false,
      displayAllRecipes: true,
    });
  }

  handleAddRecipeBtn () {
    this.setState({
      mainTitle: 'New Recipe',
      displayAddRecipeForm: true,
      displayAllRecipes: false,
    });
  }

  handleEditRecipeBtn (recipeNo) {
    this.setState({
      mainTitle: this.state.recipes[recipeNo].title,
      displayAddRecipeForm: false,
      displayAllRecipes: false,
      displayEditRecipeForm: {
        display: true,
        recipeNo: recipeNo
      }
    });
  }

  handleSubmitRecipe (title, ingredients) {
    if (title === '' || ingredients === '') {
      alert('Please provide all the details');
      return;
    }
    var recipes = this.state.recipes;
    recipes.push({
      id: uuid.v4(),
      title: title,
      ingredients: ingredients.split(',')
    });
    localStorage.setItem('RecipeBoxHemakshis', JSON.stringify(recipes));
    this.setState({
      mainTitle: 'Recipe Box',
      displayAddRecipeForm: false,
      displayAllRecipes: false,
      displayEditRecipeForm: {
        display: false,
        recipeNo: null
      },
      recipes: recipes
    })
  }

  handleSaveRecipe (newTitle, newIngredients, recipeNo) {
    if (newTitle === '' || newIngredients === '') {
      alert('Please provide all the details');
      return;
    }
    let recipes = this.state.recipes;
    recipes[recipeNo].title = newTitle;
    recipes[recipeNo].ingredients = newIngredients.split(',');
    localStorage.setItem('RecipeBoxHemakshis', JSON.stringify(recipes));
    this.setState({
      mainTitle: 'My Recipes',
      displayAddRecipeForm: false,
      displayAllRecipes: true,
      displayEditRecipeForm: {
        display: false,
        recipeNo: null
      },
      recipes: recipes
    })
  }

  handleDeleteRecipe (recipeNo) {
    let recipes = this.state.recipes;
    recipes.splice(recipeNo, 1);
    localStorage.setItem('RecipeBoxHemakshis', JSON.stringify(recipes));
    this.setState({
      mainTitle: 'My Recipes',
      recipes: recipes
    });
  }

  render() {
    const showButtons = !(this.state.displayAddRecipeForm || this.state.displayEditRecipeForm.display || this.state.displayAllRecipes);
    const recipeNo = this.state.displayEditRecipeForm.recipeNo;
    return (
      <div>
        <Header title={this.state.mainTitle} backButton={this.state.displayAllRecipes} onBackButtonClick={this.goToMainPage} />
        <div className="App">
          <div className="container-fluid">
            {
              showButtons ?
                <div className="starter-buttons text-center">
                  <button onClick={this.handleAddRecipeBtn} className="btn" type="button"><i className="fa fa-plus"></i> Add Recipe</button>
                  <button onClick={this.handleViewRecipesBtn} className="btn" type="button"><i className="fa fa-cutlery"></i> View Recipes</button>
                </div>
              : this.state.displayAddRecipeForm ?
                <AddRecipeForm onChange={(title) => {title ? this.setState({mainTitle: title}) : this.setState({mainTitle: 'New Recipe'})}} onSubmit={this.handleSubmitRecipe} onCanelBtnClick={this.goToMainPage} />
              : this.state.displayAllRecipes ?
                <ViewRecipes recipes={this.state.recipes} onDelete={this.handleDeleteRecipe} onEditBtnClick={this.handleEditRecipeBtn} />
              : <AddRecipeForm onChange={(title) => {title ? this.setState({mainTitle: title}) : this.setState({mainTitle: 'Edit Recipe'})}} onSubmit={this.handleSaveRecipe} onCanelBtnClick={this.handleViewRecipesBtn} recipe={this.state.recipes[recipeNo]} recipeNo={recipeNo} />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
