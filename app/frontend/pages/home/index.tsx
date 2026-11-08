import { Link, usePage } from "@inertiajs/react";
import { FileTextIcon } from "lucide-react";

import Layout from "@/components/Layout";
import { OAuthButtons } from "@/components/OAuthButtons";

interface IndexProps {
  oauth_providers: string[];
}

export default function Index({ oauth_providers }: IndexProps) {
  const { user, primary_cfp } = usePage().props;

  const cfp_closed = primary_cfp?.is_closed ?? true;
  const cfp_future = primary_cfp?.is_future ?? false;

  return (
    <Layout currentUser={user}>
      <section className="tema-tinta bg-fundo text-texto border-traco relative left-1/2 -mt-8 mb-14 -ml-[50vw] w-screen overflow-hidden border-b print:hidden">
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
          <span className="rotulo">Tropical on Rails 26</span>
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
            returns for its 5th edition, welcoming 700 Rails enthusiasts for two
            days of learning, energy, and celebration. Your talk could inspire
            hundreds of developers building products across Latin America and
            beyond.
          </p>
          <dl className="flex flex-wrap gap-x-12 gap-y-6">
            <div>
              <dt className="rotulo mb-2">When</dt>
              <dd className="text-2xl font-semibold tracking-[-0.01em]">
                April 9-10, 2026
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

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="animate-slide-up space-y-8">
          <div>
            <h2 className="section-title mb-4">Quick Summary</h2>
            <div className="space-y-6">
              <ul className="list-disc space-y-2 pl-6">
                <li>Deadline: January 14, 2026</li>
                <li>30-minute talks</li>
                <li>Single-track</li>
                <li>700 attendees</li>
                <li>Ruby on Rails focus</li>
                <li>April 9 & 10, 2026</li>
                <li>São Paulo - Brazil</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="section-title mb-4">What we are looking for:</h2>
            <div className="space-y-6">
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <b>Rails 8:</b> Exploring the new features introduced in Rails
                  8.0 and 8.1, and how they can be applied in real-world
                  applications.
                </li>
                <li>
                  <b>Ruby/Rails and AI/ML:</b> How AI is being integrated into
                  Rails applications — from code generation to AI-powered
                  features, testing, tooling, gems, and architecture
                </li>
                <li>
                  <b>Developer Experience:</b> Tools to improve the experience
                  for developers, such as LSPs, MCPs, generators, debuggers,
                  etc.
                </li>
                <li>
                  <b>Rails for Startups:</b> How small startups leverage Rails
                  to iterate quickly, validate ideas, and disrupt industries.
                </li>
                <li>
                  <b>Frontend on Rails:</b> Using Rails as an alternative to
                  traditional SPA frameworks, including Hotwire, Turbo,
                  Stimulus, and other emerging approaches.
                </li>
                <li>
                  <b>Advanced Database and Performance at Scale:</b> Techniques
                  for optimizing large Rails apps — UUID V7, multi-database,
                  scaling strategies, background jobs, database best practices,
                  and more.
                </li>
                <li>
                  <b>Security on Rails:</b> Best practices for authentication,
                  data protection, ActiveRecord encryption, database
                  obfuscation, privacy compliance, and meeting standards such as
                  ISO, SOC, GDPR, and LGPD.
                </li>
                <li>
                  <b>The Power of the Monolith:</b> Revisiting monolithic
                  architectures and sharing lessons from teams migrating away
                  from microservices back to Rails monoliths.
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="section-title mb-4">What we are NOT looking for:</h2>
            <div className="space-y-6">
              <ul className="list-disc space-y-2 pl-6">
                <li>Rails API</li>
                <li>Talks focused on CSS, JavaScript, or design</li>
                <li>Talks about careers</li>
                <li>Talks about legacy code</li>
                <li>Non-technical talks</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="section-title mb-4">Speaker benefits:</h2>
            <div className="space-y-6">
              <ul className="list-disc space-y-2 pl-6">
                <li>Invitation to our exclusive speaker’s dinner!</li>
                <li>
                  Free admission to the conference (if you’ve already purchased
                  a ticket and are accepted as a speaker, you can request a
                  refund)
                </li>
              </ul>
              <p>What Is Not Included:</p>
              <p className="text-sm">
                Unfortunately, we don’t have the budget to cover travel
                expenses, such as airfare and hotels. However, if your company
                is willing to sponsor your participation, we will recognize them
                by featuring their logo on our website as a Speaker Supporter.
              </p>
            </div>
          </div>

          <div>
            <h2 className="section-title mb-4">Talk Information:</h2>
            <div className="space-y-6">
              <ul className="list-disc space-y-2 pl-6">
                <li>30-minute talks</li>
                <li>
                  Your talk may be delivered in either English or Portuguese,
                  live translation will be provided. We recommend choosing the
                  language in which you feel most comfortable presenting.
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="section-title mb-4">Selection Process</h2>
            <div className="space-y-4">
              <p>
                A committee will review all proposals and select talks based on
                their technical content and potential to inspire attendees with
                forward-thinking ideas and insights.
              </p>
              <p>
                <span className="font-medium">
                  The selection process consists of two phases:
                </span>
              </p>
              <ol className="list-disc space-y-1 pl-6">
                <li>
                  <b>Screening:</b> Proposals are reviewed based on their
                  content to categorize all submissions. If reviewers have
                  questions about your proposal, they may contact you for more
                  information.
                </li>
                <li>
                  <b>Selection:</b> In this phase, the speakers’ names are
                  disclosed, and we evaluate the talks more thoroughly. We also
                  consider previous presentations, podcasts, or lectures to
                  assess how well the content may be delivered.
                </li>
              </ol>
              <p className="text-sm">
                After the review process and internal discussions, we will
                notify accepted speakers by the end of January. Feedback will
                then be sent to all submitters—whether approved, placed on the
                waiting list, or rejected.
              </p>
            </div>
          </div>

          <div>
            <h2 className="section-title mb-4">Tips for a Great Proposal</h2>
            <div className="space-y-4">
              <p>
                Last year, we received around 100 talk submissions, making it
                difficult to follow up for additional context.
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  <b>Provide details:</b> Include as much information as
                  possible about your talk and your previous experience. Check
                  out this{" "}
                  <a
                    href="https://linkana.notion.site/Tropical-CFP-exemple-1479bf8c6c9a80ca9d4bc98d18532e47?pvs=4"
                    target="_blank"
                    className="underline"
                    rel="noreferrer"
                  >
                    example proposal
                  </a>{" "}
                  to see how a detailed proposal can stand out.
                </li>
                <li>
                  <b>Submit multiple topics:</b> If you would like to increase
                  your chances of speaking, you may submit more than one
                  proposal. This increases your chances of covering a topic
                  we’re looking for. Note: we will only select one talk per
                  person, so focus on quality over quantity.
                </li>
                <li>
                  <b>What We Are Looking For:</b> We’re particularly excited
                  about submissions that align with our ‘What We Are Looking
                  For’ themes. That said, if you have a compelling idea that
                  falls outside these areas, we’d love to hear it! While we have
                  certain focus areas in mind, we’re always open to fresh
                  perspectives that could enrich our conference.
                </li>
                <li>
                  <b>Great presentation:</b> Consider speaking at regional or
                  local meetups first. These meetups often welcome new speakers
                  and are a great way to practice your presentation skills.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-8 lg:pl-8">
          <div
            data-test-id="home-actions"
            className="card animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            {cfp_closed && (
              <>
                {cfp_future && (
                  <h3 className="text-texto text-center text-lg font-semibold">
                    The call for proposals is not open yet
                  </h3>
                )}
                {!cfp_future && (
                  <h3 className="text-texto mb-4 text-lg font-semibold">
                    The call for proposals is now closed
                  </h3>
                )}
                {!cfp_future && (
                  <p className="text-texto-apoio mb-8">
                    Than you everyone for your submissions! You will hear from
                    us shortly!
                  </p>
                )}
              </>
            )}
            {!cfp_closed && (
              <>
                <h3 className="text-texto mb-4 text-lg font-semibold">
                  Ready to share your expertise?
                </h3>
                <p className="text-texto-apoio mb-8">
                  We welcome proposals from speakers of every background and
                  stage in their career. If you have a valuable insight, story,
                  or lesson to share, this is your space.
                </p>
              </>
            )}
            <div className="flex flex-col space-y-2">
              {!user &&
                oauth_providers.map((provider: string) => (
                  <div key={provider}>{OAuthButtons[provider]()}</div>
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
            className="card animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <h3 className="text-texto mb-4 text-lg font-semibold">
              Have questions?
            </h3>
            <p className="text-texto-apoio mb-6">
              If you have any questions about the CFP process or need help with
              your proposal, feel free to reach out to our team.
            </p>
            {/* FIXME: Replace with your contact email */}
            <a
              href="mailto:info@tropicalonrails.com"
              className="text-tinta-500 hover:text-tinta-800 inline-flex items-center font-semibold underline underline-offset-4 transition-colors"
            >
              Contact the CFP team
              <span className="ml-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
