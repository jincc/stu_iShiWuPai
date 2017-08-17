'use strict';

import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight
} from 'react-native';

import { observer ,Observer} from 'mobx-react/native';
import { observable,useStrict, action  } from 'mobx';

class Storer {
    @observable counter = 0
    @observable view = null
    @action plus(){
        this.counter ++;
    }
    @action minus(){
        this.counter --;
    }

    @action sing(){
        this.view = 'sing a song '
    }
}
// 被观察者, 观察 counter 变量

const   storer = new Storer()

@observer //使用@方式来前置声明
class Counter extends Component {

    render () {
        return (
            <View style={styles.container}>

                {/*加一*/}
                <TouchableHighlight
                    onPress = {() => {this.props.store.plus()}}>
                    <Text>Add</Text>
                </TouchableHighlight>

                {/* 显示处理结果 */}
                <Text style={styles.resultTxtStyle}>
                    {this.props.store.counter}
                </Text>

                {/*减一*/}
                <TouchableHighlight
                    onPress = {() => {
                        storer.minus()
                        storer.sing()
                    }}>
                    <Text>Minus</Text>
                </TouchableHighlight>

                <Observer>
                    {()=>{
                       return <Text>{this.props.store.view}</Text>
                    }}
                </Observer>

            </View>
        );
    }
}

export default class ReactionsComponent extends Component {
    render () {
        return (
            <View style = {{flex: 1, marginTop: 64}}>

                <Counter store = {storer} />

            </View>
        );
    }
}

/* 样式定义 */
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    resultTxtStyle: {
        fontSize: 22,
        color: 'red'
    }
});

module.exports = ReactionsComponent