import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector(s => s.auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user || user.role !== "recruiter") {
            navigate("/");
        }
    }, [])
    return (
        <>
            {children}</>
    )
}

export default ProtectedRoute