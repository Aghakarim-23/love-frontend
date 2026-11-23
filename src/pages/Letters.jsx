import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

const TITLE_MAX_LENGTH = 100;
const MESSAGE_MAX_LENGTH = 2000;

const ICONS = ["♡", "✉", "♥"];

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

const BACK_VOWELS = "aıou"; // qalın saitlər
const ALL_VOWELS = "aıoueəiöü";

// Adın son saitinə görə qalın (a) və ya incə (ə) şəkilçi seçirik
const isBackVowelWord = (word) => {
  const letters = word.toLocaleLowerCase("az").split("").reverse();
  const lastVowel = letters.find((letter) => ALL_VOWELS.includes(letter));

  return lastVowel ? BACK_VOWELS.includes(lastVowel) : false;
};

// Çıxışlıq hal: Agadadas → Agadadasdan, Leyla → Leyladan, Kərim → Kərimdən
const toFrom = (name) => {
  return name + (isBackVowelWord(name) ? "dan" : "dən");
};

// Yönlük hal: Agadadas → Agadadasa, Leyla → Leylaya, Kərim → Kərimə
const toTo = (name) => {
  const lastLetter = name.slice(-1).toLocaleLowerCase("az");
  const buffer = ALL_VOWELS.includes(lastLetter) ? "y" : "";

  return name + buffer + (isBackVowelWord(name) ? "a" : "ə");
};

