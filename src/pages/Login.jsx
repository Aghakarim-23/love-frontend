import React, { useState } from "react";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Burada backend login API-ni qoşacağıq.
    console.log("Login submitted");
  };

  return (
    <div className="min-h-screen bg-[#fff8f6] lg:grid lg:grid-cols-2">
      {/* Romantik gradient bölməsi */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#f7b7c3] via-[#d986a0] to-[#87465e] lg:flex lg:items-center lg:justify-center">
        {/* Yumşaq işıq effektləri */}
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-white/25 blur-3xl" />
        <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-[#632a49]/30 blur-3xl" />

        {/* Kiçik dekorativ ürəklər */}
        {[
          { top: "8%", left: "12%", size: 20, delay: "0s" },
          { top: "15%", left: "75%", size: 28, delay: "1s" },
          { top: "30%", left: "25%", size: 16, delay: "2s" },
          { top: "42%", left: "85%", size: 22, delay: "0.5s" },
          { top: "65%", left: "10%", size: 26, delay: "1.5s" },
          { top: "75%", left: "72%", size: 18, delay: "2.5s" },
          { top: "88%", left: "35%", size: 24, delay: "1s" },
          { top: "22%", left: "48%", size: 14, delay: "3s" },
          { top: "55%", left: "60%", size: 15, delay: "2s" },
          { top: "92%", left: "90%", size: 19, delay: "0s" },
        ].map((heart, index) => (
          <span
            key={index}
            className="pointer-events-none absolute animate-pulse text-white/35"
            style={{
              top: heart.top,
              left: heart.left,
              fontSize: `${heart.size}px`,
              animationDelay: heart.delay,
              animationDuration: "4s",
            }}
          >
            ♥
          </span>
        ))}

        {/* Mərkəzdə böyük dekorativ ürək */}
        <div className="absolute text-[320px] leading-none text-white/10 select-none">
          ♡
        </div>

        {/* Romantik mətn */}
        <div className="relative z-10 max-w-lg px-12 text-center text-white">
          <div className="mb-8 text-7xl drop-shadow-lg">♡</div>

          <h2 className="font-serif text-5xl leading-tight tracking-tight">
            Bizim Hekayəmiz
          </h2>

          <p className="mt-6 font-serif text-2xl italic text-white/95">
            Hər şey səninlə daha gözəldir...
          </p>

          <div className="mx-auto my-10 flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-white/50" />
            <span className="text-2xl">♥</span>
            <span className="h-px w-16 bg-white/50" />
          </div>

          <p className="mx-auto max-w-sm text-base leading-8 text-white/85">
            Birlikdə yazdığımız hər xatirə, paylaşdığımız hər an və bizi biz
            edən bütün gözəl hisslər burada yaşayacaq.
          </p>

          <p className="mt-12 text-sm tracking-[0.25em] text-white/75">
            SƏN ♡ MƏN ♡ BİZ
          </p>
        </div>
      </div>

      {/* Giriş bölməsi */}
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-rose-100/60 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-pink-100/70 blur-3xl" />

        <div className="relative z-10 w-full max-w-md">
          <div className="mb-10 text-center">
            <div className="mb-5 text-6xl text-[#a44f62]">♡</div>

            <h1 className="font-serif text-4xl tracking-tight text-[#873e50] sm:text-5xl">
              Bizim Kiçik Dünyamız
            </h1>

            <p className="mt-4 text-sm tracking-[0.3em]  text-[#b78d94]">
              SADƏCƏ İKİMİZ, ƏBƏDİ
            </p>

            <p className="mt-6 text-[#94767c]">
              Gözəl xatirələrimiz üçün kiçik bir dünya.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#754a53]"
              >
                E-poçt ünvanı
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="E-poçt ünvanınızı daxil edin"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-[#ead1d3] bg-white/75 px-5 py-4 text-[#633a44] outline-none transition placeholder:text-[#c5a7ad] focus:border-[#a44f62] focus:ring-2 focus:ring-rose-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#754a53]"
              >
                Şifrə
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="Şifrənizi daxil edin"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#ead1d3] bg-white/75 px-5 py-4 pr-20 text-[#633a44] outline-none transition placeholder:text-[#c5a7ad] focus:border-[#a44f62] focus:ring-2 focus:ring-rose-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-sm text-[#a44f62]"
                >
                  {showPassword ? "Gizlət" : "Göstər"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-2xl bg-[#98495b] px-6 py-4 font-medium text-white shadow-lg shadow-rose-200/60 transition duration-300 hover:-translate-y-0.5 hover:bg-[#81394b] active:translate-y-0"
            >
              Dünyamıza daxil ol ♡
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="font-serif text-lg italic text-[#a97883]">
              "Sən, mən və bütün xatirələrimiz."
            </p>

            <div className="mt-8 flex items-center justify-center gap-3 text-[#c79ba4]">
              <span className="h-px w-12 bg-[#e7cbd0]" />
              <span>♡</span>
              <span className="h-px w-12 bg-[#e7cbd0]" />
            </div>

            <p className="mt-6 text-xs text-[#b79ba0]">
              Sevgi ilə, sadəcə ikimiz üçün hazırlanıb.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
