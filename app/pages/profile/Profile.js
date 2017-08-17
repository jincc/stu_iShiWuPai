import  React,{Component} from  'react'
import  {View,Alert, Text,StyleSheet, Image,TouchableOpacity} from  'react-native'

const ListMaps = [
    {
        title:'我的照片',
        image:require('../../resource/ic_my_photos.png')
    },{
        title:'我的收藏',
        image:require('../../resource/ic_my_collect.png')
    },{
        title:'上传食物数据',
        image:require('../../resource/ic_my_upload.png')
    }
]


class  Profile extends  Component {
    _onLogin(){

        Alert.alert('title','CLICK ON LOGIN')
    }
    _onSetting(){
        Alert.alert('title','CLICK ON SETTING')

    }
    render(){
        return (
            <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
                <HeaderView loginAction={this._onLogin.bind(this)}
                             settingAction={this._onSetting.bind(this)}/>
                <View style={styles.listContainer}>
                    {
                            ListMaps.map((item,ii)=>{
                            const  text = item.title
                            const  image = item.image
                            const isLast = ii === ListMaps.length -1
                            console.log(isLast)
                            return (<ProfileCell key={ii} text={text}
                                             icon={image}
                                              hasLine = {!isLast}   ></ProfileCell>)
                    })}
                </View>
            </View>
        )
    }
}

const HeaderView = ({loginAction,settingAction})=>{
    return (

        <Image style={styles.headerBGimage}
               source={require('../../resource/img_my_head.png')}>
            <View style={styles.headerUpViews}>
                <Text style={styles.headerNameText}>我的</Text>
                <TouchableOpacity style={styles.headerSeetingIcon}
                                  onPress={settingAction}>
                    <Image style={{width:20,height:20}}  source={require('../../resource/ic_my_setting.png')}>
                    </Image>
                </TouchableOpacity>
            </View>
            <View style={styles.headerBottomContainer}>
                <View style={styles.headerAvarBG}>
                    <Image style={styles.headerAvar}
                           source={require('../../resource/img_default_avatar.png')}>
                    </Image>
                </View>
            </View>
            {/*登录按钮*/}
            <TouchableOpacity style={styles.loginContainer}
                              onPress={loginAction}>
                <Text style={styles.loginText}>点击登录</Text>
            </TouchableOpacity>

        </Image>
    )
}

const ProfileCell = ({text,icon,hasLine}) => {
    return (
        <View>
            <TouchableOpacity>
                 <View style={styles.cellContainer}>
                    <Image style={styles.cellIcon} source={icon}></Image>
                     <Text style={styles.cellText}>{text}</Text>
                 </View>
             </TouchableOpacity>
            {hasLine && <View style={styles.cellLine}></View>}
        </View>
        )
}

const styles = StyleSheet.create({

    headerBGimage:{
        marginTop:0,
        height:230,
        width:gScreen.width,
        backgroundColor:'transparent',
        alignItems:'center'
    },
    headerUpViews:{
        flexDirection:'row',
        marginTop:__IOS__ ? 20 : 0,
        width:gScreen.width,
        height:__IOS__ ? 44 : 50,
        justifyContent:'center',
        alignItems:'center',
    },
    headerNameText:{
        fontSize:16,
        fontWeight:'600',
        color:'white'
    },
    headerSeetingIcon:{
        height: __IOS__ ? 44 : 50,
        width: __IOS__ ? 44 : 50,
        justifyContent: 'center',
        alignItems:"center",
        position:'absolute',
        right:0
    }
    ,headerBottomContainer:{
        justifyContent:'center',
        alignItems:"center",
    },
    headerAvarBG:{
        width:90,
        height:90,
        borderRadius:45,
        backgroundColor:'white',
        alignItems:"center",
        justifyContent:'center'
    },
    headerAvar:{
        width:84,
        height:84,
    },
    loginContainer:{
        borderWidth:1,
        borderColor:'white',
        borderRadius:5,
        paddingHorizontal:15,
        paddingVertical:4,
        marginTop:15
    },
    loginText:{
        fontSize:14,
        fontWeight:'300',
        color:'white'
    },
    listContainer:{
        marginTop:20,
        borderColor:'#d9d9d9',
        borderTopWidth:gScreen.onePix,
        borderBottomWidth:gScreen.onePix
    },
    cellContainer:{
        height:44,
        flexDirection:'row',
        paddingHorizontal:15,
        alignItems:'center',
    },
    cellIcon:{
        width:20,
        height:20
    },
    cellText:{
        marginLeft:15,
        fontSize:14,
        color:'gray'

    },cellLine:{
        backgroundColor:'#d9d9d9',
        height:gScreen.onePix,
        marginLeft:15
    }

})

export  default  Profile