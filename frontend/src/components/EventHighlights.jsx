import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EventHighlights() {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch latest 10 announcements using fetch
    fetch("http://15.157.67.144/api/announcements/?page_size=10")
      .then((response) => response.json())
      .then((data) => {
        // If pagination is applied, get `results`
        const announcements = data.results || data;
        setEvents(announcements);
      })
      .catch((error) => console.error("Error fetching announcements:", error));
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !wrapperRef.current || events.length === 0) return;

    const ctx = gsap.context(() => {
      const cards = wrapperRef.current.querySelectorAll(".event-card");
      const scrollLength = wrapperRef.current.scrollWidth - sectionRef.current.offsetWidth;

      // Horizontal scroll animation
      gsap.to(wrapperRef.current, {
        x: -scrollLength,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollLength}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (events.length - 1),
            duration: 0.6,
            ease: "power1.inOut",
          },
        },
      });

      // Staggered card reveal animation
      gsap.fromTo(
        cards,
        { opacity: 0, scale: 0.8, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          ease: "power4.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [events]);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen overflow-hidden bg-white">
      {/* Title */}
      <div className="absolute top-8 sm:top-12 left-1/2 -translate-x-1/2 text-center px-4 z-20">
        <p className="uppercase text-xs sm:text-sm font-semibold text-gray-500 tracking-widest">
          Stay Updated
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">
          Latest Announcements
        </h2>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-md sm:max-w-xl md:max-w-2xl mx-auto">
          Here’s what’s happening in our community. Don’t miss our upcoming events and news.
        </p>
      </div>

      {/* Horizontal Scrolling Cards */}
      <div
        ref={wrapperRef}
        className="flex items-center h-full space-x-4 sm:space-x-6 md:space-x-8 px-4 sm:px-6 md:px-16 mt-24 sm:mt-28"
      >
        {events.map((event) => (
          <div
            key={event.id}
            className="event-card min-w-[240px] sm:min-w-[300px] md:min-w-[420px] h-[280px] sm:h-[320px] md:h-[340px] rounded-2xl overflow-hidden shadow-lg relative group cursor-pointer transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={event.image || "/placeholder-image.jpg"}
              alt={event.title}
              className="w-full h-full object-cover transform transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500"></div>

            {/* Date Badge */}
            <span className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-[#2D6A4F] text-white text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full shadow-md z-20">
              {new Date(event.date).toLocaleDateString()}
            </span>

            <div className="absolute bottom-0 p-4 sm:p-5 md:p-6 text-white">
              <h3 className="text-xl sm:text-2xl font-bold">{event.title}</h3>
              <p className="mt-1 sm:mt-2 text-sm sm:text-gray-200 line-clamp-2">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
