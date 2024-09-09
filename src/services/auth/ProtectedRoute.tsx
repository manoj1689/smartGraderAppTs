import { Outlet, Navigate, useLocation } from 'react-router-dom';
import SideBar from "../../components/common/Sidebar/SideBar";
import MobileBar from "../../components/common/Header/MobileBar";
import { getLogged } from '../../utils/tokenUtils';

function ProtectedRoute() {
  const auth = getLogged();
  const location = useLocation();
  
  // Check if the current page is either Interview or Coding Set
  const isInterviewOrCodingPage = location.pathname.includes('/question/') || location.pathname.includes('/codingSet/')|| location.pathname.includes('/job/');

  return auth ? (
    <div className="flex flex-col md:flex-row">
      {/* Show MobileBar only if not on Interview or CodingSet page */}
      {!isInterviewOrCodingPage && (
        <div className="lg:hidden fixed top-0 left-0 w-full z-50"> 
          <MobileBar />
        </div>
      )}
      {/* Show SideBar only if not on Interview or CodingSet page */}
      {!isInterviewOrCodingPage && (
        <div className="hidden lg:block"> 
          <SideBar />
        </div>
      )}
      {/* Adjust layout depending on whether it's an Interview or CodingSet page */}
      <div className={`flex-grow ${isInterviewOrCodingPage ? 'ml-0' : 'ml-0 lg:ml-56 xl:ml-64'}`}> 
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
}

export default ProtectedRoute;



