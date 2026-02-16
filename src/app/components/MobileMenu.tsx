"use client";

import { useState } from "react";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* 햄버거 버튼 */}
      <button
        onClick={toggleMenu}
        className="md:hidden z-50 relative w-10 h-10 flex flex-col justify-center items-center"
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 bg-slate-900 dark:bg-white transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-slate-900 dark:bg-white transition-all duration-300 mt-1.5 ${
            isOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-slate-900 dark:bg-white transition-all duration-300 mt-1.5 ${
            isOpen ? "-rotate-45 -translate-y-2.5" : ""
          }`}
        ></span>
      </button>

      {/* 모바일 메뉴 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMenu}
        ></div>
      )}

      {/* 모바일 메뉴 */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-slate-900 shadow-2xl z-40 transform transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-6 p-8 mt-16">
          <a
            href="#about"
            onClick={closeMenu}
            className="text-lg text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            About
          </a>
          <a
            href="#skills"
            onClick={closeMenu}
            className="text-lg text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Skills
          </a>
          <a
            href="#experience"
            onClick={closeMenu}
            className="text-lg text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Experience
          </a>
          <a
            href="#projects"
            onClick={closeMenu}
            className="text-lg text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Projects
          </a>
          <a
            href="#contact"
            onClick={closeMenu}
            className="text-lg text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Contact
          </a>
        </nav>
      </div>
    </>
  );
}
