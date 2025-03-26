import { ThemeProvider } from "./context/ThemeProvider";
import Navbar from "./Navbar";
import ThemeContent from "./ThemeContent";

const ContextPage = () => {
  return (
    <ThemeProvider>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen p-6">
        <ThemeContent />
      </main>
    </ThemeProvider>
  );
};

export default ContextPage;

/**
 * 
 * 1️⃣ ThemeProvider.tsx (테마 상태 관리)

useState로 "light" / "dark" 상태 저장

localStorage에 저장해 새로고침해도 유지

document.documentElement.classList.toggle("dark")로 테마 변경 적용

2️⃣ useTheme() (컨텍스트 사용)

Navbar.tsx, ThemeToggleButton.tsx에서 useTheme()로 테마 상태 가져옴

버튼 클릭 시 toggleTheme() 실행 → 테마 변경

3️⃣ Tailwind CSS 적용

dark:bg-dark-background처럼 dark: 프리픽스로 스타일 변경

<html class="dark">가 추가되면 자동 적용

✅ 버튼 클릭 → 상태 변경 → Tailwind 스타일 자동 적용 🚀


 */
