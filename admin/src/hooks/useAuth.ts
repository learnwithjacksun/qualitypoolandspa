import { toast } from "sonner";
import api from "../config/api";
import { useAuthStore } from "../store";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";


export default function useAuth() {
    const { token, admin, setToken, setAdmin, logout } = useAuthStore();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(false);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await api.post("/auth/login", { email, password });
            if (response.data.success) {
                setToken(response.data.token);
                setAdmin(response.data.admin);
                toast.success("Logged in successfully");
                navigate("/dashboard");
                return true;
            }
        } catch (error: unknown) {
            console.error(error);
            toast.error((error as AxiosError<{ message: string }>).response?.data.message);
            return false;
        } finally {
            setIsLoading(false);
        }
    }


    const logoutAdmin = () => {
        logout();
        navigate("/login");
        toast.success("Logged out successfully");
    }


    const checkAuth = useCallback(async () => {
        setIsCheckingAuth(true);
        try {
            const response = await api.post("/auth/check");
            if (response.data.success) {
                setToken(response.data.token);
                setAdmin(response.data.admin);
                return true;
            } else {
                logout();
                navigate("/");
                toast.success("Session expired, please login again");
                return false;
            }
        } catch (error: unknown) {
            console.error(error);
            navigate("/");
            // toast.error((error as AxiosError<{ message: string }>).response?.data.message);
            return false;
        } finally {
            setIsCheckingAuth(false);
        }
    }, [setToken, setAdmin, logout, navigate]);



    return {
        login,
        logout,
        token,
        admin,
        isLoading,
        logoutAdmin,
        checkAuth,
        isCheckingAuth,
    }
}