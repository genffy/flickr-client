import React, { Component, PropTypes} from 'react'
import { Link } from 'react-router'

class PhotosWrap extends Component{
    render(){
        return (
            <div>
                <h2>一个图片的外包页面</h2>
                <Link to='/photos'>最新照片</Link><br/>
                <Link to='/photos/tag'>根据tag选择</Link><br/>
                <Link to='/photos/detail'>照片详细</Link><br/>
                <div class="wrap">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default PhotosWrap