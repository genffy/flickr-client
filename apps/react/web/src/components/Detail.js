/**
 * Created by genffy on 16/6/5.
 */
import React from 'react'
const Detail = React.createClass({
    componentDidMount() {
        const params = this.props.params
        console.log("get route urls", params)
    },
    render() {
        "use strict";
        return(
            <div>
                <h2>这是一个图片的详细页面,妈蛋的</h2>
            </div>
        )
    }
});
export default Detail;