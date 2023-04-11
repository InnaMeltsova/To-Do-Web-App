import { configureStore } from '@reduxjs/toolkit';
import lists from './lists';
import auth from './auth';

export default configureStore({
    reducer: {
        lists,
        auth
    }
});