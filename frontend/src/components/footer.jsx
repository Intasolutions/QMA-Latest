
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const footerRef = useRef(null);

useEffect(() => {
  if (footerRef.current) {
    gsap.fromTo(
      footerRef.current.children,
      { y: 30, opacity: 1 },  // visible from the start
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  }
}, []);


  return (
    <footer className="bg-[#1B4332] text-white">
      {/* Main Footer */}
      <div
        ref={footerRef}
        className="container mx-auto px-6 md:px-16 py-16 grid grid-cols-1 md:grid-cols-4 gap-12"
      >
        {/* Logo + About */}
        <div>
          <img src="Logo/Logo.png" alt="Malayali Association Canada" className="h-17 mb-4" />
          <p className="text-gray-300 text-sm leading-relaxed">
            Bringing together Malayalis across Canada to celebrate our culture,
            heritage, and community spirit.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li>
              <a href="/" className="hover:text-white transition">Home</a>
            </li>
            <li>
              <a href="/AboutMain" className="hover:text-white transition">About Us</a>
            </li>
            <li>
              <a href="/Announcement" className="hover:text-white transition">Announcements</a>
            </li>
            <li>
              <a href="/GalleryMain" className="hover:text-white transition">Gallery</a>
            </li>
            <li>
              <a href="/ContactUs" className="hover:text-white transition">Contact</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-300 text-sm">📍 Toronto, Canada</p>
       {/*   <p className="text-gray-300 text-sm mt-2">📞 +1 (123) 456-7890</p>*/}
          <p className="text-gray-300 text-sm mt-2">✉ info@quintemalayaleeassociation.ca</p>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#2D6A4F] transition">
              <FaFacebookF />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#2D6A4F] transition">
              <FaInstagram />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#2D6A4F] transition">
              <FaTwitter />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#2D6A4F] transition">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 py-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Malayali Association Canada. All rights reserved.
      </div>
    </footer>
  );
}
