import  React,{Component} from  'react'
import  {View,Alert, Text,StyleSheet, Image,ScrollView,TouchableOpacity} from  'react-native'
import  FoodEncyclopediaStore from '../../store/FoodEncyclopediaStore'
import  Toast from 'react-native-easy-toast'
import  {observer} from 'mobx-react'
import  Loading from '../../components/Loading'
const HandleDatas  = [
    {title:"饮食分析",image:require('../../resource/ic_home_analyse.png')},
    {title:"搜索对比",image:require('../../resource/ic_search_compare.png')},
    {title:"扫码对比",image:require('../../resource/ic_scan_compare.png')},
]

@observer class  FoodEncyclopedia extends  Component {

    dataStore = new FoodEncyclopediaStore()
    toast :any

    _searchAction(){
        Alert.alert("SEARCH")
    }
    _handleAction(title){
        Alert.alert('click'+title)
    }
    _clickCellHandel(kind,category){
        console.log(`kind:${kind},category:${category}`)
        const navigator =  this.props.navigator
        navigator.push({
            id:'FoodList',
            passProps:{
                kind,
                category
            }
        })
    }
    //当数据发生改变
    componentWillReact() {
        const {errorMsg,list} = this.dataStore
        console.log('componentWillReact')
        console.log(errorMsg)
        errorMsg && this.toast && this.toast.show(errorMsg)
    }

    componentWillMount(){
        //获取数据
        this.dataStore.fetchCategoryList()
    }

    render(){
        const {list,errorMsg} = this.dataStore
        list.map((x,ii)=>{
            console.log(x)
        })
        return (
            <View style={{flex:1}}>
                <ScrollView showsVerticalScrollIndicator={false}
                            automaticallyAdjustContentInsets={ false}
                            bounces={false}
                            removeClippedSubviews={true}
                            contentContainerStyle={{alignItems: 'center', backgroundColor: '#f5f5f5', paddingBottom: 10}}
                >
                    <Header searchAction={this._searchAction.bind(this)}/>
                    <HandleView handleAction={this._handleAction.bind(this)} />
                    <ClassifyView foodCategoryList={list}
                                  clickCellHandle={this._clickCellHandel.bind(this)}/>
                </ScrollView>
                <Loading isShow={this.dataStore.isFetching}/>
                <Toast ref={(toast)=>this.toast = toast}/>
            </View>


        )
    }
}

const Header = ({searchAction}) => {
    return (
        <Image style={styles.headerContainer}
               source={require('../../resource/img_home_bg.png')}>
            <Image style={styles.headerLogo}
                   source={require('../../resource/ic_head_logo.png')}></Image>
            <Text style={styles.headerTitle}>查 询 食 物 信 息</Text>
            <TouchableOpacity activeOpacity={0.8}
                              style={styles.headerSearchContainer}
                              onPress={searchAction}>
                <Image style={styles.headerSearchLogo}
                       source={require('../../resource/ic_home_search.png')}/>
                <Text style={styles.headerSearchtext}>请输入食物信息</Text>
            </TouchableOpacity>
        </Image>
            )
}

const HandleView = ({handleAction})=>{

    return (
        <View style={styles.handleContainer}>
            {
                HandleDatas.map((item,ii) => {
                    const  isLast = ii === HandleDatas.length - 1
                    return (<HandleViewCell key={ii}
                                            icon={item.image}
                                            title={item.title}
                                            isLast = {isLast}
                                            onPress={handleAction}/>)
            })
            }
        </View>
    )
}

const HandleViewCell = ({icon, title, isLast,onPress}) => {

    // return (<View/>)
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.tab}
            onPress={()=>onPress(title)}>
            <View style={styles.tabItem}>
                <Image style={styles.icon} source={icon}/>
                <Text style={{color: 'gray', fontSize: 12}}>{title}</Text>
            </View>
            {!isLast && <View style={styles.line}/>}
        </TouchableOpacity>
    )
}

