export default (state, action) => {
    switch (action.type) {
      case 'JOINED':
        return {
          ...state,
          joined: true,
          userName: action.payload.userName,
          roomId: action.payload.roomId,
        };
  
      case 'SET_DATA':
        return {
          ...state,
          messages: action.payload.data
        };
  
      case 'NEW_MESSAGE':
        return {
          ...state,
          messages: [...state.messages, action.payload],
        };
  
      default:
        return state;
    }
  };