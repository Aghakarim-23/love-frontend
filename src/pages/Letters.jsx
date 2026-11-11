
import React from "react";
import { Link } from "react-router-dom";

const letters = [
  {
    id: 1,
    title: "Sənə demək istədiklərim ♡",
    date: "14 Fevral 2025",
    from: "Ondan",
    to: "Sənə",
    message:
      "Bəzən hisslərimi sözlə ifadə etmək çətin olur. Amma bir şeyi bilməyini istəyirəm: həyatımda olduğun üçün çox xoşbəxtəm. Səninlə keçirdiyim hər an mənim üçün çox dəyərlidir.",
    icon: "♡",
  },
  {
    id: 2,
    title: "Yaxşı ki, varsan",
    date: "20 Aprel 2025",
    from: "Səndən",
    to: "Ona",
    message:
      "Həyatıma gəldiyin gündən bəri bir çox şey dəyişdi. Ən adi günlər belə səninlə daha gözəl olur. Gülümsəməyimin səbəblərindən biri olduğun üçün təşəkkür edirəm.",
    icon: "✉",
  },
  {
    id: 3,
    title: "Birlikdə daha neçə illərə...",
    date: "10 İyun 2025",
    from: "Ondan",
    to: "Sənə",
    message:
      "Gələcəkdə bizi nələrin gözlədiyini bilmirəm. Amma bildiyim bir şey var: bütün gözəl xatirələrimi səninlə paylaşmaq istəyirəm. Hər yeni gün bizim hekayəmizin yeni səhifəsidir.",
    icon: "♥",
  },
];

const Letters = () => {
  return (
    <div className="min-h-screen bg-[#fff8f6] text-[#633a44]">
      {/* Navbar */}
      <header className="border-b border-[#ead1d3]/60 bg-white/70">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            to="/"
            className="font-serif text-xl font-semibold text-[#873e50]"
          >
            ♡ Our Little World
          </Link>

          <Link
            to="/"
            className="text-sm text-[#98495b] transition hover:text-[#873e50]"
          >
            ← Ana səhifə
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20">
        {/* Page heading */}
        <section className="pb-10 pt-14 text-center">
          <p className="mb-3 text-xs tracking-[0.3em] text-[#b78d94]">
            QƏLBDƏN GƏLƏN SÖZLƏR
          </p>

          <h1 className="font-serif text-4xl text-[#873e50] sm:text-5xl">
            Ürək sözlərimiz ♡
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#94767c]">
            Bəzən bir neçə cümlə minlərlə hissi ifadə edir.
            Burada bir-birimizə söylədiyimiz ən gözəl
            sözləri və məktubları saxlayırıq.
          </p>
        </section>

        {/* Summary */}
        <section className="mb-12 rounded-3xl border border-[#ead1d3]/60 bg-white/75 px-7 py-8 text-center shadow-sm">
          <div className="text-3xl text-[#d986a0]">
            ✉
          </div>

          <p className="mt-3 font-serif text-4xl text-[#873e50]">
            {letters.length}
          </p>

          <p className="mt-2 text-sm text-[#94767c]">
            Qəlbdən yazılmış məktublar
          </p>
        </section>

        {/* Section heading */}
        <section className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl text-[#873e50]">
              Məktublarımız
            </h2>

            <p className="mt-2 text-sm text-[#94767c]">
              Hər məktubda bir az sevgi, bir az da biz varıq.
            </p>
          </div>

          <button
            type="button"
            disabled
            title="Tezliklə aktiv olacaq"
            className="cursor-not-allowed rounded-2xl bg-[#98495b] px-6 py-3 text-sm font-medium text-white opacity-65"
          >
            + Yeni məktub yaz
          </button>
        </section>

        {/* Letters grid */}
        <section className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {letters.map((letter) => (
            <article
              key={letter.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-[#ead1d3]/60 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-100/70"
            >
              {/* Decorative header */}
              <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-[#fce7eb] via-[#f7d4dc] to-[#e8b4c2]">
                <div className="absolute -left-10 -top-10 h-36 w-36 rounded-full bg-white/30 blur-2xl" />

                <span className="absolute left-7 top-6 text-xl text-[#98495b]/30">
                  ♡
                </span>

                <span className="absolute bottom-6 right-8 text-2xl text-[#98495b]/30">
                  ♡
                </span>

                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/70 bg-white/50 text-5xl text-[#98495b] shadow-sm transition duration-300 group-hover:scale-110">
                  {letter.icon}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <p className="mb-3 text-xs tracking-wide text-[#b78d94]">
                  {letter.date}
                </p>

                <h3 className="font-serif text-2xl text-[#873e50]">
                  {letter.title}
                </h3>

                <div className="mt-4 flex items-center gap-2 text-xs text-[#a97883]">
                  <span>{letter.from}</span>
                  <span>♡</span>
                  <span>{letter.to}</span>
                </div>

                <p className="mt-5 flex-1 text-sm leading-7 text-[#94767c]">
                  {letter.message}
                </p>

                <div className="mt-6 border-t border-[#f3e4e6] pt-4">
                  <span className="text-sm font-medium text-[#98495b]">
                    Sevgi ilə yazılıb ♡
                  </span>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Bottom quote */}
        <section className="mt-20 text-center">
          <div className="mb-5 text-3xl text-[#d986a0]">
            ♡
          </div>

          <p className="font-serif text-2xl italic leading-relaxed text-[#a97883] sm:text-3xl">
            "Bəzi sözlər heç vaxt unudulmur."
          </p>

          <p className="mt-5 text-xs tracking-[0.25em] text-[#b78d94]">
            SƏN ♡ MƏN ♡ BİZ
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#ead1d3]/60 py-7 text-center">
        <p className="text-xs text-[#b79ba0]">
          Sevgi ilə, sadəcə ikimiz üçün hazırlanıb. ♡
        </p>
      </footer>
    </div>
  );
};

export default Letters;
