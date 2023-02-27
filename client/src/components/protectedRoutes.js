import React from 'react'
import {Navigate} from 'react-router-dom'


function protectedRoutes({children}) {
    if(localStorage.getItem('token')){
        return children;
    }
    else{
        return <Navigate to="/login"/>
    }
}

export default protectedRoutes;
