import { useTheme } from "./context/ThemeProvider";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 w-[150px;] rounded-full bg-light-button dark:bg-dark-button text-light-text dark:text-dark-tex "
    >
      {theme === "light" ? "🌙 다크 모드" : "☀️ 라이트 모드"}
    </button>
  );
};

export default ThemeToggleButton;
