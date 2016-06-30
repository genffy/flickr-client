/**
 * Created by dpDev on 16/6/29.
 * redux 入门例子
 */
import { createStore, applyMiddleware } from 'redux';
import React,{Component, PropTypes} from "react";
import {Provider,connect} from "react-redux";
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {render} from "react-dom";

var reducer=function(state,action){
    return Object.assign({},state,action);
};
var action=function(){
    return {
        'type':'dispatching',
        'data':['mini','react','redux','worked']
    }
};

// hot reload 固定模式
const store = (function configureStore(preloadedState) {
    const store = createStore(
        reducer,
        preloadedState,
        applyMiddleware(thunkMiddleware, createLogger())
    )

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept(reducer, () => {
            const nextRootReducer = reducer // require('./reducer.js').default
            store.replaceReducer(nextRootReducer)
        })
    }
    return store
})({"hello":"world"})

class Container extends Component{
    constructor(props){
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this)
        this.jsonStr = '乱七八糟的'
    }
    componentDidMount(){
        setTimeout(()=>this.props.action(),2000);
    }
    onClickHandler(){
        const str = '/**/jsonFlickrApi({ "stat": "fail", "code": 98, "message": "Invalid auth token" })';
        this.jsonStr = this.props.onClickHandler(str, 'jsonFlickrApi')
        console.log("hhh", JSON.parse(this.jsonStr))
    }
    render(){

        return(
            <div>
                <a href="javscript:;" onClick={this.onClickHandler}>点击解析jsonpbody</a>
                <p>解析好的json是: {this.jsonStr}</p>
                <div>执行动作:{JSON.stringify(this.props.hint)}</div>
                <ul>{this.props.data.length?'结果':''}
                    {this.props.data.map((ele)=>{
                        return <li key={Math.random()}>{ele}</li>
                    })}</ul>
            </div>
        )
    }
};

// mapStateToProps
let IndexContainer= connect((state)=>{
    return {
        data:state.data||[],
        hint:state.type
    };
},{action})(Container);

class ModuleContainer extends Component{
    constructor(props){
        super(props);
    }
    getJsonpData(body, prefix) {
        const reg = new RegExp(`\\S*${prefix}\\(`)
        return body.replace(reg,'').replace(/\}\)$/, '}')
    }
    render(){
        return (
            <Provider store={store}>
                <IndexContainer onClickHandler={this.getJsonpData}/>
            </Provider>
        )
    }
}
render(<ModuleContainer/>,document.getElementById('root'));

