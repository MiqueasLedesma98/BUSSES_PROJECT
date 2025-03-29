import React, { useCallback, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [authState, setAuthState] = useState(() => {
    const user = localStorage.getItem("user");

    return {
      auth: !!localStorage.getItem("x-token"),
      user: user ? JSON.parse(user) : null,
    };
  });

  const login = useCallback(
    async (form) => {
      try {
        const { data } = await api.post("/auth/login", form);

        const { user, token } = data;
        localStorage.setItem("x-token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setAuthState(() => ({ user, auth: true }));
        navigate("/dashboard/content", { replace: true });
      } catch (error) {
        console.log(error);
      }
    },
    [navigate]
  );

  const logout = useCallback(async () => {
    try {
      localStorage.clear();
      setAuthState({ auth: false, user: null });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, ...authState }}>
      {children}
    </AuthContext.Provider>
  );
};

// Removed useAuthContext to comply with react-refresh rules.
