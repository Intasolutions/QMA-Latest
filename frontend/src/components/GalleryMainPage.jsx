import { useEffect, useRef, useMemo, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GalleryMainPage() {
  const galleryRef = useRef(null);
  const [images, setImages] = useState([]);
  const [lightboxImg, setLightboxImg] = useState(null);

  const [yearFilter, setYearFilter] = useState("All");
  const [eventFilter, setEventFilter] = useState("All");

  useEffect(() => {
    fetch("/api/gallery/")
      .then((res) => res.json())
      .then((data) => {
        const items = data.results || data || [];

        const normalized = items.map((it, idx) => {
          const src =
            it.src ||
            it.image ||
            it.image_url ||
            it.url ||
            (it.photo && it.photo.url) ||
            it.file ||
            "";

          const event =
            (it.event && String(it.event).trim()) ||
            (it.category && String(it.category).trim()) ||
            (it.type && String(it.type).trim()) ||
            (it.tags && it.tags[0] && String(it.tags[0]).trim()) ||
            "Unknown";

          let year = it.year ?? null;
          if (!year && it.date) {
            const parsed = new Date(it.date);
            if (!Number.isNaN(parsed.getFullYear())) year = parsed.getFullYear();
          }
          if (!year && it.created_at) {
            const parsed = new Date(it.created_at);
            if (!Number.isNaN(parsed.getFullYear())) year = parsed.getFullYear();
          }
          year = year ? String(year) : "Unknown";

          return {
            id: it.id ?? `img-${idx}`,
            src,
            year,
            event,
            raw: it,
          };
        });

        setImages(normalized.filter((n) => n.src));
      })
      .catch((err) => console.error("Failed to fetch gallery images:", err));
  }, []);

  // derive dynamic years from backend data (includes "All" and sorts descending, Unknown last)
  const years = useMemo(() => {
    const set = new Set();
    images.forEach((i) => {
      if (i.year && i.year !== "Unknown") set.add(i.year);
    });
    const arr = Array.from(set).sort((a, b) => Number(b) - Number(a)); // descending numeric sort
    return ["All", ...arr, ...(images.some((i) => i.year === "Unknown") ? ["Unknown"] : [])];
  }, [images]);

  // derive events but explicitly exclude Community and Festival
  const events = useMemo(() => {
    const exclude = new Set(["Community", "Festival"]);
    const set = new Set();
    images.forEach((i) => {
      const ev = i.event ? String(i.event).trim() : "Unknown";
      if (!exclude.has(ev)) set.add(ev);
    });
    const arr = Array.from(set).sort(); // alphabetical
    return ["All", ...arr];
  }, [images]);

  const filteredImages = useMemo(() => {
    return images.filter((img) => {
      const yearMatch = yearFilter === "All" || img.year === yearFilter;
      const eventMatch =
        eventFilter === "All" ||
        (img.event && String(img.event).trim().toLowerCase() === String(eventFilter).trim().toLowerCase());
      return yearMatch && eventMatch;
    });
  }, [images, yearFilter, eventFilter]);

  // gsap reveal animations (scoped)
  useEffect(() => {
    if (!galleryRef.current) return;
    const ctx = gsap.context(() => {
      const revealContainers = gsap.utils.toArray(".reveal");
      revealContainers.forEach((container, i) => {
        const image = container.querySelector("img");
        gsap.set(container, {
          autoAlpha: 1,
          clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
          overflow: "hidden",
        });
        if (image) gsap.set(image, { scale: 1.4 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          delay: i * 0.06,
        });

        tl.to(container, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1.0, ease: "power3.out" });
        if (image) tl.to(image, { scale: 1, duration: 1.3, ease: "power3.out" }, "<");
      });
    }, galleryRef.current);

    return () => ctx.revert();
  }, [filteredImages]);

  useEffect(() => {
    const cards = galleryRef.current?.querySelectorAll(".gallery-card") || [];
    if (!cards.length) return;
    gsap.fromTo(
      cards,
      { opacity: 0, scale: 0.96, y: 14 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45, stagger: 0.06, ease: "power3.out" }
    );
  }, [filteredImages]);

  useEffect(() => {
    const activeChips = galleryRef.current?.querySelectorAll(".chip-active") || [];
    if (!activeChips.length) return;
    gsap.fromTo(
      activeChips,
      { scale: 0.92, boxShadow: "0 0 0px rgba(0,0,0,0)" },
      { scale: 1, boxShadow: "0 0 15px rgba(20,184,166,0.35)", duration: 0.35, ease: "back.out(2)", stagger: 0.06 }
    );
  }, [yearFilter, eventFilter]);

  useEffect(() => {
    if (lightboxImg) {
      gsap.fromTo(".lightbox-img", { opacity: 0, scale: 0.9, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 0.45 });
    }
  }, [lightboxImg]);

  return (
    <section ref={galleryRef} className="relative px-6 md:px-16 py-20 bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 relative inline-block">
          Our Gallery
          <span className="block w-20 h-1 bg-gradient-to-r from-green-500 to-teal-400 mx-auto mt-3 rounded-full" />
        </h2>
        <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
          A vibrant showcase of our community events, festivals, and traditions.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mb-12">
        {/* Dynamic years from backend */}
        <div className="flex gap-2 flex-wrap">
          {years.map((y) => (
            <button
              key={y}
              onClick={() => setYearFilter(y)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition chip ${
                yearFilter === y ? "bg-teal-500 text-white chip-active" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {y}
            </button>
          ))}
        </div>

        {/* events derived from backend but excluding Community and Festival */}
        <div className="flex gap-2 flex-wrap">
          {events.map((e) => (
            <button
              key={e}
              onClick={() => setEventFilter(e)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition chip ${
                eventFilter === e ? "bg-green-500 text-white chip-active" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
        {filteredImages.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">No images found for the selected filters.</div>
        )}

        {filteredImages.map((img) => (
          <div
            key={img.id}
            className="gallery-card relative overflow-hidden rounded-2xl shadow-xl cursor-pointer group break-inside-avoid reveal"
            onClick={() => setLightboxImg(img.src)}
          >
            <img src={img.src} alt={img.event} className="w-full object-cover rounded-2xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end justify-start p-6">
              <p className="text-white font-semibold text-lg tracking-wide">{img.event}</p>
            </div>
          </div>
        ))}
      </div>

      {lightboxImg && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setLightboxImg(null)}>
          <img src={lightboxImg} alt="Full View" className="lightbox-img max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl" />
        </div>
      )}
    </section>
  );
}
