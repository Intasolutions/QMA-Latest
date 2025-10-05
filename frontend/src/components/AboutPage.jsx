import { useEffect, useRef } from "react";
import { FaUsers, FaHandsHelping, FaHeartbeat } from "react-icons/fa";
import { MdSportsVolleyball } from "react-icons/md";
import { GiBookPile } from "react-icons/gi";
import { RiWomenLine } from "react-icons/ri";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import About from "./About";
import { useDialog } from "./DialogContext";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef(null);
  const { openDialog } = useDialog();

  useEffect(() => {
    const ctx = gsap.context(() => {
      /** ───────── Panel Snapping (Disabled for Mobile) ───────── */
      let panels = gsap.utils.toArray(".panel");

      // Only enable panel snapping for screens >= 640px (sm breakpoint)
      if (window.innerWidth >= 640) {
        let tops = panels.map((panel) =>
          ScrollTrigger.create({ trigger: panel, start: "top top" })
        );

        panels.forEach((panel) => {
          ScrollTrigger.create({
            trigger: panel,
            start: "top top",
            pin: true,
            pinSpacing: false,
          });
        });

        ScrollTrigger.create({
          snap: {
            snapTo: (progress, self) => {
              let panelStarts = tops.map((st) => st.start);
              let snapScroll = gsap.utils.snap(panelStarts, self.scroll());
              return gsap.utils.normalize(
                0,
                ScrollTrigger.maxScroll(window),
                snapScroll
              );
            },
            duration: 0.3,
            ease: "power2.inOut",
          },
        });
      }

      /** ───────── Animations ───────── */

      // Mission & Vision
      const mvTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".mission-vision-panel",
          start: "top 90%",
          once: true,
        },
      });

      // Panel fade-in
      mvTl.from(".mission-vision-panel", {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      // Cards reveal with clip-path + upward motion
      mvTl.from(".mv-card", {
        y: 40,
        opacity: 0,
        clipPath: "inset(0 0 100% 0)",
        duration: 0.7,
        ease: "power4.out",
        stagger: 0.15,
      });

      // Card titles appear after card background
      mvTl.from(
        ".mv-card h3",
        {
          y: 15,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.1,
        },
        "-=0.5"
      );

      // Floating + parallax blobs
      const blobs = gsap.utils.toArray(".parallax-blob");

      blobs.forEach((blob, i) => {
        gsap.to(blob, {
          yPercent: i % 2 === 0 ? 20 : -20,
          ease: "none",
          scrollTrigger: {
            trigger: blob,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(blob, {
          y: "+=8",
          scale: 1.02,
          duration: 2.5 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // What We Do - Title + Cards Reveal
      const whatTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".what-card",
          start: "top 90%",
          once: true,
        },
      });

      whatTl.from(".what-title", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power4.out",
      });

      whatTl.from(
        ".what-card",
        {
          y: 25,
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
        },
        "-=0.4"
      );

      // Floating icons inside cards
      const icons = gsap.utils.toArray(".what-icon");
      icons.forEach((icon, i) => {
        gsap.to(icon, {
          yPercent: i % 2 === 0 ? 8 : -8,
          ease: "none",
          scrollTrigger: {
            trigger: icon,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(icon, {
          y: "+=4",
          duration: 1.5 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Call To Action - Premium Reveal
      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 90%",
          once: true,
        },
      });

      ctaTl.from(".cta-section h3", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power4.out",
      });

      ctaTl.from(
        ".cta-section p",
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      );

      ctaTl.from(
        ".cta-section button",
        {
          y: 15,
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          ease: "back.out(1.5)",
        },
        "-=0.3"
      );

      // Background shimmer effect for CTA
      gsap.to(".cta-section", {
        backgroundPosition: "200% center",
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "linear",
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full overflow-x-hidden">
      {/* Panel 1: Intro */}
      <section className="panel min-h-[60vh] sm:min-h-[100vh] flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 bg-white">
        <About />
      </section>

      {/* Panel 2: Mission & Vision */}
      <section className="panel mission-vision-panel min-h-[60vh] sm:min-h-[70vh] md:min-h-[100vh] flex items-center justify-center px-3 sm:px-4 md:px-6 bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden">
        {/* Floating blobs */}
        <div className="parallax-blob absolute -top-8 sm:-top-10 -left-8 sm:-left-10 w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 bg-green-200 rounded-full blur-lg sm:blur-xl opacity-40 z-0"></div>
        <div className="parallax-blob absolute bottom-0 right-0 w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 bg-green-300 rounded-full blur-lg sm:blur-xl opacity-30 z-0"></div>

        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 items-center relative z-10 max-w-full sm:max-w-3xl md:max-w-4xl">
          <div className="mv-card bg-white p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl shadow-md">
            <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-[#2D6A4F] mb-2 sm:mb-3 md:mb-4">
              Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base">
              To preserve and promote Malayali culture, traditions, and values in Canada while fostering unity, inclusion, and growth.
            </p>
          </div>

          <div className="mv-card bg-white p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl shadow-md">
            <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-[#2D6A4F] mb-2 sm:mb-3 md:mb-4">
              Our Vision
            </h3>
            <p className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base">
              To build a united, thriving community that contributes socially, culturally, and economically to Canadian society.
            </p>
          </div>
        </div>
      </section>

      {/* Panel 3: What We Do */}
      <section className="panel min-h-[120vh] sm:min-h-[100vh] md:min-h-[100vh] flex flex-col items-center justify-start px-3 sm:px-4 md:px-6 bg-gradient-to-r from-purple-50 to-purple-100 relative overflow-hidden">
        <h3 className="what-title text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-4 sm:mt-6 md:mt-8 mb-4 sm:mb-6 md:mb-8">
          What We Do
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-full sm:max-w-3xl md:max-w-4xl w-full relative z-10">
          {[
            { title: "Cultural Events", desc: "Onam, Vishu, Christmas, Diwali.", icon: <FaUsers className="what-icon text-purple-600 text-xl sm:text-2xl md:text-3xl" /> },
            { title: "Community Support", desc: "Helping newcomers, volunteering, scholarships.", icon: <FaHandsHelping className="what-icon text-green-600 text-xl sm:text-2xl md:text-3xl" /> },
            { title: "Sports", desc: "Cricket, Volleyball, arts competitions.", icon: <MdSportsVolleyball className="what-icon text-blue-600 text-xl sm:text-2xl md:text-3xl" /> },
            { title: "Youth Programs", desc: "Workshops, leadership, networking.", icon: <GiBookPile className="what-icon text-yellow-600 text-xl sm:text-2xl md:text-3xl" /> },
            { title: "Women Empowerment", desc: "Awareness & support initiatives.", icon: <RiWomenLine className="what-icon text-pink-600 text-xl sm:text-2xl md:text-3xl" /> },
            { title: "Charity Drives", desc: "Blood donation, fundraisers, aid.", icon: <FaHeartbeat className="what-icon text-red-600 text-xl sm:text-2xl md:text-3xl" /> },
          ].map((item, idx) => (
            <div
              key={idx}
              className="what-card group flex flex-col justify-between p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl shadow-md bg-white/70 backdrop-blur-md border border-white/30 hover:shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:scale-102"
            >
              <div>
                <div className="mb-2 sm:mb-3">{item.icon}</div>
                <h4 className="text-sm sm:text-base md:text-lg font-bold text-[#2D6A4F] mb-2 sm:mb-3 group-hover:text-purple-600 transition">
                  {item.title}
                </h4>
              </div>
              <p className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base mt-2 sm:mt-3">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Panel 4: Call to Action */}
      <section className="panel cta-section min-h-[60vh] sm:min-h-[70vh] md:min-h-[100vh] flex flex-col items-center justify-center bg-gradient-to-r from-green-200 via-green-300 to-green-400 bg-[length:200%_200%] px-3 sm:px-4 md:px-6 text-center text-white relative overflow-hidden">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 md:mb-6">
          Join Us Today
        </h3>
        <p className="max-w-xs sm:max-w-sm md:max-w-md mb-4 sm:mb-6 md:mb-8 text-xs sm:text-sm md:text-base">
          Become part of a growing Malayali community in Canada. Celebrate our culture, support each other, and make a difference together.
        </p>
        <div className="space-x-4">
          <button
            onClick={openDialog}
            className="px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full bg-white text-green-700 font-semibold text-xs sm:text-sm md:text-base shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105"
          >
            Become a Member
          </button>
        </div>
      </section>
    </div>
  );
}