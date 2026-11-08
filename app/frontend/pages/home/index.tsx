import { Link, usePage } from "@inertiajs/react";
import { FileTextIcon } from "lucide-react";
import type { ReactNode } from "react";

import { CfpThemes } from "@/components/CfpThemes";
import Layout from "@/components/Layout";
import { OAuthButtons } from "@/components/OAuthButtons";

interface IndexProps {
  oauth_providers: string[];
}

const SUMMARY = [
  { label: "Deadline", value: "December 22, 2026" },
  { label: "Format", value: "30-minute talks" },
  { label: "Stage", value: "Single track" },
  { label: "Focus", value: "Ruby on Rails" },
  {
    label: "Language",
    value: "English or Portuguese",
    note: "Live translation is provided. Pick the one you present best in.",
  },
  { label: "Decisions", value: "First week of January" },
];

const NOT_LOOKING_FOR = [
  "Rails API",
  "Talks focused on CSS, JavaScript, or design",
  "Talks about careers",
  "Talks about legacy code",
  "Non-technical talks",
];

const TIPS = [
  {
    title: "Provide details",
    body: (
      <>
        Include as much as you can about the talk and your previous experience.
        Last year we got around 100 submissions, so we rarely have time to ask
        for more context. See this{" "}
        <a
          href="https://linkana.notion.site/Tropical-CFP-exemple-1479bf8c6c9a80ca9d4bc98d18532e47?pvs=4"
          target="_blank"
          className="underline"
          rel="noreferrer"
        >
          example proposal
        </a>
        .
      </>
    ),
  },
  {
    title: "Submit more than one topic",
    body: "It raises the chance that one of them fits what we need. We pick only one talk per person, so go for quality over quantity.",
  },
  {
    title: "Outside the themes is fine",
    body: "The themes above are where our heads are this year, not a filter. A compelling idea in another area is welcome.",
  },
  {
    title: "Practice first",
    body: "Regional and local meetups welcome new speakers and are a great place to rehearse your talk.",
  },
];

function SectionHeader({ label, title }: { label: string; title: ReactNode }) {
  return (
    <div className="mb-6">
      <span className="rotulo">{label}</span>
      <h2 className="chamada mt-2 text-3xl md:text-4xl">{title}</h2>
    </div>
  );
}

