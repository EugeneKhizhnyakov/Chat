import {createContext} from 'react';

function noop (){

}

export const SignContext = createContext({
    token:null,
    userId:null,
    userName:null,
    login: noop,
    logout: noop,
    isSigned: false
})