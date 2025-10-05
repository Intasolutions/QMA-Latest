import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const boardMembers = [
  // Directors
  { name: "Prakash Chandran", role: "Director", photo: "/Team/t7.png" },
  { name: "Mathew Easso", role: "Director", photo: "/Team/t8.png" },
  { name: "Joseph Abraham", role: "Director", photo: "/Team/t9.png" },
  { name: "Ram Krishna", role: "Director", photo: "/Team/t6.png" },
  { name: "John Varghese", role: "Director", photo: "/Team/t4.png" },

  // Executives
  { name: "Mathew Pulikunnel", role: "President", photo: "/Team/t1.png" },
  { name: "Biju Krishnan", role: "Vice President", photo: "/Team/t3.png" },
  { name: "John Joy", role: "Treasurer", photo: "/Team/t2.png" },
  { name: "Cissy", role: "Executive", photo: "/Team/t5.png" },
];

export default function BoardSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const circles = sectionRef.current.querySelectorAll(".member-circle");

    // Reveal animation
    gsap.fromTo(
      circles,
      { opacity: 0, y: 80, scale: 0.7, rotation: -5 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    // Bounce effect
    gsap.fromTo(
      circles,
      { y: -10 },
      {
        y: 0,
        duration: 0.8,
        ease: "bounce.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    // Border animation
    gsap.to(".member-border", {
      borderColor: "#34D399",
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-center items-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-16 overflow-x-hidden bg-white"
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-12 sm:mb-16 md:mb-20 drop-shadow-lg">
        Our Board Members
      </h2>

      {/* Executives */}
      <div className="w-full flex flex-col items-center gap-10">
        {/* Line 1: President, Vice President, Treasurer */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-16">
          {boardMembers
            .filter((m) =>
              ["President", "Vice President", "Treasurer"].includes(m.role)
            )
            .map((member) => (
              <div
                key={member.name}
                className="member-circle flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-28 sm:w-32 md:w-36 h-28 sm:h-32 md:h-36 rounded-full overflow-hidden border-2 border-emerald-400 member-border shadow-lg bg-white p-1 transition-transform duration-500 group-hover:scale-110 group-hover:shadow-emerald-300/50">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover object-top rounded-full"
                  />
                </div>
                <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-gray-900 drop-shadow-md">
                  {member.name}
                </h3>
                <p className="text-emerald-500 font-medium text-sm">
                  {member.role}
                </p>
              </div>
            ))}
        </div>

        {/* Line 2: Other Executives */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-16">
          {boardMembers
            .filter(
              (m) =>
                !["President", "Vice President", "Treasurer"].includes(m.role)
            )
            .map((member) => (
              <div
                key={member.name}
                className="member-circle flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 rounded-full overflow-hidden border-2 border-emerald-400 member-border shadow-lg bg-white p-1 transition-transform duration-500 group-hover:scale-105 group-hover:shadow-emerald-300/50">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover object-top rounded-full"
                  />
                </div>
                <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-gray-900 drop-shadow-md">
                  {member.name}
                </h3>
                <p className="text-emerald-500 font-medium text-sm">
                  {member.role}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
