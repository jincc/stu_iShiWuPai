import  get from '../common/HttpTools'
import {observable, runInAction, computed, action} from 'mobx'

class  FoodEncyclopediaStore {
    @observable list = []
    @observable errorMsg = ''
    //获取类别数据
    @action async fetchCategoryList(){
        try {
            const url = 'http://food.boohee.com/fb/v1/categories/list'
            const datas =  await  get(url).then(res => res.json())

            runInAction(()=> {
                this.list.replace(datas.group)
                this.errorMsg = ''
            })
        }
        catch(err){

            if(err.msg){
                this.errorMsg = err.msg
            }else{
                this.errorMsg = '网络请求失败'
            }
            console.log(this.errorMsg)
        }
    }

    @computed get isFetching(){
        return this.list.length === 0 && this.errorMsg === ''
    }
    @computed get isNoResult(){
        return this.list.length ===  0
    }

}
export  default  FoodEncyclopediaStore