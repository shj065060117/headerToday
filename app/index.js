import React from 'react';
import {render} from 'react-dom';
import Header from './components/header';//引用头部组件
import Content from './components/content';//引用中间组件
import Popup from './components/popup';//引用中间组件
import Addmenu from './components/addmenu';//引用中间组件
import Search from './components/search';//引用中间组件
import './index.less';//引用CSS样式文件
import { Router, IndexRoute,Link,Route,hashHistory } from 'react-router';

class App extends React.Component{
    render(){
        return(
            <div>
                <Header></Header>
                <Content></Content>
                <Popup></Popup>
            </div>
        )
    }
}

render((
    <Router history={hashHistory}>
        <Route path="/" component={App}/>
        <Route path="/addmenu" component={Addmenu}/>
        <Route path="/search" component={Search}/>
    </Router>
    ),document.getElementById("App")
);