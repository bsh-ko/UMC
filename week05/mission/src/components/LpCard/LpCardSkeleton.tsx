const LpCardSkeleton = () => {
  return (
    <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg animate-pulse">
      {/* 로딩 배경 */}
      <div className="bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 w-full h-full"></div>

      {/* 텍스트 영역 */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-3">
        <div className="bg-gray-400 h-4 w-3/4 mb-2 rounded-sm"></div> {/* 제목 */}
        <div className="bg-gray-400 h-3 w-full rounded-sm"></div> {/* 설명 텍스트 */}
      </div>
    </div>
  );
};

export default LpCardSkeleton;
