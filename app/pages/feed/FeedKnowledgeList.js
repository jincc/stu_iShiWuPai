import  React,{Component} from  'react'
import  FeedSingleImageCell from './FeedSingleImageCell'
import  FeedMultImageCell  from './FeedMultImageCell'
import  FeedBaseComponent from './FeedBaseComponent'

const  FeedKnowledgeList = ()=> {
    return (
        <FeedBaseComponent categoryId={3} renderRow={renderRow}/>
    )

}

function  renderRow(rowData, sectionID, rowID, highlightRow){
    /*
     { source: 'Karma.Chen',
     title: '酒仙也要抖三抖：聊聊那些“失身酒”',
     link: 'https://knewone.com/entries/56ce9bb6b1cf8876fa0000e9',
     tail: '6749',
     images:
     [ 'https://s-media-cache-ak0.pinimg.com/236x/69/9e/bc/699ebcaa3c8976d31ac757f1e43a0364.jpg',
     'https://s-media-cache-ak0.pinimg.com/564x/0d/77/7f/0d777f81d3428ee7d69160fcdd9d1d24.jpg',
     'https://s-media-cache-ak0.pinimg.com/564x/fb/60/d7/fb60d7aaddb07a1655ad412d355f808c.jpg' ],
     item_id: 237,
     type: 'food_news',
     content_type: 2 },
     */
    const imageCount =  rowData.images.length
    if (imageCount == 0) return null
    if (imageCount == 1) return <FeedSingleImageCell {...rowData}/>
    return  <FeedMultImageCell {...rowData}/>

}
export  default  FeedKnowledgeList