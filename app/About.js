import React,{Component} from 'react';

class About extends Component{
    render(){
        return(
             <div>
                <h1>About</h1>
                <h1>{this.props.route.title}</h1>
            </div>
        )
    }
}

export default About;