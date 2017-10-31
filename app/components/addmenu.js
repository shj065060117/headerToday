import React from 'react';
import './addmenu.less';
import {Link} from 'react-router';
import Pubsub from 'pubsub-js';

class Addmenu extends React.Component{
    constructor(...args){
        super(...args);
        this.state={
            title1:[
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
            title2:[
                {
                    tit:'热点',
                    attr:"news_hot"
                }, {
                    tit:'社会',
                    attr:"news_society"
                }, {
                    tit:'游戏',
                    attr:"news_game"
                }, {
                    tit:'故事',
                    attr:"news_story"
                }, {
                    tit:'美文',
                    attr:"news_essay"
                }
            ],
            title3:'点击添加以下频道'
        }
    }
    delMenus(str1,str2){
        let arr1=this.state.title1;
        let arr2=this.state.title2;
        if(arr1.length<=16){
            this.setState({
                title3:'点击添加以下频道'
            });
            this.refs.addM.className="";
        }
        arr1=this.arrReplace(arr1,str1);
        arr2.push({
            tit:str1,
            attr:str2
        });
        this.setState({
            title1:arr1,
            title2:arr2
        });

        Pubsub.publish("DELETE_MENU",str1);
    }
    addmenus(str1,str2){
        let arr1=this.state.title1;
        let arr2=this.state.title2;
        //最多16个频道，请先删除一些
        if(arr1.length>=16){
            this.setState({
                title3:'最多16个频道，请先删除一些'
            });
            this.refs.addM.className="mark";
        }else{
            arr2=this.arrReplace(arr2,str1);
            arr1.push({
                tit:str1,
                attr:str2
            });
            this.setState({
                title1:arr1,
                title2:arr2,
                title3:'点击添加以下频道'
            });
            this.refs.addM.className="";
        }


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
        var This=this;
        let deleteMenu=this.state.title1.map(function (Item,index) {
            return(
                <li data-tk={Item.attr} key={index} className="channelFigure" onClick={This.delMenus.bind(This,Item.tit,Item.attr)}><a href="javascript:;">{Item.tit}</a></li>
            )
        });
        let addMenu=this.state.title2.map(function (Item,index) {
            return(
                <li data-tk={Item.attr} key={index}  className="channelFigure" onClick={This.addmenus.bind(This,Item.tit,Item.attr)}><a href="javascript:;">{Item.tit}</a></li>
            )
        })
        return(
            <div>
                <div className="toolbar">
                    <span className="title"><a href="">频道管理</a></span><span className="backBtn"><Link to="/"></Link></span>
                </div>
                <div className="addControl controlBlock">
                    <span className="controlTitle">点击删除以下频道</span>
                    <ul className="controlDetail">
                        {deleteMenu}
                    </ul>
                </div>
                <div className="addControl controlBlock">
                    <span id="removeTitle" className="controlTitle"><span className="" ref="addM">{this.state.title3}</span></span>
                    <ul className="controlDetail">
                        {addMenu}
                    </ul>
                </div>
            </div>
    );
    }
}

export default Addmenu;