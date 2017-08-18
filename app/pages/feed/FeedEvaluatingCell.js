
import  React,{Component,PropTypes} from  'react'
import  {View, Image, Text,StyleSheet,TouchableOpacity} from  'react-native'

class  FeedEvaluatingCell extends  Component {
    static  propTypes = {
        //标题
        title:PropTypes.string,
        //来源
        soure:PropTypes.string,
        //观看数
        tail:PropTypes.string,
        //封面
        background:PropTypes.string

    }
    render (){
        const  {title,source,tail,background} = this.props
        return (
                 <TouchableOpacity activeOpacity={1}
                                   style={styles.container}>
                     <Image style={styles.image}
                            source={{uri:background}}>
                         <Text style={{color:`white`,fontSize:12}}>{source}</Text>
                         <Text style={styles.feedTitle}>{title}</Text>
                         <Text style={{color:`white`,fontSize:12}}>{tail}</Text>
                     </Image>
                 </TouchableOpacity>
        )
    }
}

const  styles = StyleSheet.create({
    container:{
        paddingVertical:5,
        paddingHorizontal:15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: gScreen.width - 15 * 2,
        height: gScreen.height * 0.3,
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent'
    },
    feedTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        width: gScreen.width * 0.62,
        textAlign: 'center',
        lineHeight: 20,
        backgroundColor: 'rgba(1,1,1,0)'
    },
})

export  default  FeedEvaluatingCell