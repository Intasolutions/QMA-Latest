import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDialog } from "./DialogContext";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

export default function Navbar() {
  const { openDialog } = useDialog();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  linksRef.current = [];

  // Register refs for GSAP
  const addToRefs = (el) => {
    if (el && !linksRef.current.includes(el)) {
      linksRef.current.push(el);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(
        menuRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.6, ease: "power4.out" }
      );
      gsap.fromTo(
        linksRef.current,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    } else {
      gsap.to(menuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power4.inOut",
      });
    }
  }, [menuOpen]);

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50 overflow-x-hidden">
      <div className="container mx-auto flex justify-between items-center py-3 sm:py-4 px-4 sm:px-6 md:px-8">
        {/* Logo */}
<Link to="/" onClick={() => setMenuOpen(false)}>
  <img
    src="/Logo/Logo.png"
    alt="Malayali Association Canada Logo"
    className="h-10 sm:h-12 md:h-16 lg:h-20 w-auto"
  />
</Link>


        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 lg:space-x-8 text-black font-medium text-base lg:text-lg">
          <Link to="/" className="hover:text-[#F1C232] transition">Home</Link>
          <Link to="/AboutMain" className="hover:text-[#F1C232] transition">About</Link>
          <Link to="/GalleryMain" className="hover:text-[#F1C232] transition">Gallery</Link>
          <Link to="/Announcement" className="hover:text-[#F1C232] transition">Announcements</Link>
          <Link to="/ContactUs" className="hover:text-[#F1C232] transition">Contact Us</Link>
        </div>

        {/* Desktop Join Button */}
        <div className="hidden md:block">
          <button
            onClick={openDialog}
            className="bg-[#E0312F] text-white px-4 sm:px-5 py-2 rounded-full font-semibold text-sm sm:text-base hover:bg-[#F1C232] hover:text-[#8B1E1C] transition"
          >
            Join
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-black"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} sm:size={28} /> : <Menu size={24} sm:size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        ref={menuRef}
        className="md:hidden overflow-hidden w-full bg-white shadow-lg px-4 sm:px-6 space-y-3 sm:space-y-4 text-black font-medium"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="py-3 sm:py-4 flex flex-col gap-3 sm:gap-4">
          <Link
            ref={addToRefs}
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-[#F1C232] transition text-sm sm:text-base"
          >
            Home
          </Link>
          <Link
            ref={addToRefs}
            to="/AboutMain"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-[#F1C232] transition text-sm sm:text-base"
          >
            About
          </Link>
          <Link
            ref={addToRefs}
            to="/GalleryMain"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-[#F1C232] transition text-sm sm:text-base"
          >
            Gallery
          </Link>
          <Link
            ref={addToRefs}
            to="/Announcement"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-[#F1C232] transition text-sm sm:text-base"
          >
            Announcements
          </Link>
          <Link
            ref={addToRefs}
            to="/ContactUs"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-[#F1C232] transition text-sm sm:text-base"
          >
            Contact Us
          </Link>

          {/* Mobile Join Button */}
          <button
            onClick={() => {
              openDialog();
              setMenuOpen(false);
            }}
            ref={addToRefs}
            className="w-full bg-gradient-to-r from-[#E0312F] to-[#F1C232] text-white px-4 sm:px-5 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base shadow-md hover:scale-105 transition-transform"
          >
            Join Now 🚀
          </button>
        </div>
      </div>
    </nav>
  );
}
