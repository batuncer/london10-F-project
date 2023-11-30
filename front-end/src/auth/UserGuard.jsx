import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAutContext";
import { useEffect } from "react";

export default function UserGuard({ children }) {
    const navigate = useNavigate();
    const { isInitialized, isAuthenticated } = useAuthContext()

    if (!isInitialized) {
        return children
    }
    if (!isAuthenticated) {
        navigate("/")
    }
    return children

}

