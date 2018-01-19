import React, { Component } from 'react';
import uuid from 'uuid';
import './ViewRecipes.css';
import GetRecipes from './GetRecipes';

function PageItems (props) {
  var pageItems = [];
  for (var i = 0; i < props.noOfPages; i++) {
    if (i + 1 === props.currPageNo) {
      pageItems.push(
        <li className="page-item active" key={uuid.v4()}>
          <a className="page-link" onClick={props.onClick.bind(this, (i+1))}>{i+1}</a>
          <span className="sr-only">(current)</span>
        </li>
      );
    } else {
      pageItems.push(
        <li className="page-item" key={uuid.v4()}>
          <a className="page-link" onClick={props.onClick.bind(this, (i+1))}>{i+1}</a>
        </li>
      );
    }
  }
  return (
    <ul className="pagination justify-content-center">
      <li className="page-item" key={uuid.v4()}>
        {
          props.currPageNo > 1 ? (
            <a className="page-link" aria-label="Previous" onClick={props.onClick.bind(this, "previous")}>
              <span aria-hidden="true"><i className="fa fa-angle-double-left"></i></span>
            </a>
          )
          : (
            <a className="page-link" aria-label="Previous" disabled="true">
              <span aria-hidden="true" style={{color:'transparent'}}><i className="fa fa-angle-double-left"></i></span>
            </a>
          )
        }
          <span className="sr-only">Previous</span>
      </li>
      {pageItems}
      <li className="page-item" key={uuid.v4()}>
        {
          props.currPageNo < props.noOfPages ? (
            <a className="page-link" aria-label="Next" onClick={props.onClick.bind(this, "next")}>
              <span aria-hidden="true"><i className="fa fa-angle-double-right"></i></span>
            </a>
          )
          : (
            <a className="page-link" aria-label="Next" disabled="true">
              <span aria-hidden="true" style={{color:'transparent'}}><i className="fa fa-angle-double-right"></i></span>
            </a>
          )
        }
          <span className="sr-only">Next</span>
      </li>
    </ul>
  );
}

class ViewRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startRecipeNo: 0,
      currPageNo: 1,
      windowWidth: 0
    };

    this.updateWindowWidth = this.updateWindowWidth.bind(this);
    this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
    this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  componentDidMount () {
    this.updateWindowWidth();
    window.addEventListener('resize', this.updateWindowWidth)
  }

  componentWillMount () {
    this.updateWindowWidth();
    window.removeEventListener('resize', this.updateWindowWidth)
  }

  updateWindowWidth () {
    this.setState({
      startRecipeNo: this.state.startRecipeNo,
      currPageNo: this.state.currPageNo,
      windowWidth: window.innerWidth
    });
  }

  handleLeftArrowClick () {
    if (this.state.windowWidth < 768) {
      this.setState ({
        startRecipeNo: this.state.startRecipeNo - 1,
        currPageNo: this.state.currPageNo - 1
      });
    } else {
      this.setState ({
        startRecipeNo: this.state.startRecipeNo - 3,
        currPageNo: this.state.currPageNo - 1
      });
    }
  }

  handleRightArrowClick () {
    if (this.state.windowWidth < 768) {
      this.setState ({
        startRecipeNo: this.state.startRecipeNo + 1,
        currPageNo: this.state.currPageNo + 1
      });
    } else {
      this.setState ({
        startRecipeNo: this.state.startRecipeNo + 3,
        currPageNo: this.state.currPageNo + 1
      });
    }
  }

  handlePagination (val) {
    if (val === this.state.currPageNo) {
      return;
    } else if (val === "previous") {
      this.handleLeftArrowClick();
    } else if (val === "next") {
      this.handleRightArrowClick();
    } else {
      if (this.state.windowWidth < 768) {
        this.setState ({
          startRecipeNo: val - 1,
          currPageNo: val
        });
      } else {
        this.setState ({
          startRecipeNo: 3 * (val - 1),
          currPageNo: val
        });
      }
    }
  }

  onDelete (recipeNo) {
    const recipes = this.props.recipes;
    const totalRecipes = recipes.length;
    if (totalRecipes === recipeNo + 1 && (recipeNo % 3 === 0 || this.state.windowWidth < 768)) {
      this.handleLeftArrowClick();
    }
    this.props.onDelete(recipeNo);
  }

  onEdit (recipeNo) {
    this.props.onEditBtnClick(recipeNo);
  }

  render () {
    const recipes = this.props.recipes;
    const totalRecipes = recipes.length;
    let noOfPages = null;
    if (this.state.windowWidth < 768) {
      noOfPages = totalRecipes;
    } else {
      noOfPages = totalRecipes % 3 === 0 ? totalRecipes / 3 : Math.floor(totalRecipes / 3) + 1;
    }
    //console.log(totalRecipes, noOfPages);
    return (
      <div className="container-fluid view-recipes">
        <div className="pagination-div">
          <nav>
            <PageItems noOfPages={noOfPages} currPageNo={this.state.currPageNo} onClick={this.handlePagination} />
          </nav>
        </div>
        <div className="row recipe-box">
          <div className="col-md-1 left-arrow-div">
            <div className="left-arrow">
              {
                this.state.currPageNo > 1 ? (
                  <button type="button" className="btn" onClick={this.handleLeftArrowClick}>
                    <i className="fa fa-angle-left fa-5x"></i>
                  </button>
                )
                : (
                  <button type="button" className="btn" disabled="true">
                    <i className="fa fa-angle-left fa-5x" style={{color:'transparent'}}></i>
                  </button>
                )
              }
            </div>
          </div>
          <div className="col-md-10 recipe-grid">
            <GetRecipes recipes={recipes} startRecipeNo={this.state.startRecipeNo} totalRecipes={totalRecipes} windowWidth={this.state.windowWidth} onEdit={this.onEdit} onDelete={this.onDelete} />
          </div>
          <div className="col-md-1 right-arrow-div">
            <div className="right-arrow">
              {
                this.state.currPageNo < noOfPages ? (
                  <button type="button" className="btn" onClick={this.handleRightArrowClick}>
                    <i className="fa fa-angle-right fa-5x"></i>
                  </button>
                )
                : (
                  <button type="button" className="btn" disabled="true">
                    <i className="fa fa-angle-right fa-5x" style={{color:'transparent'}}></i>
                  </button>
                )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewRecipes;
