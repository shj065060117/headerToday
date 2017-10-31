import React from 'react';
import './nav.less';
import Pubsub from 'pubsub-js';
import {Link} from 'react-router';

class Nav extends React.Component{
    constructor(...args){
        super(...args);
        this.state={
             listMenu:[
                {
                    tit:'推荐',
                    attr:"__all__"
                }, {
                    tit:'娱乐',
                    attr:"news_entertainment"
                }, {
                    tit:'科技',
                    attr:"news_tech"
                }, {
                    tit:'汽车',
                    attr:"news_car"
                }, {
                    tit:'体育',
                    attr:"news_sports"
                }, {
                    tit:'财经',
                    attr:"news_finance"
                }, {
                    tit:'军事',
                    attr:"news_military"
                }, {
                    tit:'国际',
                    attr:"news_world"
                }, {
                    tit:'时尚',
                    attr:"news_fashion"
                }, {
                    tit:'旅游',
                    attr:"news_travel"
                }, {
                    tit:'养生',
                    attr:"news_regimen"
                }, {
                    tit:'历史',
                    attr:"news_history"
                },{
                    tit:'探索',
                    attr:"news_discovery"
                },{
                    tit:'育儿',
                    attr:"news_baby"
                },{
                    tit:'美食',
                    attr:"news_food"
                },

            ],
            color:"#505050"
        }
        console.log(11111)
    }
    componentDidMount(){
        Pubsub.subscribe('DELETE_MENU',(msg,str)=>{
            this.delMenus(str);
        })
    }
    componentWillUnmound(){
        Pubsub.unsubscribe('DELETE_MENU');
    }
    nav(e){
        this.props.onGetAttr(e.target.getAttribute("data-channel"));
        this.clearColor();
        e.target.style.color="#f85959";
    }
    clearColor(){
        for(var i=0;i<this.refs.menuList.children.length;i++){
            this.refs.menuList.children[i].style.color="#505050";
        }
    }
    delMenus(str){
        let arr=this.state.listMenu;
        //最多16个频道，请先删除一些
        arr=this.arrReplace(arr,str);
        this.setState({
            listMenu:arr
        });
        console.log(this.state.listMenu)
    }
    arrReplace(arr,str){
        for(var i=0;i<arr.length;i++){
            if(arr[i].tit==str){
                arr.splice(i,1)
            }
        }
        return arr;
    }
    render(){
        let This=this;
        let listMenu=this.state.listMenu.map(function (Item,index) {
            return(
               <a href="javascript:;" key={index} onClick={This.nav.bind(This)} data-channel={Item.attr} data-query={Item.attr}  className="btn">{Item.tit}</a>
            )
        })
        return(
            <div className="topMenu">
                <div className="menuMore"><Link to="/addmenu">＋</Link></div>
                <div className="menuList" ref="menuList">
                    {listMenu}
                </div>

            </div>
        );
    }
}

export default Nav;