const Letters = () => {
  const { user } = useAuth();

  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  // Məktub yazıla biləcək istifadəçilər (özümüzdən başqa hamı)
  const [recipients, setRecipients] = useState([]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Səhifə açılanda məktubları serverdən alırıq
  useEffect(() => {
    const getLetters = async () => {
      try {
        const { data } = await api.get("/letters");
        setLetters(data.letters);
      } catch (error) {
        console.error(error);
        setLoadError("Məktubları yükləmək mümkün olmadı. Bir az sonra yenidən cəhd edin");
      } finally {
        setLoading(false);
      }
    };

    getLetters();
  }, []);

  // Alıcı seçmək üçün istifadəçiləri alırıq
  useEffect(() => {
    if (!user) {
      return;
    }

    const getRecipients = async () => {
      try {
        const { data } = await api.get("/users");
        const others = data.filter((item) => item._id !== user.id);

        setRecipients(others);

        // Yalnız bir nəfər varsa, onu avtomatik seçirik
        if (others.length === 1) {
          setRecipientId(others[0]._id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getRecipients();
  }, [user]);

  const closeForm = () => {
    setIsFormOpen(false);
    setTitle("");
    setMessage("");
    setFormError("");

    if (recipients.length !== 1) {
      setRecipientId("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedMessage = message.trim();

    if (!trimmedTitle) {
      setFormError("Başlıq boş ola bilməz");
      return;
    }

    if (!trimmedMessage) {
      setFormError("Məktub boş ola bilməz");
      return;
    }

    if (!recipientId) {
      setFormError("Məktubun kimə yazıldığını seç");
      return;
    }

    setFormError("");
    setSubmitting(true);

    try {
      const { data } = await api.post("/letters", {
        title: trimmedTitle,
        message: trimmedMessage,
        recipientId,
      });

      // Yeni məktubu siyahının əvvəlinə əlavə edirik
      setLetters((prev) => [data.letter, ...prev]);
      closeForm();
    } catch (error) {
      console.error(error);
      setFormError("Məktub yadda saxlanmadı. Yenidən cəhd edin");
    } finally {
      setSubmitting(false);
    }
  };

  // Kimdən: özümüzsə "Səndən", başqasıdırsa "Agadadasdan"
  const getFromLabel = (person) => {
    if (!person) {
      return "Naməlumdan";
    }

    return person.id === user?.id ? "Səndən" : toFrom(person.name);
  };

  // Kimə: özümüzsə "sənə", başqasıdırsa "Agadadasa"
  const getToLabel = (person) => {
    if (!person) {
      return "naməluma";
    }

    return person.id === user?.id ? "sənə" : toTo(person.name);
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
            QƏLBDƏN GƏLƏN SÖZLƏR
          </p>

          <h1 className="font-serif text-4xl text-[#000000] sm:text-5xl">
            Ürək sözlərimiz ♡
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#444444]">
            Bəzən bir neçə cümlə minlərlə hissi ifadə edir.
            Burada bir-birimizə söylədiyimiz ən gözəl
            sözləri və məktubları saxlayırıq.
          </p>
        </section>

        {/* Letters count */}
        <section className="mb-12 rounded-3xl border border-[#D4D4D4] bg-white px-7 py-8 text-center shadow-sm">
          <div className="text-3xl text-[#000000]">
            ✉
          </div>

          <p className="mt-3 font-serif text-4xl text-[#000000]">
            {loading ? "…" : letters.length}
          </p>

          <p className="mt-2 text-sm text-[#444444]">
            Qəlbdən yazılmış məktublar
          </p>
        </section>

        {/* Section heading */}
        <section className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl text-[#000000]">
              Məktublarımız
            </h2>

            <p className="mt-2 text-sm text-[#444444]">
              Hər məktubda bir az sevgi, bir az da biz varıq.
            </p>
          </div>

          {!isFormOpen && (
            <button
              type="button"
              onClick={() => setIsFormOpen(true)}
              className="rounded-2xl bg-[#000000] px-6 py-3 text-sm font-medium text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-[#333333] active:translate-y-0"
            >
              + Yeni məktub yaz
            </button>
          )}
        </section>

        {/* New letter form */}
        {isFormOpen && (
          <form
            onSubmit={handleSubmit}
            onKeyDown={(e) => e.key === "Escape" && closeForm()}
            className="relative mb-10 overflow-hidden rounded-3xl border border-[#D4D4D4] bg-white p-7 shadow-sm"
          >

            <div className="relative z-10">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5F5F5] text-2xl text-[#000000]">
                  ✉
                </div>

                <div>
                  <h3 className="font-serif text-xl text-[#000000]">
                    Yeni məktub
                  </h3>
                  <p className="text-xs text-[#666666]">
                    Ürəyindən keçənləri yaz ♡
                  </p>
                </div>
              </div>

              {/* From → To */}
              <div className="mb-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs tracking-wide text-[#666666]">
                    KİMDƏN
                  </label>

                  <div className="rounded-2xl border border-[#D4D4D4] bg-[#FFFFFF] px-5 py-3 text-sm text-[#000000]">
                    {user?.name ?? "Mən"}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="letter-recipient"
                    className="mb-2 block text-xs tracking-wide text-[#666666]"
                  >
                    KİMƏ
                  </label>

                  <select
                    id="letter-recipient"
                    value={recipientId}
                    onChange={(e) => setRecipientId(e.target.value)}
                    className="w-full rounded-2xl border border-[#D4D4D4] bg-[#FFFFFF] px-5 py-3 text-sm text-[#000000] outline-none transition focus:border-[#000000] focus:ring-2 focus:ring-[#E5E5E5]"
                  >
                    <option value="" disabled>
                      Kimə yazırsan?
                    </option>

                    {recipients.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Title */}
              <label
                htmlFor="letter-title"
                className="mb-2 block text-xs tracking-wide text-[#666666]"
              >
                BAŞLIQ
              </label>

              <input
                id="letter-title"
                type="text"
                autoFocus
                maxLength={TITLE_MAX_LENGTH}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Sənə demək istədiklərim..."
                className="w-full rounded-2xl border border-[#D4D4D4] bg-[#FFFFFF] px-5 py-3 font-serif text-lg text-[#000000] outline-none transition placeholder:text-[#999999] focus:border-[#000000] focus:ring-2 focus:ring-[#E5E5E5]"
              />

              {/* Message */}
              <label
                htmlFor="letter-message"
                className="mb-2 mt-5 block text-xs tracking-wide text-[#666666]"
              >
                MƏKTUB
              </label>

              <textarea
                id="letter-message"
                rows={7}
                maxLength={MESSAGE_MAX_LENGTH}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Bəzən hisslərimi sözlə ifadə etmək çətin olur..."
                className="w-full resize-none rounded-2xl border border-[#D4D4D4] bg-[#FFFFFF] px-5 py-4 font-serif text-lg leading-8 text-[#000000] outline-none transition placeholder:text-[#999999] focus:border-[#000000] focus:ring-2 focus:ring-[#E5E5E5]"
              />

              <div className="mt-2 text-right text-xs text-[#666666]">
                {message.length}/{MESSAGE_MAX_LENGTH}
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
                  disabled={
                    submitting || !title.trim() || !message.trim() || !recipientId
                  }
                  className="rounded-2xl bg-[#000000] px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-[#333333] disabled:cursor-not-allowed disabled:opacity-65"
                >
                  {submitting ? "Göndərilir..." : "Məktubu göndər ♡"}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Letters grid */}
        {loading ? (
          <p className="py-16 text-center text-4xl text-[#000000]">
            <span className="animate-pulse">♡</span>
          </p>
        ) : loadError ? (
          <p className="rounded-2xl border border-black bg-[#F5F5F5] px-5 py-4 text-center text-sm text-[#000000]">
            {loadError}
          </p>
        ) : letters.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#D4D4D4] bg-white px-7 py-14 text-center">
            <p className="font-serif text-xl text-[#000000]">
              Hələ heç bir məktub yoxdur
            </p>
            <p className="mt-2 text-sm text-[#444444]">
              İlk məktubu sən yaz ♡
            </p>
          </div>
        ) : (
          <section className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {letters.map((letter, index) => (
              <article
                key={letter.id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-[#D4D4D4] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Decorative header */}
                <div className="relative flex h-44 items-center justify-center overflow-hidden bg-[#F5F5F5]">
                  <span className="absolute left-7 top-6 text-xl text-[#CCCCCC]">
                    ♡
                  </span>

                  <span className="absolute bottom-6 right-8 text-2xl text-[#CCCCCC]">
                    ♡
                  </span>

                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white bg-white text-5xl text-[#000000] shadow-sm transition duration-300 group-hover:scale-110">
                    {ICONS[index % ICONS.length]}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <p className="mb-3 text-xs tracking-wide text-[#666666]">
                    {formatDate(letter.createdAt)}
                  </p>

                  <h3 className="break-words font-serif text-2xl text-[#000000]">
                    {letter.title}
                  </h3>

                  {/* From → To */}
                  <p className="mt-4 inline-flex w-fit rounded-full bg-[#F5F5F5] px-3 py-1 text-xs text-[#444444]">
                    {getFromLabel(letter.from)} {getToLabel(letter.to)} ♡
                  </p>

                  <p className="mt-5 flex-1 whitespace-pre-line break-words text-sm leading-7 text-[#444444]">
                    {letter.message}
                  </p>

                  <div className="mt-6 border-t border-[#E5E5E5] pt-4">
                    <span className="text-sm font-medium text-[#000000]">
                      Sevgi ilə yazılıb ♡
                    </span>
                  </div>
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
            “Bəzi sözlər heç vaxt unudulmur.”
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

export default Letters;
