interface ReviewScoresProps {
  scores: Record<string, number> | undefined;
}

const scoreClass = (value: number) => {
  switch (value) {
    case 1:
      return "font-semibold bg-error-600 text-white border-error-600";
    case 2:
      return "border-error-600 text-error-600 bg-white";
    case 4:
      return "border-marca-verde text-marca-verde bg-white";
    case 5:
      return "border-marca-verde bg-marca-verde font-semibold text-creme-100";
    default:
      return "bg-white border-traco text-tinta-800";
  }
};

const ReviewScores = ({ scores }: ReviewScoresProps) => {
  if (!scores || Object.keys(scores).length === 0) {
    return null;
  }

  return (
    <div className="text-texto-apoio font-mono text-xs">
      {Object.values(scores).map((score, index) => (
        <span
          key={index}
          className={`${scoreClass(score)} mx-1 border px-1 py-0.5`}
        >
          {score}
        </span>
      ))}
    </div>
  );
};

export default ReviewScores;
