/**
 * Created by genffy on 16/6/5.
 */
import React from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import NavLink from './NavLink.js'

export default class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
    }
    // 双击切换
    handleToggle() {
        // this.setState({open: !this.state.open});
    }
    componentWillMount(){

    }
    // 点击选择
    handleClose (type){
        // this.setState({open: false});
        // 获取数据
    }
    render() {
        return (
            <div>
                <header>
                    <AppBar
                        title="Flickr"
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                        onLeftIconButtonTouchTap={this.handleToggle}
                    />
                </header>
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <MenuItem onTouchTap={this.handleClose('index')}><NavLink to="/">首页</NavLink></MenuItem>
                    <MenuItem onTouchTap={this.handleClose('hot')}><NavLink to="/list/hot">热门相片</NavLink></MenuItem>
                    <MenuItem onTouchTap={this.handleClose('new')}><NavLink to="/list/recent">最新照片</NavLink></MenuItem>
                </Drawer>
            </div>
        );
    }
}