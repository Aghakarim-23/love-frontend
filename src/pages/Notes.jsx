import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosInstance";

const MAX_LENGTH = 500;

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

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Səhifə açılanda qeydləri serverdən alırıq
  useEffect(() => {
    const getNotes = async () => {
      try {
        const { data } = await api.get("/notes");
        setNotes(data.notes);
      } catch (error) {
        console.error(error);
        setLoadError("Qeydləri yükləmək mümkün olmadı. Bir az sonra yenidən cəhd edin");
      } finally {
        setLoading(false);
      }
    };

    getNotes();
  }, []);

  const closeForm = () => {
    setIsFormOpen(false);
    setText("");
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmed = text.trim();

    if (!trimmed) {
      setFormError("Qeyd boş ola bilməz");
      return;
    }

    setFormError("");
    setSubmitting(true);

    try {
      const { data } = await api.post("/notes", { text: trimmed });

      // Yeni qeydi siyahının əvvəlinə əlavə edirik
      setNotes((prev) => [data.note, ...prev]);
      closeForm();
    } catch (error) {
      console.error(error);
      setFormError("Qeyd yadda saxlanmadı. Yenidən cəhd edin");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#000000]">
      {/* Navbar */}
      <header className="border-b border-[#D4D4D4] bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            to="/"
            className="font-serif text-xl font-semibold text-[#000000]"
          >
            ♡ Our Little World
          </Link>

          <Link
            to="/"
            className="text-sm text-[#444444] transition hover:text-[#000000]"
          >
            ← Ana səhifə
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20">
        {/* Page heading */}
        <section className="pb-10 pt-14 text-center">
          <p className="mb-3 text-xs tracking-[0.3em] text-[#666666]">
            BALACA SÖZLƏR, BÖYÜK HİSSLƏR
          </p>

          <h1 className="font-serif text-4xl text-[#000000] sm:text-5xl">
            Kiçik qeydlərimiz ♡
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#444444]">
            Bəzən bir neçə söz bütün günü gözəlləşdirir.
            Burada bir-birimizə yazdığımız kiçik,
            amma dəyərli qeydləri saxlayırıq.
          </p>
        </section>

        {/* Notes count */}
        <section className="mb-12 rounded-3xl border border-[#D4D4D4] bg-white px-7 py-8 text-center shadow-sm">
          <div className="text-3xl text-[#000000]">
            ♡
          </div>

          <p className="mt-3 font-serif text-4xl text-[#000000]">
            {loading ? "…" : notes.length}
          </p>

          <p className="mt-2 text-sm text-[#444444]">
            Birlikdə saxladığımız kiçik qeydlər
          </p>
        </section>

        {/* Section heading */}
        <section className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl text-[#000000]">
              Qeydlərimiz
            </h2>

            <p className="mt-2 text-sm text-[#444444]">
              Hər qeyddə bir az sevgi, bir az da biz varıq.
            </p>
          </div>

          {!isFormOpen && (
            <button
              type="button"
              onClick={() => setIsFormOpen(true)}
              className="rounded-2xl bg-[#000000] px-6 py-3 text-sm font-medium text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-[#333333] active:translate-y-0"
            >
              + Yeni qeyd əlavə et
            </button>
          )}
        </section>

        {/* New note form */}
        {isFormOpen && (
          <form
            onSubmit={handleSubmit}
            className="relative mb-10 overflow-hidden rounded-3xl border border-[#D4D4D4] bg-white p-7 shadow-sm"
          >
            <div className="relative z-10">
              <label
                htmlFor="note-text"
                className="mb-3 block font-serif text-xl text-[#000000]"
              >
                Bu gün nə demək istəyirsən? ♡
              </label>

              <textarea
                id="note-text"
                rows={4}
                autoFocus
                maxLength={MAX_LENGTH}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && closeForm()}
                placeholder="Bir neçə gözəl söz yaz..."
                className="w-full resize-none rounded-2xl border border-[#D4D4D4] bg-[#FFFFFF] px-5 py-4 font-serif text-lg leading-8 text-[#000000] outline-none transition placeholder:text-[#999999] focus:border-[#000000] focus:ring-2 focus:ring-[#E5E5E5]"
              />

              <div className="mt-2 text-right text-xs text-[#666666]">
                {text.length}/{MAX_LENGTH}
              </div>

              {formError && (
                <p className="mt-3 rounded-2xl border border-black bg-[#F5F5F5] px-5 py-3 text-sm text-[#000000]">
                  {formError}
                </p>
              )}

              <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={submitting}
                  className="rounded-2xl border border-[#D4D4D4] px-6 py-3 text-sm text-[#000000] transition hover:bg-[#F5F5F5] disabled:opacity-65"
                >
                  Ləğv et
                </button>

                <button
                  type="submit"
                  disabled={submitting || !text.trim()}
                  className="rounded-2xl bg-[#000000] px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-[#333333] disabled:cursor-not-allowed disabled:opacity-65"
                >
                  {submitting ? "Yadda saxlanılır..." : "Qeydi saxla ♡"}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Notes cards */}
        {loading ? (
          <p className="py-16 text-center text-4xl text-[#000000]">
            <span className="animate-pulse">♡</span>
          </p>
        ) : loadError ? (
          <p className="rounded-2xl border border-black bg-[#F5F5F5] px-5 py-4 text-center text-sm text-[#000000]">
            {loadError}
          </p>
        ) : notes.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#D4D4D4] bg-white px-7 py-14 text-center">
            <p className="font-serif text-xl text-[#000000]">
              Hələ heç bir qeyd yoxdur
            </p>
            <p className="mt-2 text-sm text-[#444444]">
              İlk kiçik qeydi sən yaz ♡
            </p>
          </div>
        ) : (
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <article
                key={note.id}
                className="group relative flex min-h-64 flex-col justify-between overflow-hidden rounded-3xl border border-[#D4D4D4] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Decoration */}

                <div className="relative z-10">
                  <div className="mb-7 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5F5F5] text-2xl text-[#000000]">
                      ♡
                    </div>

                    <span className="text-xs text-[#666666]">
                      {formatDate(note.createdAt)}
                    </span>
                  </div>

                  <p className="whitespace-pre-line break-words font-serif text-xl leading-9 text-[#000000]">
                    “{note.text}”
                  </p>
                </div>

                <div className="relative z-10 mt-8 flex items-center justify-between border-t border-[#E5E5E5] pt-4">
                  <span className="text-sm text-[#444444]">
                    {note.author?.name ?? "Naməlum"}
                  </span>

                  <span className="text-lg text-[#000000]">
                    ♡
                  </span>
                </div>
              </article>
            ))}
          </section>
        )}

        {/* Bottom quote */}
        <section className="mt-20 text-center">
          <div className="mb-5 text-3xl text-[#000000]">
            ♡
          </div>

          <p className="font-serif text-2xl italic leading-relaxed text-[#444444] sm:text-3xl">
            “Bəzən ən kiçik sözlər ən böyük hissləri daşıyır.”
          </p>

          <p className="mt-5 text-xs tracking-[0.25em] text-[#666666]">
            SƏN ♡ MƏN ♡ BİZ
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

export default Notes;
