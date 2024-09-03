import { useState, useEffect } from "react";
import {Navigate} from 'react-router-dom';
import axios from "axios";

const ProtectedRoute = ({children}) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3333/check-auth', {withCredentials: true })
            .then(response => {
                setAuthenticated(true);
            })
            .catch(error => {
                setAuthenticated(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        authenticated ? children : <Navigate to="/login" />
    );
}

export default ProtectedRoute;