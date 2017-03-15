import React from 'react';
import { Row, Col } from 'antd';
import {Menu, Icon,Modal,Tabs,message,Button,Form,Input,CheckBox,notification,Upload}  from 'antd';
import { Router, Route, Link, browserHistory } from 'react-router';
import {Card} from 'antd';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
export default class PCUsercenter extends React.Component{
  constructor(){
    super();
    this.state = {
      previewImage:'',
      previewVisible:false,
      usercollection : '',
      usercomments : ''
    };
  };
  handleCancel() {
    this.setState({
      previewVisible: false,
   });
 };
  componentDidMount(){
    var myFetchOptions ={
      method : 'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid="+localStorage.userid,myFetchOptions).
    then(response => response.json()).
    then(json => {
      this.setState({usercollection:json})
    });

    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid="+localStorage.userid,myFetchOptions).
    then(response => response.json()).
    then(json => {
      this.setState({usercomments:json})
    });
  };

  render(){

    const props = {
    	action: 'http://newsapi.gugujiankong.com/handler.ashx',
    	headers: {
    		"Access-Control-Allow-Origin":"*"
    	},
    	listType: 'picture-card',
    	defaultFileList:[
    		{
    			uid:-1,
    			name:'xxx.png',
    			state: 'done',
    			url:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
    			thumbUrl:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
    		}
    	],
    	onPreview: (file)=>{
    		this.setState({previewImage:file.url,previewVisible:true});
    	}
    };

    const {usercollection ,usercomments} =this.state;
    const usercollectionList = usercollection.length
    ?
     usercollection.map((uc,index) =>(
       <Card key={index} title={uc.datetime}>
          <Link to={`details/${uc.uniquekey}`} target="_blank">
             <p>{uc.Title}</p>
          </Link>
       </Card>
     ))
    :"您未收藏任何新闻" ;

    const usercommentsList = usercomments.length
    ?
     usercomments.map((comment,index) =>(
       <Card key={index} title={`于 ${comment.datetime} 评论 `}>
          <Link to={`details/${comment.uniquekey}`} target="_blank">
             <p>{comment.Comments}</p>
          </Link>
       </Card>
     ))
    :"您未作任何评论" ;

    return(

         <div>
            <PCHeader/>
            <Row class="usercenterContainer">
               <Col span={2}></Col>
               <Col span={20}>
                 <Tabs>
                    <TabPane tab="收藏列表" key="1">
                        <div class="comment">
        									<Row>
        										<Col span={15}>
        											{usercollectionList}
        										</Col>
        									</Row>
        								</div>
                    </TabPane>
                    <TabPane tab="评论列表" key="2">
                       <div class="comment">
                          <Row>
                            <Col span={15}>
                              {usercommentsList}
                            </Col>
                         </Row>
                      </div>
                    </TabPane>
                    <TabPane tab="头像设置" key="3">
                        <div class="clearfix">
                            <Upload {...props}>
                               <Icon type="plus"/>
                               <div className="ant-upload-text">上传照片</div>
                            </Upload>
                            <Modal visible ={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
          										<img alt="预览" src={this.state.previewImage}/>
          									</Modal>
                        </div>
                    </TabPane>
                 </Tabs>
               </Col>
               <Col span={2}></Col>
            </Row>
            <PCFooter/>
         </div>
    );
  };
}
