import React, { Component } from 'react';
import KanbanBoard from './KanbanBoard';

class App extends Component {
  constructor(){
    super();
  }
  render(){
    return(
      <KanbanBoard taskCallbacks={this.props.taskCallbacks} cards={this.props.fetchedCards} />
    )
  }
}

export default App;
