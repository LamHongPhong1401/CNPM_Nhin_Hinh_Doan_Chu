import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    socket: null // Trạng thái ban đầu của socket là null
  };
  
  const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
      setSocket(state, action) {
        state.socket = action.payload; // Thiết lập socket vào trạng thái mới
      }
    }
  });
  
  export const { setSocket } = socketSlice.actions;
  
  export default socketSlice.reducer;