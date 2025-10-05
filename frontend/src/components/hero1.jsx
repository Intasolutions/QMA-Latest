import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero1() {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade + slide in text
      gsap.fromTo(
        textRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
            scrub: true,
          },
        }
      );

      // Button pop-up
      gsap.fromTo(
        btnRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 75%",
            scrub: true,
          },
        }
      );

      // Background zoom-in parallax
      gsap.fromTo(
        heroRef.current.querySelector(".hero-bg"),
        { scale: 1.2 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 hero-bg">
        <img
          src="/Katha.png"
          alt="Malayali Culture"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Foreground Content */}
      <div
        ref={textRef}
        className="relative z-10 px-6 md:px-12 text-white max-w-4xl"
      >
        <h1 className="text-4xl md:text-6xl tracking-tight leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]">
          WELCOME TO QUINTE MALAYALEE ASSOCIATION
        </h1>

        {/* CTA Button */}
        <div className="mt-10 flex justify-center" ref={btnRef}>
          <a
            href="/join"
            className="bg-[#2D6A4F] hover:bg-[#1B4332] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition transform hover:scale-105"
          >
            Join Us
          </a>
        </div>
      </div>
    </section>
  );
}
