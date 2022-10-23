import React, { Component } from 'react'

class test extends Component {
    constructor(props) {
        super(props);
        
    }
    render(){
        return (
            <div>test: {this.props.id}</div>
            )
        }
}

export default test