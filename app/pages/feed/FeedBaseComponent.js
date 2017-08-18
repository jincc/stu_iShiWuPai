import  React,{Component,PropTypes} from  'react'
import  {View, Text,ListView,StyleSheet} from  'react-native'
import  FeedBaseStore from  '../../store/FeedBaseStore'
import  LoadMoreFooter from '../../components/LoadMoreFooter'
import  get from '../../common/HttpTools'
import FeedSingleImageCell from './FeedSingleImageCell'
import  FeedMultImageCell  from './FeedMultImageCell'

class  FeedBaseComponent extends  Component {

    static  propTypes =  {
        categoryId : PropTypes.number.isRequired,
        hasline:PropTypes.bool,
        renderRow:PropTypes.func.isRequired
    }

    static  defaultProps = {
        hasline : true
    }

    page:number =  1

    // 构造
    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({rowHasChanged:(p,v)=>{p!== v}})

        // 初始状态
        this.state = {
            dataSource:dataSource,
            feeds:[],
            isNoMore:false
        };
    }

    //获取数据
    async _fetch(){
        if (this.state.isNoMore) return ;

        const url = 'http://food.boohee.com/fb/v1/feeds/category_feed'
        const params = {
            page: this.page,
            category: this.props.categoryId,
            per: 10
        }
        const responseData = await get(url,params,30).then(response=>response.json())
        const {feeds, page, total_pages} = responseData
        this.page = page
        this.setState((state)=>{
            return {
                feeds : [...state.feeds,...feeds],
                isNoMore:page>=total_pages
            }
        })

    }


    componentWillMount(){
        this._fetch()
    }

    render(){
        return (
            <View style={{flex:1}}>
                <ListView  style={{backgroundColor: 'rgba(220, 220, 220, 0.2)'}}
                           dataSource={this.state.dataSource.cloneWithRows(this.state.feeds)}
                           renderRow={this._renderRow.bind(this)}
                           enableEmptySections
                           renderSeparator={this._renderSeparator.bind(this)}
                           onEndReached={this._loadMore.bind(this)}
                           renderFooter={this._renderFooter.bind(this)}/>
            </View>
        )
    }

    _loadMore(){
        this.page++
        this._fetch()
    }

    _renderRow(rowData, sectionID, rowID, highlightRow){
        return this.props.renderRow(rowData, sectionID, rowID, highlightRow)
        // /*
        //  { source: 'Karma.Chen',
        //  title: '酒仙也要抖三抖：聊聊那些“失身酒”',
        //  link: 'https://knewone.com/entries/56ce9bb6b1cf8876fa0000e9',
        //  tail: '6749',
        //  images:
        //  [ 'https://s-media-cache-ak0.pinimg.com/236x/69/9e/bc/699ebcaa3c8976d31ac757f1e43a0364.jpg',
        //  'https://s-media-cache-ak0.pinimg.com/564x/0d/77/7f/0d777f81d3428ee7d69160fcdd9d1d24.jpg',
        //  'https://s-media-cache-ak0.pinimg.com/564x/fb/60/d7/fb60d7aaddb07a1655ad412d355f808c.jpg' ],
        //  item_id: 237,
        //  type: 'food_news',
        //  content_type: 2 },
        //  */
        // const imageCount =  rowData.images.length
        // if (imageCount == 0) return null
        // if (imageCount == 1) return <FeedSingleImageCell {...rowData}/>
        // return  <FeedMultImageCell {...rowData}/>

    }
    _renderSeparator(sectionID, rowID, adjacentRowHighlighted){
        return  this.props.hasline ?  <View style={styles.cellLine}>
        </View> : null
    }
    _renderFooter(){
        if (this.state.feeds.length === 0 || this.state.feeds.length === undefined) {
            return null
        }
        return  <LoadMoreFooter isNoMore={this.state.isNoMore}/>
    }
}

const styles = StyleSheet.create({
    cellLine:{
        backgroundColor:'#d9d9d9',
        width:gScreen.width-60,
        height:gScreen.onePix,
        left:60,
    }
})

export  default  FeedBaseComponent