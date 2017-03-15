import React from 'react';
import { Row, Col } from 'antd';
import {Menu, Icon,Modal,Tabs,message,Button,Form,Input,CheckBox}  from 'antd';
import { Router, Route, Link, browserHistory } from 'react-router';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;          //谨记，别写成 FormItem.Item
class PCHeader extends React.Component{
	constructor(){
		super();
		this.state={
			current:'toutiao',
			modalVisible:false,
			action:'login',
			hasLogined:false,
			userNickName:"",
			userid:0
		};
	}
	componentWillMount(){
		if(localStorage.id !=""){
			this.setState({hasLogined:true});
			this.setState({userNickName:localStorage.userNickName,userid:localStorage.userid});
		}
	}
	setModalVisible(value){
		this.setState({modalVisible:value});
	};
	handleClick(e){
		if(e.key=="register"){
			this.setState({current:'register'});
			this.setModalVisible(true);
		}else{
			{this.setState({current:e.key});}              //注意这里为什么用两个{}
		}
	};

	handleSubmit(e)
	{
		//页面开始向 API 进行提交数据
		e.preventDefault();
		var myFetchOptions = {
			method: 'GET'
		};
		var formData= this.props.form.getFieldsValue();
		console.log(formData);
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action+"&username="+formData.userName+"&password="+formData.passWord+"&r_userName="+formData.r_userName+"&r_password="+formData.r_passWord+"&r_confirmPassword="+formData.r_confirmPassword,myFetchOptions).
		then(response=>response.json()).then(json=>{
		this.setState({userNickName:json.NickUserName,userid:json.UserId});
		localStorage.userid = json.UserId;
		localStorage.userNickName = json.NickUserName;
	  });
    if(this.state.action == 'login')
		{
			this.setState({hasLogined:true});
			message.success("登录成功！");
			this.setModalVisible(false);
		}else {
			message.success("请求成功！");
		}

	};     //学习 对比一下 fetch 和XHR 对比
	callback(key){
	 if(key==1){
		 this.setState({action:'login'});
	 }else if(key==2){
		 this.setState({action:'register'});
	 }
  };
	logout(){
     localStorage.userNickName = "";
		 localStorage.userid = "";
		 this.setState({hasLogined:false});
	}
  render(){
		const { getFieldDecorator } = this.props.form;
		const usershow = this.state.hasLogined
		?
		<Menu.Item key="logout" class='register'>
       <Button type='primary' htmlType='button' class="header_usernickname">{this.state.userNickName}</Button>
			 &nbsp;&nbsp;
			 <Link target="_blank" to={`/usercenter`} class="header_usercenter"><Button type="dashed" htmlType="button">个人中心</Button></Link>
			 &nbsp;
			 <Button type='ghost' htmlType='button' onClick={this.logout.bind(this)}>退出</Button>
		</Menu.Item>
    :
		<Menu.Item key="register" class='register'>
       <Icon type="user" />登录/注册
		</Menu.Item>;

    return (
            <header>
              <Row>
                 <Col span={2}></Col>
                 <Col span={4}>
                     <a href="/" class="logo">
                        <img src="./src/images/logo.png" alt="logo" />
                        <span>News</span>
                     </a>
                 </Col>
                 <Col span={18}>
                      <Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
                          <Menu.Item key="toutiao"><Icon type="eye-o" />头条</Menu.Item>
                          <Menu.Item key="shehui"><Icon type="eye-o" />社会</Menu.Item>
                          <Menu.Item key="guonei"><Icon type="eye-o" />国内</Menu.Item>
                          <Menu.Item key="guoji"><Icon type="eye-o" />国际</Menu.Item>
                          <Menu.Item key="yule"><Icon type="eye-o" />娱乐</Menu.Item>
                          <Menu.Item key="tiyu"><Icon type="eye-o" />体育</Menu.Item>
                          <Menu.Item key="keji"><Icon type="eye-o" />科技</Menu.Item>
                          <Menu.Item key="shishang"><Icon type="eye-o" />时尚</Menu.Item>
													{usershow}
                      </Menu>
											<Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel= {()=>this.setModalVisible(false)} onOk={() => this.setModalVisible(false)} okText="关闭">
                        <Tabs type='card' onChange={this.callback.bind(this)}>
													<TabPane tab='登录' key='1'>
														 <Form  onSubmit={this.handleSubmit.bind(this)}>
															<FormItem label="账户">
															  {getFieldDecorator('userName')(<Input  placeholder="请输入您的账号"/> )}
															</FormItem>
															<FormItem label="密码">
															  {getFieldDecorator('passWord')(<Input type="password" placeholder="请输入您的密码"/> )}
															</FormItem>
															<Button type="primary" htmlType="submit" >登录</Button>
														 </Form>
												  </TabPane>
													<TabPane tab='注册' key='2'>
														<Form  onSubmit={this.handleSubmit.bind(this)}>
															<FormItem label="账户">
															  {getFieldDecorator('r_userName')(<Input  placeholder="请输入您的账号"/> )}
															</FormItem>
															<FormItem label="密码">
															  {getFieldDecorator('r_passWord')(<Input type="password" placeholder="请输入您的密码"/> )}
															</FormItem>
															<FormItem label="确认密码">
															  {getFieldDecorator('r_confirmPassword')(<Input type="password" placeholder="请确认您的密码"/> )}
															</FormItem>
															<Button type="primary" htmlType="submit" >注册</Button>
														 </Form>
													 </TabPane>
													</Tabs>
											</Modal>
                 </Col>
                 {/*  <Col span={1}></Col>*/}
              </Row>
            </header>
    );
  };
}
export default PCHeader = Form.create({})(PCHeader);
// export default PCHeader= Form.create()(PCHeader);
// const WrappedPCHeader = Form.create()(PCHeader);
// ReactDOM.render(<WrappedPCHeader />,mountNode);
