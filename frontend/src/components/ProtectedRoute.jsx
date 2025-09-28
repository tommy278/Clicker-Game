import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

function ProtectedRoute({children}) {
    const { isAuthenticated } = useContext(AuthContext)
    if (!isAuthenticated) return <Navigate to='/login' replace={true} />
    return children;
}

export default ProtectedRoute;