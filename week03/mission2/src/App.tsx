import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import MoviePage from "./pages/MoviePage";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/movies/popular" />} />
        <Route path="/movies/:category" element={<MoviePage />} />
      </Routes>
    </BrowserRouter>
  );
}
