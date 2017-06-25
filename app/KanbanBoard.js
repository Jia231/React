import React, {Component,PropTypes} from 'react';
import List from './List';
import { Link } from 'react-router';

class KanbanBoard extends Component {
    render(){
        let cardModal = this.props.children && React.cloneElement(this.props.children,{
            cards:this.props.cards,
            cardCallBacks:this.props.cardCallbacks
        })
        return (
            <div className='app'>
                <Link className="float-button" to='/new'>+</Link> 
                <List id='todo' title="To Do" taskCallbacks={this.props.taskCallbacks} cards={this.props.cards.filter((card)=>card.status==='todo')}/>
                <List id='in-progress' title="In Progress" taskCallbacks={this.props.taskCallbacks} cards={this.props.cards.filter((card)=>card.status==='in-progress')}/>
                <List id='in-done' title="Done" taskCallbacks={this.props.taskCallbacks} cards={this.props.cards.filter((card)=>card.status==='done')}/>
                    {cardModal}
            </div>
        )

    }
}
KanbanBoard.propTypes = {
    cards:PropTypes.arrayOf(PropTypes.object),
    taskCallbacks:PropTypes.object
}

export default KanbanBoard;