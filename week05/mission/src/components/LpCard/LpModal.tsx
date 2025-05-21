import { useRef, useState } from "react";
import usePostLp from "../../hooks/mutations/usePostLp";

interface LpModalProps {
  onClose: () => void;
}

const LpModal = ({ onClose }: LpModalProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const { mutate, isPending } = usePostLp();

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleDeleteTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = () => {
    mutate(
      {
        title,
        content,
        tags,
        image,
        isAuthenticated: false, // ✅ 인증이 필요한 경우 true로 바꾸면 됨
      },
      {
        onSuccess: () => {
          onClose(); // 성공 시 모달 닫기
          console.log("LP 등록 성공");
        },
        onError: (err) => {
          console.error("LP 등록 실패", err);
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative space-y-4">
        <button className="absolute top-3 right-3 text-xl" onClick={onClose}>
          ❌
        </button>

        <div>
          <div
            className="w-full h-40 border-dashed border-2 border-gray-300 flex items-center justify-center rounded-md cursor-pointer"
            onClick={handleImageClick}
          >
            {image ? (
              <img src={URL.createObjectURL(image)} alt="preview" className="max-h-full object-contain" />
            ) : (
              <span className="text-gray-500">클릭하여 업로드</span>
            )}
            <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold">LP Name</label>
          <input
            type="text"
            className="w-full border rounded-md p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">LP Content</label>
          <textarea
            className="w-full border rounded-md p-2"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">LP Tag</label>
          <div className="flex space-x-2">
            <input
              type="text"
              className="flex-1 border rounded-md p-2"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
            />
            <button onClick={handleAddTag} className="px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <div key={tag} className="bg-gray-200 px-3 py-1 rounded-full flex items-center space-x-2">
                <span>{tag}</span>
                <button onClick={() => handleDeleteTag(tag)} className="text-sm text-red-500">
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="w-full py-2 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600 disabled:bg-gray-400"
        >
          {isPending ? "등록 중..." : "등록하기"}
        </button>
      </div>
    </div>
  );
};

export default LpModal;
