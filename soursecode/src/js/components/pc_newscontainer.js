import React from 'react';
import {Row,Col} from 'antd';
import {Carousel} from 'antd';
import {Tabs} from 'antd' ;
import PCNewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_image_block';
const TabPane = Tabs.TabPane;
export default class PCNewsContainer extends React.Component{
  render(){
    const settings = {
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      autoplay:true
    };
    return(
         <div>
             <Row>
                <Col span={2}></Col>
                <Col span={20} class="container" >
                     <div class='leftContainer'>
                         <div class='carousel'>
                            <Carousel {...settings} >
                                 <div><img src="./src/images/carousel_1.jpg" /></div>
                                 <div><img src="./src/images/carousel_2.jpg" /></div>
                                 <div><img src="./src/images/carousel_3.jpg" /></div>
                                 <div><img src="./src/images/carousel_4.jpg" /></div>
                            </Carousel>
                         </div>
                         <PCNewsImageBlock count={6} type="guoji" cardTitle='国际头条' width="400px" imageWidth="106px" />
                     </div>
                     <Tabs class="tabs_news">
                         <TabPane key="1" tab="头条新闻">
                             <PCNewsBlock count={22} type="top" width="100%" bordered="false"  />
                         </TabPane>
                         <TabPane key="2" tab="国际新闻">
                             <PCNewsBlock count={22} type="guoji" width="100%" bordered="false"  />
                         </TabPane>
                     </Tabs>
                     <PCNewsImageBlock count={18} type="guonei" cardTitle='国内头条' width="100%" imageWidth="106px" />
                     <PCNewsImageBlock count={18} type="yule" cardTitle='娱乐头条' width="100%" imageWidth="106px" />
                     <PCNewsImageBlock count={18} type="shehui" cardTitle='社会头条' width="100%" imageWidth="106px" />
                </Col>
                <Col span={2}></Col>
             </Row>
         </div>
    );
  };
}
