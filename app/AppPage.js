import  React,{Component,PureComponent} from 'react'
import {View, StatusBar} from  'react-native'
import  {Navigator} from  'react-native-deprecated-custom-components'
import {inject,observer} from 'mobx-react'
import Router from './common/Routers'
import {StackNavigator} from 'react-navigation'

@inject('app')
@observer
class AppPage extends  PureComponent {

    _configureScene(route){
        if (route.sceneConfig)
        {  return  route.sceneConfig
        }

        return {
            ...Navigator.SceneConfigs.PushFromRight,
            gestures:{}
        }
    }
    _renderScene(route,navigator) {
        let Component = Router[route.id].default
        // console.log(`navigator${navigator}   cmpent:${Component}`)
        return <Component navigator={navigator} {...route.passProps}/>
    }
    render(){
        return (
            <View style={{flex:1}}>
                <StatusBar barStyle={this.props.app.barStyle} animated={true}/>
                <Navigator
                    initialRoute={{id:'TabBarView'}}
                    configureScene={this._configureScene.bind(this)}
                    renderScene={this._renderScene.bind(this)}>
                </Navigator>
            </View>
        )
    }

}

module.exports = AppPage
