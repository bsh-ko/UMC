import { useTheme } from "./context/ThemeProvider";

const ThemeContent = () => {
  const { theme } = useTheme();

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl h-screen font-semibold">
        현재 테마: {theme === "light" ? "☀️ 라이트 모드" : "🌙 다크 모드"}
      </h2>
    </div>
  );
};

export default ThemeContent;
