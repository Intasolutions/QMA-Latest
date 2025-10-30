import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { TypeAnimation } from "react-type-animation";
import { useDialog } from "./DialogContext";

export default function Hero() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const buttonWrapperRef = useRef(null); // animate wrapper, not Link
  const contactRef = useRef(null);

  const { openDialog } = useDialog();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      /** Background blob scale + fade */
      tl.from(".hero__image > div:first-child", {
        scale: 0.6,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      });

      /** Image reveal with scale + slide */
      tl.from(
        imageRef.current,
        {
          opacity: 0,
          y: 100,
          scale: 0.9,
          duration: 1.4,
          ease: "power3.out",
        },
        "-=0.8"
      );

      /** Headline wipe-in effect */
      tl.from(
        contentRef.current.querySelector("h1"),
        {
          opacity: 0,
          y: 50,
          clipPath: "inset(0 0 100% 0)", // wipe upward
          duration: 1.2,
          ease: "power4.out",
        },
        "-=1"
      );

      /** Paragraph fade + slide */
      tl.from(
        contentRef.current.querySelector("p"),
        {
          opacity: 0,
          y: 30,
          duration: 1,
        },
        "-=0.6"
      );

      /** Button bounce reveal */
      tl.from(
        buttonWrapperRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
          duration: 0.9,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      );

      /** Contact info smooth fade */
      tl.from(
        contactRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 1,
        },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative px-4 sm:px-6 md:px-16 overflow-hidden min-h-screen flex justify-center items-center z-20"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-12">
        {/* Left: Image */}
        <div className="flex-1 flex justify-center relative" ref={imageRef}>
          <div className="relative w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[680px] md:h-[680px] flex items-center justify-center hero__image">
            {/* Floating gradient blob */}
            <div className="absolute inset-0 bg-gradient-to-tr from-green-500 via-teal-400 to-blue-500 rounded-[60%] blur-3xl opacity-40"></div>

<div className="relative w-[350px] h-[220px] sm:w-[500px] sm:h-[320px] md:w-[700px] md:h-[450px] rounded-[40%_60%_40%_60%] overflow-hidden">
  <img
    src="/hero-new.jpg"
    alt="Belleville Ontario"
    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
  />
</div>

          </div>
        </div>

        {/* Right: Content */}
        <div className="flex-1 text-center md:text-left">
          <div ref={contentRef}>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-snug bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-300">
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

            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-md mx-auto md:mx-0">
              Quinte Malayalee Association (QMA) brings together Malayalee
              families across the Bay of Quinte. A vibrant, diverse, and
              close-knit community, QMA celebrates our Kerala roots while
              building strong connections in Ontario.
            </p>
          </div>

          {/* Button wrapper for GSAP ref */}
          <div
            ref={buttonWrapperRef}
            className="mt-6 sm:mt-8 flex gap-4 justify-center md:justify-start"
          >
            <button
              onClick={openDialog}
              className="bg-[#2D6A4F] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-[#1B4332] transition"
            >
              Join Us
            </button>
          </div>

          {/* Contact info */}
          <div ref={contactRef} className="mt-8 sm:mt-10 border-t pt-4 sm:pt-6 text-gray-700">
            <p className="text-sm">Have any questions? Contact us!</p>
  <p className="mt-2 text-base sm:text-lg font-semibold text-[#E63946]">
              
info@quintemalayaleeassociation.ca
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
