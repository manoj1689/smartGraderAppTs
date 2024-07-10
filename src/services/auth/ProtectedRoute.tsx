import { Outlet, Navigate, useLocation } from 'react-router-dom';
import SideBar from "../../components/common/Sidebar/SideBar";
import MobileBar from "../../components/common/Header/MobileBar";
import { getLogged } from '../../utils/tokenUtils';

function ProtectedRoute() {
  const auth = getLogged();
  const location = useLocation();
  const isInterviewPage = location.pathname.includes('/question/');

  return auth ? (
    <div className="flex flex-col md:flex-row">
      {!isInterviewPage && (
        <div className="lg:hidden fixed top-0 left-0 w-full z-50"> 
          <MobileBar />
        </div>
      )}
      {!isInterviewPage && (
        <div className="hidden lg:block"> 
          <SideBar />
        </div>
      )}
      <div className={`flex-grow ${isInterviewPage ? 'ml-0' : 'ml-0 lg:ml-64'}`}> 
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
}

export default ProtectedRoute;


