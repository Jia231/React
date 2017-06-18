import React,{Component} from 'react';
import 'whatwg-fetch';
import App from './App';

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
        
        let cardIndex = this.state.cards.findIndex((card)=>card.id==cardId)

        let nextState = update(this.state.cards,{
            [cardIndex]:{
                tasks:{$splice:[[taskIndex,1]]}
            }
        });
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
    render(){
        return(
            <App taskCallbacks={{
                toggle:this.toggleTask,
                add:this.addTask,
                delete:this.deleteTask
            }} 
            fetchedCards={this.state.cards}/>
        )
    }

}

export default KanbanBoardContainer;

