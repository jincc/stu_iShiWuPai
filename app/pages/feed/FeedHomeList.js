import  React,{Component,PropTypes} from  'react'
import  {View, Text,ListView,StyleSheet,ScrollView} from  'react-native'
import  FeedBaseStore from  '../../store/FeedBaseStore'
import  LoadMoreFooter from '../../components/LoadMoreFooter'
import  get from '../../common/HttpTools'
import  FeedHomeCell from  './FeedHomeCell'
import  AutoResponisve from 'autoresponsive-react-native'
const   itemWidth=  (gScreen.width - 15 * 2 -10)/2

class  FeedHomeList extends  Component {
    page:number =  1

    // 构造
    constructor(props) {
        super(props);

        // 初始状态
        this.state = {
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
            category: 1,
            per: 10
        }
        const responseData = await get(url,params,30).then(response=>response.json())
        const {feeds, page, total_pages} = responseData
        console.log(feeds)
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
                <ScrollView contentContainerStyle={{paddingTop:10}}
                            style={{width:gScreen.width,height:gScreen.height - gScreen.navBarHeight-44-49}}
                            automaticallyAdjustContentInsets={false}
                            removeClippedSubviews={true}
                            bounces={true}>
                    <AutoResponisve {...this._getAutoResponsiveProps()}>
                        {this.state.feeds.map(this.renderChildren.bind(this))}
                    </AutoResponisve>
                </ScrollView>
            </View>
        )
    }

    renderChildren = (feed, key) => {
        // 默认高度
        let height = itemWidth + 50;
        let titleHeight = 30;
        if (feed.description) {
            if (feed.description.length !== 0 && feed.description.length < 13) {
                titleHeight += 25;
            } else if (feed.description.length >= 13) {
                titleHeight += 40
            }
        }
        height += titleHeight;

        if (feed.content_type !== 5) height = itemWidth + 50;

        const style = {
            width: itemWidth,
            height,
            marginLeft: 15
        }

        return (
            <FeedHomeCell
                titleHeight={titleHeight}
                style={style}
                key={`${feed.item_id}-${key}`}
                feed={feed}
                onPress={this.onPressCell}
            />
        )
    }
    onPressCell(){}
    _getAutoResponsiveProps = () => ({itemMargin: 10})

    _loadMore(){
        this.page++
        this._fetch()
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

export  default  FeedHomeList