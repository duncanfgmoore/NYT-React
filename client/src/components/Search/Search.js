import React, { Component } from "react";
import "./Search.css";
import { Input } from "../Form";
import API from "../../utils/API";
import Results from "../../components/Results";
import Saved from "../../components/Saved";

class Search extends Component {
  state = {
    article: "",
    startYear: "",
    endYear: "",
    articles: [],
    saved: []
  };

  componentDidMount() {
    this.getSavedArticles();
  }

  handleSaveButton = (event, id) => {
    event.preventDefault();
    const articleData = this.state.articles.find(article => article._id === id);
    console.log(articleData);
    API.saveArticle({ articleData }).then(results => {
      const filteredResults = this.state.saved.filter(
        article => article._id !== id
      );
      this.setState({ saved: filteredResults });
    });
    window.location.reload();
  };

  getSavedArticles = () => {
    API.getArticles().then(results => {
      console.log(results.data);
      this.setState({ saved: results.data });
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.article && this.state.startYear && this.state.endYear) {
      API.searchNYT(
        this.state.article,
        this.state.startYear,
        this.state.endYear
      )
        .then(res => {
          this.setState({ articles: res.data.response.docs });
          console.log(res.data);
        })
        .catch(err => console.log(err));
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleDeleteButton = (event, id) => {
    event.preventDefault();
    console.log(id)
    API.deleteArticle(id)
    .then((results) => {
      console.log(results);
      this.getSavedArticles();
    })
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-1" />
          <div className="col-sm-10">
            <br />
            <div className="card">
              <div className="card-header">
                <strong>
                  <i className="fa fa-list-alt" /> Search Articles
                </strong>
              </div>
              <div className="card-body">
                <form>
                  <Input
                    value={this.state.article}
                    onChange={this.handleInputChange}
                    name="article"
                    placeholder="Article"
                  />
                  <Input
                    value={this.state.startYear}
                    onChange={this.handleInputChange}
                    name="startYear"
                    placeholder="Start Year"
                    type="Start Year"
                  />
                  <Input
                    value={this.state.endYear}
                    onChange={this.handleInputChange}
                    name="endYear"
                    placeholder="End Year"
                    type="End Year"
                  />
                  <button
                    type="submit"
                    onClick={this.handleFormSubmit}
                    className="btn btn-default margin-right"
                    id="run-search"
                  >
                    <i className="fa fa-search" /> Search
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-sm-1" />
        </div>

        <div className="card container">
          <div>
            <br />
            <div className="container">
              <div className="card-header">
                <strong>
                  <i className="fa fa-table" /> Search Results
                </strong>
              </div>
              {this.state.articles.map(article => (
                <Results
                  url={article.web_url}
                  title={article.headline.main}
                  date={article.pub_date}
                  key={article._id}
                  _id={article._id}
                  handleSaveButton={this.handleSaveButton}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="saved card container">
          <div className="container">
            <div className="card-header">
              <strong>
                <i className="fa fa-table" /> Saved Articles
              </strong>
            </div>

            {this.state.saved.map(article => (
              <Saved
                url={article.url}
                title={article.title}
                date={article.date}
                key={article._id}
                _id={article._id}
                handleDeleteButton={this.handleDeleteButton}
              />
            ))}
          </div>
        </div>





      </div>
    );
  }
}

export default Search;
