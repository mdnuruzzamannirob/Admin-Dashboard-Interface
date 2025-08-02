// import useAuth from "../hooks/useAuth";
// import PropTypes from "prop-types";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

type User = { email?: string } | null;

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user, loader } = { user: null as User, loader: false }; //useAuth();
  const location = useLocation();

  if (loader) {
    return (
      <p className="h-screen flex items-center justify-center">Loading...</p>
    );
  }

  if (!user?.email) {
    return <Navigate to={"/login"} state={location.pathname}></Navigate>;
  }
  return children;
};
// PrivateRoute.propTypes = {
//   children: PropTypes.node,
// };
export default PrivateRoute;
