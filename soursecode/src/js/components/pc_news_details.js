import React from 'react';
import{Row,Col} from 'antd';
import{BackTop} from 'antd';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsImageBlock from './pc_news_image_block';
import CommonComments from './common_comments';
export default class PCNewsDetails extends React.Component{
  constructor(){
    super();
     this.state={
       newsItem : ''
     } ;
  };
  componentDidMount(){
    var myFetchOptions={
      method:'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.params.uniquekey, myFetchOptions).
    then(response => response.json()).then(json =>{
      this.setState({newsItem:json});
      document.title = this.state.newsItem.title + "---Y! News | 新闻平台" ;
    })
  };

  createMarkup(){
    return {__html: this.state.newsItem.pagecontent};
  };

  render(){

    return(
      <div>
        <PCHeader/>
        <Row class="pc_news_details_container">
          <Col span={2}></Col>
          <Col span={14} class="container">
              <div class="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
              <CommonComments uniquekey={this.props.params.uniquekey} />
          </Col>
          <Col span={1}></Col>
          <Col span={6}>
              <PCNewsImageBlock count={30} type="guonei" width="100%" cardTitle="相关新闻" imageWidth="120px" />
          </Col>
          <Col span={1}></Col>
        </Row>
        <BackTop></BackTop>
        <PCFooter/>
      </div>
    );
  };
}
