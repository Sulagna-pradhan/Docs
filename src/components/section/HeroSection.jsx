"use client";

import { useState, useEffect, useRef } from "react";
import {
  BookOpen,
  GraduationCap,
  Users,
  Star,
  ArrowRight,
  Play,
  Search,
  Zap,
  Trophy,
  Globe,
  ChevronDown,
} from "lucide-react";

const HeroSection = ({ isDark = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchQuery] = useState("");
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const typingRef = useRef(null);

  // Single hero content with typing animation
  const heroContent = {
    titleParts: ["Master Your", "CU Journey"],
    subtitle: "Complete Study Resources for Calcutta University Students",
    highlight: "10,000+ Students Already Learning",
    gradient: "from-blue-600 via-purple-600 to-indigo-600",
    typingTexts: [
      "Study Materials",
      "Previous Year Papers",
      "Expert Notes",
      "Community Support",
    ],
  };

  const stats = [
    { icon: BookOpen, value: "500+", label: "Study Materials" },
    { icon: Users, value: "25K+", label: "Active Students" },
    { icon: GraduationCap, value: "50+", label: "Departments" },
    { icon: Trophy, value: "95%", label: "Success Rate" },
  ];

  const quickActions = [
    {
      icon: Search,
      title: "Find Your Course",
      desc: "Browse all departments",
      color: "blue",
    },
    {
      icon: BookOpen,
      title: "Study Materials",
      desc: "Notes, books & resources",
      color: "green",
    },
    {
      icon: Zap,
      title: "Exam Prep",
      desc: "Previous papers & solutions",
      color: "purple",
    },
    {
      icon: Globe,
      title: "Join Community",
      desc: "Connect with students",
      color: "pink",
    },
  ];

  const popularSearches = [
    "Data Structures",
    "Calculus",
    "Physics Notes",
    "Previous Year Papers",
    "Software Engineering",
    "Database Systems",
    "Chemistry Lab",
    "English Literature",
  ];

  // Typing animation effect
  useEffect(() => {
    setIsVisible(true);

    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    const type = () => {
      const currentText = heroContent.typingTexts[currentTextIndex];

      if (isDeleting) {
        setTypedText(currentText.substring(0, currentCharIndex - 1));
        currentCharIndex--;
        typingSpeed = 50;
      } else {
        setTypedText(currentText.substring(0, currentCharIndex + 1));
        currentCharIndex++;
        typingSpeed = 150;
      }

      // Cursor blink effect
      setCursorVisible(true);
      setTimeout(() => setCursorVisible(false), 500);

      if (!isDeleting && currentCharIndex === currentText.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentTextIndex =
          (currentTextIndex + 1) % heroContent.typingTexts.length;
        typingSpeed = 500;
      }

      typingRef.current = setTimeout(type, typingSpeed);
    };

    typingRef.current = setTimeout(type, typingSpeed);

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search:", searchQuery);
  };

  return (
    <section
      className={`relative min-h-screen overflow-hidden ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${heroContent.gradient} opacity-10 dark:opacity-20 transition-all duration-1000`}
        />

        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1.5 h-1.5 ${
                isDark ? "bg-blue-400" : "bg-blue-500"
              } rounded-full opacity-20`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${
                  3 + Math.random() * 4
                }s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Interactive Mouse Effect */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl transition-all duration-300 pointer-events-none"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div
            className={`space-y-8 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-2 rounded-full border border-blue-200 dark:border-blue-700/50">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                {heroContent.highlight}
              </span>
            </div>

            {/* Main Title with Typing Animation */}
            <div className="space-y-4">
              <h1
                className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight transition-all duration-700 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <span
                  className={`block ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  {heroContent.titleParts[0]}
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {heroContent.titleParts[1]}
                </span>
              </h1>

              <p
                className={`text-xl md:text-2xl ${
                  isDark ? "text-gray-300" : "text-gray-700"
                } max-w-2xl transition-all duration-700 delay-200 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                {heroContent.subtitle}
              </p>

              {/* Typing Animation Container */}
              <div className="h-12 md:h-14 flex items-center">
                <div className="text-xl md:text-2xl font-medium bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  {typedText}
                  <span
                    className={`ml-1 h-8 w-0.5 ${
                      isDark ? "bg-blue-400" : "bg-blue-600"
                    } inline-block transition-opacity duration-300 ${
                      cursorVisible ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div
              className={`flex flex-wrap gap-4 transition-all duration-700 delay-400 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <button className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2">
                <span className="relative z-10">Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200 relative z-10" />
                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>

              <button className="group relative overflow-hidden border-2 border-gray-400 dark:border-gray-600 text-gray-800 dark:text-gray-300 px-8 py-4 rounded-2xl font-semibold hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 flex items-center space-x-2">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span>Watch Demo</span>
                <span className="absolute inset-0 bg-gray-100 dark:bg-gray-700 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              </button>
            </div>
          </div>

          {/* Right Content - Quick Actions */}
          <div
            className={`space-y-6 transition-all duration-700 delay-600 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Quick Actions
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <div
                    key={index}
                    className={`group relative overflow-hidden p-4 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-${action.color}-500 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 bg-${action.color}-100 dark:bg-${action.color}-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
                      >
                        <action.icon
                          className={`w-6 h-6 text-${action.color}-600 dark:text-${action.color}-400`}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                          {action.title}
                        </h4>
                        <p className="text-sm text-gray-700 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors duration-200">
                          {action.desc}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                    <div
                      className={`absolute inset-0 bg-${action.color}-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* University Badge */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white text-center group">
              <div className="relative z-10">
                <div className="text-lg font-semibold">
                  University of Calcutta
                </div>
                <div className="text-sm opacity-90">
                  Est. 1857 • Premier Educational Institution
                </div>
                <div className="flex justify-center space-x-4 mt-4">
                  <div className="text-center">
                    <div className="font-bold text-xl">158+</div>
                    <div className="text-xs opacity-80">
                      Years of Excellence
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-xl">50+</div>
                    <div className="text-xs opacity-80">Departments</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-xl">2L+</div>
                    <div className="text-xs opacity-80">Students</div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
