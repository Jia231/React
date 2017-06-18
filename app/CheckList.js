import React, { Component,PropTypes } from 'react';
class CheckList extends Component {
    handleClick(){
        //this.refs.myTextbox.focus();
        this.refs.myTextbox.focus();
    }
    checkInputKeyPress(evt){
        if(evt.key==='Enter'){
            this.props.taskCallbacks.add(this.props.cardId,evt.target.value);
            evnt.target.value='';
        }
    }
    render() {
    let tasks = this.props.tasks.map((task) => (
    <li key={this.props.id} className="checklist__task">
    <input type="checkbox" defaultChecked={task.done} onChange={this.props.taskCallbacks.toggle.bind(null,
    this.props.cardId,taskIndex)} />
    {task.name}
    <a href="#" className="checklist__task--remove" onClick={this.props.taskCallbacks.delete.bind(null,
    this.props.cardId,taskIndex)} />
    </li>
    ));

    return (
    <div className="checklist">
    <ul>{tasks}</ul>
    <input ref='myTextbox' type="text"
    className="checklist--add-task"
    placeholder="Type then hit Enter to add a task" 
    onKeyPress = {this.checkInputKeyPress.bind(this)}
     />
    <input type='button'
    value="Focus Text"    
    onClick={this.handleClick.bind(this)}
    />
    </div>
    );
    }
}
CheckList.propTypes = {
    cardId: PropTypes.number,
    tasks: PropTypes.arrayOf(PropTypes.object)
};
export default CheckList;