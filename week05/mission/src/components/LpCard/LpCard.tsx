import { useState } from "react";
import { Lp } from "../../types/lp";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const cardClick = () => {
    if (!accessToken) {
      const confirmed = window.confirm("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
      if (confirmed) {
        navigate("/login");
      }
    } else {
      navigate(`/lp/${lp.id}`);
    }
  };

  return (
    <div
      key={lp.id}
      onClick={cardClick}
      className="relative aspect-square overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="object-cover w-full h-full transition duration-300 ease-in-out"
      />
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4 text-center transition-opacity duration-300">
          <h2 className="text-lg font-bold">{lp.title}</h2>
          <p className="text-sm mt-2">{new Date(lp.createdAt).toLocaleDateString()}</p>
          <p className="text-sm mt-1">❤️ {lp.likes.length}</p>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-2">
        <h3 className="text-white text-sm font-semibold truncate">{lp.title}</h3>
      </div>
    </div>
  );
};

export default LpCard;
