import React from 'react'
import axios from 'axios'

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      anecdotes: [],
      current: 0
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:3001/anecdotes').then(res => {
      this.setState({ anecdotes: res.data})
    })
  }

  handleClick = () => {
    const oldCurrent = this.state.current
    const current = Math.floor(
      Math.random() * this.state.anecdotes.length
    )
    if (current === oldCurrent && this.state.anecdotes[current + 1]){
      return this.setState({ current: current + 1})
    }
    else if (current === oldCurrent && this.state.anecdotes[current - 1]){
      return this.setState({ current: current - 1})
    }
    this.setState({ current })
  }

  render() {
    if (this.state.anecdotes.length === 0) {
      return <div>No Anecdotes Found</div>
    }
    return (
      <div>
        <h1>Anecdote of the Day</h1>
        <div>{this.state.anecdotes[this.state.current].content}</div>
        <button onClick={this.handleClick}>Next Anecdote</button>
      </div>
    )
  }
}

export default App;