export default function Index({ oauth_providers }: IndexProps) {
  const { user, primary_cfp } = usePage().props;

  const cfp_closed = primary_cfp?.is_closed ?? true;
  const cfp_future = primary_cfp?.is_future ?? false;

  return (
    <Layout currentUser={user}>
      <section className="tema-tinta bg-fundo text-texto border-traco relative left-1/2 -mt-8 mb-10 -ml-[50vw] w-screen overflow-hidden border-b print:hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 container mx-auto grid grid-cols-6 px-4 sm:px-6 md:grid-cols-12 lg:px-8"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className={`border-traco border-l border-dashed last:border-r ${i >= 6 ? "hidden md:block" : ""}`}
            />
          ))}
        </div>
        <div className="relative container mx-auto px-4 py-14 sm:px-6 md:py-16 lg:px-8">
          <span className="rotulo">Tropical on Rails 27</span>
          <h1 className="chamada mt-2 mb-6 text-5xl md:text-7xl lg:text-[88px]">
            Call for
            <br />
            proposals
          </h1>
          <p className="text-texto-apoio mb-10 max-w-2xl">
            <a
              href="https://tropicalonrails.com"
              target="_blank"
              className="text-marca-azul underline"
              rel="noreferrer"
            >
              Tropical on Rails
            </a>{" "}
            returns for its 8th edition, welcoming 700 Rails enthusiasts for two
            days of learning, energy, and celebration. Your talk could inspire
            hundreds of developers building products across Latin America and
            beyond.
          </p>
          <dl className="flex flex-wrap gap-x-12 gap-y-6">
            <div>
              <dt className="rotulo mb-2">When</dt>
              <dd className="text-2xl font-semibold tracking-[-0.01em]">
                March 18-19, 2027
              </dd>
            </div>
            <div>
              <dt className="rotulo mb-2">Where</dt>
              <dd className="text-2xl font-semibold tracking-[-0.01em]">
                São Paulo, Brazil
              </dd>
            </div>
            <div>
              <dt className="rotulo mb-2">Attendees</dt>
              <dd className="text-2xl font-semibold tracking-[-0.01em]">
                700+
              </dd>
            </div>
          </dl>
        </div>
        <div
          aria-hidden="true"
          className="absolute right-4 bottom-0 hidden gap-12 sm:right-6 sm:flex lg:right-8"
        >
          <i className="bg-marca-azul block size-14" />
          <i className="bg-marca-verde block size-14" />
        </div>
      </section>

      {/* Call to action: sign in / submit, plus contact */}
      <section className="mb-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div
          data-test-id="home-actions"
          className="card animate-slide-up lg:col-span-2"
        >
          {cfp_closed && cfp_future && (
            <h3 className="text-texto text-lg font-semibold">
              The call for proposals is not open yet
            </h3>
          )}
          {cfp_closed && !cfp_future && (
            <>
              <h3 className="text-texto mb-4 text-lg font-semibold">
                The call for proposals is now closed
              </h3>
              <p className="text-texto-apoio mb-8">
                Thank you everyone for your submissions! You will hear from us
                shortly!
              </p>
            </>
          )}
          {!cfp_closed && (
            <>
              <h3 className="text-texto mb-4 text-lg font-semibold">
                Ready to share your expertise?
              </h3>
              <p className="text-texto-apoio mb-8 max-w-2xl">
                We welcome proposals from speakers of every background and stage
                in their career. If you have a valuable insight, story, or
                lesson to share, this is your space.
              </p>
            </>
          )}
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {!user &&
              oauth_providers.map((provider: string) => (
                <div key={provider} className="sm:min-w-64">
                  {OAuthButtons[provider]()}
                </div>
              ))}

            {user && !cfp_closed && (
              <Link
                href={`/proposals/new`}
                className="btn btn-primary flex items-center justify-center"
              >
                Submit a Proposal
              </Link>
            )}

            {user && !cfp_future && (
              <Link
                href={`/proposals`}
                className="btn btn-outline flex items-center justify-center"
              >
                <FileTextIcon className="mr-2 h-5 w-5" />
                View My Proposals
              </Link>
            )}
          </div>
        </div>

        <div
          className="card animate-slide-up flex flex-col"
          style={{ animationDelay: "0.1s" }}
        >
          <h3 className="text-texto mb-4 text-lg font-semibold">
            Have questions?
          </h3>
          <p className="text-texto-apoio mb-6">
            If you have any questions about the CFP process or need help with
            your proposal, feel free to reach out to our team.
          </p>
          <a
            href="mailto:info@tropicalonrails.com"
            className="text-tinta-500 hover:text-tinta-800 mt-auto inline-flex items-center font-semibold underline underline-offset-4 transition-colors"
          >
            Contact the CFP team
            <span className="ml-1">→</span>
          </a>
        </div>
      </section>

      <section data-test-id="quick-summary" className="mb-16">
        <SectionHeader label="CFP 2027" title="Quick summary" />
        <dl className="border-tinta-500 grid grid-cols-1 border-t border-l sm:grid-cols-2 lg:grid-cols-3">
          {SUMMARY.map((item) => (
            <div
              key={item.label}
              className="border-tinta-500 border-r border-b p-4 sm:p-6"
            >
              <dt className="rotulo mb-2">{item.label}</dt>
              <dd className="text-xl font-semibold tracking-[-0.01em]">
                {item.value}
              </dd>
              {item.note && (
                <dd className="text-texto-apoio mt-2 text-sm">{item.note}</dd>
              )}
            </div>
          ))}
        </dl>
      </section>

      <CfpThemes />

      <section data-test-id="not-looking-for" className="mb-16">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <SectionHeader
            label="Out of scope"
            title={
              <>
                What we are
                <br />
                not looking for
              </>
            }
          />
          <ul className="card space-y-3 lg:col-span-2">
            {NOT_LOOKING_FOR.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="text-texto-apoio font-mono">
                  ×
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section data-test-id="speaker-benefits" className="mb-16">
        <SectionHeader label="For speakers" title="Speaker benefits" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="card relative overflow-hidden">
            <i
              aria-hidden="true"
              className="bg-marca-verde absolute inset-x-0 top-0 block h-2"
            />
            <span className="rotulo mt-1 mb-4 block">Included</span>
            <ul className="list-disc space-y-2 pl-5">
              <li>An invitation to our exclusive speakers' dinner</li>
              <li>
                Free admission to the conference. If you already bought a ticket
                and get accepted, you can ask for a refund.
              </li>
            </ul>
          </div>
          <div className="card relative overflow-hidden">
            <i
              aria-hidden="true"
              className="bg-traco absolute inset-x-0 top-0 block h-2"
            />
            <span className="rotulo mt-1 mb-4 block">Not included</span>
            <p>
              We don't have the budget to cover travel, such as airfare and
              hotels. If your company sponsors your trip, we will feature its
              logo on our website as a Speaker Supporter.
            </p>
          </div>
        </div>
      </section>

      <section data-test-id="selection-process" className="mb-16">
        <SectionHeader label="How we choose" title="Selection process" />
        <p className="text-texto-apoio mb-6 max-w-3xl">
          A committee reviews every proposal and picks talks for their technical
          content and their potential to inspire attendees with forward-thinking
          ideas.
        </p>
        <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <li className="card">
            <span className="rotulo">Step 1</span>
            <h3 className="text-texto mt-2 mb-3 text-lg font-semibold">
              Screening
            </h3>
            <p className="text-sm">
              We review proposals on content alone to sort all submissions.
              Reviewers may reach out if they have questions.
            </p>
          </li>
          <li className="card">
            <span className="rotulo">Step 2</span>
            <h3 className="text-texto mt-2 mb-3 text-lg font-semibold">
              Selection
            </h3>
            <p className="text-sm">
              Speaker names are revealed and we look closer at each talk,
              including previous talks, podcasts, or lectures, to see how the
              content may be delivered.
            </p>
          </li>
          <li className="card">
            <span className="rotulo">Step 3</span>
            <h3 className="text-texto mt-2 mb-3 text-lg font-semibold">
              Notification
            </h3>
            <p className="text-sm">
              Accepted speakers hear from us in the first week of January. Then
              everyone gets feedback, whether accepted, waitlisted, or not
              selected.
            </p>
          </li>
        </ol>
      </section>

      <section data-test-id="tips">
        <SectionHeader
          label="Before you submit"
          title="Tips for a great proposal"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {TIPS.map((tip) => (
            <div key={tip.title} className="card">
              <h3 className="text-texto mb-3 text-lg font-semibold">
                {tip.title}
              </h3>
              <p className="text-sm">{tip.body}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
