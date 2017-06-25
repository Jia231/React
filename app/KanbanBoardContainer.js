import React,{Component} from 'react';
import 'whatwg-fetch';
import App from './App';
import update from 'react-addons-update';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-Type': 'application/json',
    Authorization: '1234'
}

class KanbanBoardContainer extends Component{
    constructor(){
        super(...arguments);
        this.state = {
            cards:[]
        }
        this.addTask = this.addTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.toggleTask = this.toggleTask.bind(this);
        this.addCard = this.addCard.bind(this);
        this.updateCard = this.updateCard.bind(this);
    }

    addTask(cardId,taskName){
        let cardIndex = this.state.cards.findIndex((card)=>card.id==cardId);
        let newTask = {
            id:Date.now(),
            name:taskName,
            done:false
        }
        let newState = update(this.state.cards,{
            [cardIndex]:{
                tasks: {$push:[newTask]
                }
            }
        })
        this.setState({cards:newState});
        fetch(`${API_URL}/cards/${cardId}/tasks`, {
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newTask)
        })
        .then((response) => response.json())
        .then((responseData) => {
            newTask.id=responseData.id
            this.setState({cards:nextState});
        });
    }
    deleteTask(cardId,taskId,taskIndex){
        /*console.log(`This is the card state`);
        console.log(this.state.cards);
        console.log('this is the cardId')
        console.log(cardId);
        console.log(`This is the taskIndex`);
        console.log(taskIndex);
        console.log(`This is the taskId`);
        console.log(taskId);
        let cardIndex = this.state.cards.findIndex((card)=>card.id==cardId)
        console.log(`This is the cardIndex`);
        console.log(cardIndex)*/
        let nextState = update(this.state.cards,{
            [cardIndex]:{
                tasks:{$splice:[[taskId,1]]}
            }
        });
        /*console.log(`This is the new state`);
        console.log(nextState)*/
        this.setState({cards:nextState})
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'delete',
            headers: API_HEADERS
        });
    }
    toggleTask(cardId,taskId,taskIndex){
        
        let cardIndex = this.state.cards.findIndex((card)=>card.id==cardId);
        let NewDoneValue;
        let nextState = update(this.state.cards,{
            [cardIndex]:{
                tasks:{
                    [taskIndex]:{
                        done:{
                            $apply:(done)=>{
                                newDoneValue = !done
                                return newDoneValue;
                            }
                        }
                    }
                }
            }
        })
        this.setState({cards:nextState});
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify({done:newDoneValue})
        });
    }

    addCard(card){
        /*console.log('This is the this.state entered in the addCard')
        console.log(card)*/
        let prevState = this.state;
        if(card.id===null){
            let card = Object.assign({},card,{id:Date.now()});
        }
        let nextState = update(this.state.cards,{$push:[card]});
        this.setState({cards:nextState})
        fetch(`${API_URL}/cards`, {
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(card)
        })
        .then(response=>{
            if(response.ok){
                return response.json();
            }
            else{
                throw new Errror("Server response wasn't OK");
            }
        })
        .then(responseData=>{
            card.id = responseData.id;
            this.setState({cards:nextState})
        })
        .catch(error=>{
            this.setState(prevState);
        })
        /*console.log('this is the prev state in container')
        console.log(prevState);*/
    }
    updateCard(card){
        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex(c=>c.id==card.id)

        let nextState = update(this.state.cards,{
            [cardIndex]:{$set:card}
        })
        this.setState({cards:nextState});
       fetch(`${API_URL}/cards/${card.id}`, {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify(card)
        })
        .then(response=>{
            if(response.ok){
                return response.json();
            }
            else{
                throw new Error("Server response wasn't OK")
            }
        })
        .catch(error=>{
            console.error('Fetch error',error)
            this.setState(prevState);
        })

    }

    componentDidMount(){
        fetch(API_URL+'/cards', {headers: API_HEADERS})
        .then((response)=>response.json())
        .then((responseData)=>{
            this.setState({cards:responseData})
        })
        .catch((error)=>{
            console.log('There was an error fetching the data',error)
        })
    }

    render() {
        let kanbanBoard = this.props.children && React.cloneElement(this.props.children, {
            cards: this.state.cards,
            taskCallbacks:{
            toggle: this.toggleTask.bind(this),
            delete: this.deleteTask.bind(this),
            add: this.addTask.bind(this)
            },
            cardCallbacks:{
            addCard: this.addCard.bind(this),
            updateCard: this.updateCard.bind(this),
            /*updateStatus: this.updateCardStatus.bind(this),
            updatePosition: throttle(this.updateCardPosition.bind(this),500),
            persistMove: this.persistCardMove.bind(this)*/
            }
        });
        //console.log(kanbanBoard)
        return kanbanBoard;
    }

}

export default KanbanBoardContainer;

