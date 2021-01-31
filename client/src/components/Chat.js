import React,{useState,useRef,useEffect} from 'react';
import socket from '../socket';

export const Chat = ({ messages, userName, roomId, onAddMessage }) => {
  const [messageValue, setMessageValue] = useState('');
  const messagesRef = useRef(null);

  const onSendMessage = () => {
    socket.emit('message', {
      userName,
      roomId,
      text: messageValue,
    });
    onAddMessage({ userName, text: messageValue, });
    setMessageValue('');
  };

  useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [messages]);

  return (
    <div>      

      <div className="chat">
        <div className="chat-users">
          
          <hr/>
          Room:<b>{roomId}</b>
          <hr/>
        </div>
        <div className="chat-messages">
          <div ref={messagesRef} className="messages">
            {messages.map((message) => (
              <div className="message">
                <p>{message.text}</p>
                <div>
                  <span>{message.userName}</span>
                </div>
              </div>
            ))}
          </div>
          <form>
            <textarea
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
              className="form-control"
              rows="3"></textarea>
            <button onClick={()=>messageValue?onSendMessage(): alert('Wrong data')} type="button" className="btn btn-primary">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;