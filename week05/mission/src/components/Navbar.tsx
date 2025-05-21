import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ResponseMyInfoDto } from "../types/auth";
import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { accessToken } = useAuth();
  const [user, setUser] = useState<ResponseMyInfoDto | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (accessToken) {
        const res = await getMyInfo();
        setUser(res);
      }
    };
    fetchData();
  }, [accessToken]);

  return (
    <div className="flex justify-between items-center px-5 py-3 h-15 bg-[#202024]">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-pink-500 text-4xl font-bold hover:cursor-pointer hover:text-pink-700"
        >
          ≡
        </button>
        <button onClick={() => nav("")} className="text-2xl font-bold text-pink-600 cursor-pointer ">
          돌려돌려LP판
        </button>
      </div>
      <div className="flex gap-3">
        {!accessToken && (
          <>
            <button
              onClick={() => nav("login")}
              className="px-4 py-2 hover:bg-pink-500 text-white bg-gray-700 rounded-md cursor-pointer"
            >
              로그인
            </button>
            <button
              onClick={() => nav("signup")}
              className="px-4 py-2 hover:bg-pink-500 text-white bg-gray-700 rounded-md cursor-pointer"
            >
              회원가입
            </button>
          </>
        )}

        {accessToken && (
          <>
            <p className="pt-2 pr-2 text-pink-500"> {user?.data.name}님 반갑습니다.</p>
            <button
              onClick={() => nav("my")}
              className="px-4 py-2 hover:bg-pink-500 text-white bg-gray-700 rounded-md cursor-pointer"
            >
              로그아웃
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
