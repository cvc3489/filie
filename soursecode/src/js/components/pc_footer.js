import React from 'react';
import { Row, Col } from 'antd';

export default class PCFooter extends React.Component{

  render(){
    return (
            <footer id="PCFooter">
              <Row>
                 <Col span={2}></Col>
                 <Col span={20} class="footer">
                     &copy;&nbsp;2017 News. All Rights Reserved.
                 </Col>
                 <Col span={2}></Col>
              </Row>
            </footer>
    );
  };
}
