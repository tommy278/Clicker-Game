import {Navigate} from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

function AuthRoute ({children}) {
    const { isAuthenticated } = useContext(AuthContext);
    if (isAuthenticated) return <Navigate to='/' replace={true} />;
    return children;
}
export default AuthRoute;