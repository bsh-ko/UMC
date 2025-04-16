import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useNavigate } from "react-router-dom";
import { removeTokens } from "../apis/auth";
// import { useAuth } from "../context/AuthContext";
import { axiosInstance } from "../apis/axios";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState<ResponseMyInfoDto["data"] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  // const { logout } = useAuth();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await getMyInfo();
        setUserInfo(response.data);
        console.log("리스폰스 : ", response);
      } catch (err) {
        console.error("Error fetching user info:", err);
        setError("사용자 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-pink-500 text-xl">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-red-500 text-xl">{error}</div>
        <button
          className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-700"
          onClick={() => window.location.reload()}
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-red-500 text-xl">사용자 정보가 없습니다</div>
      </div>
    );
  }

  // 날짜 포맷팅 함수
  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // 로그아웃 함수
  const handleLogout = () => {
    removeTokens();
    axiosInstance.defaults.headers.common["Authorization"] = "";
    navigate("/");
  };

  return (
    <div className="flex flex-col max-w-4xl mx-auto p-4 text-white">
      <h1 className="text-2xl font-bold mb-8">마이페이지</h1>

      {/* 프로필 섹션 */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6 shadow-lg">
        <div className="flex items-center">
          <div className="w-24 h-24 rounded-full bg-gray-700 overflow-hidden mr-6">
            {/* 프로필 이미지 */}
            <img
              src={userInfo.avatar || "https://via.placeholder.com/150"}
              alt="프로필 이미지"
              className="w-full h-full object-cover"
              onError={(e) => {
                // 이미지 로드 오류 시 기본 이미지로 대체
                (e.target as HTMLImageElement).src = "https://via.placeholder.com/150";
              }}
            />
          </div>
          <div>
            <h2 className="text-xl font-bold">{userInfo.name}</h2>
            <p className="text-gray-400">{userInfo.email}</p>
            <p className="text-sm text-gray-500 mt-1">가입일: {formatDate(userInfo.createAt)}</p>
          </div>
          <button className="ml-auto px-4 py-2 bg-pink-500 hover:bg-pink-700 rounded-md transition-colors">
            프로필 수정
          </button>
          <button className="cursor-pointer bg-blue-300 rounded-sm p-5 hover:scale-90" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      </div>

      {/* 계정 정보 섹션 */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">계정 정보</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex flex-col">
              <span className="text-gray-400 text-sm">이름</span>
              <span>{userInfo.name}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex flex-col">
              <span className="text-gray-400 text-sm">이메일</span>
              <span>{userInfo.email}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex flex-col">
              <span className="text-gray-400 text-sm">회원 ID</span>
              <span>{userInfo.id}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex flex-col">
              <span className="text-gray-400 text-sm">가입일</span>
              <span>{formatDate(userInfo.createAt)}</span>
            </div>
          </div>
        </div>

        {/* 바이오 섹션 */}
        {userInfo.bio && (
          <div className="mt-4">
            <div className="flex flex-col">
              <span className="text-gray-400 text-sm">소개</span>
              <div className="p-3 bg-gray-700 rounded-md mt-1">{userInfo.bio}</div>
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-gray-700">
          <button className="text-pink-500 hover:text-pink-700 mr-4 transition-colors">비밀번호 변경</button>
          <button className="text-red-500 hover:text-red-700 transition-colors">계정 삭제</button>
        </div>
      </div>

      {/* 계정 활동 섹션 */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">계정 활동</h2>

        <div className="space-y-3">
          <div className="flex justify-between p-3 border-l-4 border-green-500 bg-gray-700 rounded-r-md">
            <span>최근 로그인</span>
            <span className="text-gray-400">{formatDate(new Date())}</span>
          </div>

          <div className="flex justify-between p-3 border-l-4 border-blue-500 bg-gray-700 rounded-r-md">
            <span>계정 생성</span>
            <span className="text-gray-400">{formatDate(userInfo.createAt)}</span>
          </div>

          <div className="flex justify-between p-3 border-l-4 border-yellow-500 bg-gray-700 rounded-r-md">
            <span>최근 정보 업데이트</span>
            <span className="text-gray-400">{formatDate(userInfo.updateAt)}</span>
          </div>
        </div>

        <div className="mt-6">
          <button className="w-full py-3 bg-pink-500 hover:bg-pink-700 rounded-md transition-colors">
            전체 활동 내역 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
