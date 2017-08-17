/*

    网络监听Decorator
    这里写了一个Decorator,作用于类，用来监听网络,该方法会接受一个component，然后返回一个包装了inner component的NetInfoComponent
    用法@NetInfoDecorator,
 */

import  React,{Component} from  'react'
import  {NetInfo} from  'react-native'

function NetInfoDecorator(WrappedComponent){

    class NetInfoComponent extends  Component {
        // 构造
          constructor(props) {
            super(props);
            // 初始状态
            this.state = {
                isConnected:true
            };
          }

          componentDidMount(){
              NetInfo.isConnected.addEventListener('netListen',this._handleNetworkConnectivityChange.bind(this))
          }

          componentWillUnmount() {
              NetInfo.isConnected.removeEventListener('netListen')
          }

          render(){
              return (<WrappedComponent {...this.props} {...this.state}/>)
          }

          _handleNetworkConnectivityChange(isConnected){
              this.setState({
                  isConnected:isConnected
              })
          }
    }

    return NetInfoComponent
}

module.exports = NetInfoDecorator