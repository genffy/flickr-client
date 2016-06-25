import React, {Component} from 'react'

class Albums extends Component{
    render(){
        "use strict";
        return (
            <div>
                <p>相册标题</p>
                <p>相册副标题</p>
                <p>多少张照片，以及浏览量</p>
                <p>作者</p>
                <div>
                    照片列表了PhotoList
                </div>
            </div>
        )
    }
}
export default Albums;