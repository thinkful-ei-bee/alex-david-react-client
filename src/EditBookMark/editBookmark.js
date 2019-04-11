import React, { Component } from  'react';

import config from '../config';

class editBookmark extends Component{

    state =this.props.bookmark;


    handleSubmit = event =>{
        event.preventDefault()
        

        fetch(`http://localhost:8000/api/bookmarks/${this.state.id}`,{
            method:'PATCH',
            body:JSON.stringify(this.state),
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer xyz'
            },
        })
            .then(res=>{
                if(!res.ok){
                    throw new Error('Something went wrong, please try again later'); 
                }
            })
    }

    render(){
        const {title,url,description,rating}= this.state;
        return(
        <div className="editbookmark">
        <h2>Edit Bookmark</h2>
        { error }
        <form className="editbookmark__form" onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={this.state.title}
            onChange={e => this.titleChanged(e.target.value)}/>
          <label htmlFor="url">Url:</label>  
          <input
            type="text"
            name="url"
            id="url"
            value={this.state.url}
            onChange={e => this.urlChanged(e.target.value)}/>
          <label htmlFor="description">Description:</label>  
          <textarea
            name="description"
            id="description"
            value={this.state.description}
            onChange={e => this.descriptionChanged(e.target.value)}/>
          <label htmlFor="rating">Rating: </label>
          <input
            type="number"
            name="rating"
            id="rating"
            min="1"
            max="5"
            value={this.state.rating}
            onChange={e => this.ratingChanged(e.target.value)}/>

          <div className="editbookmark__buttons">
            <button onClick={e => this.props.showForm(false)}>Cancel</button>
            <button type="submit" >Save</button>
          </div>  
        </form>
      </div>
        )
    }

}