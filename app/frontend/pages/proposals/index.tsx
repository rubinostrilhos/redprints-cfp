import { Head, Link, router, usePage } from "@inertiajs/react";
import { ArrowLeftIcon, PlusIcon } from "lucide-react";

import Layout from "@/components/Layout";
import StatusBadge from "@/components/StatusBadge";
import type { Proposal } from "@/serializers";

interface IndexProps {
  proposals: Proposal[];
}

export default function Index({ proposals }: IndexProps) {
  const { user, primary_cfp } = usePage().props;

  const cfp_closed = primary_cfp?.is_closed ?? true;

  // Helper function to format the date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "–";

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "2-digit",
    });
  };

  return (
    <Layout currentUser={user}>
      <Head title="My proposals" />

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="rotulo hover:text-texto mb-6 flex items-center transition-colors"
        >
          <ArrowLeftIcon className="mr-1 h-4 w-4" />
          Back home
        </Link>

        <div className="mx-auto max-w-4xl">
          <div className="animate-fade-in mb-8 flex flex-col items-start justify-between sm:flex-row sm:items-center">
            <div>
              <h1 className="page-title mb-3">My Proposals</h1>
              <p className="text-tinta-800">
                Track and manage your conference talk proposals
              </p>
            </div>
          </div>

          {proposals.length === 0 ? (
            <div className="card animate-slide-up py-16 text-center">
              <h3 className="text-texto mb-4 text-lg font-semibold">
                You haven’t submitted any proposals yet
              </h3>
              {!cfp_closed && (
                <>
                  <p className="text-tinta-800 mx-auto mb-8 max-w-md">
                    Share your knowledge with the Ruby community by submitting a
                    proposal for Tropical on Rails.
                  </p>
                  <Link
                    href={`/proposals/new`}
                    className="btn btn-primary inline-flex items-center"
                  >
                    <PlusIcon className="mr-2 h-5 w-5" />
                    Submit Your First Proposal
                  </Link>
                </>
              )}
            </div>
          ) : (
            <div className="card animate-slide-up overflow-hidden !p-0">
              <div className="overflow-x-auto">
                <table className="divide-traco min-w-full divide-y">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="rotulo border-tinta-500 w-2/3 border-b p-2 text-left sm:px-6 sm:py-3"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="rotulo border-tinta-500 border-b p-2 text-left sm:px-6 sm:py-3"
                      >
                        Track
                      </th>
                      <th
                        scope="col"
                        className="rotulo border-tinta-500 border-b p-2 text-left sm:px-6 sm:py-3"
                      >
                        Submitted On
                      </th>
                      <th
                        scope="col"
                        className="rotulo border-tinta-500 border-b p-2 text-left sm:px-6 sm:py-3"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-traco divide-y">
                    {proposals.map((proposal) => (
                      <tr
                        key={proposal.id}
                        className="hover:bg-tinta-500/5 cursor-pointer transition-colors"
                        onClick={() => router.get(`/proposals/${proposal.id}`)}
                      >
                        <td className="p-2 sm:px-6 sm:py-4">
                          <div className="text-texto text-sm font-semibold break-words">
                            {proposal.title}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap sm:px-6 sm:py-4">
                          <div className="text-sm">{proposal.track}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap sm:px-6 sm:py-4">
                          <div className="text-sm">
                            {formatDate(proposal.submitted_at)}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap sm:px-6 sm:py-4">
                          <StatusBadge status={proposal.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
