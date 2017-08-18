import  React,{Component} from  'react'
import  {View,Alert, Text,StyleSheet, Image,ScrollView,TouchableOpacity,ListView} from  'react-native'
import  Toast from 'react-native-easy-toast'
import  {observer} from 'mobx-react'
import  Loading from '../../components/Loading'
import {Navigator} from 'react-native-deprecated-custom-components'

import  PopMenus from '../../components/PopMenus'
import  Header from  '../../components/Header'
import  LoadMoreFooter from '../../components/LoadMoreFooter'
import  FoodListStore from  './FoodListStore'
import  FoodSortTypesView from './FoodSortTypesView'
import get from '../../common/HttpTools'

@observer class  FoodList extends  Component {

    foodStore = new FoodListStore(this.props.kind,this.props.category.id)
    popMenus : any
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        let dataSource = new ListView.DataSource({rowHasChanged:(p,v)=>{p!== v}})
        this.state = {
            isFetching:true,
            isNoMore :true,
            dataSource:dataSource,
            foods:[],
            selectCateforyItem:null,
            sortTypes:[]
        };
    }
    _onBack(){
        const {navigator} = this.props
        navigator.pop()
    }
    _renderRightItem(){
        return (
            <View style={styles.rightItemContainer}>
                <Text style={{color:'gray',fontSize:12,marginRight:3}}>{this.state.selectCateforyItem ? this.state.selectCateforyItem.name : '全部'}</Text>
                <Image source={require('../../resource/ic_bullet_down_gray.png')}
                       style={{width: 13, height: 16}}
                       resizeMode="contain"/>
            </View>
        )
    }
    _renderRow(rowData, sectionID, rowID, highlightRow){
        return  <FoodCell rowData={rowData}/>

    }
    _renderSeparator(sectionID, rowID, adjacentRowHighlighted){
        return  <View style={styles.cellLine}>
        </View>
    }
    _renderFooter(){
        if (this.state.foods.length === 0 || this.state.foods.length === undefined) {
            return null
        }
        return  <LoadMoreFooter isNoMore={this.state.isNoMore}/>
    }
    _loadSortTypes(){
        const URL = 'http://food.boohee.com/fb/v1/foods/sort_types'
        fetch(URL).then((res)=>res.json())
            .then((json)=>json.types)
            .then((types)=>{
            console.log(types)
            this.setState({
                sortTypes:types
            })
        })
    }

    _fetchDatas(){
        this.foodStore._fetchFromUrl().then((response)=>{
            const {foods, isNoMore}  =  response
            console.log('food length' + foods.length)
            this.setState({
                foods:foods,
                isFetching:false,
                isNoMore:isNoMore
            })
        })
    }
    _loadMore(){
        if (this.state.isNoMore)
        { return}
        this.foodStore._loadMore().then((response)=>{
            const {foods, isNoMore}  =  response
            this.setState({
                foods:[...this.state.foods,...foods],
                isNoMore:isNoMore
            })
        })
    }
    _onRight(){
        this.popMenus && this.popMenus.show()
    }
    _selectCatefory(category){
        this.setState({
            selectCateforyItem:category
        })
        //刷新数据
        this.foodStore._loadCategoryDatas(category.id).then((response)=>{
            const {foods, isNoMore}  =  response
            this.setState({
                foods:[...foods],
                isNoMore:isNoMore
            })
        })

    }
    _clickSortTypes(data){
        //{ data: { code: 'manganese', name: '锰', index: '22' } }
        this.foodStore._loadSortDatas(data.index).then((response)=>{
            const {foods, isNoMore}  =  response
            this.setState({
                foods:[...foods],
                isNoMore:isNoMore
            })
        })
    }
    componentWillMount(){
        this._fetchDatas()
        this._loadSortTypes()
    }
    //,position: 'absolute',
   // top:40 + gScreen.navBarHeight,left:0,width:gScreen.width,height:gScreen.height - 40 - gScreen.navBarHeight
    render(){
        const  {foods,sortTypes} =  this.state
        const {category: {id, name, sub_categories}} = this.props
        let categories = []
        if (sub_categories.length > 0) {
            categories = [{id:id,name:'全部'},...sub_categories]
        }
        console.log(sub_categories.length)
        const ds = this.state.dataSource.cloneWithRows(foods)
        return (
            <View backgroundColor={gColors.background} style={{flex:1}}>
                <Header
                    title={this.props.category.name}
                    onBack={this._onBack.bind(this)}
                    style={{zIndex: 3}}
                    renderRightItem={this._renderRightItem.bind(this)}
                    onRight={this._onRight.bind(this)}
                />
                {sortTypes.length>0 && <FoodSortTypesView customStyle={{zIndex:1}}
                                                          sortTypes={sortTypes}
                                                          clickSortTypes={this._clickSortTypes.bind(this)}/> }

                <ListView  style={{backgroundColor: 'rgba(220, 220, 220, 0.2)'}}
                           dataSource={ds}
                           renderRow={this._renderRow.bind(this)}
                           enableEmptySections
                           renderSeparator={this._renderSeparator.bind(this)}
                           onEndReached={this._loadMore.bind(this)}
                           renderFooter={this._renderFooter.bind(this)}/>

                {categories.length>0 && <PopMenus ref={(pop)=>this.popMenus = pop}
                                                      categories={categories}
                                                      selectCatefory={this._selectCatefory.bind(this)}/>}
                <Toast ref={(toast)=>this.toast = toast}/>
                <Loading isShow={this.state.isFetching}/>
            </View>
                )
    }
}

const  FoodCell = ({rowData})=> {
    const uri = rowData.thumb_image_url
    return (
        <TouchableOpacity activeOpacity={0.8} style={styles.cellContainer}>
            <Image source={{uri:uri}}
                   style={{width: 50, height: 50,borderRadius:5}}
                   resizeMode="cover"/>
            <View style={{marginLeft:6}}>
                <Text style={{color: '#666',marginBottom:4}}>{rowData.name}</Text>
                <Text style={{color: 'red',fontSize:13}}>{rowData.weight}
                    <Text style={{color: '#666',fontSize:13}}>
                        千卡/100克
                    </Text>
                </Text>
            </View>
            <View style={styles.cellPoint}>
            </View>
        </TouchableOpacity>
    )
}

const  styles = StyleSheet.create({
        rightItemContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        cellContainer: {
            height: 60,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 8
        },
        cellPoint: {
            width: 10,
            height: 10,
            backgroundColor: 'yellow',
            borderRadius: 5,
            position: 'absolute',
            right:10
        },
        cellLine:{
            backgroundColor:'#d9d9d9',
            width:gScreen.width-60,
            height:gScreen.onePix,
            left:60,
       }
    }
)

export  default  FoodList
