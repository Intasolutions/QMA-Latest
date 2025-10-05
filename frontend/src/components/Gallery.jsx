import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function GallerySlider() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  const slideRefs = useRef([]);
  const captionRefs = useRef([]);
  const buttonRef = useRef(null);

  // Fetch latest 5 gallery images from backend
  useEffect(() => {
    fetch("http://15.157.67.144/api/gallery/")
      .then((res) => res.json())
      .then((data) => {
        const items = data.results || data;
        const sorted = items.sort((a, b) => b.id - a.id); // Newest first
        setSlides(sorted.slice(0, 5)); // Take only latest 5 images
      })
      .catch((err) => console.error("Failed to fetch gallery images:", err));
  }, []);

  // Auto rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      goToSlide((current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [current, slides]);

  const goToSlide = (index) => {
    const prev = current;
    setCurrent(index);

    // Animate previous slide out
    if (slideRefs.current[prev]) {
      gsap.to(slideRefs.current[prev], {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power3.inOut",
      });
      gsap.to(captionRefs.current[prev], {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.inOut",
      });
    }

    // Animate current slide in
    if (slideRefs.current[index]) {
      gsap.fromTo(
        slideRefs.current[index],
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power3.inOut" }
      );
      gsap.fromTo(
        captionRefs.current[index],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );

      if (buttonRef.current) {
        gsap.fromTo(
          buttonRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 }
        );
      }
    }
  };

  // Initial animation on first slide
  useEffect(() => {
    if (slides.length && slideRefs.current[0]) {
      gsap.fromTo(
        slideRefs.current[0],
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power3.inOut" }
      );
    }
    if (slides.length && captionRefs.current[0]) {
      gsap.fromTo(
        captionRefs.current[0],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );
    }
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 }
      );
    }
  }, [slides]);

  return (
    <section className="relative w-full h-[70vh] sm:h-[80vh] md:h-[100vh] overflow-x-hidden bg-black">
      {/* Slides */}
      <div className="relative w-full h-full overflow-x-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            ref={(el) => (slideRefs.current[index] = el)}
            className={`absolute inset-0 w-full h-full transition-all duration-700 ${
              index === current ? "z-10" : "z-0"
            }`}
          >
            <img
              src={slide.src}
              alt={`${slide.event} - ${slide.year}`}
              loading="lazy"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

            <div
              ref={(el) => (captionRefs.current[index] = el)}
              className="absolute bottom-12 sm:bottom-20 md:bottom-28 left-1/2 -translate-x-1/2 text-center text-white px-4 max-w-[90%] sm:max-w-[80%] md:max-w-[70%]"
            >
              <h3 className="text-xl sm:text-2xl md:text-4xl font-bold drop-shadow-lg">
                {slide.event} - {slide.year}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* View Full Gallery Button */}
      <div
        ref={buttonRef}
        className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
      >
        <a
          href="/gallery"
          className="bg-[#2D6A4F] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-base sm:text-lg shadow-lg hover:bg-[#1B4332] transition-all duration-150"
        >
          View Full Gallery →
        </a>
      </div>
    </section>
  );
}
