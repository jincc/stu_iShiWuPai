import  React,{Component} from  'react'
import  FeedSingleImageCell from './FeedSingleImageCell'
import  FeedMultImageCell  from './FeedMultImageCell'
import  FeedBaseComponent from './FeedBaseComponent'
import  FeedEvaluatingCell from './FeedEvaluatingCell'

const  FeedEvaluatingList = ()=> {
    return (
        <FeedBaseComponent categoryId={2}
                           renderRow={renderRow}
                           hasline={false}/>
    )
}

function  renderRow(rowData, sectionID, rowID, highlightRow){
    console.log(rowData)
    return  <FeedEvaluatingCell {...rowData}/>

}
export  default  FeedEvaluatingList