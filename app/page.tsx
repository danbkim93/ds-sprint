export default function Home() {
  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen font-sans">

      {/* NAV */}
      <nav className="flex justify-between items-center px-6 py-5 max-w-5xl mx-auto">
        <span className="text-lg font-bold tracking-tight text-white">DS Sprint</span>
        <a
          href="https://danbloom.gumroad.com/l/yakwdj"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#f5a623] text-black text-sm font-semibold px-4 py-2 rounded-md hover:bg-[#e6951a] transition"
        >
          Get Instant Access — $29
        </a>
      </nav>

      {/* HERO */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-block bg-[#1a1a1a] border border-[#2a2a2a] text-[#f5a623] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
          7-Day Interview Sprint
        </div>
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight mb-6">
          Your data science interview
          <br />
          <span className="text-[#f5a623]">is in 7 days.</span>
          <br />
          Most candidates waste 6 of them.
        </h1>
        <p className="text-lg text-[#888] max-w-xl mx-auto mb-10 leading-relaxed">
          A day-by-day battle plan covering exactly what interviewers test —
          and nothing else. No fluff. No 40-hour courses. Just what you need, in the order that matters.
        </p>
        <a
          href="#buy"
          className="inline-block bg-[#f5a623] text-black font-bold text-lg px-8 py-4 rounded-lg hover:bg-[#e6951a] transition shadow-lg"
        >
          Start Your Sprint — $29
        </a>
        <p className="text-sm text-[#555] mt-4">One-time payment. Instant access. Yours forever.</p>
      </section>

      {/* DIVIDER */}
      <div className="border-t border-[#1a1a1a] max-w-5xl mx-auto" />

      {/* THE PROBLEM */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-6">You don&apos;t have months. You have days.</h2>
        <p className="text-[#888] text-lg leading-relaxed mb-4">
          You have an interview coming up. Maybe you applied on a whim. Maybe it snuck up on you.
          Either way — you don&apos;t have time for another bootcamp or a 40-hour Udemy course.
        </p>
        <p className="text-[#888] text-lg leading-relaxed mb-4">
          Most resources assume you have time. You don&apos;t.
        </p>
        <p className="text-white text-lg leading-relaxed font-medium">
          You need what actually shows up in interviews, in the order that matters, with nothing wasted.
        </p>
      </section>

      {/* DIVIDER */}
      <div className="border-t border-[#1a1a1a] max-w-5xl mx-auto" />

      {/* 7-DAY PLAN */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-4">Your 7-Day Battle Plan</h2>
        <p className="text-[#888] mb-12 text-lg">Each day has one job. Do it, move on.</p>

        <div className="space-y-4">
          {[
            {
              day: "Day 1",
              title: "Statistics That Always Show Up",
              desc: "Distributions, p-values, hypothesis testing — explained the way interviewers expect you to say it.",
            },
            {
              day: "Day 2",
              title: "SQL Patterns in 80% of Interviews",
              desc: "Window functions, CTEs, aggregations. The exact query structures that come up again and again.",
            },
            {
              day: "Day 3",
              title: "Python & Pandas Must-Knows",
              desc: "The operations every interviewer assumes you know cold. No syntax surprises.",
            },
            {
              day: "Day 4",
              title: "ML Concepts — Clear Enough to Teach",
              desc: "Bias-variance, overfitting, cross-validation. Explained so clearly you could walk a PM through it.",
            },
            {
              day: "Day 5",
              title: "Algorithm Cheat Sheet",
              desc: "When to use Random Forest vs XGBoost vs Logistic Regression — and why. The answer interviewers actually want.",
            },
            {
              day: "Day 6",
              title: "Case Study & Take-Home Patterns",
              desc: "How to structure your thinking out loud. The frameworks that make you sound senior.",
            },
            {
              day: "Day 7",
              title: "Behavioral + Telling Your Story",
              desc: "How to present your background compellingly — even if it's non-traditional.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex gap-5 bg-[#111] border border-[#1f1f1f] rounded-xl p-5 hover:border-[#f5a623]/30 transition"
            >
              <div className="text-[#f5a623] font-bold text-sm w-14 shrink-0 pt-1">{item.day}</div>
              <div>
                <div className="font-semibold text-white mb-1">{item.title}</div>
                <div className="text-[#666] text-sm leading-relaxed">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div className="border-t border-[#1a1a1a] max-w-5xl mx-auto" />

      {/* WHAT'S INCLUDED */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-10">What&apos;s Included</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: "📖", title: "7 Day-by-Day Lessons", desc: "Focused written lessons covering exactly what interviewers test." },
            { icon: "📄", title: "Daily Cheat Sheets", desc: "One-page summaries for every day. Review the night before." },
            { icon: "✅", title: "Practice Questions", desc: "Phrased the way interviewers actually ask them — with answers." },
            { icon: "🌙", title: "Night-Before Checklist", desc: "Exactly what to review the evening before your interview." },
          ].map((item, i) => (
            <div key={i} className="bg-[#111] border border-[#1f1f1f] rounded-xl p-5">
              <div className="text-2xl mb-3">{item.icon}</div>
              <div className="font-semibold text-white mb-1">{item.title}</div>
              <div className="text-[#666] text-sm">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div className="border-t border-[#1a1a1a] max-w-5xl mx-auto" />

      {/* WHO IT'S FOR */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="grid sm:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-bold mb-5 text-white">This is for you if</h3>
            <ul className="space-y-3">
              {[
                "You have a DS interview in the next 7 days",
                "You have an analyst or technical background",
                "You want a plan, not another course to abandon",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-[#888] text-sm">
                  <span className="text-[#f5a623] mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-5 text-white">This is NOT for you if</h3>
            <ul className="space-y-3">
              {[
                "You're a complete beginner with no data background",
                "You want a comprehensive DS education",
                "You have more than 2 weeks to prep",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-[#888] text-sm">
                  <span className="text-[#555] mt-0.5">✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="border-t border-[#1a1a1a] max-w-5xl mx-auto" />

      {/* CREDIBILITY */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-[#555] text-sm uppercase tracking-widest mb-4">Built by</p>
        <p className="text-white text-lg leading-relaxed max-w-xl mx-auto">
          A Georgia Tech Analytics grad and practicing Senior Data Scientist.
          This isn&apos;t theory — it&apos;s what I wish I had before my own interviews.
        </p>
      </section>

      {/* DIVIDER */}
      <div className="border-t border-[#1a1a1a] max-w-5xl mx-auto" />

      {/* BUY */}
      <section id="buy" className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl font-extrabold mb-4">
          7 days is enough —<br />
          <span className="text-[#f5a623]">if you use them right.</span>
        </h2>
        <p className="text-[#888] text-lg mb-10">
          Your interview won&apos;t wait. Neither should you.
        </p>

        <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-8 max-w-sm mx-auto mb-8">
          <div className="text-5xl font-extrabold text-white mb-2">$29</div>
          <div className="text-[#555] text-sm mb-6">One-time. Instant access. Yours forever.</div>
          <a
            href="https://danbloom.gumroad.com/l/yakwdj"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-[#f5a623] text-black font-bold text-lg px-6 py-4 rounded-lg hover:bg-[#e6951a] transition w-full text-center"
          >
            Get Instant Access
          </a>
        </div>

        <p className="text-[#444] text-sm">
          Questions? Contact <span className="text-[#666]">Dan Kim</span> at danbwkim@gmail.com
        </p>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1a1a1a] text-center py-8 text-[#333] text-sm">
        © 2026 DS Sprint. All rights reserved.
      </footer>

    </main>
  );
}
