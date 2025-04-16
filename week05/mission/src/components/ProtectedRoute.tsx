import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_KEY } from "../constants/key";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
      console.log("ProtectedRoute - token check:", token); // 디버깅용

      if (!token) {
        navigate("/login", { replace: true });
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, [navigate]);

  // 인증 상태가 확인될 때까지 로딩 표시
  if (isAuthenticated === null) {
    return <div>인증 확인 중...</div>;
  }

  console.log("protected 실행 !!!!! ");
  // 인증되었을 때만 children 렌더링
  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
