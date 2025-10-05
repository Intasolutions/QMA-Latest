import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Mail, Phone, Facebook, Instagram, Twitter } from "lucide-react";

export default function ContactUsPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.9 },
      });

      // Heading reveal
      tl.fromTo(
        ".contact-heading",
        { opacity: 0, y: 60, skewY: 6 },
        { opacity: 1, y: 0, skewY: 0 }
      );

      // Cards stagger in cascade
      tl.fromTo(
        ".contact-card",
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.25 },
        "-=0.3" // overlap a bit with heading
      );

      // Map reveal with subtle zoom
      tl.fromTo(
        ".contact-map",
        { opacity: 0, scale: 0.85, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 1.1 },
        "-=0.4" // overlap with last card
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative px-6 md:px-16 py-20 bg-gradient-to-b from-white via-gray-50 to-gray-100"
    >
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="contact-heading text-4xl md:text-5xl font-extrabold text-gray-900 relative inline-block">
          Contact Us
          <span className="block w-24 h-1 bg-gradient-to-r from-green-500 to-teal-400 mx-auto mt-3 rounded-full"></span>
        </h2>
        <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
          Get in touch with us for inquiries, support, or collaboration.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="contact-card bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition flex items-center gap-4">
            <Mail className="text-teal-500" size={24} />
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Email</h4>
              <a
                href="mailto:info@quintemalayaleeassociation.ca"
                className="text-gray-600 hover:text-teal-600"
              >
           info@quintemalayaleeassociation.ca
              </a>
            </div>
          </div>

         

          {/* Social Media */}
          <div className="contact-card bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Follow Us
            </h4>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <Facebook
                  className="text-gray-600 hover:text-blue-600 transition-transform transform hover:scale-110"
                  size={28}
                />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <Instagram
                  className="text-gray-600 hover:text-pink-500 transition-transform transform hover:scale-110"
                  size={28}
                />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <Twitter
                  className="text-gray-600 hover:text-sky-500 transition-transform transform hover:scale-110"
                  size={28}
                />
              </a>
            </div>
          </div>
        </div>

        {/* Google Map 
        <div className="contact-map w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95373531531695!3d-37.81627974202167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5771d6d2e9c6c0!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1633050075181!5m2!1sen!2sau"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>*/}
      </div>
    </section>
  );
}
