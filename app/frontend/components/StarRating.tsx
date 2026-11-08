import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
  value: number;
  name?: string;
  onChange?: (rating: number) => void;
  label?: string;
  required?: boolean;
  readonly?: boolean;
}

const StarRating = ({
  value,
  name,
  onChange,
  label,
  required,
  readonly,
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (rating: number) => {
    if (onChange) onChange(rating);
  };

  const handleStarHover = (rating: number) => {
    setHoverRating(rating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const getStarColor = (starIndex: number, readonly = false) => {
    const currentRating = hoverRating || value;
    if (starIndex <= currentRating) {
      return "text-tinta-500 fill-tinta-500";
    }
    if (readonly) return "text-tinta-200";

    return "text-tinta-200 hover:text-tinta-500";
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="label">
          {label} {required && <span className="text-tinta-500">*</span>}
        </label>
      )}
      <div
        className="flex items-center space-x-1"
        onMouseLeave={handleMouseLeave}
      >
        {readonly &&
          [1, 2, 3, 4, 5].map((starIndex) => (
            <span key={starIndex} className={getStarColor(starIndex, true)}>
              <Star className="h-8 w-8" />
            </span>
          ))}
        {!readonly &&
          [1, 2, 3, 4, 5].map((starIndex) => (
            <button
              key={starIndex}
              type="button"
              name={`${name}[${starIndex}]`}
              onClick={() => handleStarClick(starIndex)}
              onMouseEnter={() => handleStarHover(starIndex)}
              className={`focus-visible:outline-marca-azul transition-all duration-150 hover:scale-110 focus:outline-none focus-visible:outline-2 ${getStarColor(starIndex)}`}
              aria-label={`Rate ${starIndex} star${starIndex !== 1 ? "s" : ""}`}
            >
              <Star className="h-8 w-8" />
            </button>
          ))}
        {(hoverRating || value) > 0 && (
          <span className="text-texto-apoio ml-3 text-sm font-medium">
            {hoverRating || value}/5
          </span>
        )}
      </div>
    </div>
  );
};

export default StarRating;
