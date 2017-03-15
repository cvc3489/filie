import React from 'react';
import { Row, Col } from 'antd';
import {Menu, Icon,Modal,Tabs,message,Button,Form,Input,CheckBox,notification}  from 'antd';
import { Router, Route, Link, browserHistory } from 'react-router';
import {Card} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
class CommonComments extends React.Component{
  constructor(){
    super();
    this.state={
      comments:''
    };
  };
  componentDidMount(){
    var myFetchOptions={
      method:'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOptions).
		then(response => response.json()).then(json => {
			this.setState({comments: json});
		});
  };
  handleSubmit(e){
     e.preventDefault();
     var myFetchOptions={
       method:'GET'
     };
     var formData= this.props.form.getFieldsValue();
     fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey +"&commnet=" + formData.remark, myFetchOptions).
     then(response => response.json()).then(json =>{
       this.componentDidMount();
     })
     notification['success']({
          description: '新闻评论成功',
          icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
     });
  };
  addUserCollection(){
    var myFetchOptions = {
      method:'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid="+localStorage.userid+"&uniquekey="+this.props.uniquekey,myFetchOptions).
    then(response => response.json()).
    then(json =>{
      //收藏成功后进行全局提醒
      notification['success']({
           description: '新闻收藏成功',
           icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
      });
    });
  };

  render(){
    const { getFieldDecorator } = this.props.form;
    const {comments } =this.state;
    const commentList =comments.length
    ?
    comments.map((comment,index) => (
      <Card key={index} title={comment.UserName} extra={<a href="#">发布于{comment.datetime}</a>}>
         <p>{comment.Comments}</p>
      </Card>
    ))
    :"没有加载到任何评论";
    return(
        <div class="comment">
           <Row>
              <Col span={24}>
                 <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="您的看法">
                          {getFieldDecorator('remark')(<Input  placeholder="文明留言..." type="textarea"  /> )}
                    </FormItem>
                    <Button type="primary" htmlType="submit">提交评论</Button>
                    <Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏新闻</Button>
                    <br/><br/>
                    <hr/>
                    <br/>
                    {commentList}
                 </Form>
              </Col>
           </Row>
        </div>

    );
  };
}
 export default CommonComments = Form.create({})(CommonComments);
