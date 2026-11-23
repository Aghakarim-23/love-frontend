import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const firstName = user?.name?.trim().split(" ")[0];

  // Token silinir və istifadəçi login səhifəsinə yönləndirilir
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFFFF]">
        <div className="animate-pulse text-4xl text-[#000000]">♡</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#000000]">
      {/* Navbar */}
      <header className="border-b border-[#D4D4D4] bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a
            href="/"
            className="font-serif text-xl font-semibold text-[#000000]"
          >
            ♡ Our Little World
          </a>

          <div className="flex items-center gap-3 sm:gap-6">
            <span className="hidden text-sm text-[#444444] sm:block">
              Bizim kiçik dünyamız
            </span>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F5F5] font-medium text-[#000000]">
              {firstName?.charAt(0).toUpperCase() || "♡"}
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-[#D4D4D4] px-4 py-2 text-sm text-[#000000] transition hover:bg-[#F5F5F5] active:scale-95"
            >
              Çıxış
            </button>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20">
        {/* Welcome */}
        <section className="pb-10 pt-14">
          <p className="mb-3 text-sm tracking-widest text-[#666666]">
            XOŞ GƏLDİN ♡
          </p>

          <h1 className="font-serif text-4xl text-[#000000] sm:text-5xl">
            Salam, {firstName || "əzizim"}!
            <span className="ml-3 text-[#000000]">♡</span>
          </h1>

          <p className="mt-4 text-[#444444]">
            Bu gün də hekayəmizə yeni bir xatirə əlavə edək.
          </p>
        </section>

        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-black px-8 py-16 text-center text-white sm:py-20">
          <span className="absolute left-[10%] top-[18%] text-xl text-[#555555]">
            ♡
          </span>
          <span className="absolute right-[12%] top-[25%] text-3xl text-[#555555]">
            ♡
          </span>
          <span className="absolute bottom-[15%] left-[22%] text-2xl text-[#555555]">
            ♡
          </span>
          <span className="absolute bottom-[20%] right-[20%] text-lg text-[#555555]">
            ♡
          </span>

          <div className="relative z-10">
            <div className="mb-5 text-5xl">♡</div>

            <h2 className="font-serif text-4xl sm:text-5xl">Bizim Hekayəmiz</h2>

            <p className="mx-auto mt-6 max-w-md text-base leading-8 text-white">
              Bəzi anlar unudulmazdır. Bəzi insanlar isə bütün anları unudulmaz
              edir.
            </p>

            <div className="mx-auto mt-8 flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-white" />
              <span>♥</span>
              <span className="h-px w-12 bg-white" />
            </div>

            <p className="mt-5 text-xs tracking-[0.3em] text-white">
              SƏN ♡ MƏN ♡ BİZ
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="mt-16">
          <div className="mb-8">
            <p className="mb-2 text-xs tracking-[0.25em] text-[#666666]">
              BİZİM DÜNYAMIZ
            </p>

            <h2 className="font-serif text-3xl text-[#000000]">
              Birlikdə hər şey daha gözəldir
            </h2>

            <p className="mt-3 text-sm text-[#444444]">
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
                className="group flex flex-col rounded-2xl border border-[#D4D4D4] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5F5F5] text-2xl text-[#000000]">
                  {item.icon}
                </div>

                <h3 className="font-serif text-2xl text-[#000000]">
                  {item.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-[#444444]">
                  {item.description}
                </p>

                <a
                  href={item.link}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[#000000] transition group-hover:gap-3"
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
          <div className="mb-5 text-3xl text-[#000000]">♡</div>

          <p className="font-serif text-2xl italic leading-relaxed text-[#444444] sm:text-3xl">
            "Ən gözəl yer sənin olduğun yerdir."
          </p>

          <p className="mt-5 text-xs tracking-[0.25em] text-[#666666]">
            HƏMİŞƏ BİRLİKDƏ
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#D4D4D4] py-7 text-center">
        <p className="text-xs text-[#666666]">
          Sevgi ilə, sadəcə ikimiz üçün hazırlanıb. ♡
        </p>
      </footer>
    </div>
  );
};

export default Home;
