import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TypeAnimation } from "react-type-animation";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const imagesRef = useRef([]);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Image stagger animation
      gsap.from(imagesRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Content animation
      gsap.from(contentRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-6 md:px-16 bg-white relative overflow-hidden h-[100vh] flex justify-center items-center"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left: Image Grid */}
        <div className="grid grid-cols-3 gap-4 flex-1">
          {[
            { src: "/2.jpg", className: "rounded-tl-[50px]" },
            { src: "/Katha.png", className: "col-span-2 rounded-tr-[50px]" },
            { src: "/Katha.png", className: "row-span-2 rounded-bl-[50px]" },
            { src: "/2.jpg", className: "row-span-2 rounded-br-[50px]" },
            { src: "/Katha.png", className: "row-span-2 rounded-br-[50px]" },
          ].map((img, idx) => (
            <div
              key={idx}
              className={`${img.className} overflow-hidden`}
              ref={(el) => (imagesRef.current[idx] = el)}
            >
              <img
                src={img.src}
                alt={`Culture ${idx + 1}`}
                className="w-full h-[200px] md:h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
              />
            </div>
          ))}
        </div>

        {/* Right: Content */}
        <div className="flex-1 text-center md:text-left" ref={contentRef}>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-snug bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-300">
            Welcome to <br />
            <TypeAnimation
              sequence={[
                "Quinte Malayalee Association",
                2000,
                "A Vibrant Community",
                2000,
                "Celebrating Kerala Roots",
                2000,
              ]}
              speed={50}
              repeat={Infinity}
              className="inline-block"
            />
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
            Quinte Malayalee Association (QMA) brings together Malayalee families
            across the Bay of Quinte. A vibrant, diverse, and close-knit
            community, QMA celebrates our Kerala roots while building strong
            connections in Ontario.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex gap-4 justify-center md:justify-start">
            <Link
              to="/join"
              className="bg-[#2D6A4F] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1B4332] transition"
            >
              Join Us
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-10 border-t pt-6 text-gray-700">
            <p className="text-sm">Have any questions? Contact us!</p>
            <p className="mt-2 text-lg font-semibold text-[#E63946]">
              +1 (123) 456 7890
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
