import React, {Component,PropTypes} from 'react';
import CardForm from './CardForm';

class EditCard extends Component{
    componentWillMount(){
        let card = this.props.cards.find((card)=>card.id==this.props.params.card_id);
        /*console.log(this.props.cards)
        console.log(card)
        console.log('this is the meaning of ...card in edtiCard')*/
        //console.log(...card)
        this.setState({
            id:card.id,
            title:card.title,
            description:card.description,
            status:card.status ,
            color:card.color,
            tasks:card.tasks
        })
    }
    handleChange(field,value){
        this.setState({[field]:value})
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.cardCallbacks.updateCard(this.state);
        this.props.history.pushState(null,'/Kanban');
    }
    handleClose(e){
        this.props.history.pushState(null,'/Kanban')
    }
    render(){
        return(
            <CardForm draftCard={this.state}
                      buttonLabel="Edit Card"
                      handleChange={this.handleChange.bind(this)}
                      handleSubmit={this.handleSubmit.bind(this)}
                      handleClose={this.handleClose.bind(this)}/>
        )
    }
}

EditCard.propTypes = {
    cardCallbacks:PropTypes.object
}

export default EditCard;