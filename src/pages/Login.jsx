import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (error) {
      if (error.response?.status === 401) {
        setError("E-poçt və ya şifrə yanlışdır");
      } else {
        setError("Xəta baş verdi. Bir az sonra yenidən cəhd edin");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] lg:grid lg:grid-cols-2">
      {/* Romantik bölmə */}
      <div className="relative hidden overflow-hidden bg-black lg:flex lg:items-center lg:justify-center">
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
            className="pointer-events-none absolute animate-pulse text-[#555555]"
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
        <div className="absolute text-[320px] leading-none text-[#222222] select-none">
          ♡
        </div>

        {/* Romantik mətn */}
        <div className="relative z-10 max-w-lg px-12 text-center text-white">
          <div className="mb-8 text-7xl drop-shadow-lg">♡</div>

          <h2 className="font-serif text-5xl leading-tight tracking-tight">
            Bizim Hekayəmiz
          </h2>

          <p className="mt-6 font-serif text-2xl italic text-white">
            Hər şey səninlə daha gözəldir...
          </p>

          <div className="mx-auto my-10 flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-white" />
            <span className="text-2xl">♥</span>
            <span className="h-px w-16 bg-white" />
          </div>

          <p className="mx-auto max-w-sm text-base leading-8 text-white">
            Birlikdə yazdığımız hər xatirə, paylaşdığımız hər an və bizi biz
            edən bütün gözəl hisslər burada yaşayacaq.
          </p>

          <p className="mt-12 text-sm tracking-[0.25em] text-white">
            SƏN ♡ MƏN ♡ BİZ
          </p>
        </div>
      </div>

      {/* Giriş bölməsi */}
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
        <div className="relative z-10 w-full max-w-md">
          <div className="mb-10 text-center">
            <div className="mb-5 text-6xl text-[#000000]">♡</div>

            <h1 className="font-serif text-4xl tracking-tight text-[#000000] sm:text-5xl">
              Bizim Kiçik Dünyamız
            </h1>

            <p className="mt-4 text-sm tracking-[0.3em]  text-[#666666]">
              SADƏCƏ İKİMİZ, ƏBƏDİ
            </p>

            <p className="mt-6 text-[#444444]">
              Gözəl xatirələrimiz üçün kiçik bir dünya.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#000000]"
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
                className="w-full rounded-2xl border border-[#D4D4D4] bg-white px-5 py-4 text-[#000000] outline-none transition placeholder:text-[#999999] focus:border-[#000000] focus:ring-2 focus:ring-[#E5E5E5]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#000000]"
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
                  className="w-full rounded-2xl border border-[#D4D4D4] bg-white px-5 py-4 pr-20 text-[#000000] outline-none transition placeholder:text-[#999999] focus:border-[#000000] focus:ring-2 focus:ring-[#E5E5E5]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-sm text-[#000000]"
                >
                  {showPassword ? "Gizlət" : "Göstər"}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-2xl border border-black bg-[#F5F5F5] px-5 py-3 text-sm text-[#000000]">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-4 w-full rounded-2xl bg-[#000000] px-6 py-4 font-medium text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-[#333333] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:translate-y-0"
            >
              {submitting ? "Daxil olunur..." : "Dünyamıza daxil ol ♡"}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="font-serif text-lg italic text-[#444444]">
              "Sən, mən və bütün xatirələrimiz."
            </p>

            <div className="mt-8 flex items-center justify-center gap-3 text-[#666666]">
              <span className="h-px w-12 bg-[#D4D4D4]" />
              <span>♡</span>
              <span className="h-px w-12 bg-[#D4D4D4]" />
            </div>

            <p className="mt-6 text-xs text-[#666666]">
              Sevgi ilə, sadəcə ikimiz üçün hazırlanıb.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
