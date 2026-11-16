import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

const TITLE_MAX_LENGTH = 100;
const DESCRIPTION_MAX_LENGTH = 1000;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

const MONTHS = [
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "İyun",
  "İyul",
  "Avqust",
  "Sentyabr",
  "Oktyabr",
  "Noyabr",
  "Dekabr",
];

// "2025-02-14T..." → "14 Fevral 2025"
const formatDate = (value) => {
  const date = new Date(value);
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};

// Bu günün tarixi "2025-02-14" formatında (date input üçün)
const getToday = () => {
  return new Date().toLocaleDateString("en-CA");
};

const Memories = () => {
  const { user } = useAuth();

  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(getToday());
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Səhifə açılanda xatirələri serverdən alırıq
  useEffect(() => {
    const getMemories = async () => {
      try {
        const { data } = await api.get("/memories");
        setMemories(data.memories);
      } catch (error) {
        console.error(error);
        setLoadError("Xatirələri yükləmək mümkün olmadı. Bir az sonra yenidən cəhd edin");
      } finally {
        setLoading(false);
      }
    };

    getMemories();
  }, []);

  // Seçilmiş şəkil dəyişəndə köhnə preview linkini yaddaşdan silirik
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setFormError("Yalnız şəkil seçə bilərsən");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setFormError("Şəkil 5 MB-dan böyük ola bilməz");
      return;
    }

    setFormError("");
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setTitle("");
    setDescription("");
    setDate(getToday());
    setImage(null);
    setPreview("");
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!image) {
      setFormError("Şəkil seç");
      return;
    }

    if (!trimmedTitle) {
      setFormError("Başlıq boş ola bilməz");
      return;
    }

    setFormError("");
    setSubmitting(true);

    // Şəkil göndərmək üçün JSON yox, FormData istifadə edirik
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", trimmedTitle);
    formData.append("description", description.trim());
    formData.append("date", date);

    try {
      const { data } = await api.post("/memories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Yeni xatirəni əlavə edib, tarixə görə yenidən sıralayırıq
      setMemories((prev) =>
        [data.memory, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date))
      );
      closeForm();
    } catch (error) {
      console.error(error);
      setFormError("Xatirə yadda saxlanmadı. Yenidən cəhd edin");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu xatirəni silmək istədiyinə əminsən?")) {
      return;
    }

    try {
      await api.delete(`/memories/${id}`);
      setMemories((prev) => prev.filter((memory) => memory.id !== id));
    } catch (error) {
      console.error(error);
      window.alert("Xatirəni silmək mümkün olmadı. Yenidən cəhd edin");
    }
  };

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
            BİZİM HEKAYƏMİZ
          </p>

          <h1 className="font-serif text-4xl text-[#873E50] sm:text-5xl">
            Xatirələrimiz ♡
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#94767C]">
            Birlikdə keçirdiyimiz hər an bizim üçün
            xüsusi bir hekayədir. Burada o gözəl
            anları əbədi yaşadırıq.
          </p>
        </section>

        {/* Memories count */}
        <section className="mb-12 rounded-3xl border border-[#EAD1D3]/60 bg-white/75 px-7 py-8 text-center shadow-sm">
          <div className="text-3xl text-[#D986A0]">
            ♡
          </div>

          <p className="mt-3 font-serif text-4xl text-[#873E50]">
            {loading ? "…" : memories.length}
          </p>

          <p className="mt-2 text-sm text-[#94767C]">
            Birlikdə topladığımız xatirələr
          </p>
        </section>

        {/* Section heading */}
        <section className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl text-[#873E50]">
              Gözəl anlarımız
            </h2>

            <p className="mt-2 text-sm text-[#94767C]">
              Hər şəkil bir hekayə danışır.
            </p>
          </div>

          {!isFormOpen && (
            <button
              type="button"
              onClick={() => setIsFormOpen(true)}
              className="rounded-2xl bg-[#98495B] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-rose-200/60 transition duration-300 hover:-translate-y-0.5 hover:bg-[#81394B] active:translate-y-0"
            >
              + Yeni xatirə əlavə et
            </button>
          )}
        </section>

        {/* New memory form */}
        {isFormOpen && (
          <form
            onSubmit={handleSubmit}
            onKeyDown={(e) => e.key === "Escape" && closeForm()}
            className="relative mb-10 overflow-hidden rounded-3xl border border-[#EAD1D3]/60 bg-white p-7 shadow-sm"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#FCE7EB]/70 blur-3xl" />

            <div className="relative z-10">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF0F2] text-2xl text-[#98495B]">
                  ♡
                </div>

                <div>
                  <h3 className="font-serif text-xl text-[#873E50]">
                    Yeni xatirə
                  </h3>
                  <p className="text-xs text-[#B78D94]">
                    Bir şəkil, bir neçə söz ♡
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Image picker */}
                <label
                  htmlFor="memory-image"
                  className="relative flex h-64 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[#EAD1D3] bg-[#FFF8F6]/60 transition hover:border-[#D986A0]"
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Seçilmiş şəkil"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="text-4xl text-[#D986A0]">
                        ＋
                      </div>
                      <p className="mt-2 text-sm text-[#94767C]">
                        Şəkil seç
                      </p>
                      <p className="mt-1 text-xs text-[#B78D94]">
                        Maksimum 5 MB
                      </p>
                    </div>
                  )}

                  <input
                    id="memory-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                <div>
                  {/* Title */}
                  <label
                    htmlFor="memory-title"
                    className="mb-2 block text-xs tracking-wide text-[#B78D94]"
                  >
                    BAŞLIQ
                  </label>

                  <input
                    id="memory-title"
                    type="text"
                    maxLength={TITLE_MAX_LENGTH}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="İlk görüşümüz..."
                    className="w-full rounded-2xl border border-[#EAD1D3] bg-[#FFF8F6]/60 px-5 py-3 font-serif text-lg text-[#633A44] outline-none transition placeholder:text-[#C5A7AD] focus:border-[#A44F62] focus:ring-2 focus:ring-rose-100"
                  />

                  {/* Date */}
                  <label
                    htmlFor="memory-date"
                    className="mb-2 mt-5 block text-xs tracking-wide text-[#B78D94]"
                  >
                    TARİX
                  </label>

                  <input
                    id="memory-date"
                    type="date"
                    max={getToday()}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-2xl border border-[#EAD1D3] bg-[#FFF8F6]/60 px-5 py-3 text-sm text-[#633A44] outline-none transition focus:border-[#A44F62] focus:ring-2 focus:ring-rose-100"
                  />

                  {/* Description */}
                  <label
                    htmlFor="memory-description"
                    className="mb-2 mt-5 block text-xs tracking-wide text-[#B78D94]"
                  >
                    HEKAYƏSİ
                  </label>

                  <textarea
                    id="memory-description"
                    rows={3}
                    maxLength={DESCRIPTION_MAX_LENGTH}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="O gün nə oldu?"
                    className="w-full resize-none rounded-2xl border border-[#EAD1D3] bg-[#FFF8F6]/60 px-5 py-3 text-sm leading-7 text-[#633A44] outline-none transition placeholder:text-[#C5A7AD] focus:border-[#A44F62] focus:ring-2 focus:ring-rose-100"
                  />
                </div>
              </div>

              {formError && (
                <p className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-3 text-sm text-[#A44F62]">
                  {formError}
                </p>
              )}

              <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={submitting}
                  className="rounded-2xl border border-[#EAD1D3] px-6 py-3 text-sm text-[#98495B] transition hover:bg-[#FFF0F2] disabled:opacity-65"
                >
                  Ləğv et
                </button>

                <button
                  type="submit"
                  disabled={submitting || !image || !title.trim()}
                  className="rounded-2xl bg-[#98495B] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-rose-200/60 transition hover:bg-[#81394B] disabled:cursor-not-allowed disabled:opacity-65"
                >
                  {submitting ? "Yüklənir..." : "Xatirəni saxla ♡"}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Memories grid */}
        {loading ? (
          <p className="py-16 text-center text-4xl text-[#D986A0]">
            <span className="animate-pulse">♡</span>
          </p>
        ) : loadError ? (
          <p className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-center text-sm text-[#A44F62]">
            {loadError}
          </p>
        ) : memories.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#EAD1D3] bg-white/60 px-7 py-14 text-center">
            <p className="font-serif text-xl text-[#873E50]">
              Hələ heç bir xatirə yoxdur
            </p>
            <p className="mt-2 text-sm text-[#94767C]">
              İlk şəkli sən əlavə et ♡
            </p>
          </div>
        ) : (
          <section className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {memories.map((memory) => (
              <article
                key={memory.id}
                className="group overflow-hidden rounded-3xl border border-[#EAD1D3]/60 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-100/70"
              >
                {/* Image */}
                <div className="relative h-60 overflow-hidden bg-[#F7DCE1]">
                  <img
                    src={memory.imageUrl}
                    alt={memory.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-xl text-[#98495B] shadow-sm">
                    ♡
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="mb-3 text-xs tracking-wide text-[#B78D94]">
                    {formatDate(memory.date)}
                  </p>

                  <h3 className="break-words font-serif text-2xl text-[#873E50]">
                    {memory.title}
                  </h3>

                  <p className="mt-3 min-h-20 whitespace-pre-line break-words text-sm leading-7 text-[#94767C]">
                    {memory.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-[#F3E4E6] pt-4">
                    <span className="text-sm font-medium text-[#98495B]">
                      {memory.author?.name ?? "Bizim xatirəmiz"} ♡
                    </span>

                    {/* Yalnız öz xatirəmizi silə bilərik */}
                    {memory.author?.id === user?.id && (
                      <button
                        type="button"
                        onClick={() => handleDelete(memory.id)}
                        className="text-xs text-[#B78D94] transition hover:text-[#A44F62]"
                      >
                        Sil
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}

        {/* Bottom quote */}
        <section className="mt-20 text-center">
          <div className="mb-5 text-3xl text-[#D986A0]">
            ♡
          </div>

          <p className="font-serif text-2xl italic text-[#A97883] sm:text-3xl">
            “Ən gözəl xatirələr birlikdə yazılır.”
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

export default Memories;
