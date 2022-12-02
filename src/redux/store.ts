import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './calendarSlice';
import expenseReducer from './expenseSlice';
import incomeReducer from './incomeSlice';

const createDebugger = require('redux-flipper').default;

const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    incomde: incomeReducer,
    calendar: calendarReducer
  },
  middleware: getDefaultMiddleware =>
    __DEV__
      ? getDefaultMiddleware({ serializableCheck: false }).concat(createDebugger())
      : getDefaultMiddleware({
          serializableCheck: false
        })
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
