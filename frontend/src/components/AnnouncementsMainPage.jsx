import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AnnouncementsMainPage() {
  const containerRef = useRef(null);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Fetch all announcements
    fetch("http://15.157.67.144/api/announcements/")
      .then((res) => res.json())
      .then((data) => {
        const items = data.results || data;
        setAnnouncements(items);
      })
      .catch((err) => console.error("Failed to fetch announcements:", err));
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animations
      gsap.from(".heading", {
        opacity: 0,
        y: -30, // Reduced for mobile
        duration: 0.8,
        ease: "power4.out",
      });
      gsap.from(".heading-underline", {
        scaleX: 0,
        transformOrigin: "center",
        duration: 0.7,
        ease: "power4.out",
        delay: 0.2,
      });
      gsap.from(".heading-subtext", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power4.out",
        delay: 0.3,
      });

      // Card animations
      gsap.utils.toArray(".announcement-card").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 50, // Reduced for mobile
          scale: 0.95,
          rotationX: 3,
          rotationY: -2,
          transformOrigin: "center center -30",
          duration: 0.8,
          ease: "power4.out",
          delay: i * 0.15,
          scrollTrigger: {
            trigger: card,
            start: "top 90%", // Earlier for mobile
            toggleActions: "play none none reverse",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [announcements]);

  return (
    <section ref={containerRef} className="relative px-4 sm:px-6 md:px-12 py-12 sm:py-16 bg-gray-50 overflow-x-hidden">
      {/* Heading */}
      <div className="text-center mb-8 sm:mb-12 md:mb-16">
        <h2 className="heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 relative inline-block">
          Announcements
          <span className="heading-underline block w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-green-500 to-teal-400 mx-auto mt-2 sm:mt-3 rounded-full"></span>
        </h2>
        <p className="heading-subtext mt-4 sm:mt-5 text-gray-600 max-w-md sm:max-w-lg md:max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
          Stay updated with the latest notices, programs, and community updates.
        </p>
      </div>

      {/* Announcements List */}
      <div className="space-y-6 sm:space-y-8 max-w-full sm:max-w-3xl md:max-w-4xl mx-auto">
        {announcements.map((item) => (
          <div
            key={item.id}
            className="announcement-card bg-white rounded-2xl sm:rounded-3xl shadow-md sm:shadow-lg flex flex-col items-start p-4 sm:p-6 md:p-8 space-y-4 hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:scale-102"
          >
            {/* Image */}
            <div className="flex-shrink-0 w-full h-50 sm:h-28 md:h-52 rounded-lg sm:rounded-xl overflow-hidden">
              <img
                src={item.image || "/placeholder-image.jpg"}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="flex-1 w-full">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">{item.title}</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {new Date(item.date).toLocaleDateString()}
              </p>
              <p className="mt-2 text-gray-600 text-xs sm:text-sm md:text-base line-clamp-3">{item.description}</p>
            </div>

            {/* Download PDF Button */}
            {item.pdf && (
              <a
                href={item.pdf}
                download
                className="w-full sm:w-auto mt-2 sm:mt-0 flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm shadow transition-transform duration-300 hover:scale-105"
              >
                <Download size={16} />
                Download
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
