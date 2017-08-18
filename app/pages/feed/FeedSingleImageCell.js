
import  React,{Component,PropTypes} from  'react'
import  {View, Image, Text,StyleSheet,TouchableOpacity} from  'react-native'
class FeedSingleImageCell extends Component{

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
        return  (
            <View style={{flex:1,backgroundColor:'white'}}>
                <TouchableOpacity style={styles.container} activeOpacity={1}>
                    <View style={styles.leftContainer}>
                        <Text numberOfLines={0}>{title}</Text>
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
                    </View>
                    <Image
                        style={styles.image}
                        source={{uri: images[0]}}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:15
    },
    leftContainer:{
        marginRight:30,
        flex:1,
        justifyContent:'space-between'
    },sourceContainer:{
        height:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'flex-end',
    },
    image: {
        height: 80,
        width: (gScreen.width - 15 * 2 - 10 * 2) / 3
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
})
export  default  FeedSingleImageCell