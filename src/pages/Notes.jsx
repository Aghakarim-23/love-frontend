
import React from "react";
import { Link } from "react-router-dom";

const notes = [
  {
    id: 1,
    text: "Səninlə keçirdiyim ən adi gün belə mənim üçün çox özəldir. ♡",
    author: "Ondan",
    date: "14 Fevral 2025",
  },
  {
    id: 2,
    text: "Bu gün səni düşündüm və öz-özümə gülümsədim.",
    author: "Səndən",
    date: "20 Fevral 2025",
  },
  {
    id: 3,
    text: "Həyatımda olduğun üçün çox xoşbəxtəm. Yaxşı ki, varsan!",
    author: "Ondan",
    date: "5 Mart 2025",
  },
  {
    id: 4,
    text: "Bəzən sadəcə səsini eşitmək bütün yorğunluğumu unutdurur.",
    author: "Səndən",
    date: "18 Mart 2025",
  },
  {
    id: 5,
    text: "Gələcəkdə birlikdə yaşayacağımız bütün gözəl günləri səbirsizliklə gözləyirəm.",
    author: "Ondan",
    date: "10 Aprel 2025",
  },
  {
    id: 6,
    text: "Mənim ən sevdiyim hekayə bizim hekayəmizdir. ♡",
    author: "Səndən",
    date: "25 Aprel 2025",
  },
];

const Notes = () => {
  return (
    <div className="min-h-screen bg-[#FFF8F6] text-[#633A44]">
      {/* Navbar */}
      <header className="border-b border-[#EAD1D3]/60 bg-white/70">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            to="/"
            className="font-serif text-xl font-semibold text-[#873E50]"
          >
            ♡ Our Little World
          </Link>

          <Link
            to="/"
            className="text-sm text-[#98495B] transition hover:text-[#873E50]"
          >
            ← Ana səhifə
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20">
        {/* Page heading */}
        <section className="pb-10 pt-14 text-center">
          <p className="mb-3 text-xs tracking-[0.3em] text-[#B78D94]">
            BALACA SÖZLƏR, BÖYÜK HİSSLƏR
          </p>

          <h1 className="font-serif text-4xl text-[#873E50] sm:text-5xl">
            Kiçik qeydlərimiz ♡
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#94767C]">
            Bəzən bir neçə söz bütün günü gözəlləşdirir.
            Burada bir-birimizə yazdığımız kiçik,
            amma dəyərli qeydləri saxlayırıq.
          </p>
        </section>

        {/* Notes count */}
        <section className="mb-12 rounded-3xl border border-[#EAD1D3]/60 bg-white/75 px-7 py-8 text-center shadow-sm">
          <div className="text-3xl text-[#D986A0]">
            ♡
          </div>

          <p className="mt-3 font-serif text-4xl text-[#873E50]">
            {notes.length}
          </p>

          <p className="mt-2 text-sm text-[#94767C]">
            Birlikdə saxladığımız kiçik qeydlər
          </p>
        </section>

        {/* Section heading */}
        <section className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl text-[#873E50]">
              Qeydlərimiz
            </h2>

            <p className="mt-2 text-sm text-[#94767C]">
              Hər qeyddə bir az sevgi, bir az da biz varıq.
            </p>
          </div>

          <button
            type="button"
            disabled
            title="Tezliklə aktiv olacaq"
            className="cursor-not-allowed rounded-2xl bg-[#98495B] px-6 py-3 text-sm font-medium text-white opacity-65"
          >
            + Yeni qeyd əlavə et
          </button>
        </section>

        {/* Notes cards */}
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <article
              key={note.id}
              className="group relative flex min-h-64 flex-col justify-between overflow-hidden rounded-3xl border border-[#EAD1D3]/60 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-100/70"
            >
              {/* Decoration */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#FCE7EB]/70 blur-3xl" />

              <div className="relative z-10">
                <div className="mb-7 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF0F2] text-2xl text-[#98495B]">
                    ♡
                  </div>

                  <span className="text-xs text-[#B78D94]">
                    {note.date}
                  </span>
                </div>

                <p className="font-serif text-xl leading-9 text-[#873E50]">
                  “{note.text}”
                </p>
              </div>

              <div className="relative z-10 mt-8 flex items-center justify-between border-t border-[#F3E4E6] pt-4">
                <span className="text-sm text-[#94767C]">
                  {note.author}
                </span>

                <span className="text-lg text-[#D986A0]">
                  ♡
                </span>
              </div>
            </article>
          ))}
        </section>

        {/* Bottom quote */}
        <section className="mt-20 text-center">
          <div className="mb-5 text-3xl text-[#D986A0]">
            ♡
          </div>

          <p className="font-serif text-2xl italic leading-relaxed text-[#A97883] sm:text-3xl">
            “Bəzən ən kiçik sözlər ən böyük hissləri daşıyır.”
          </p>

          <p className="mt-5 text-xs tracking-[0.25em] text-[#B78D94]">
            SƏN ♡ MƏN ♡ BİZ
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#EAD1D3]/60 py-7 text-center">
        <p className="text-xs text-[#B79BA0]">
          Sevgi ilə, sadəcə ikimiz üçün hazırlanıb. ♡
        </p>
      </footer>
    </div>
  );
};

export default Notes;
