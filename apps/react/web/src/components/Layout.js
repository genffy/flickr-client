/**
 * Created by genffy on 16/6/5.
 */

import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Header from './Header.js'
import Style from './Layout.scss'

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        console.log('什么鬼哦');
    }
    render() {
        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <div>
                        <Header/>
                        <div class="content">
                            {this.props.children}
                        </div>
                        <footer>
                            <p>Copyright &copy; 2016 Genffy</p>
                        </footer>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}