import { Link, router, usePage } from "@inertiajs/react";
import { ArrowLeftIcon, PencilIcon, TrashIcon, UserIcon } from "lucide-react";

import Layout from "@/components/Layout";
import StatusBadge from "@/components/StatusBadge";
import type { CFP, Proposal, SpeakerProfile } from "@/serializers";

interface ShowProps {
  proposal: Proposal;
  speaker: SpeakerProfile;
  cfp: CFP;
}

export default function Show({ proposal, speaker, cfp }: ShowProps) {
  const { user } = usePage().props;

  const handleConfirmProposal = () => {
    if (
      confirm(
        "Are you sure you want to confirm your participation in this proposal? This will notify the organizers that you will be presenting.",
      )
    ) {
      router.post(`/proposals/${proposal.id}/confirmation`);
    }
  };

  const hasFeedback =
    proposal.status === "accepted" ||
    proposal.status === "rejected" ||
    proposal.status === "waitlisted";

  const handleRetractProposal = () => {
    if (
      confirm(
        "Are you sure you want to retract this proposal? This action is irreversible and will permanently delete your proposal.",
      )
    ) {
      router.delete(`/proposals/${proposal.id}`);
    }
  };

  const fieldName = (field: string, defaultName: string) => {
    return cfp.field_names?.[field] ?? defaultName;
  };

  const hasTracks = Object.keys(cfp.tracks).length > 1;

  return (
    <Layout currentUser={user}>
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/proposals"
          className="rotulo hover:text-texto mb-6 flex items-center transition-colors"
        >
          <ArrowLeftIcon className="mr-1 h-4 w-4" />
          Back to My proposals
        </Link>

        <div className="mx-auto max-w-4xl">
          <div className="animate-fade-in mb-8 flex flex-col items-start justify-between sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center">
                <h1 className="page-title mr-3 mb-3">{proposal.title}</h1>
              </div>
              <div className="flex items-center space-x-2">
                <StatusBadge status={proposal.status} />
              </div>
              {proposal.status === "accepted" && (
                <div className="mt-2 flex items-center space-x-2">
                  <button
                    onClick={handleConfirmProposal}
                    className="btn btn-outline flex items-center text-nowrap sm:mt-0"
                  >
                    Confirm Participation
                  </button>
                </div>
              )}
            </div>
            <div className="flex flex-col items-start space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
              {proposal.can_edit && (
                <Link
                  href={`/proposals/${proposal.id}/edit`}
                  className="btn btn-outline mt-4 flex items-center text-nowrap sm:mt-0"
                >
                  <PencilIcon className="mr-2 h-5 w-5" />
                  Edit Proposal
                </Link>
              )}
              <button
                onClick={handleRetractProposal}
                className="btn btn-outline border-error-600 text-error-600 hover:bg-error-600/5 mt-4 flex cursor-pointer items-center text-nowrap sm:mt-0"
              >
                <TrashIcon className="mr-2 h-5 w-5" />
                Retract Proposal
              </button>
            </div>
          </div>

          {/* Talk Information */}
          <div className="card animate-slide-up mb-8 border">
            <h2 className="section-title border-traco mb-6 border-b pb-4">
              {fieldName("talk_header", "Talk Information")}
            </h2>

            <div className="space-y-6">
              {hasTracks && (
                <div>
                  <h3 className="rotulo mb-2">Track</h3>
                  <p className="text-tinta-800">{proposal.track}</p>
                </div>
              )}

              <div>
                <h3 className="rotulo mb-2">
                  {" "}
                  {fieldName("abstract", "Abstract")}
                </h3>
                <p className="text-tinta-800 whitespace-pre-line">
                  {proposal.abstract}
                </p>
              </div>

              <div>
                <h3 className="rotulo mb-2">
                  {fieldName("details", "Detailed Description")}
                </h3>
                <p className="text-tinta-800 whitespace-pre-line">
                  {proposal.details}
                </p>
              </div>

              <div>
                <h3 className="rotulo mb-2">
                  {fieldName("pitch", "Why this talk matters")}
                </h3>
                <p className="text-tinta-800 whitespace-pre-line">
                  {proposal.pitch}
                </p>
              </div>
            </div>
          </div>

          {/* Speaker Information */}
          <div
            className="card animate-slide-up mb-8"
            style={{ animationDelay: "0.1s" }}
          >
            <h2 className="section-title border-traco mb-6 border-b pb-4">
              Speaker Profile
            </h2>

            <div className="space-y-6">
              <div className="float-right">
                {speaker.photo_url ? (
                  <img
                    src={speaker.photo_url}
                    alt={`${speaker.name}'s profile photo`}
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
                  <p className="text-tinta-800">{speaker.name}</p>
                </div>

                <div>
                  <h3 className="rotulo mb-2">Email</h3>
                  <p className="text-tinta-800">{speaker.email}</p>
                </div>
              </div>

              <div>
                <h3 className="rotulo mb-2">Company/Organization</h3>
                <p className="text-tinta-800">
                  {speaker.role && <span>{speaker.role} @ </span>}
                  {speaker.company ?? "—"}
                </p>
              </div>

              <div>
                <h3 className="rotulo mb-2">Bio</h3>
                <p className="text-tinta-800 whitespace-pre-line">
                  {speaker.bio}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="rotulo mb-2">Socials</h3>
                  <p className="text-tinta-800">{speaker.socials ?? "—"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Status Information - Only shown for non-submitted proposals */}
          {hasFeedback && (
            <div
              className={`card border ${
                proposal.status === "accepted"
                  ? "border-accent-200 bg-accent-50"
                  : proposal.status === "rejected"
                    ? "border-error-200 bg-error-50"
                    : "border-warning-200 bg-warning-50"
              } animate-slide-up mb-8`}
              style={{ animationDelay: "0.2s" }}
            >
              <h2 className="section-title mb-4">
                Feedback from the Committee
              </h2>

              {proposal.status === "accepted" && (
                <>
                  <p className="text-accent-800">
                    Congratulations! Your proposal has been accepted. We’re
                    excited to have you speak at Tropical on Rails.
                  </p>
                </>
              )}

              {proposal.status === "confirmed" && (
                <>
                  <p className="text-accent-800">
                    Congratulations! You’re a part of our amazing program! See
                    you in São Paulo!
                  </p>
                </>
              )}

              {proposal.status === "rejected" && (
                <>
                  <p className="text-error-800 mb-4">
                    Thank you for your submission. After careful consideration,
                    we’ve decided not to include your talk in this year’s
                    program.
                  </p>
                </>
              )}

              {proposal.status === "waitlisted" && (
                <p className="text-warning-800">
                  Your proposal has been placed on our waitlist. We had many
                  excellent submissions and limited slots. We’ll contact you if
                  a spot becomes available. Thank you for your understanding.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
