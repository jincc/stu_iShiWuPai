import  React,{Component,PureComponent} from  'react'
import  {View, Text} from  'react-native'
import  {inject,observer} from 'mobx-react'
import  ScrollableTabView from  'react-native-scrollable-tab-view'
import  TabBar from '../components/TabBar'
import  FoodEncyclopedia from '../pages/home/FoodEncyclopedia'
import  Feed from '../pages/feed/Feed'
import  Profile from  '../pages/profile/Profile'
const Maps = {
    tabTitles: ['食物百科', '逛吃', '我的'],
    tabIcons:[
        require('../resource/ic_tab_search.png'),
        require('../resource/ic_tab_homepage.png'),
        require('../resource/ic_tab_my.png')
    ],
    tabSelectedIcon: [
        require('../resource/ic_tab_search_select.png'),
        require('../resource/ic_tab_homepage_select.png'),
        require('../resource/ic_tab_my_select.png')
    ]
}

@inject('app')
@observer
class  TabBarView extends  PureComponent {
    _onChangeTab(i){
        const  app = this.props.app
        if (i === 1) {
            app.updateBarStyle('default')
        }else{
            app.updateBarStyle('light-content')
        }
    }
    _renderTabbar(){
        let y = require('../resource/ic_tab_search_select.png')
        console.log(y)
        return (
            <TabBar
                tabNames={Maps.tabTitles}
                tabIconNames={Maps.tabIcons}
                selectedTabIconNames={Maps.tabSelectedIcon}>
            </TabBar>
        )
    }
    render(){
        // return (<View/>)
        return (
            <ScrollableTabView locked={true}
                               scrollWithoutAnimation={true}
                               tabBarPosition='bottom'
                               onChangeTab={this._onChangeTab.bind(this)}
                               renderTabBar={this._renderTabbar.bind(this)}

            >
                <FoodEncyclopedia tabLabel="Food" navigator={this.props.navigator}/>
                <Feed tabLabel="home" navigator={this.props.navigator}/>
                <Profile tabLabel="Profile" navigator={this.props.navigator}/>
            </ScrollableTabView>
        )
    }
}

export  default  TabBarView