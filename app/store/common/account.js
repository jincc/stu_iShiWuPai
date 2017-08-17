import {observable, action} from 'mobx'
class Account {
    @observable name = ''
}

export  default  new Account()