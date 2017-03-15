import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory} from 'react-router';
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';
import PCIndex from './components/pc_index';
import MobileIndex from './components/mobile_index';
import PCNewsDetails from './components/pc_news_details';
import PCUsercenter from './components/pc_usercenter';
export default class Root extends React.Component{
  render(){
    return (
            <div>
               <MediaQuery query='(min-device-width:1224px)'>
                  <Router history={hashHistory}>
                     <Route path="/" component={PCIndex}></Route>
                     <Route path="/details/:uniquekey" component={PCNewsDetails}></Route>
                     <Route path="/usercenter" component={PCUsercenter}></Route>
                  </Router>
               </MediaQuery>
               <MediaQuery query='(max-device-width:1224px)'>
                  <MobileIndex/>
               </MediaQuery>
            </div>
    );
  };
}

ReactDOM.render(<Root/>, document.getElementById('mainContainer'));
