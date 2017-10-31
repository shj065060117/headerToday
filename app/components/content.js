import React from 'react';
import Search from './search';//引用中间组件
import Nav from './nav';//引用头部菜单组件
import './content.less';
import Pubsub from 'pubsub-js';
import {Link} from 'react-router';

class Content extends React.Component{
    constructor(...args){
        super(...args);
        this.state={
            attr:"__all__",
            nTime:(new Date().getTime()-3600000)/1000,
            num:0,
            indexList:[],//当前渲染的页面数据
            totalData:[],
            current: 1, //当前页码
            pageSize:8, //每页显示的条数
            goValue:0,  //要去的条数index
            totalPage:0//总页数
        }
    }
    componentDidMount(){
        this.ajax("__all__")
        Pubsub.subscribe('REFRESH',(msg)=>{
            this.refresh();
         })
    }
    componentWillUnmound(){
        Pubsub.unsubscribe('REFRESH');
    }
    refresh(){
        this.ajax(this.state.attr)
    }
    ajax(str){
        var This=this;
        var nTime=(new Date().getTime()-3600000)/1000;
        console.log(str);
        $.ajax({
            type:"get",
            url: "https://m.toutiao.com/list/?tag="+str+"&ac=wap&count=20&format=json_raw&as=A155A93F30E3B10&cp=59F0839BD1F09E1&max_behot_time="+parseInt(nTime),
            dataType:"jsonp",
            success:function(data){
                var nData=data.data;
                console.log(nData);
                This.setState({
                    totalData: nData
                });

            }
        })
    }
    getAttr(attr){
        this.setState({
            attr:attr
        })
        this.ajax(attr);
    }
    render(){
        let listEle=this.state.totalData.map(function(Item,i){
                let imgList=Item.image_list;//获取是否有多张小图

                if(imgList.length){//上下图文结构
                    return(
                        <section className="sxImgs" key={i}>
                            <a href={Item.article_url}>
                                <strong>{Item.title}</strong>
                                <span><img src={imgList[0].url} /><img src={imgList[1].url} /><img src={imgList[2].url} /></span>
                                <em>{Item.source}&nbsp;评论{Item.comment_count}</em>
                            </a>
                        </section>
                    )
                }else{//左右图文结构
                    if(Item.image_url){
                        return(
                            <section className="zyImgs"  key={i}>
                                <a href={Item.article_url}>
                                    <strong>
                                        {Item.title}
                                        <em>{Item.source}&nbsp;评论{Item.comment_count}</em>
                                    </strong>
                                    <span><img src={Item.image_url} /></span>
                                </a>
                            </section>
                        )
                    }else{
                        if(Item.label=="广告"){
                            return(
                                <section className="sxImgs"  key={i}>
                                    <a href={Item.article_url}>
                                        <strong>
                                            {Item.title}
                                            <em>{Item.source}&nbsp;评论{Item.comment_count}</em>
                                        </strong>
                                        <i><img src={Item.url} /></i>
                                    </a>
                                </section>
                            )
                        }else{
                            if(Item.media_info.avatar_url==undefined){
                                <section className="zyImgs"  key={i}>
                                    <a href={Item.article_url}>
                                        <strong>
                                            {Item.title}
                                            <em>{Item.source}&nbsp;评论{Item.comment_count}</em>
                                        </strong>
                                        <span><img src={Item.media_info.large_image_url} /></span>
                                    </a>
                                </section>
                            }
                            return(
                                <section className="zyImgs"  key={i}>
                                    <a href={Item.article_url}>
                                        <strong>
                                            {Item.title}
                                            <em>{Item.source}&nbsp;评论{Item.comment_count}</em>
                                        </strong>
                                        <span><img src={Item.media_info.avatar_url} /></span>
                                    </a>
                                </section>
                            )
                        }

                    }
                }
        });
        return(
            <div>
                <Nav  onGetAttr={this.getAttr.bind(this)}></Nav>
                <div className="list">
                        {listEle}
                </div>
            </div>
        )
    }
}


export default Content;