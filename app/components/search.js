import React from 'react';
import './search.less';
import Pubsub from 'pubsub-js';
import {Link} from 'react-router';
class Search extends React.Component{
    constructor(...args){
        super(...args);
        this.state={
            keywords:"美女",
            display:"none",
            totalData:[],
            defaultvalue:"请输入搜索关键词"
        }
    }
    search(ev){
        if(ev.keyCode==13){
            console.log(this.refs.keywords.value)
            this.ajax(this.refs.keywords.value);
        }
    }
    chooseAction(){
        this.setState({
            display:"block"
        })
    }
    closeMask(){
        this.setState({
            display:"none"
        })
    }
    toutiao(str){
        switch (str){
            case  'toutiao' :
                this.refs.ico.className="action_chooser action_toutiao"
                break;
            case  'shenma' :
                this.refs.ico.className="action_chooser action_shenma"
                break;
            case  'baidu' :
                this.refs.ico.className="action_chooser action_baidu"
                break;
            default :
                return
            break;
        }
        this.setState({
            display:"none"
        })
    }
    ajax(str){
        var This=this;
        var nTime=(new Date().getTime()-3600000)/1000;
        console.log(str);
        $.ajax({
            type:"get",
            url: "http://www.toutiao.com/search_content/?offset=20&format=json&keyword="+str+"&autoload=true&count=20&cur_tab=1",
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
    render(){
        let listEle=this.state.totalData.map(function(Item,i){
            if(Item.cell_type==20){
               return false;
            }
            if(Item.image_list.length>0){//上下图文结构
                return(
                    <section className="sxImgs" key={i}>
                        <a href={Item.article_url}>
                            <strong>{Item.title}</strong>
                            <span><img src={Item.image_list[0].url} /><img src={Item.image_list[1].url} /><img src={Item.image_list[2].url} /></span>
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
                <div className="top_bar">
                    <div className="abs_l"><a className="btn back" href="/"></a></div>
                    <div className="abs_m">搜索</div>
                </div>
                <div className="search">
                    <a href="JavaScriptpt:;" className="action_chooser action_toutiao" ref="ico" onClick={this.chooseAction.bind(this)}></a>
                    <input className="text" type="text" onKeyDown={this.search.bind(this)} ref="keywords" />
                </div>
                <div className="mask" style={{display:this.state.display}} onClick={this.closeMask.bind(this)}></div>
                <div className="action-navigation active" style={{display:this.state.display}}>
                    <div className="arrowup-shadow"> </div>
                    <div className="arrowup"> </div>
                    <ul className="navigation-categories">
                        <li><a className="toutiao" href="JavaScriptpt:;" onClick={this.toutiao.bind(this,'toutiao')}>新闻</a></li>
                        <li><a className="shenma" href="JavaScriptpt:;" onClick={this.toutiao.bind(this,'shenma')}>神马</a></li>
                        <li><a className="baidu" href="JavaScriptpt:;" onClick={this.toutiao.bind(this,'baidu')}>百度</a></li>
                    </ul>
                </div>
                <div className="searchList">
                    {listEle}
                </div>
            </div>
        );
    }
}

export default Search;