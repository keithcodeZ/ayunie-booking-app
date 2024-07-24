import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

type Props = {
  selectedStars: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const StarRatingFilter = ({ selectedStars, onChange }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  useEffect(() => {
    const content = contentRef.current;
    if (content) {
      content.style.transition = "max-height 0.3s ease-in-out";
      if (isCollapsed) {
        content.style.maxHeight = "0px";
      } else {
        content.style.maxHeight = `${content.scrollHeight}px`;
      }
    }
  }, [isCollapsed]);

  return (
    <div className="border-b border-slate-300 pb-5">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold">Property Rating</h4>
        <button onClick={toggleCollapse} className="text-gray-600">
          {isCollapsed ? <FaChevronDown /> : <FaChevronUp />}
        </button>
      </div>
      <div
        ref={contentRef}
        style={{
          maxHeight: "0px",
          overflow: "hidden",
          transition: "max-height 0.3s ease-in-out",
        }}
      >
        {["5", "4", "3", "2", "1"].map((star) => (
          <label className="flex items-center text-sm space-x-2" key={star}>
            <input
              type="checkbox"
              className="rounded"
              value={star}
              checked={selectedStars.includes(star)}
              onChange={onChange}
            />
            <span>{star} Stars</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default StarRatingFilter;