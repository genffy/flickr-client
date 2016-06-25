/**
 * Created by genffy on 16/6/5.
 */
import React from 'react'
import Drawer from 'material-ui/Drawer'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import Avatar from 'material-ui/Avatar'
import { Link } from 'react-router'
import Styles from './Header.scss'
export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {open: false}
        this.handleToggle = this.handleToggle.bind(this)
        this.handleTap = this.handleTap.bind(this)
    }
    handleToggle() {
        this.setState({open: !this.state.open})
    }
    handleTap() {
        setTimeout(()=>{
            this.setState({open: false})
        }, 500)
    }
    componentWillMount(){

    }
    render() {
        return (
            <div>
                <header>
                    <AppBar title="Flickr" iconClassNameRight="muidocs-icon-navigation-expand-more" onLeftIconButtonTouchTap={this.handleToggle} />
                </header>
                <Drawer docked={false} width={200} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
                    <Avatar>A</Avatar>
                    <MenuItem onTouchTap={this.handleTap} linkButton={true} children={<Link className='nav' to='/'>首页</Link>}></MenuItem>
                    <MenuItem onTouchTap={this.handleTap} linkButton={true} children={<Link className='nav' to='photos/tag/hot'>热门标签</Link>}></MenuItem>
                    <MenuItem onTouchTap={this.handleTap} linkButton={true} children={<Link className='nav' to='photos'>最近更新</Link>}></MenuItem>
                </Drawer>
            </div>
        );
    }
}