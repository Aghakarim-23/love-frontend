
import React from "react";
import { Link } from "react-router-dom";

const memories = [
  {
    id: 1,
    title: "İlk görüşümüz ♡",
    date: "14 Fevral 2025",
    description:
      "Hər şeyin başladığı o gözəl gün. İlk baxışlar, ilk gülümsəmələr və unudulmaz hisslər...",
    image:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=900&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Birlikdə ilk səyahətimiz",
    date: "20 Aprel 2025",
    description:
      "Yeni yerlər kəşf etdik, çox güldük və birlikdə gözəl xatirələr topladıq.",
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Unudulmaz bir axşam",
    date: "10 İyun 2025",
    description:
      "Bəzən ən gözəl xatirələr sadə anlarda gizlənir. O axşam da onlardan biri idi.",
    image:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=900&auto=format&fit=crop",
  },
];

const Memories = () => {
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
            BİZİM HEKAYƏMİZ
          </p>

          <h1 className="font-serif text-4xl text-[#873e50] sm:text-5xl">
            Xatirələrimiz ♡
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#94767c]">
            Birlikdə keçirdiyimiz hər an bizim üçün
            xüsusi bir hekayədir. Burada o gözəl
            anları əbədi yaşadırıq.
          </p>
        </section>

        {/* Summary */}
        <section className="mb-12 rounded-3xl border border-[#ead1d3]/60 bg-white/75 px-7 py-8 text-center shadow-sm">
          <div className="text-3xl text-[#d986a0]">
            ♡
          </div>

          <p className="mt-3 font-serif text-4xl text-[#873e50]">
            {memories.length}
          </p>

          <p className="mt-2 text-sm text-[#94767c]">
            Birlikdə topladığımız xatirələr
          </p>
        </section>

        {/* Section heading */}
        <section className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl text-[#873e50]">
              Gözəl anlarımız
            </h2>

            <p className="mt-2 text-sm text-[#94767c]">
              Hər şəkil bir hekayə danışır.
            </p>
          </div>

          <button
            type="button"
            disabled
            title="Tezliklə aktiv olacaq"
            className="cursor-not-allowed rounded-2xl bg-[#98495b] px-6 py-3 text-sm font-medium text-white opacity-65"
          >
            + Yeni xatirə əlavə et
          </button>
        </section>

        {/* Memories grid */}
        <section className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {memories.map((memory) => (
            <article
              key={memory.id}
              className="group overflow-hidden rounded-3xl border border-[#ead1d3]/60 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-100/70"
            >
              {/* Image */}
              <div className="relative h-60 overflow-hidden bg-[#f7dce1]">
                <img
                  src={memory.image}
                  alt={memory.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-xl text-[#98495b] shadow-sm">
                  ♡
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="mb-3 text-xs tracking-wide text-[#b78d94]">
                  {memory.date}
                </p>

                <h3 className="font-serif text-2xl text-[#873e50]">
                  {memory.title}
                </h3>

                <p className="mt-3 min-h-20 text-sm leading-7 text-[#94767c]">
                  {memory.description}
                </p>

                <div className="mt-6 border-t border-[#f3e4e6] pt-4">
                  <span className="text-sm font-medium text-[#98495b]">
                    Bizim xatirəmiz ♡
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

          <p className="font-serif text-2xl italic text-[#a97883] sm:text-3xl">
            "Ən gözəl xatirələr birlikdə yazılır."
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

export default Memories;
