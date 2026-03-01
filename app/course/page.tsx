"use client";

import { useState, useEffect } from "react";

const COURSE_PASSWORD = "dssprint2026";

const days = [
  {
    day: "Day 1",
    title: "Statistics That Always Show Up",
    topics: ["Mean, Median, Variance", "Normal Distribution", "CLT", "Hypothesis Testing", "p-values", "Type I & II Errors"],
    content: [
      {
        type: "section",
        title: "1. Mean, Median & Standard Deviation",
        body: `**Mean** — the average. Sensitive to outliers.\n**Median** — the middle value. Use this when data is skewed.\n**Standard Deviation** — measures spread. High std dev = data is spread out, less predictable.\n\n💡 Interview tip: "Why use median over mean?" → When there are outliers (e.g. income, house prices).`,
      },
      {
        type: "section",
        title: "2. Normal Distribution",
        body: `Bell-shaped and symmetric. Mean = Median = Mode.\n\n**68-95-99.7 Rule:**\n- 68% of data falls within 1 std dev\n- 95% within 2 std devs\n- 99.7% within 3 std devs\n\n💡 Interview tip: Many ML models assume normality. Know when your data violates this.`,
      },
      {
        type: "section",
        title: "3. Central Limit Theorem (CLT)",
        body: `As sample size increases, the distribution of sample means approaches normal — regardless of the original distribution.\n\n💡 Interview tip: "Why does CLT matter?" → It's the foundation of hypothesis testing. It lets us use normal-based tests even when raw data isn't normal.`,
      },
      {
        type: "section",
        title: "4. Hypothesis Testing",
        body: `**H₀ (Null hypothesis)** — no effect, no difference. The status quo.\n**H₁ (Alternative hypothesis)** — there is an effect.\n\nYou either **reject H₀** or **fail to reject H₀**. Never say "we proved H₁."\n\n💡 Interview tip: Always frame results as "we reject or fail to reject the null."`,
      },
      {
        type: "section",
        title: "5. p-value",
        body: `The probability of seeing your result (or more extreme) if the null hypothesis were true.\n\n- p < 0.05 → reject null (statistically significant)\n- p > 0.05 → fail to reject null\n\n💡 Interview tip: "p=0.03 means if H₀ were true, there's only a 3% chance of seeing this result by chance."`,
      },
      {
        type: "section",
        title: "6. Type I vs Type II Errors",
        body: `**Type I Error (False Positive)** — rejected a true null hypothesis.\n**Type II Error (False Negative)** — failed to reject a false null hypothesis.\n\n💡 Interview tip: "Which is worse?" → Depends on context. In medical testing, Type II (missing a disease) is worse. In spam filters, Type I (blocking legit email) might be worse.`,
      },
      {
        type: "cheatsheet",
        title: "Day 1 Cheat Sheet",
        items: [
          { label: "Mean", value: "Average — sensitive to outliers" },
          { label: "Median", value: "Middle value — use when data is skewed" },
          { label: "Std Dev", value: "Spread of data around the mean" },
          { label: "Normal Dist", value: "Bell curve — 68/95/99.7 rule" },
          { label: "CLT", value: "Sample means → normal as n increases" },
          { label: "H₀", value: "Null hypothesis — no effect" },
          { label: "p-value", value: "Prob of result if H₀ true. p<0.05 = significant" },
          { label: "Type I", value: "False positive — rejected true H₀" },
          { label: "Type II", value: "False negative — missed real effect" },
        ],
      },
      {
        type: "questions",
        title: "Practice Questions",
        items: [
          {
            q: "What's the difference between mean and median? When would you use each?",
            a: "Mean for symmetric data without outliers. Median when data is skewed or has outliers — like income or house prices.",
          },
          {
            q: "What is a p-value? Explain it to a non-technical stakeholder.",
            a: "\"If there were actually no real effect, there's only a X% chance we'd see results this extreme by random chance alone.\"",
          },
          {
            q: "What's the difference between Type I and Type II errors?",
            a: "Type I = false positive (flagging something that isn't real). Type II = false negative (missing something real). Which matters more depends on the cost of each mistake.",
          },
          {
            q: "Why does the Central Limit Theorem matter in practice?",
            a: "It lets us use normal distribution-based tests even when the underlying data isn't normal, as long as our sample is large enough.",
          },
          {
            q: "You run an A/B test and get p=0.07. What do you tell your manager?",
            a: "\"We didn't find a statistically significant result at the 0.05 level. The effect may exist but we don't have enough evidence — consider running longer or increasing sample size.\"",
          },
        ],
      },
    ],
  },
  { day: "Day 2", title: "SQL Patterns in 80% of Interviews", topics: [], content: [] },
  { day: "Day 3", title: "Python & Pandas Must-Knows", topics: [], content: [] },
  { day: "Day 4", title: "ML Concepts — Clear Enough to Teach", topics: [], content: [] },
  { day: "Day 5", title: "Algorithm Cheat Sheet", topics: [], content: [] },
  { day: "Day 6", title: "Case Study & Take-Home Patterns", topics: [], content: [] },
  { day: "Day 7", title: "Behavioral + Telling Your Story", topics: [], content: [] },
];

