import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import SideBar from "../../components/common/Sidebar/SideBar"
import MobileBar from "../../components/common/Header/mobileBar";
import { getLogged } from '../../utils/tokenUtils';

function ProtectedRoute() {
    const auth = getLogged();
    return auth ? (
        <div className="flex flex-col md:flex-row min-h-screen">
            <div className="md:hidden fixed top-0 left-0 w-full z-50"> 
                <MobileBar />
            </div>
            <div className="hidden md:block fixed top-0 left-0 h-full z-30"> 
                <SideBar />
            </div>
            <div className="flex-grow mt-16 md:mt-0 md:ml-1/4"> 
                <Outlet />
            </div>
        </div>
    ) : (
        <Navigate to="/" />
    );
}

export default ProtectedRoute;

