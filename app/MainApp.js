import React,{Component} from 'react';
import {render} from 'react-dom';
import KanbanBoardContainer from './KanbanBoardContainer';
import Home from './Home';
import About from './About';
import {Router,Route,Link,IndexRoute} from 'react-router';
import Repo from './Repo';
import ServerError from './ServerError'
import RepoDetails from './RepoDetails';


class MainApp extends Component {

    constructor(){
        super();
    }

    render(){
        return(
            <div>
                <ul>
                    <li><Link to='/KanbanBoardContainer'>Kanban</Link></li>
                    <li><Link to='/About'>About</Link></li>
                    <li><Link to='/Repo'>Repo</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }

}


render((
    <Router>
        <Route path='/' component={MainApp}>
            <IndexRoute component={Home}/>
            <Route path="Repo" component={Repo}>
                {/* Add the route, nested where we want the UI to nest */}
                <Route path="/repo/:repo_name" component={RepoDetails} />
            </Route>
            <Route path='error' component={ServerError}></Route>
            <Route path='KanbanBoardContainer' component={KanbanBoardContainer}></Route>
            <Route path='About' component={About} title="About us"></Route>
        </Route>
    </Router>),document.getElementById('root'))