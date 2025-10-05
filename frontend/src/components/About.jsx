import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal
      gsap.fromTo(
        textRef.current,
        { x: -100, opacity: 0, scale: 0.95, rotate: -2 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Image reveal
      gsap.fromTo(
        imageRef.current,
        { x: 100, opacity: 0, scale: 0.95, rotate: 2 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Optional: slight floating effect on image
      gsap.to(imageRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full flex items-center justify-center px-6 md:px-16 bg-white"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-12 shadow-lg rounded-xl p-10">
        {/* Left: Text Content */}
        <div className="flex-1" ref={textRef}>
          <p className="uppercase text-sm font-semibold text-gray-500 tracking-wide">
            Who We Are
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mt-2">About Us</h2>
          <p className="mt-6 text-gray-600 leading-relaxed">
            Welcome to the{" "}
            <span className="font-semibold">QUINTE MALAYALEE ASSOCIATION (QMA)</span>. 
            The Malayalee community in the Bay of Quinte is a young, vibrant, and diverse group united by shared culture and traditions. Families from Kerala and beyond have come together to form a close-knit community, celebrating festivals like Onam, Vishu, Diwali, and Christmas with enthusiasm, bringing the spirit of Kerala to Ontario.
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Beyond cultural celebrations, our community thrives on support and togetherness. From helping newcomers settle to excelling in healthcare, IT, business, and academia, Quinte Malayalees embody unity, professional excellence, and the spirit of camaraderie while enriching the fabric of the region.
          </p>

          <div className="mt-6">
            <a
              href="/AboutMain"
              className="border-2 border-[#2D6A4F] text-[#2D6A4F] px-6 py-3 rounded-full font-semibold hover:bg-[#2D6A4F] hover:text-white transition"
            >
              Read More
            </a>
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex-1 flex justify-center" ref={imageRef}>
          <img
            src="/hero-1.jfif"
            alt="Malayali Culture"
            className="rounded-xl shadow-md object-cover w-full max-w-md transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}
