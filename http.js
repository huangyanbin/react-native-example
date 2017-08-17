/**
 * Created by huang on 2017/8/16.
 */
import React from 'react';
import {
    fetch
} from 'react-native';
function login(userName,password,loginCallback) {
    fetch('http://193.28.20.62:8889/user/login', {
        method: 'POST',
        body: 'userName='+userName+'&password='+password
    }).then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.code ===1){
                loginCallback(true,responseJson.data);
            }else{
                loginCallback(false,responseJson.result);
            }
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
            loginCallback(false,"网络错误");
        });
}