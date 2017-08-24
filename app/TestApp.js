import React,{Component} from 'react';
import {
    AppRegistry,
    Text,
    View,
    Button
} from 'react-native';
import App from './react-navigator/App'
import { StackNavigator } from 'react-navigation'


class  TestApp extends  Component {
    static navigationOptions = {
        title: 'Welcome',
    }
    render (){
        const {navigate} = this.props.navigation
        return (
            <View>
                 <Text>Hello, Navigation!</Text>
                <Button
                    onPress={() => navigate('Chat',{user:'Jincc'})}
                    title="Chat with Lucy"
                />
            </View>
        )
    }
}

class ChatScreen extends React.Component {
    // static navigationOptions = ({navigator}) => {
    //     const  {state,setParams} = navigator
    //     const isInfo = state.params.mode === 'info'
    //     const {user} = state.params
    //     return {
    //         title:isInfo ? `${user} contact info` : `chat with ${user}`,
    //         headerRight:(
    //             <Button title = {isInfo ? 'done' : `${user} info`} onPress={()=>setParams({mode:isInfo? "none":'info'}) }/>
    //         )
    //     }
    // }
    static navigationOptions = ({ navigation }) => {
        const {state, setParams} = navigation;
        const isInfo = state.params.mode === 'info';
        const {user} = state.params;
        return {
            title: isInfo ? `${user}'s Contact Info` : `Chat with ${state.params.user}`,
            headerRight: (
                <Button
                    title={isInfo ? 'Done' : `${user}'s info`}
                    onPress={() => setParams({ mode: isInfo ? 'none' : 'info'})}
                />
            ),
        };
    };
    render() {
        const  {params} = this.props.navigation.state

        return (
            <View>
                <Text>Chat with {params.user}</Text>
            </View>
        );
    }
}
const  SimpleApp = StackNavigator({
    Home:{screen:TestApp},
    Chat:{screen:ChatScreen}
})
AppRegistry.registerComponent('stu_iShiWuPai', () => App);