function formatBody(text: string) {
  return text.split("\n").map((line, i) => {
    const bold = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    return <p key={i} className="mb-2 text-[#aaa] text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: bold }} />;
  });
}

export default function CoursePage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [activeDay, setActiveDay] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("ds_sprint_auth");
    if (saved === "true") setAuthenticated(true);
  }, []);

  function handleLogin() {
    if (input === COURSE_PASSWORD) {
      localStorage.setItem("ds_sprint_auth", "true");
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  if (!authenticated) {
    return (
      <main className="bg-[#0a0a0a] min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <span className="text-lg font-bold text-white">DS Sprint</span>
            <p className="text-[#555] text-sm mt-2">Enter your access password</p>
          </div>
          <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-8">
            <input
              type="password"
              placeholder="Password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#f5a623] transition mb-4 placeholder-[#444]"
            />
            {error && <p className="text-red-500 text-xs mb-4">Incorrect password. Check your email.</p>}
            <button
              onClick={handleLogin}
              className="w-full bg-[#f5a623] text-black font-bold py-3 rounded-lg hover:bg-[#e6951a] transition"
            >
              Access Course
            </button>
          </div>
          <p className="text-center text-[#444] text-xs mt-6">
            Purchased but no password? Email danbwkim@gmail.com
          </p>
        </div>
      </main>
    );
  }

  const currentDay = days[activeDay];

  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white">

      {/* TOP NAV */}
      <nav className="flex justify-between items-center px-6 py-4 border-b border-[#1a1a1a]">
        <span className="text-lg font-bold">DS Sprint</span>
        <span className="text-[#555] text-sm">7-Day Interview Course</span>
      </nav>

      <div className="flex max-w-6xl mx-auto">

        {/* SIDEBAR */}
        <aside className="w-64 shrink-0 border-r border-[#1a1a1a] min-h-screen px-4 py-8">
          <p className="text-[#444] text-xs uppercase tracking-widest mb-4 px-2">Your Plan</p>
          <div className="space-y-1">
            {days.map((d, i) => (
              <button
                key={i}
                onClick={() => setActiveDay(i)}
                className={`w-full text-left px-3 py-3 rounded-lg transition ${
                  activeDay === i
                    ? "bg-[#1a1a1a] text-white border border-[#f5a623]/30"
                    : "text-[#555] hover:text-[#888] hover:bg-[#111]"
                }`}
              >
                <div className="text-xs text-[#f5a623] font-semibold mb-0.5">{d.day}</div>
                <div className="text-xs leading-tight">{d.title}</div>
                {d.content.length === 0 && (
                  <div className="text-[10px] text-[#333] mt-1">Coming soon</div>
                )}
              </button>
            ))}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div className="flex-1 px-10 py-10 max-w-3xl">

          <div className="text-[#f5a623] text-xs font-semibold uppercase tracking-widest mb-2">
            {currentDay.day}
          </div>
          <h1 className="text-3xl font-extrabold mb-8">{currentDay.title}</h1>

          {currentDay.content.length === 0 ? (
            <div className="bg-[#111] border border-[#1f1f1f] rounded-xl p-8 text-center">
              <p className="text-[#555] text-sm">Content coming soon.</p>
              <p className="text-[#333] text-xs mt-2">Check back tomorrow.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {currentDay.content.map((block, i) => {
                if (block.type === "section") {
                  return (
                    <div key={i} className="bg-[#111] border border-[#1f1f1f] rounded-xl p-6">
                      <h2 className="text-white font-bold text-base mb-4">{block.title}</h2>
                      {formatBody(block.body || "")}
                    </div>
                  );
                }

                if (block.type === "cheatsheet") {
                  return (
                    <div key={i} className="bg-[#0f1a0f] border border-[#1a2e1a] rounded-xl p-6">
                      <h2 className="text-white font-bold text-base mb-4">📄 {block.title}</h2>
                      <div className="space-y-2">
                        {block.items?.map((item, j) => (
                          <div key={j} className="flex gap-4 text-sm">
                            <span className="text-[#f5a623] font-semibold w-24 shrink-0">{item.label}</span>
                            <span className="text-[#888]">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (block.type === "questions") {
                  return (
                    <div key={i} className="space-y-4">
                      <h2 className="text-white font-bold text-base">✅ {block.title}</h2>
                      {block.items?.map((item, j) => (
                        <div key={j} className="bg-[#111] border border-[#1f1f1f] rounded-xl p-5">
                          <p className="text-white text-sm font-medium mb-3">Q: {item.q}</p>
                          <p className="text-[#666] text-sm leading-relaxed">→ {item.a}</p>
                        </div>
                      ))}
                    </div>
                  );
                }

                return null;
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
