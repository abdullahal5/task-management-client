import { useContext } from "react";
import { AuthContext } from "../authprovider/Authprovider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  // console.log(loading)
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center h-[100vh] items-center">
        Loading ....
      </div>
    );
  }

  if (user) {
    return children;
  } else{
      return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
};

export default PrivateRoute;
