
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingView from './pages/LandingView';
import FlightInfo from './pages/FlightInfo';
import BookingInfo from './pages/BookingInfo';
import Login from './pages/Login';





export default function AppRoutes(props) {




    return(
     <BrowserRouter>
         <Routes> 
            <Route path='/' element={<Login/>}/>
            <Route path='/view-lading' element = {<LandingView/>} />
            <Route path='/view-q-info' element = {<FlightInfo/>} />
            <Route path='/book-flight/:flid' element = {<BookingInfo/>} />
         </Routes>
     </BrowserRouter>

    )
}


