
import  get from '../common/HttpTools'

export  default  class FeedBaseStore{
    // page : number = 1
    // categoryId:number = 1
    constructor(categoryId){
        this.categoryId = categoryId
        this.page = 1
    }

    async fetch(){
        const url = 'http://food.boohee.com/fb/v1/feeds/category_feed'
        const params = {
            page: this.page,
            category: this.categoryId,
            per: 10
        }
        const responseData = await get(url,params,30).then(response=>response.json())
        return  responseData
    }
}