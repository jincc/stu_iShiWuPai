

const delay = (timeout)=> {
    return new Promise((resolve,reject) => {
        setTimeout( ()=> reject('请求超时'),timeout * 1000)
    })
}


//params,timeout默认
const get = (url,params={},timeout=30) => {
    const  paramArr = []
    if (Object.keys(params).length !== 0) {
        for (const  key in params) {
            paramArr.push(`${key}=${params[key]}`)
        }
    }
    const urlStr = `${url}?${paramArr.join('&')}`
    if (timeout === undefined){
        return fetch(urlStr)
    }else{
        //all「谁跑的慢，以谁为准执行回调」，
        //race「谁跑的快，以谁为准执行回调」
        return Promise.race([fetch(urlStr),delay(timeout)])
    }

    
}

module.exports = get