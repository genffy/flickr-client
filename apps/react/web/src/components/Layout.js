import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Provider } from 'react-redux'

import Header from './Header.js'
import Style from './Layout.scss'

import configureStore from '../services/configureStore.js'
const store = configureStore();

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <div>
                        <Header/>
                        <div class="content">
                            <Provider store={store}>
                                {this.props.children}
                            </Provider>
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