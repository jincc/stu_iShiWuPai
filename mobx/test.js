import  React,{Component} from  'react'
import  {Button, View} from  'react-native'
import React from 'react';
import { observable, useStrict, action } from 'mobx';
import { observer } from 'mobx-react';
useStrict(true);

class State{
    @observable num = 0
    @action addNum(){
        this.num++
    }
}

autorun(()=>{
    let num = newState.num.get()
    console.log(num)
})

const  newState = new State()
@observer class  Mobx extends  Component {
    // 构造
    constructor(props) {
        super(props);
        // // 初始状态
        // this.state = {
        //     num:new State()
        // };
    }
    render(){
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Button title='+1' onPress={()=>{
                    newState.addNum()
                }}></Button>
            </View>)
    }
}


module.exports = Mobx