const ClassifyView = observer(
    ({foodCategoryList,clickCellHandle})=> {
    const  kind = foodCategoryList.kind
    return (
        <View style={styles.classifyContainer}>
            {foodCategoryList.map((data,ii)=>{
                return <ClassifyCell key={ii}
                                     foodCategoryList={data}
                                     clickCellHandle={clickCellHandle}/>
            })}
        </View>
    )
})


 const  ClassifyCell = observer(
     ({foodCategoryList,clickCellHandle}) => {
         let title = '食物分类'
         if (foodCategoryList.kind === 'brand'){
             title = '热门品牌'
         }else if (foodCategoryList.kind === 'restaurant'){
             title = '连锁餐饮'
         }
         return (
             <View style={styles.classifyCellContainer}>
                 <Text style={{color:'gray'}}>{title}</Text>
                 <Image style={{width: gScreen.width - 16 * 2, height: 14}}
                        source={require('../../resource/homeline.png')}
                 />
                 <View style={styles.classifyCells}>
                     {foodCategoryList.categories.map((categary,ii)=>{
                         return  (
                             <TouchableOpacity key={ii}
                                               onPress={()=>{
                                 clickCellHandle(foodCategoryList.kind,categary)
                             }}>
                                 <View style={styles.classifycell}>
                                     <Image style={styles.categoryIcon} source={{uri:categary.image_url}}></Image>
                                     <Text style={styles.categoryTitle}>{categary.name}</Text>
                                 </View>
                             </TouchableOpacity>
                         )
                     })}
                 </View>
             </View>
         )
     }
 )


const Constaints = {
    WIDTH:gScreen.width - 16 * 2
}

const  styles = StyleSheet.create({
    headerContainer:{
        height:220,
        width:gScreen.width,
        paddingTop: __IOS__ ? 20 + 15 : 15,
        paddingBottom: 28,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(1,1,1,0)',
        overflow: 'hidden',
        alignItems:'center',
        justifyContent:'space-between'
    },
    headerLogo:{
        width:66,
        height:24
    },
    headerTitle:{
        color:"white",
        fontWeight:'500',
        marginTop:40
    },
    headerSearchContainer:{
        backgroundColor:'white',
        borderRadius:5,
        height:40,
        width:Constaints.WIDTH,
        flexDirection:'row',
        alignItems:'center',
        marginLeft:0,
        marginRight:0
    },
    headerSearchLogo:{
        width: 20, height: 20, marginHorizontal: 5
    },
    headerSearchtext:{
       color: 'rgba(222, 113, 56, 0.8)',fontSize:15
    },
    handleContainer:{
        height:60,
        borderRadius:3,
        backgroundColor:'white',
        width:Constaints.WIDTH,
        marginTop:15,
        flexDirection:'row'
    },
    icon: {
        width: 26,
        height: 26,
        marginBottom: 5
    },
    tabItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    tab:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        flexDirection: 'row',
    },
    line:{
        width:1,
        height: 44,
        backgroundColor:'#d9d9d9',
        position: 'absolute',
        right:0
    },
    classifyContainer:{
        flexDirection:'column',
        marginTop:15,
        backgroundColor:'white',
        width:Constaints.WIDTH,
    },
    classifyLine:{
        width:Constaints.WIDTH,
        height:17
    },
    classifyCellContainer :{
        justifyContent:'center',
        alignItems:'center',
        paddingTop:5
    },
    classifyCells:{
        flexDirection:'row',
        flexWrap:'wrap'
    },
    classifycell:{
        width:Constaints.WIDTH / 3 ,
        height:Constaints.WIDTH / 3,
        justifyContent:'center',
        alignItems:'center'
    },
    categoryIcon: {
        width: 40,
        height: 40,
    },
    categoryTitle: {
        color: 'gray',
        fontSize: 12,
        marginTop: 5,
    },


})


export  default  FoodEncyclopedia