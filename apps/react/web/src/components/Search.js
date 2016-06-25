/**
 * Created by genffy on 16/6/5.
 */
import React from 'react'
import { Link } from 'react-router'
const Search = React.createClass({
    componentDidMount() {
        const params = this.props.params
        console.log("get route urls", params)
    },
    render(){
        "use strict";
        return(
            <div>
                <h2>特么的搜索</h2>
                <Link to='/photos/hot/detail/1234'>查看详细</Link>
                {this.props.children}
            </div>
        )
    }
});
export default Search