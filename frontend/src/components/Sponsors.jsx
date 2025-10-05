import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sponsors = [
  { id: 1, image: "/sponsor/S-1.png", badge: "Mega Sponsor" },
  { id: 2, image: "/sponsor/s-7.png", badge: "Mega Sponsor" },
{ id: 6, image: "/sponsor/s-6.png", badge: "Gold Sponsor" },

  { id: 3, image: "/sponsor/s-2.png", badge: "Gold Sponsor" },
  { id: 4, image: "/sponsor/S-3.1.png", badge: "Gold Sponsor" },
  { id: 5, image: "/sponsor/S-1.1.png", badge: "Gold Sponsor" },
  
  { id: 7, image: "/sponsor/s-7.1.png", badge: "Gold Sponsor" },
  { id: 8, image: "/sponsor/S-8.png", badge: "Bronze Sponsor" },
  { id: 9, image: "/sponsor/s-4.png", badge: "Bronze Sponsor" },
  { id: 10, image: "/sponsor/s-10.png", badge: "Bronze Sponsor" },
  { id: 11, image: "/sponsor/S-11.png", badge: "Bronze Sponsor" },
];

export default function Sponsors() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const bubbleContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const track = trackRef.current;
      const panels = gsap.utils.toArray(track.children);

      gsap.set(track, { width: `${panels.length * 100}vw` });
      ScrollTrigger.getAll().forEach((t) => t.kill());

      const horizontalScroll = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: 0.3,
            ease: "power1.inOut",
          },
        },
      });

      gsap.from(panels, {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      panels.forEach((panel) => {
        const img = panel.querySelector("img");

        gsap.from(img, {
          opacity: 0,
          y: 20,
          scale: 0.95,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: horizontalScroll,
            start: "left center",
            end: "right center",
            scrub: 0.5,
          },
        });
      });

      // Floating bubbles
      const bubbleContainer = bubbleContainerRef.current;
      for (let i = 0; i < 25; i++) {
        const bubble = document.createElement("div");
        bubble.className =
          "bubble absolute rounded-full opacity-40 pointer-events-none";
        const size = gsap.utils.random(20, 50);
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.background = gsap.utils.random([
          "#E63946", // red
          "#2D6A4F", // dark green
          "#C5C5C5", // gray
        ]);
        bubble.style.top = `${gsap.utils.random(0, 100)}%`;
        bubble.style.left = `${gsap.utils.random(0, 100)}%`;
        bubbleContainer.appendChild(bubble);

        gsap.to(bubble, {
          y: "-=150",
          x: "+=" + gsap.utils.random(-30, 30),
          duration: gsap.utils.random(6, 12),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full relative overflow-hidden bg-gradient-to-r from-white via-gray-50 to-gray-100 py-12 sm:py-16 md:py-20">
      {/* Bubbles */}
      <div ref={bubbleContainerRef} className="absolute inset-0 z-0 overflow-hidden"></div>

      <h2 className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2D6A4F] text-center mb-10">
        Our Sponsors
      </h2>

      <div ref={containerRef} className="relative z-10">
        <div className="flex h-[80vh] sm:h-screen" ref={trackRef}>
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="flex-shrink-0 w-screen h-[80vh] sm:h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-12"
            >
              {/* Badge */}
              <span className="inline-block mb-6 px-4 py-2 text-sm sm:text-lg font-bold text-white bg-gradient-to-r from-red-500 to-green-600 rounded-full shadow-md">
                {sponsor.badge}
              </span>

              {/* Image only */}
              {/* Image only */}
<img
  src={sponsor.image}
  alt={sponsor.badge}
  className="w-[600px] h-[400px] object-contain rounded-2xl shadow-lg transition-transform duration-500 hover:scale-105"
/>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
