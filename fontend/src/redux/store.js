import { configureStore } from '@reduxjs/toolkit';
import socketReducer from './socketReducer'; // Import rootReducer

const store = configureStore({
    reducer: {
      socket: socketReducer // Đặt reducer socket vào trong store
    }
  });
  
  export default store;