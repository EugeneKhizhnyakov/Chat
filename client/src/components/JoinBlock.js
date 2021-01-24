import React,{useContext,useState} from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import { SignContext } from '../context/SignContext';


export const JoinBlock = ({ onLogin }) => {
  const [roomId, setRoomId] = useState('');
  const [isLoading, setLoading] = useState(false);
  const sign = useContext(SignContext);
  const history = useHistory();
  const userName = sign.userName;
  const userId = sign.userId;

  const logoutHandler = event => {
      event.preventDefault();
      sign.logout();
      history.push('/');
  }

  const onEnter = async () => {
    if (!roomId || !userName) {
      return alert('Wrong data');
    }
    const obj = {
      roomId,
      userName,
      userId
    };
    setLoading(true);
    await axios.post('/rooms/', obj);
    onLogin(obj);
  };

  return (
    <div className="join-block">
      <h3>Start chating as {userName}</h3>
      <input
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <Link onClick={event=> (!userName || !roomId)? event.preventDefault() : null} to={`/chat?name=${userName}&room=${roomId}`}>      
        <button disabled={isLoading} onClick={onEnter} className="btn btn-success">
          {isLoading ? 'JOINING...' : 'JOIN'}
        </button>
      </Link>
      <button className="btn btn-success" onClick={logoutHandler}>
         LOG OUT
        </button>
    </div>
  );
}

export default JoinBlock;