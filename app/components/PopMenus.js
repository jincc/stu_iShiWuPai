import React, { Component ,PropTypes} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    Animated
} from 'react-native'

class PopMenus extends  Component {
    static  propTypes = {
        categories:PropTypes.array.isRequired,
        selectCatefory:PropTypes.func.isRequired
    }
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            topAni:new Animated.Value(0),
            isShow : false
        };
    }
    _close(){
        this.hidden()
    }
    _click(category){
        this.props.selectCatefory(category)
        this.hidden()
    }
    //public
    show(){
      this.setState({isShow:true},()=>{
          Animated.spring(this.state.topAni,{
              toValue:1,
              duration:200
          } ).start()
      })
    }

    hidden (){
        Animated.spring(this.state.topAni,{
            toValue:0,
            duration:200
        }).start(()=>{
            this.setState({isShow:false})
        })
    }
    render(){
        if (!this.state.isShow) return null

        const cells = this.props.categories.map((item,ii)=>{
            const  isLast = ii === this.props.categories.length - 1
            return (
                <TouchableOpacity key={ii}
                                  style={[styles.subcategoryItem,{ borderBottomWidth:isLast ? 0 :gScreen.onePix}]}
                                  onPress={()=>{this._click(item)}}>
                    <Text style={{color:'white'}}>{item.name}</Text>
                </TouchableOpacity>
            )
        })

        console.log(this.props.categories[0])

        const  topAni = this.state.topAni.interpolate({
            inputRange:[0,1],
            outputRange:[-34*this.props.categories.length-5 ,5]
        })

        return (
            <View style={{zIndex:2,position: 'absolute',top:gScreen.navBarHeight,left:0}}>
                <TouchableOpacity activeOpacity={1}
                                  style={styles.subcategoryWrapper}
                                  onPress={this._close.bind(this)}>
                    <Animated.View style={[styles.subcategoryAnimatedWrapper,{top:topAni}]}>
                        {cells}
                    </Animated.View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    subcategoryWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        width: gScreen.width,
        height: gScreen.height - gScreen.navBarHeight,
        justifyContent: 'flex-end',
        zIndex: 1
    },
    subcategoryAnimatedWrapper: {
        backgroundColor: 'rgba(83, 83, 83, 0.85)',
        position: 'absolute',
        right: 10,
        borderRadius: 4,
        top:5
    },
    subcategoryItem: {
        height: 34,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'rgba(255,255,255,0.6)',
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingHorizontal: 20,
    },
})

export  default  PopMenus