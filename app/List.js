import React, {Component,PropTypes} from 'react';
import Card from './Card';

class List extends Component{
    render(){
        var cards = this.props.cards.map((card)=>{
            return <Card id={card.id}
                         taskCallbacks={this.props.taskCallbacks}
                         title={card.title}
                         description = {card.description}
                         color = {card.color}
                         tasks={card.tasks}
                         key={card.id}
                         />
        })
        return (
            <div className='list'>
                <h1>{this.props.title}</h1>
                {cards}
            </div>
        )
    }
}
List.PropTypes = {
    title:PropTypes.string.isRequired,
    cards:PropTypes.arrayOf(PropTypes.object)
}

export default List;