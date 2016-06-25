import React, { Component, PropTypes} from 'react'
import { Link } from 'react-router'

class Personal extends Component{
    render(){
        return (
            <div>
                <h2>特么的个人中心</h2>
                <Link to='/author/genffy'>所有相片</Link><br/>
                <Link to='/author/genffy/albums'>相册</Link><br/>
                <Link to='/author/genffy/favorites'>最受欢迎</Link><br/>
                <div class="wrap-list">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Personal