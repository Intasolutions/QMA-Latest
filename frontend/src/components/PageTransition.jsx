import React, { useRef, useEffect } from "react";
import { gsap, Power4 } from "gsap";

export default function PageTransition() {
  const img2Ref = useRef(null);
  const logoRef = useRef(null);
  const frameBlackRef = useRef(null);
  const frameRedRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    // Create paused timeline
    tlRef.current = gsap.timeline({ paused: true });

    tlRef.current
      .fromTo(
        frameRedRef.current,
        { scaleX: 0 },
        { scaleX: 1, transformOrigin: "left", duration: 2.2, ease: Power4.easeInOut }
      )
      .fromTo(
        frameBlackRef.current,
        { scaleX: 0 },
        { scaleX: 1, transformOrigin: "left", duration: 2.2, ease: Power4.easeInOut },
        0.2
      )
      .fromTo(
        logoRef.current,
        { xPercent: -100, autoAlpha: 0 },
        { xPercent: 0, autoAlpha: 1, duration: 1.6, ease: Power4.easeInOut },
        0.7
      )
      .set(frameRedRef.current, { scaleX: 0 })
      .set(img2Ref.current, { autoAlpha: 0 })
      .to(frameBlackRef.current, {
        scaleX: 0,
        transformOrigin: "right",
        duration: 2.2,
        ease: Power4.easeInOut,
      })
      .to(
        logoRef.current,
        { autoAlpha: 0, duration: 0.2 },
        "-=1.2"
      );
  }, []);

  // Trigger the transition
  const playTransition = () => {
    tlRef.current.restart(); // restart ensures it plays from the beginning
  };

  return (
    <div className="page-transition-container">
      <div ref={frameRedRef} className="page-transition__red"></div>
      <div ref={frameBlackRef} className="page-transition__black"></div>
      <img ref={logoRef} className="transition__logo" src="/logo.png" alt="Logo" />
      <img ref={img2Ref} className="image2" src="/image2.png" alt="Image 2" />
      <button onClick={playTransition}>Start Transition</button>
    </div>
  );
}
