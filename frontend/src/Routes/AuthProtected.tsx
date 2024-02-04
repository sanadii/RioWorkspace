import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser, getSettingOptions, logoutUser } from "../store/actions";
import { useProfile } from "../Components/Hooks/UserHooks";
import { setAuthorization } from "../helpers/api_helper";
import { Navigate } from "react-router-dom";

const AuthProtected = (props: any) => {
  const dispatch = useDispatch();
  const { userProfile, loading, token } = useProfile();

  useEffect(() => {
    // Dispatch actions after the component mounts
    dispatch(getCurrentUser());
    dispatch(getSettingOptions());

    if (userProfile && !loading && token) {
      setAuthorization(token);
    } else if (!userProfile && loading && !token) {
      dispatch(logoutUser());
    }
  }, [dispatch, userProfile, loading, token]);

  if (!userProfile && loading && !token) {
    return <Navigate to={{ pathname: "/login" }} />;
  }

  return <>{props.children}</>;
};

export default AuthProtected;
