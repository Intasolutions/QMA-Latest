import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Announcements() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const buttonRef = useRef(null);

  const announcements = [
    {
      id: 1,
      title: "Onam 2025 Celebrations",
      date: "August 25, 2025",
      description:
        "Join us for a grand Onam festival filled with traditional performances, games, and a sumptuous sadhya.",
      image: "/hero-1.jfif",
    },
    {
      id: 2,
      title: "Youth Talent Show",
      date: "September 15, 2025",
      description:
        "Showcasing the incredible talents of our Malayali youth across Canada in music, dance, and art.",
      image: "/hero-2.jfif",
    },
    {
      id: 3,
      title: "Community Volunteering Drive",
      date: "October 10, 2025",
      description:
        "Be part of our volunteering initiative as we support local shelters and spread kindness in our communities.",
      image: "/hero-3.jfif",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section Header Animation
      gsap.from(".section-header", {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
        },
      });

      // Cards Parallax + Fade + Scale + Rotation Animation
      gsap.from(cardRefs.current, {
        opacity: 0,
        y: 100,
        scale: 0.9,
        rotationX: 10,
        duration: 1.5,
        stagger: {
          each: 0.3,
          from: "start",
          ease: "elastic.out(1, 0.5)",
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          end: "bottom 70%",
          scrub: 1,
        },
      });

      // "View All Announcements" Button Bounce In
      gsap.from(buttonRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.8,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full flex items-center justify-center bg-white px-6 md:px-16"
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="section-header text-center mb-14">
          <p className="uppercase text-sm font-semibold text-gray-500 tracking-widest">
            Stay Updated
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-3">
            Latest Announcements
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Here’s what’s happening in our community. Don’t miss our upcoming
            events and news.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {announcements.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                if (el) cardRefs.current[index] = el;
              }}
              className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
            >
              {/* Background Image */}
              <div className="h-80 w-full">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 p-6 text-white">
                <p className="text-sm text-gray-300">{item.date}</p>
                <h3 className="text-2xl font-bold mt-2">{item.title}</h3>
                <p className="text-gray-200 mt-2 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div ref={buttonRef} className="text-center mt-14">
          <a
            href="/announcements"
            className="border-2 border-[#2D6A4F] text-[#2D6A4F] px-6 py-3 rounded-full font-semibold hover:bg-[#2D6A4F] hover:text-white transition"
          >
            View All Announcements
          </a>
        </div>
      </div>
    </section>
  );
}
