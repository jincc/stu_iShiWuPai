
import React, { Component ,PropTypes} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native'

class TabBar extends  Component {
    static  propTypes = {
        //这参数是scrollTableView自带传的
        goToPage:PropTypes.func,
        activeTab:PropTypes.number,
        tabs : PropTypes.array,

        //must pass on
        tabNames:PropTypes.array,
        tabIconNames:PropTypes.array,
        selectedTabIconNames:PropTypes.array
    }

    render(){
        const { activeTab, selectedTabIconNames, tabIconNames, tabNames, goToPage } = this.props
        const  views = this.props.tabs.map((item,ii)=>{
            const isSelect = activeTab === ii
            let color = isSelect ? 'red' : 'gray'
            let icon = isSelect ? selectedTabIconNames[ii] :  tabIconNames[ii]
            return (
              <TouchableOpacity
                  key={ii}
                  activeOpacity={0.8}
                  style={styles.tab}
                  onPress={()=>goToPage(ii)}>
                  <View style={styles.tabItem}>
                      <Image style={styles.icon} source={icon}/>
                      <Text style={{color: color, fontSize: 12}}>{tabNames[ii]}</Text>
                  </View>
              </TouchableOpacity>
          )
        })
        return (
            <View style={styles.container}>
                {views}
            </View>
        )

    }

}

const  styles = StyleSheet.create({
    container:{
        height:49,
        borderTopWidth:gScreen.onePix,
        borderTopColor:'#d9d9d9',
        flexDirection:'row'
    },
    tab:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    icon: {
        width: 26,
        height: 26,
        marginBottom: 2
    },
    tabItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
    },



})

export default  TabBar