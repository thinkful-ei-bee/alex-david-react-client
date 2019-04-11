import React, { Component } from 'react';
import './App.css';
import AddBookmark from './addBookmark/addBookmark';
import BookmarkApp from './bookmarkApp/bookmarkApp';

require('dotenv').config();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
      showAddForm: false
    };
  }

  addBookmark(bookmark) {
    this.setState({
      bookmarks: [...this.state.bookmarks, bookmark],
      showAddForm: false
    });
  }

  setShowAddForm(show) {
    this.setState({
      showAddForm: show
    });
  }

  componentDidMount() {
    const url = 'http://localhost:8000/bookmarks';
    const options = {
      method: 'GET',
      headers: {
        "Authorization": "Bearer ${process.env.API_TOKEN}",
        "Content-Type": "application/json"
      }
    };

    fetch(url, options)
      .then(res => {
        if(!res.ok) {
          throw new Error('Something went wrong, please try again later.');
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          bookmarks: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });

  }

  render() {
    const page = this.state.showAddForm
          ? <AddBookmark
          showForm={show => this.setShowAddForm(show)}
          handleAdd={bookmark => this.addBookmark(bookmark)}/>
          : <BookmarkApp bookmarks={this.state.bookmarks} showForm={show => this.setShowAddForm(show)}/>; 

    return (
      <div className="App">
        { page }
      </div>
    );
  }
}

export default App;
