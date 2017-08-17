import  React,{Component,PropTypes} from  'react'
import  {View,Alert,Animated, Text,StyleSheet, Image,ScrollView,TouchableOpacity} from  'react-native'

class FoodSortTypesView extends  Component {
    static  propTypes = {
        sortTypes:PropTypes.array.isRequired,
        clickSortTypes:PropTypes.func.isRequired
    }
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isShow:false,
            sortTypeTopAni:new Animated.Value(0)
        };
    }

    render(){
        const  {isShow} = this.state
        const  {sortTypes}  = this.props
        const  rotate =  isShow ? '180deg' : '0deg'
        const  cells =   sortTypes.map((data,index)=>{
            return (<TypeCell key={index}
                              data={data}
                              onPressCell={this._clickSortTypes.bind(this)}/>)
        })
        const  sortTypeTopAni = this.state.sortTypeTopAni.interpolate({
            inputRange:[0,1],
            outputRange:[ - sortTypes.length * 30 , 0]
        })

        return (
            <TouchableOpacity  activeOpacity={1}
                               onPress={this._close.bind(this)}
                               style={styles.touchContainer}>
                <View style={[styles.header,{zIndex:2}]}>
                   <TouchableOpacity style={{flexDirection:'row'}}
                                     onPress={this._popSortTypes.bind(this)}>
                       <Text style={{fontSize:13}}>常见</Text>
                       <Image
                           style={{width: 16, height: 16, transform: [{rotate}]}}
                           source={require('../../resource/ic_food_ordering.png')}
                       />
                   </TouchableOpacity>
                </View>
                {/*sorttypes*/}
                {isShow && <Animated.View style={[styles.sortTypes,{top:sortTypeTopAni,zIndex:1}]}>
                    {cells}
                </Animated.View>}
            </TouchableOpacity>
        )
    }

    _close(){
        this._popSortTypes()
    }

    _popSortTypes(){
        let  {isShow} = this.state
        isShow = !isShow
        if (isShow){
            this.setState({
                isShow:isShow
            },()=>{
                Animated.spring(this.state.sortTypeTopAni,{
                    toValue:1,
                    duration:300
                } ).start()
            })

        }else{
            Animated.spring(this.state.sortTypeTopAni,{
                toValue:0,
                duration:300
            }).start(()=>{
                this.setState({
                    isShow:isShow
                })
            })

        }
    }

    _clickSortTypes(data){
        //{ data: { code: 'cholesterol', name: '胆固醇', index: '23' } }
        this._popSortTypes()
        this.props.clickSortTypes(data)
    }
}

const TypeCell = ({data, onPressCell })=> {
    return (
        <View style={styles.cell}>
            <TouchableOpacity onPress={()=> onPressCell(data)}>
                <Text style={{fontSize:13}}>{data.name}</Text>
            </TouchableOpacity>
        </View>
    )
}

const  styles = StyleSheet.create({
    touchContainer:{
    },
    header:{
        flexDirection:'row',
        paddingHorizontal:10,
        alignItems:'center',
        height:40,
        backgroundColor:'white'
    },
    sortTypes:{
        flexDirection:'row',
        flexWrap:'wrap',
        backgroundColor:'white'
    },
    cell:{
        width:gScreen.width/3,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:gScreen.onePix,
        borderBottomColor:gColors.border
    }
})

export  default  FoodSortTypesView