import { ThemeProvider } from "./context/ThemeProvider";
import Navbar from "./Navbar";
import ThemeContent from "./ThemeContent";

const ContextPage = () => {
  return (
    <ThemeProvider>
      <Navbar />
      <main className="p-6">
        <ThemeContent />
      </main>
    </ThemeProvider>
  );
};

export default ContextPage;
