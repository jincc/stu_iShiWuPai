import  React,{Component,PropTypes} from  'react'
import  {View, Text,TouchableOpacity, Image,StyleSheet,Animated} from  'react-native'

class  CategoryBar extends  Component {
    static  propTypes = {
        //这参数是scrollTableView自带传的
        goToPage:PropTypes.func,
        activeTab:PropTypes.number,
        tabs : PropTypes.array,
    }

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            redPointLeftAni: new Animated.Value((gScreen.width / 8))
        };
      }

    pop(){
        const { activeTab } = this.props
        const tabPerWidth =  (gScreen.width / 4)
        const redLeft = activeTab *  tabPerWidth + tabPerWidth/2


        Animated.timing(this.state.redPointLeftAni,{
            toValue:redLeft,
            duration:200
        }).start(()=>{
        })
    }

    render(){
        const { activeTab,tabs , goToPage } = this.props
        const tabPerWidth =  (gScreen.width / 4)
        const redLeft = activeTab *  tabPerWidth + tabPerWidth/2
        const  views = tabs.map((item,ii)=>{
            const isSelect = activeTab === ii
            let color = isSelect ? 'red' : 'gray'
            return (
                <TouchableOpacity
                    key={ii}
                    activeOpacity={0.8}
                    style={styles.tab}
                    onPress={()=>goToPage(ii)}>
                    <View style={styles.tabItem}>
                        <Text style={{color: color, fontSize: 14}}>{tabs[ii]}</Text>
                    </View>
                </TouchableOpacity>
            )
        })
        return (
            <View style={styles.container}>
                {views}
                <Animated.View style={[styles.redPoint,{left:this.state.redPointLeftAni}]}/>
            </View>
        )

    }
}

const  styles = StyleSheet.create({
    container:{
        height:40,
        borderBottomWidth:gScreen.onePix,
        borderColor:'#d9d9d9',
        flexDirection:'row'
    },
    tab:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    tabItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    redPoint:{
        width:4,
        height:4,
        borderRadius:2,
        backgroundColor:'red',
        position: 'absolute',
        bottom:4
    }

})


export  default  CategoryBar