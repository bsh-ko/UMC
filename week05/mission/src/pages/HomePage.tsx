import React, { useEffect } from "react";
import { isAuthenticated } from "../apis/auth";
const Home = () => {
  useEffect(() => {
    if (isAuthenticated()) {
      console.log("로그인 상태입니다.");
    } else {
      console.log("로그아웃 상태입니다.");
    }
  }, []);

  return (
    <div>
      <h1>홈페이지</h1>
    </div>
  );
};

export default Home;
