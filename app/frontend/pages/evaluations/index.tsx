import { router, usePage } from "@inertiajs/react";

import Layout from "@/components/Layout";
import type { Evaluation } from "@/serializers";
import { formatDeadline } from "@/utils/dateHelpers";

interface IndexProps {
  evaluations: Evaluation[];
}

export default function Index({ evaluations }: IndexProps) {
  const { user } = usePage().props;

  return (
    <Layout currentUser={user}>
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="animate-fade-in mb-8 flex flex-col items-start justify-between sm:flex-row sm:items-center">
            <div>
              <h1 className="page-title mb-3">My Evaluations</h1>
            </div>
          </div>

          {evaluations.length === 0 ? (
            <div className="card animate-slide-up py-16 text-center">
              <h3 className="text-texto mb-4 text-lg font-semibold">
                You don’t have any proposal evaluations assigned yet
              </h3>
            </div>
          ) : (
            <div className="card animate-slide-up overflow-hidden !p-0">
              <div className="overflow-x-auto">
                <table className="divide-traco min-w-full divide-y">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="rotulo border-tinta-500 border-b p-2 text-left sm:px-6 sm:py-3"
                      >
                        Evaluation
                      </th>
                      <th
                        scope="col"
                        className="rotulo border-tinta-500 border-b p-2 text-left sm:px-6 sm:py-3"
                      >
                        Tracks
                      </th>
                      <th
                        scope="col"
                        className="rotulo border-tinta-500 border-b p-2 text-left sm:px-6 sm:py-3"
                      >
                        Deadline
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-traco divide-y">
                    {evaluations.map((evaluation) => (
                      <tr
                        key={evaluation.id}
                        className="hover:bg-tinta-500/5 cursor-pointer transition-colors"
                        onClick={() =>
                          router.get(`/evaluations/${evaluation.id}/reviews`)
                        }
                      >
                        <td className="p-2 whitespace-nowrap sm:px-6 sm:py-4">
                          <div className="text-sm font-medium">
                            {evaluation.name}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap sm:px-6 sm:py-4">
                          {evaluation.tracks.map((track) => (
                            <span key={track} className="badge-draft">
                              {track}
                            </span>
                          ))}
                        </td>
                        <td className="p-2 whitespace-nowrap sm:px-6 sm:py-4">
                          {evaluation.deadline ? (
                            <span
                              className={`badge ${
                                formatDeadline(evaluation.deadline).isPast
                                  ? "badge-rejected"
                                  : "badge-accepted"
                              }`}
                            >
                              {formatDeadline(evaluation.deadline).isPast
                                ? "🔒"
                                : "🕐"}{" "}
                              {formatDeadline(evaluation.deadline).text}
                            </span>
                          ) : (
                            <span className="text-texto-apoio text-sm">
                              No deadline
                            </span>
                          )}
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
