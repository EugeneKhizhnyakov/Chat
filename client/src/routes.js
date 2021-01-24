import React,{useReducer,useEffect} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import axios from 'axios';


import socket from './socket';

import reducer from './reducer';

import {JoinBlock} from './components/JoinBlock';
import {Chat} from './components/Chat';
import {Sign} from './components/Sign';



export const useRoutes = isSigned => {
   
  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomTitle: null,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  });

  const onLogin = async (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj,
    });
    socket.emit('join', obj);
    const { data } = await axios.get(`/rooms/${obj.roomId}`);
    console.log(data);
    dispatch({
      type: 'SET_DATA',
      payload: data,
    });
  };

  const addMessage = (message) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message,
    });
  };

  useEffect(() => {
    socket.on('message', addMessage);
  }, []);

  window.socket = socket;

    if(isSigned){
        return(
        <div className="wrapper">
            <Switch>
            <Route path='/' exact > 
              <JoinBlock onLogin={onLogin}/>
            </Route>
            <Route path='/chat'>
              <Chat {...state} onAddMessage={addMessage}/> 
            </Route>
            <Redirect to='/'/>
            </Switch>
          </div>

        );
    }
    return(
        <div className="wrapper">
            <Switch>
              <Route path='/sign' exact>
                <Sign/>
              </Route>
              <Redirect to='/sign'/>
            </Switch>
        </div>
    );
}