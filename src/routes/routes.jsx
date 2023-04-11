import React from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import { Home } from '../features/home';
import { NewList } from '../features/new-list';

export const AppRoutes = () => (
    <Routes>
        <Route path='/' element={<Navigate replace to="/lists" />} />
        <Route path='/lists' element={<Home/>}/>
        <Route path='/lists/new' element={<NewList/>}/>
        <Route path='/lists/:id' element={<NewList/>}/>
    </Routes>
);

export default AppRoutes;