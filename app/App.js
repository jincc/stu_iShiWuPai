
import React ,{Component} from 'react'
import {Animated, StyleSheet, View, Text, AppRegistry} from 'react-native'
import NetInfoDecorator from  './common/NetInfoDecorator'
import  store from './store/store'
import  {Provider} from  'mobx-react'
import AppPage from  './AppPage'
import { StackNavigator } from 'react-navigation'

/*

 */


@NetInfoDecorator class  Root extends  Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            netStateAni:new Animated.Value(0)
        };
    }
    //这里每次丢失网络，会弹出提示信息
    componentWillReceiveProps(next) {
      if (!next.isConnected){
          //弹出动画
          Animated.timing(this.state.netStateAni,{
              toValue:1,
              duration:300
          }).start(()=>{
              setTimeout(()=>{
                  Animated.timing(this.state.netStateAni,{
                      toValue:0,
                      duration:300
                  }).start()
              },3000)
          })

      }
    }

    render(){


        const  top = this.state.netStateAni.interpolate({
            inputRange:[0,1],
            outputRange:[-30,__IOS__ ? 20:0]
        })

        return (
            <View style={styles.root}>
                <Provider {...store}>
                    <AppPage/>
                </Provider>
                <Animated.View style={[styles.netState,{top:top}]}>
                    <Text style={styles.netInfoPrompt}>网络异常，请检查网络稍后重试~</Text>
                </Animated.View>
            </View>
        )
    }

}

const  styles = StyleSheet.create({
    root:{
        flex:1,
    },
    netState:{
        height:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: gColors.theme
        ,position: 'absolute',
        left:0,
        right:0
    },
    netInfoPrompt: {
        color: 'white',
        fontWeight: 'bold',
    }
})

module.exports = Root

AppRegistry.registerComponent('stu_iShiWuPai', () => Root);
