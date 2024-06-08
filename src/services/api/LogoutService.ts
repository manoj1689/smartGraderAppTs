
import { removeToken, removeEmail, removeLogged } from '../../utils/tokenUtils';

const LogoutService = () => {
 
  removeToken();
  removeEmail();
  removeLogged();
 
};

export default LogoutService;
