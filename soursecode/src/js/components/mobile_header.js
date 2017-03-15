import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import {
	Menu,
	Icon,
	Tabs,
	message,
	Form,
	Input,
	Button,
	CheckBox,
	Modal
} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
class MobileHeader extends React.Component{
	constructor() {
		super();
		this.state = {
			modalVisible: false,
			action: 'login',
			hasLogined: false,
			userNickName: '',
			userid: 0
		};
	};
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
		then(response=>response.json()).then(json=>{this.setState({userNickName:json.NickUserName,userid:json.UserId});
		localStorage.userid = json.UserId;
		localStorage.userNickName = json.NickUserName;
	  });
		if(this.state.action == 'login')
		{
			this.setState({hasLogined:true});
			message.success("登录成功！");
		}else {
			message.success("请求成功！");
		}
		this.setModalVisible(false);
	};     //学习 对比一下 fetch 和XHR 对比
	login(){
      this.setModalVisible(true);
	};
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
		  <span>
       <Icon type='logout' onClick={this.logout.bind(this)} />&nbsp;&nbsp;
			 <Icon type='inbox'/>
			 </span>
		:
		<Icon type='setting' onClick={this.login.bind(this)} />
		return(
			<div id="mobileheader">
			    <header>
              <img src="./src/images/logo.png" alt="logo" />
              <span>News</span>
							{usershow}
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
			    </header>
			</div>
		);
	};
}
export default MobileHeader = Form.create({})(MobileHeader);
