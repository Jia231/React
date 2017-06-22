import React, {Component,PropTypes} from 'react';
import CardForm from './CardForm';

class EditCard extends Component{
    componentWillMount(){
        let card = this.props.cards.find((card)=>card.id===this.props.params.card_id);
        this.setState({

        })
    }
    handleChange(field,value){
        this.setState({[field]:value})
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.cardCAllbacks.updateCard(this.state);
        this,props,history.pushState(null,'/');
    }
    handleClose(e){
        this.props.history.pushState(null,'/')
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