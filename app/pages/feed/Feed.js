import  React,{Component} from  'react'
import  {View, Image, Text,StyleSheet,TouchableOpacity} from  'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import CategoryBar from '../../components/CategoryBar'
import FeedHomeList from './FeedHomeList';
import FeedEvaluatingList from '../../pages/feed/FeedEvaluatingList'
import FeedKnowledgeList from '../../pages/feed/FeedKnowledgeList';
import FeedDelicacyList from '../../pages/feed/FeedDelicacyList';
import Header from '../../components/Header'

const  Pages = [
    {title:'首页',component:FeedHomeList},
    {title:'评测',component:FeedEvaluatingList},
    {title:'知识',component:FeedKnowledgeList},
    {title:'美食',component:FeedDelicacyList}
]
class  Feed extends  Component {

    //顶部选择栏
    _segment:any

    _renderRightItem(){
        return (
            <Image source={require('../../resource/ic_feed_camera.png')}
                   style={{width:20,height:20}}></Image>
        )
    }
    _renderTabBar(){
        return (<CategoryBar ref={(bar)=>this._segment=bar}/>)
    }
    _onChangeTab(tab){
        this._segment.pop()
    }

    render(){
        return (
            <View style={{flex:1}}>
                <Header title={'逛吃'}
                        showGoBack={false}
                        renderRightItem={this._renderRightItem.bind(this)}/>
                <ScrollableTabView tabBarPosition='top'
                                   renderTabBar={this._renderTabBar.bind(this)}
                                   onChangeTab={this._onChangeTab.bind(this)}
                                  >
                    {Pages.map((page,i)=> {
                        return <page.component key={i}
                                               tabLabel={page.title}/>
                    })}
                </ScrollableTabView>
            </View>
        )
    }
}

export  default  Feed