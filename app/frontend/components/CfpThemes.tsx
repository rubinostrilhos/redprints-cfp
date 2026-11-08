interface CfpTheme {
  label: string;
  title: string;
  summary: string;
  topics: string[];
  pitch: string;
  accent: string;
}

const THEMES: CfpTheme[] = [
  {
    label: "AI, inward",
    title: "The software factory",
    summary:
      "How Rails teams build the harness where agents write, test, review and ship code safely. The harness matters more than the model.",
    topics: [
      "Deterministic guardrails: custom RuboCop cops, architecture linters like ArchSpec, generators, hooks and skills",
      "A codebase that works as the prompt: conventions, modular monoliths, docs written for agents",
      "Shipping under agent-driven PR volume: automated review, test selection, rollback",
      "Verification: agents that check their own work and drive end-to-end tests",
      "Giving agents production context through logs, traces and MCP",
    ],
    pitch:
      "Show us your harness: what you automated, what broke and what still needs a human. Bring numbers.",
    accent: "bg-marca-azul",
  },
  {
    label: "AI, in the product",
    title: "AI-powered features",
    summary:
      "Shipping LLM features in Rails apps with the Ruby ecosystem, with cost and risk under control.",
    topics: [
      "RubyLLM, ActiveAgent, MCP servers and clients, local models",
      "RAG, embeddings and semantic search with pgvector or sqlite-vec",
      "Agents and pipelines inside the product: Active Job, human approval, durable workflows",
      "Evals, telemetry, prompt versioning and cost per feature",
      "When an LLM is the wrong tool",
    ],
    pitch:
      "Show a feature that is live: what it solves, the tools you used, how you measure quality and what it costs. Tool demos without a real case won't make the cut.",
    accent: "bg-marca-verde",
  },
  {
    label: "Performance",
    title: "The Ruby that's coming",
    summary:
      "Ruby 4.1 lands three months before the conference. What is arriving so Ruby and Rails can compete with faster languages, without switching languages.",
    topics: [
      "Spinel, Matz's ahead-of-time compiler, and Roundhouse compiling Rails apps",
      "Ractors in Ruby 4.0 and 4.1, and the road to a Ractor-safe Rails",
      "ZJIT and YJIT in your app",
      "Fibers and Falcon in production",
      "Modular GC, Ruby::Box and native extensions in Rust",
    ],
    pitch:
      "Tell us what you measured in a real app: numbers before and after, and what still doesn't work.",
    accent: "bg-tinta-500",
  },
  {
    label: "The view layer",
    title: "Herb & ReActionView",
    summary:
      "With the Rails 8.2 defaults, HTML templates compile through Herb. ReActionView builds reactive views on top of it, with no client framework.",
    topics: [
      "Adopting Herb: linter, language server, herb:check and CI",
      "Context-aware escaping and compile-time validation of your views",
      "ReActionView: template state, actions, optimistic forms, <Async> and <Lazy>",
      "Replacing Stimulus controllers and living alongside Turbo",
      "Building tools on the Herb syntax tree",
    ],
    pitch:
      "Tell us how adopting Herb or ReActionView went: what the linter found, what broke and where reactive views replaced JavaScript.",
    accent: "bg-marca-azul",
  },
  {
    label: "Security",
    title: "Security in the AI era",
    summary:
      "AI speeds up attackers and puts agents inside your app and your workflow. What changes for the people defending a Rails app.",
    topics: [
      "Prompt injection and tool poisoning in LLM features and MCP servers",
      "Agent authorization: OAuth for MCP, scoped permissions, sandboxes, human approval",
      "AI-generated code: CI gates and review",
      "RubyGems supply chain: Bundler cooldowns, security warnings, trusted publishing",
      "Phishing-resistant auth with passkeys, privacy and LGPD",
    ],
    pitch:
      "Bring an incident, a defense you shipped or a process that changed.",
    accent: "bg-marca-verde",
  },
];

export function CfpThemes() {
  return (
    <section data-test-id="cfp-themes" className="mb-16">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="flex flex-col justify-end gap-4 py-2 md:col-span-2 xl:col-span-1">
          <span className="rotulo">CFP 2027</span>
          <h2 className="chamada text-4xl md:text-5xl">
            What we are
            <br />
            looking for
          </h2>
          <p className="text-texto-apoio">
            These are the themes we are most excited about this year. They are
            examples, not quotas: a strong talk outside them is just as welcome.
          </p>
        </div>

        {THEMES.map((theme) => (
          <article
            key={theme.title}
            className="card relative flex flex-col gap-4 overflow-hidden"
          >
            <i
              aria-hidden="true"
              className={`${theme.accent} absolute inset-x-0 top-0 block h-2`}
            />
            <span className="rotulo mt-1">{theme.label}</span>
            <h3 className="text-texto text-xl font-semibold tracking-[-0.01em]">
              {theme.title}
            </h3>
            <p className="text-texto-apoio text-sm">{theme.summary}</p>
            <ul className="list-disc space-y-1.5 pl-5 text-sm">
              {theme.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
            <p className="border-traco mt-auto border-t pt-4 text-sm">
              <span className="rotulo mb-1 block">Pitch us</span>
              {theme.pitch}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
