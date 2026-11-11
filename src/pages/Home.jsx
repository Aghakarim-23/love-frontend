import React, { useEffect, useState } from "react";

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("İstifadəçi məlumatları alınmadı");
        }

        const data = await response.json();
        setUser(data.user ?? data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  const firstName = user?.name?.trim().split(" ")[0];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fff8f6]">
        <div className="animate-pulse text-4xl text-[#98495b]">♡</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff8f6] text-[#633a44]">
      {/* Navbar */}
      <header className="border-b border-[#ead1d3]/60 bg-white/60">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a
            href="/"
            className="font-serif text-xl font-semibold text-[#873e50]"
          >
            ♡ Our Little World
          </a>

          <div className="flex items-center gap-6">
            <span className="hidden text-sm text-[#94767c] sm:block">
              Bizim kiçik dünyamız
            </span>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f7dce1] font-medium text-[#98495b]">
              {firstName?.charAt(0).toUpperCase() || "♡"}
            </div>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20">
        {/* Welcome */}
        <section className="pb-10 pt-14">
          <p className="mb-3 text-sm tracking-widest text-[#b78d94]">
            XOŞ GƏLDİN ♡
          </p>

          <h1 className="font-serif text-4xl text-[#873e50] sm:text-5xl">
            Salam, {firstName || "əzizim"}!
            <span className="ml-3 text-[#d986a0]">♡</span>
          </h1>

          <p className="mt-4 text-[#94767c]">
            Bu gün də hekayəmizə yeni bir xatirə əlavə edək.
          </p>
        </section>

        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#f7b7c3] via-[#d986a0] to-[#87465e] px-8 py-16 text-center text-white sm:py-20">
          <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-[#632a49]/30 blur-3xl" />

          <span className="absolute left-[10%] top-[18%] text-xl text-white/40">
            ♡
          </span>
          <span className="absolute right-[12%] top-[25%] text-3xl text-white/40">
            ♡
          </span>
          <span className="absolute bottom-[15%] left-[22%] text-2xl text-white/30">
            ♡
          </span>
          <span className="absolute bottom-[20%] right-[20%] text-lg text-white/30">
            ♡
          </span>

          <div className="relative z-10">
            <div className="mb-5 text-5xl">♡</div>

            <h2 className="font-serif text-4xl sm:text-5xl">Bizim Hekayəmiz</h2>

            <p className="mx-auto mt-6 max-w-md text-base leading-8 text-white/90">
              Bəzi anlar unudulmazdır. Bəzi insanlar isə bütün anları unudulmaz
              edir.
            </p>

            <div className="mx-auto mt-8 flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-white/50" />
              <span>♥</span>
              <span className="h-px w-12 bg-white/50" />
            </div>

            <p className="mt-5 text-xs tracking-[0.3em] text-white/80">
              SƏN ♡ MƏN ♡ BİZ
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="mt-16">
          <div className="mb-8">
            <p className="mb-2 text-xs tracking-[0.25em] text-[#b78d94]">
              BİZİM DÜNYAMIZ
            </p>

            <h2 className="font-serif text-3xl text-[#873e50]">
              Birlikdə hər şey daha gözəldir
            </h2>

            <p className="mt-3 text-sm text-[#94767c]">
              Xatirələrimiz, məktublarımız və kiçik qeydlərimiz.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: "♡",
                title: "Xatirələrimiz",
                description:
                  "Birlikdə yaşadığımız ən gözəl anları burada saxlayırıq.",
                link: "/memories",
                button: "Xatirələrə bax",
              },
              {
                icon: "✉",
                title: "Ürək sözlərimiz",
                description: "Bəzən bir neçə söz minlərlə hissi ifadə edir.",
                link: "/letters",
                button: "Məktublara bax",
              },
              {
                icon: "✧",
                title: "Kiçik qeydlərimiz",
                description:
                  "Bir-birimizə yazdığımız kiçik, amma dəyərli sözlər.",
                link: "/notes",
                button: "Qeydlərə bax",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="group flex flex-col rounded-2xl border border-[#ead1d3]/70 bg-white/75 p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-rose-100"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff0f2] text-2xl text-[#98495b]">
                  {item.icon}
                </div>

                <h3 className="font-serif text-2xl text-[#873e50]">
                  {item.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-[#94767c]">
                  {item.description}
                </p>

                <a
                  href={item.link}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[#98495b] transition group-hover:gap-3"
                >
                  {item.button}
                  <span>→</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* Quote */}
        <section className="mt-20 text-center">
          <div className="mb-5 text-3xl text-[#d986a0]">♡</div>

          <p className="font-serif text-2xl italic leading-relaxed text-[#a97883] sm:text-3xl">
            "Ən gözəl yer sənin olduğun yerdir."
          </p>

          <p className="mt-5 text-xs tracking-[0.25em] text-[#b78d94]">
            HƏMİŞƏ BİRLİKDƏ
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

export default Home;
