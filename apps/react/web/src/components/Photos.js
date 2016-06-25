import React, { Component, PropTypes} from 'react'

class Photos extends Component {
    constructor(props) {
        super(props)
        console.log('init', this.props.route.type)
    }
    componentWillMount() {

    }
    componentDidMount() {
        const params = this.props.params
        console.log("componentDidMount", params)
    }
    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', nextProps.route.type)
    }
    shouldComponentUpdate(nextProps, nextState) {

        return true
    }
    componentWillUpdate(nextProps, nextState) {

    }
    componentDidUpdate(prevProps, prevState) {

    }
    componentWillUnmount() {

    }
    render() {
        return (
            <div>
                <h2>图片的列表，什么乱七八糟的</h2>
            </div>
        )
    }
}
export default Photos;