import React, { Component, PropTypes} from 'react';

class AlbumList extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const params = this.props.params
        console.log("get route params", params)
    }
    componentWillReceiveProps(props) {
        
    }
    render() {
        return (
            <div>
                <h2>相册列表</h2>
                <p>没办法，这里要单独写了</p>
            </div>
        )
    }
}

export default AlbumList;