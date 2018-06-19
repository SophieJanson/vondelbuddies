import React, { Component } from 'react'
import { connect } from 'react-redux';
import Matches from './Matches'

const matches = [
    { id: 0, name: 'Henk', age: 30, activity: 'Running'},
    { id: 1, name: 'Piet', age: 32, activity: 'Skating'},
    { id: 2, name: 'Truus', age: 31, activity: 'Dancing'},
    { id: 3, name: 'Ingrid', age: 20, activity: 'Tourist egging'},
    { id: 4, name: 'Joop', age: 62, activity: 'Running'},
]

class MatchesContainer extends Component {

    accept = id => console.log('accept ' + id);
    reject = id => console.log('reject ' + id);

    render () {
        return (
            <div>
                <Matches matches={this.props.matches} accept={this.accept} reject={this.reject}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        matches: state.matches
    };
}


export default connect(
    mapStateToProps,
)(MatchesContainer);

