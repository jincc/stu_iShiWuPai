
import  React,{Component,PropTypes} from  'react'
import  {View, Image, Text,StyleSheet,TouchableOpacity,ScrollView} from  'react-native'
class FeedMultImageCell extends Component{

    static  propTypes = {
        //标题
        title:PropTypes.string,
        //来源
        soure:PropTypes.string,
        //观看数
        tail:PropTypes.string,
        //封面
        images:PropTypes.array
    }
    render (){
        const  {title,source,tail,images} = this.props

        const imageCells = images.map((image,ii)=>{
            return  (<Image key={ii} style={styles.image}
                            source={{uri:image}}/>)
        })

        return  (
            <View style={{flex:1,backgroundColor:'white'}}>
                <TouchableOpacity style={styles.container} activeOpacity={1}>
                    <Text numberOfLines={0}>{title}</Text>
                    <ScrollView style={styles.scroll} horizontal={true}>
                        {imageCells}
                    </ScrollView>
                    <View style={styles.sourceContainer}>
                        <Text style={{color:'gray'}}>{source}</Text>
                        <View style={styles.imgWrapper}>
                            <Image
                                style={styles.feedIcon}
                                source={require('../../resource/ic_feed_watch.png')}
                            />
                            <Text style={{color:'gray'}}>{tail}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        padding:15
    },
    leftContainer:{
        marginRight:30,
        flex:1
    },sourceContainer:{

        flexDirection:'row',
        justifyContent:'space-between',
    },
    image: {
        height: 80,
        width: (gScreen.width - 15 * 2 - 10 * 2) / 3,
        marginRight:10
    },
    imgWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    feedIcon: {
        width: 14,
        height: 14,
        marginRight: 3
    },
    scroll:{
        marginVertical:15
    }

})
export  default  FeedMultImageCell