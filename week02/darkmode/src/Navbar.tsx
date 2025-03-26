import ThemeToggleButton from "./ThemeToggleButton";

const Navbar = () => {
  return (
    <nav className="p-4 shadow-md flex justify-between items-center bg-white dark:bg-gray-800 transition-all duration-500">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">BREN - darkmode</h1>
      <ThemeToggleButton />
    </nav>
  );
};

export default Navbar;
