
import {observable,action,runInAction,computed} from  'mobx'
import get from '../../common/HttpTools'

 class  FoodListStore {
    //paras
     page = 1
     kind=''
     categoryId = 1
     orderBy = 1
     orderAsc = 0
     sub_value = ''
    //state
    constructor(kind, categoryId) {
        this.categoryId = categoryId
        this.kind = kind
    }
    _loadMore(){
        this.page ++
        return this._fetchFromUrl()
    }
    _loadCategoryDatas(categoryId){
        this.sub_value =  categoryId;
        return this._fetchFromUrl()
    }
    _fetchFromUrl(){
        const paras = {
            kind:this.kind,
            value:this.categoryId,
            order_by:this.orderBy,
            page:this.page,
            order_asc:this.orderAsc,
            sub_value:this.sub_value
        }
        const URL = `http://food.boohee.com/fb/v1/foods?kind=${this.kind}&value=${this.categoryId}&order_by=${this.orderBy}&page=${this.page}&order_asc=${this.orderAsc}&sub_value=${this.sub_value}`
        return  new Promise((resolve,reject)=>{
            fetch(URL).then((response)=> {
                if (response && response.status == 200){
                    return response.json()
                }else{
                    console.log(response)
                    return null
                }
            }).then((response)=>{
                if (response){
                    const {foods, page, total_pages} = response

                    resolve({foods, isNoMore: page >= total_pages})
                }else{
                    reject("请求出错")
                }
            }).catch(err=> {
                reject("请求出错")
            })
        })
    }
}

export  default  FoodListStore