import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './calendarSlice';
import expenseReducer from './expenseSlice';

const createDebugger = require('redux-flipper').default;

const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    calendar: calendarReducer,
  },
  middleware: getDefaultMiddleware =>
    __DEV__
      ? getDefaultMiddleware({ serializableCheck: false }).concat(
          createDebugger(),
        )
      : getDefaultMiddleware({
          serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
