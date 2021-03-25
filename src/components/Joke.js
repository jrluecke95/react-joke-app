import React, { Component } from 'react'

export default class Joke extends Component {
  constructor(props) {
    super(props)
    this.state = {
      joke: 'joke goes here',
      isLoading: false,
      categories: [],
      category: 'dev',
    }
  }

  componentDidMount = () => {
    this.fetchCategories();
  }

  fetchCategories = () => {
    fetch('https://api.chucknorris.io/jokes/categories')
    .then(res => res.json())
    .then(data => {
      this.setState({
        categories: data
      })
    })
  }

  fetchJoke = () => {
    this.setState({
      isLoading: true,
    })
    fetch(`https://api.chucknorris.io/jokes/random?category=${this.state.category}`)
    .then(res => res.json())
    .then((data) => {
      this.setState({
        joke: data.value,
        isLoading: false,
      })
    })
  }

  handleChange = (event) => {
    this.setState({
      category: event.target.value
    });
  };

  render() {
    return (
      <div>
        <p>{this.state.isLoading ? 'Loading...' : this.state.joke}</p>
        <select onChange={this.handleChange} value={this.state.category}>
          {this.state.categories.map(cat => {
            return <option key={cat}>{cat}</option>
          })}
        </select>
        <button onClick={this.fetchJoke}>New Joke</button>
      </div>
    )
  }
}
