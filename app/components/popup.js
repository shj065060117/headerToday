import React from 'react';
import './popup.less';
import Pubsub from 'pubsub-js';

class PopupMask extends React.Component{
    constructor(...args){
        super(...args);
        this.state={display:"none"}
    }
    componentWillMount(){
        Pubsub.subscribe('SHOW',(msg)=>{
           this.shows();
        })
    }
    componentWillUnmound(){
        Pubsub.unsubscribe('SHOW');
    }
    closeDom(){
        this.setState({
            display: "none"
        })
    }
    shows(){
        console.log(222);
        this.setState({
            display: "block"
        })
    }
    render(){
        return(
            <div>
                <div className="mask"  style={{display:this.state.display}}></div>
                <div className="popup"  style={{display:this.state.display}}>
                    <div className="banner"></div>
                    <p>已加载好您感兴趣的头条</p>
                    <div className="download-btn" data-node="downloadBtn">立即打开</div>
                    <div className="close" data-node="close" onClick={this.closeDom.bind(this)}></div>
                </div>
            </div>
    );
    }
}

export default PopupMask;
