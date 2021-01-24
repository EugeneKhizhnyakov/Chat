import React,{useState,useEffect, useContext} from 'react';
import {NavLink} from 'react-router-dom';
import { SignContext } from '../context/SignContext';
import axios from 'axios';


export const Sign = () =>{
  const sign = useContext(SignContext);
  const [form, setForm] = useState({
   login:'', password:''
  })
  const [ swap, setSwap] = useState(true);

  const swapHandler = () => {
    setSwap(prevHide => !prevHide);
    setForm({login:'', password:''});
}


  const changeHandler = event =>{
    setForm({...form, [event.target.name]: event.target.value})
  }

  const loginHandler = async () => {
    try{
        const res = await axios.post('/sign/signin', {...form});
        console.log(res);
        sign.login(res.data.token, res.data.userId, res.data.userName);
    }catch (e){}
  }
  const regHandler = async () => {
    try{
        const res = await axios.post('/sign/signup', {...form});
        sign.login(res.data.token, res.data.userId, res.data.userName);
    }catch (e){}
  }

  return(
    <div className="join-block">
      {swap?
      <div> <h1>Sign In</h1>
      <hr />
      <input
        type="text"
        placeholder="Enter Email/login"
        name="login"
        id="login"
        value={form.login}
        onChange={changeHandler} 
        />
      <input type="password"
        placeholder="Enter Password"
        name="password"
        id="password"
        value={form.password}
        onChange={changeHandler} 
        />
      <hr />
      <button
        className="btn btn-success"
        onClick={loginHandler}
      >Sign In</button>
      <div>
        <p>Still haven't an account? <span className='link' onClick={swapHandler}> Sign up</span>.</p>
      </div>
      </div> 
      :<div> <h1>Sign Up</h1>
      <hr />
      <input
        type="text"
        placeholder="Enter Email/login"
        name="login"
        id="login"
        value={form.login}
        onChange={changeHandler} 
        />
      <input type="password"
        placeholder="Enter Password"
        name="password"
        id="password"
        value={form.password}
        onChange={changeHandler} 
        />
      <hr />
      <button
        className="btn btn-success"
        onClick={regHandler}
      >Sign In</button>
      <div>
        <p>Already have an account? <span className='link' onClick={swapHandler}> Sign in</span>.</p>
      </div>
      </div> 
      }
     
    </div>
  
    );
}

 

