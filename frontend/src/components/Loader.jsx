import React, { useEffect } from "react";
import gsap from "gsap";

export default function Loader({ onFinish }) {
  useEffect(() => {
    // Hide page content initially
    gsap.set(".page-content", { opacity: 0, y: 40 });

    const tl = gsap.timeline({
      onComplete: () => {
        onFinish?.();

        // After loader is gone, reveal page content
        gsap.to(".page-content", {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.15,
        });
      },
    });

    // 1️⃣ Animate logo popping in
    tl.fromTo(
      ".loader-logo",
      { scale: 0, opacity: 0, rotation: -90 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      }
    );

    // 2️⃣ Animate bubbles floating up randomly
    tl.fromTo(
      ".loader-bubble",
      { y: 50, opacity: 0, scale: 0 },
      {
        y: () => Math.random() * -100 - 50,
        x: () => Math.random() * 100 - 50,
        opacity: 1,
        scale: 1,
        rotation: () => Math.random() * 360,
        stagger: 0.08,
        duration: 1.5,
        ease: "power3.out",
      },
      "-=0.7"
    );

    // 3️⃣ Animate progress bar
    tl.to(
      ".loader-bar",
      {
        width: "100%",
        duration: 1.5,
        ease: "power2.inOut",
      },
      "-=1.2"
    );

    // 4️⃣ Slide loader up and fade out
    tl.to(".loader-container", {
      y: "-100%",
      opacity: 0,
      duration: 1.2,
      ease: "power2.inOut",
      delay: 0.3,
    });
  }, [onFinish]);

  return (
    <div className="loader-container fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      {/* Logo Image */}
      <img
        src="/Logo/Logo.png"
        alt="QMA Logo"
        className="loader-logo w-32 md:w-48 mb-6 drop-shadow-2xl"
      />

      {/* Bubble Particles (Red & Gold theme) */}
      <div className="relative w-32 h-32">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`loader-bubble absolute w-4 h-4 rounded-full ${
              i % 2 === 0 ? "bg-red-600" : "bg-yellow-400"
            } opacity-90`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          ></div>
        ))}
      </div>

      {/* Progress Bar (Red main, Gold fill) */}
      <div className="w-64 h-2 bg-red-800 rounded-full overflow-hidden mt-6 shadow-lg">
        <div className="loader-bar h-full bg-yellow-400 w-0"></div>
      </div>
    </div>
  );
}
