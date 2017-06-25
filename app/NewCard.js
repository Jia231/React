import React, {Component,PropTypes} from 'react';
import CardForm from './CardForm';


class NewCard extends Component{

    componentWillMount(){
        this.setState({
            id:Date.now(),
            title:'',
            description:'',
            status:'todo'  ,
            color:'#c9c9c9',
            tasks:[]
        })
    }

    handleChange(field,value){
        /*console.log('This is the this field in the new card');
        console.log(`${field} ${value}`)*/
        this.setState({[field]: value});
    }

    handleSubmit(e){
        e.preventDefault();
        //console.log('This is the New card this.state')
        //console.log(Date.now())
        //console.log(this.state)
        this.props.cardCallbacks.addCard(this.state);
        this.props.history.pushState(null,'/Kanban');
    }
    handleClose(e){
        this.props.history.pushState(null,'/Kanban')
    }
    render(){
        return(
            <div>
                <CardForm draftCard={this.state}
                    buttonLabel="Create Card"
                    handleChange={this.handleChange.bind(this)}
                    handleSubmit={this.handleSubmit.bind(this)}
                    handleClose={this.handleClose.bind(this)} />
            </div>
        )
    }
}

NewCard.propTypes = {
cardCallbacks: PropTypes.object,
};
export default NewCard;