import React from 'react';
import './header.less';
import Pubsub from 'pubsub-js';
import {Link} from 'react-router';

class Header extends React.Component{
    constructor(...args){
        super(...args);
    }
    addDom(){
        Pubsub.publish("SHOW");
    }
    refresh(){
        Pubsub.publish("REFRESH");
    }
    render(){
        return(
            <div className="headers">
                <div className="head_c">
                    <a href="#" className="logo"></a>
                    <div className="refresh"><i onClick={this.refresh.bind(this)}></i></div>
                </div>
                <div className="head_l" onClick={this.addDom.bind(this)}></div>
                <div className="head_r"><Link to="/search"></Link></div>
             </div>
        );
    }
}

export default Header;