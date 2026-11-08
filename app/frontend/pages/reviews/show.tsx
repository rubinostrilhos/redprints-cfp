import { Link, useForm, usePage } from "@inertiajs/react";
import { AlertCircleIcon, ArrowLeftIcon, UserIcon } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";

import Layout from "@/components/Layout";
import StarRating from "@/components/StarRating";
import TextAreaWithCounter from "@/components/TextAreaWithCounter";
import type { Review } from "@/serializers";

interface ShowProps {
  review: Review;
}

export default function Show({ review }: ShowProps) {
  const { user } = usePage().props;

  const { data, setData, patch, errors } = useForm({
    review: {
      comment: review.comment ?? "",
      scores: review.scores ?? ({} as Record<string, number>),
    },
  });

  // Inertia's type inference for errors doesn't support nesting?
  const formErrors = errors as Partial<{ scores: string[]; comment: string[] }>;

  const [editing, setEditing] = useState(false);

  const proposal = review.proposal!;

  const hasReviewed = review.status === "submitted";

  // Check if submissions are allowed
  const submissionsAllowed = review.evaluation?.submissions_allowed ?? true;

  function submitReview(e: FormEvent) {
    e.preventDefault();
    patch(`/reviews/${review.id}`, { preserveScroll: true });
  }

  return (
    <Layout currentUser={user}>
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href={`/evaluations/${review.evaluation!.id}/reviews`}
          className="rotulo hover:text-texto mb-6 flex items-center transition-colors"
        >
          <ArrowLeftIcon className="mr-1 h-4 w-4" />
          Back to evaluation
        </Link>

        <div className="mx-auto max-w-4xl">
          {/* Talk Information */}
          <div className="card animate-slide-up mb-8 border">
            <h2 className="section-title border-traco mb-6 border-b pb-4">
              Proposal Information
            </h2>

            <div className="space-y-6">
              <div className="flex items-center">
                <h1 className="page-title mr-3 mb-3">{proposal.title}</h1>
              </div>

              <div>
                <h3 className="rotulo mb-2">Track</h3>
                <p className="text-tinta-800">{proposal.track}</p>
              </div>

              <div>
                <h3 className="rotulo mb-2">Abstract</h3>
                <p className="text-tinta-800 whitespace-pre-line">
                  {proposal.abstract}
                </p>
              </div>

              <div>
                <h3 className="rotulo mb-2">Detailed Description</h3>
                <p className="text-tinta-800 whitespace-pre-line">
                  {proposal.details}
                </p>
              </div>

              <div>
                <h3 className="rotulo mb-2">Why this talk matters</h3>
                <p className="text-tinta-800 whitespace-pre-line">
                  {proposal.pitch}
                </p>
              </div>
            </div>
          </div>

          {/* Speaker Information */}
          {review.speaker && (
            <div
              className="card animate-slide-up mb-8"
              style={{ animationDelay: "0.1s" }}
            >
              <h2 className="section-title border-traco mb-6 border-b pb-4">
                Speaker Profile
              </h2>

              <div className="space-y-6">
                <div className="float-right">
                  {review.speaker.photo_url ? (
                    <img
                      src={review.speaker.photo_url}
                      alt={`${review.speaker.name}'s profile photo`}
                      className="border-tinta-500 h-32 w-32 border object-cover"
                    />
                  ) : (
                    <div className="border-tinta-500 flex h-32 w-32 items-center justify-center border">
                      <UserIcon className="text-tinta-200 h-16 w-16" />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="rotulo mb-2">Name</h3>
                    <p className="text-tinta-800">{review.speaker.name}</p>
                  </div>

                  <div>
                    <h3 className="rotulo mb-2">Email</h3>
                    <p className="text-tinta-800">{review.speaker.email}</p>
                  </div>
                </div>

                <div>
                  <h3 className="rotulo mb-2">Company/Organization</h3>
                  <p className="text-tinta-800">
                    {review.speaker.role && (
                      <span>{review.speaker.role} @ </span>
                    )}
                    {review.speaker.company ?? "—"}
                  </p>
                </div>

                <div>
                  <h3 className="rotulo mb-2">Bio</h3>
                  <p className="text-tinta-800 whitespace-pre-line">
                    {review.speaker.bio}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="rotulo mb-2">Socials</h3>
                    <p className="text-tinta-800">
                      {review.speaker.socials ?? "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Review Information */}
          <div
            className="card animate-slide-up mb-8"
            style={{ animationDelay: "0.1s" }}
          >
            {/* Show a deadline message if submissions not allowed and review not submitted */}
            {!submissionsAllowed && !hasReviewed && (
              <div className="border-error-600 mb-6 border border-l-[6px] bg-white p-4">
                <div className="flex items-center">
                  <AlertCircleIcon className="text-error-600 mr-2 h-5 w-5" />
                  <p className="text-error-600">
                    The evaluation deadline has passed. You can no longer submit
                    a review for this proposal.
                  </p>
                </div>
              </div>
            )}

            {(!hasReviewed || editing) && submissionsAllowed && (
              <>
                <h2 className="section-title border-traco mb-6 border-b pb-4">
                  Submit Review
                </h2>
                <form onSubmit={submitReview} className="space-y-6">
                  <div className="flex flex-wrap space-x-4">
                    {review.evaluation?.criteria?.map((category) => (
                      <div key={category} className="w-[30%]">
                        <StarRating
                          name={category}
                          label={category}
                          value={data.review.scores[category]}
                          onChange={(value) =>
                            setData(`review.scores.${category}`, value)
                          }
                          required
                        />
                      </div>
                    ))}
                  </div>
                  {formErrors.scores && (
                    <p className="text-error-600 mb-4 text-sm">
                      Scores {formErrors.scores.join(", ")}
                    </p>
                  )}

                  <div>
                    <label className="label" htmlFor="comment">
                      Review Comment
                    </label>
                    <TextAreaWithCounter
                      id="comment"
                      value={data.review.comment}
                      onChange={(val) => setData("review.comment", val)}
                      maxLength={400}
                      placeholder="Provide detailed feedback for the proposal"
                    />
                  </div>

                  <div
                    className="animate-slide-up flex flex-col justify-start space-y-4 sm:flex-row-reverse sm:space-y-0 sm:space-x-4 sm:space-x-reverse"
                    style={{ animationDelay: "0.2s" }}
                  >
                    {hasReviewed && (
                      <button
                        className="btn btn-outline flex cursor-pointer items-center justify-center"
                        onClick={() => {
                          setEditing(false);
                        }}
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      className="btn btn-primary flex cursor-pointer items-center justify-center"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              </>
            )}

            {hasReviewed && !editing && (
              <>
                <h2 className="section-title border-traco mb-6 border-b pb-4">
                  Your Review
                </h2>
                <div className="border-traco border-b pb-6 last:border-0 last:pb-0">
                  <div className="mb-4 grid grid-cols-3 gap-4">
                    {review.evaluation?.criteria?.map((category) => (
                      <div key={category}>
                        <StarRating
                          label={category}
                          value={review.scores?.[category]}
                          readonly
                        />
                      </div>
                    ))}
                  </div>
                  <hr className="my-4" />
                  <p className="text-tinta-800 whitespace-pre-line">
                    {review.comment}
                  </p>
                  <div
                    className="animate-slide-up flex flex-col justify-start space-y-4 sm:flex-row-reverse sm:space-y-0 sm:space-x-4 sm:space-x-reverse"
                    style={{ animationDelay: "0.2s" }}
                  >
                    {submissionsAllowed && (
                      <button
                        className="btn btn-outline flex cursor-pointer items-center justify-center"
                        onClick={() => setEditing(true)}
                      >
                        Edit Review
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
