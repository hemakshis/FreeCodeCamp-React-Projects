import React, { Component } from 'react';
import AddRecipeForm from './Components/AddRecipeForm';
import ViewRecipes from './Components/ViewRecipes';
import EdiRecipeForm from './Components/EdiRecipeForm';
import uuid from 'uuid';
import './App.css';

function Header(props) {
  if (props.backButton) {
    const h1Style = {
      margin: '0% 10%'
    };
    return (
      <div className="container-fluid text-white">
        <span className="float-left ml-sm-5">
          <button type="button" className="btn btn-back" onClick={props.onBackButtonClick}><i className="material-icons">arrow_back</i></button>
        </span>
        <h1 className="text-center main-header" style={h1Style}>{props.title}</h1>
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
      EditRecipeForm: {
        show: false,
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

  goToMainPage () {
    if (this.state.EditRecipeForm.show) {
      this.handleViewRecipesBtn () ;
    } else {
      this.setState({
        mainTitle: 'Recipe Box',
        displayAddRecipeForm: false,
        displayAllRecipes: false,
        EditRecipeForm: {
          show: false,
          recipeNo: null
        },
        recipes: this.state.recipes
      });
    }
  }

  handleViewRecipesBtn () {
    this.setState({
      mainTitle: 'My Recipes',
      displayAddRecipeForm: false,
      displayAllRecipes: true,
      EditRecipeForm: {
        show: false,
        recipeNo: null
      },
      recipes: this.state.recipes
    });
  }

  handleAddRecipeBtn () {
    this.setState({
      mainTitle: 'Your Recipe',
      displayAddRecipeForm: true,
      displayAllRecipes: false,
      EditRecipeForm: {
        show: false,
        recipeNo: null
      },
      recipes: this.state.recipes
    });
  }

  handleEditRecipeBtn (recipeNo) {
    const title = this.state.recipes[recipeNo].title;
    this.setState({
      mainTitle: title,
      displayAddRecipeForm: false,
      displayAllRecipes: false,
      EditRecipeForm: {
        show: true,
        recipeNo: recipeNo
      },
      recipes: this.state.recipes
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
      EditRecipeForm: {
        show: false,
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
      EditRecipeForm: {
        show: false,
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
      displayAddRecipeForm: false,
      displayAllRecipes: true,
      EditRecipeForm: {
        show: false,
        recipeNo: null
      },
      recipes: recipes
    });

  }

  render() {
    const showAddRecipeForm = this.state.displayAddRecipeForm;
    const showEditRecipeForm = this.state.EditRecipeForm.show;
    const showAllRecipes = this.state.displayAllRecipes;
    const showButtons = !(showAddRecipeForm || showAllRecipes || showEditRecipeForm);
    const recipeNo = this.state.EditRecipeForm.recipeNo;
    return (
      <div>
        <Header title={this.state.mainTitle} backButton={!showButtons} onBackButtonClick={this.goToMainPage} />
        <div className="App">
          <div className="container-fluid">
            {
              showButtons ?
                <div className="starter-buttons text-center">
                  <button onClick={this.handleAddRecipeBtn} className="btn" type="button"><i className="fa fa-plus"></i> Add Recipe</button>
                  <button onClick={this.handleViewRecipesBtn} className="btn" type="button"><i className="fa fa-cutlery"></i> View Recipes</button>
                </div>
              : showAddRecipeForm ?
                <AddRecipeForm onChange={(title) => {title ? this.setState({mainTitle: title}) : this.setState({mainTitle: 'Your Recipe'})}} onSubmit={this.handleSubmitRecipe} onCanelBtnClick={this.goToMainPage} />
              : showAllRecipes ?
                <ViewRecipes recipes={this.state.recipes} onDelete={this.handleDeleteRecipe} onEditBtnClick={this.handleEditRecipeBtn} />
              : <EdiRecipeForm recipes={this.state.recipes} recipeNo={recipeNo} onChange={(title) => {title ? this.setState({mainTitle: title}) : this.setState({mainTitle: 'Edit Recipe'})}} onSubmit={this.handleSaveRecipe} onCanelBtnClick={this.handleViewRecipesBtn} />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
