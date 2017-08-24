/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

//真实环境不打印log
if (!__DEV__) {
    global.console =  {
        log:()=>{}
    }
}
//这里定义的全局变量，在任何地方都能使用
global.__IOS__ = true
global.__ANDROID__ = false

//初始化配置
require('./app/common/GlobalContants')
require('./app/App')

// require('./app/TestApp')
// require('./app/TabNavigatorApp')