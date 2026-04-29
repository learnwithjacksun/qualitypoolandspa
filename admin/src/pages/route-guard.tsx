import { Loader } from "lucide-react";
import { useAuth } from "../hooks";
import { Navigate, Outlet } from "react-router-dom";

export default function RouteGuard() {
  const { isCheckingAuth, admin } = useAuth();
  if (isCheckingAuth || !admin) {
    return (
      <>
        <div className="min-h-dvh center">
          <div className=" flex items-center justify-center gap-4">
            <Loader className="w-4 h-4 animate-spin" />
            Checking authentication...
          </div>
        </div>
      </>
    );
  }
  return !isCheckingAuth && admin ? <Outlet /> : <Navigate to="/" />;
}
