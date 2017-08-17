/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    TextInput,
    Image,
    Button,
    TouchableOpacity,
    View,
} from 'react-native';
import ToastExample from './ToastExample';
import {StyleConfig, ComponentStyles, CommonStyles} from './style';
class Blink extends Component {
    constructor(props) {
        super(props);
        this.state = {showText: false};
        /* setInterval(() => {
         this.setState({showText: !this.state.showText});
         }, 1000);*/
    }

    render() {
        let display = this.state.showText ? this.props.text : "";
        return (
            <Text style={styles.instructions}>{display}</Text>
        );
    };
}

class AwesomeProject extends Component {

    constructor(props){
        super(props);
        this.state={
            username:"",
            password :""

        }
    }
    login(userName, password, loginCallback) {
        let formData = new FormData();
        formData.append("userName", userName);
        formData.append("password", password);
        fetch('http://193.28.20.62:8889/user/login', {
            method: 'POST',
            body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.code === 1) {
                    loginCallback(true, responseJson.data);
                } else {
                    loginCallback(false, responseJson.result);
                }
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
                loginCallback(false, "网络错误");
            });
    }

    handleLogin() {
        /* let userName = this.refs.userInput.value;
         let pwd = this.refs.pwdInput.value;*/
        this.login(this.state.username, this.state.password, function (isSuc, data) {
            if (isSuc) {
                ToastExample.show('登录成功', ToastExample.SHORT);
            } else {
                ToastExample.show(data, ToastExample.SHORT);
            }
        });
    }

    render() {

        return (
            <View>


                <View style={ [CommonStyles.m_a_4] }>
                    <View style={ [ComponentStyles.input_control] }>
                        <TextInput
                            ref="txtUserName"
                            maxLength = { 40 }
                            blurOnSubmit= {true}
                            style={ [ComponentStyles.input ] }
                            placeholder={'请输入用户名'}
                            placeholderTextColor={ StyleConfig.color_gray }
                            underlineColorAndroid = { 'transparent' }
                            onChangeText = {(val)=>this.setState({username: val})}
                            value={ this.state.username } />
                    </View>
                    <View style={ [ComponentStyles.input_control] }>
                    <TextInput
                        ref="txtPassword"
                        maxLength = { 40 }
                        style={ [ComponentStyles.input ] }
                        blurOnSubmit= { true }
                        secureTextEntry = { true }
                        placeholder={'请输入密码'}
                        placeholderTextColor={ StyleConfig.color_gray }
                        underlineColorAndroid = { 'transparent' }
                        onChangeText = {(val)=>this.setState({password: val})}
                        value={ this.state.password } />
                    </View>
                    <TouchableOpacity
                        activeOpacity={ StyleConfig.touchable_press_opacity }
                        style={ [ComponentStyles.btn, ComponentStyles.btn_primary] }
                        onPress={() => this.handleLogin()}>
                        <Text style={ ComponentStyles.btn_text }>
                            登录
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


export default AwesomeProject;
