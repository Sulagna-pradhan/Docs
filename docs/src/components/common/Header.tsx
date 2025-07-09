"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  BookOpen,
  Moon,
  Sun,
  Search,
  Bell,
  User,
  ChevronDown,
} from "lucide-react";

interface HeaderProps {
  onThemeToggle?: () => void;
  isDark?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onThemeToggle, isDark = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Courses", href: "/courses", hasDropdown: true },
    { name: "Departments", href: "/departments", hasDropdown: true },
    { name: "Resources", href: "/resources" },
    { name: "Syllabus", href: "/syllabus" },
    { name: "Exam Prep", href: "/exam-prep" },
    { name: "Community", href: "/community" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200/20 dark:border-gray-700/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                <BookOpen className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CU Docs
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400 -mt-1">
                Calcutta University
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <a
                  href={item.href}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  {item.name}
                  {item.hasDropdown && (
                    <ChevronDown className="ml-1 w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
                  )}
                </a>

                {/* Dropdown indicator */}
                {item.hasDropdown && (
                  <div className="absolute top-full left-0 w-48 mt-2 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                    <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                      Popular in {item.name}
                    </div>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Computer Science
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Mathematics
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Physics
                    </a>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Search Button */}
            <button
              onClick={toggleSearch}
              className="p-2 text-gray-900 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onThemeToggle}
              className="p-2 text-gray-900 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button className="p-2 text-gray-900 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="flex items-center space-x-2 p-2 text-gray-900 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              >
                <User className="w-5 h-5" />
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      John Doe
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Student ID: CU2024001
                    </p>
                  </div>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    My Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    My Courses
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Settings
                  </a>
                  <div className="border-t border-gray-200 dark:border-gray-700 mt-2">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Sign Out
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-gray-900 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar Overlay */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="max-w-3xl mx-auto p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses, topics, or resources..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100"
                  autoFocus
                />
              </div>
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Popular searches: Data Structures, Calculus, Physics Notes,
                Previous Year Papers
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-lg font-medium text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2 border-b border-gray-100 dark:border-gray-800 transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Quick Actions
                  </span>
                </div>
                <div className="mt-3 space-y-2">
                  <button className="w-full text-left px-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200">
                    📚 Browse All Courses
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200">
                    📝 Exam Preparation
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors duration-200">
                    💬 Join Community
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
