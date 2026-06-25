"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, TrendingUp, BookOpen, Users, Award, DollarSign, Mail, Phone, MapPin, Clock, HousePlus, ChevronLeft, ChevronRight } from 'lucide-react';
import YashSirImg from "./assets/yash_sir_profile.jpg";
import NiteshSirImg from "./assets/hitesh.jpeg";
import ClassroomImg from "./assets/gallery/1A6A0151.jpg";
import TeachingPortraitImg from "./assets/gallery/1A6A0150.jpg";
import Chill from "./assets/gallery/1A6A0193.jpg";
import YashSirteaching from "./assets/gallery/1A6A0132.jpg";
import Students from "./assets/gallery/1A6A3684.jpg";
import YashSirTeachingPortrait from "./assets/gallery/IMG_6245.jpg";
import Trading from "./assets/gallery/1A6A3704.jpg";
import AngLogo from "../public/tc_logo.png";
import TradersMarathonLogo from "./assets/tm.png";
import ThankYouModal from "./components/ThankYouModal";
import PaymentModal from "./components/PaymentModal";
import PaymentSuccessModal from "./components/PaymentSuccessModal";
import ForexIcon from "./assets/forex.png";
import Footer from "./components/Footer";
import FeedbackCarousel from "./components/FeedbackCarousel";
import tradecircle from "@/app/assets/trader-circle-removebg-preview.png"
// import herobgvideo from ""

import { Calendar, ChartCandlestick, LockKeyhole, Target, UsersRound, Lightbulb, Zap, Handshake, ChartNoAxesCombined  } from "lucide-react";


interface GalleryItemData {
  id: number;
  imageUrl: string;
  // These classes will control the size of each item in the desktop grid
  gridSpanDesktop: string;
  // We can also add specific spans for tablets if needed
  gridSpanTablet?: string;
}

// Images
const galleryData: GalleryItemData[] = [
  {
    id: 1,
    imageUrl: Students.src,
    gridSpanDesktop: 'lg:row-span-2',
  },
  {
    id: 2,
    imageUrl: YashSirteaching.src,
    gridSpanDesktop: 'lg:col-span-2',
  },
  // Item 4 (Bridge) is moved up to fill the top-right corner
  {
    id: 4,
    imageUrl: YashSirTeachingPortrait.src,
    gridSpanDesktop: 'lg:row-span-2',
  },
  // Item 5 (Bear) is moved up to fill the gap under Landscape
  {
    id: 5,
    imageUrl: Trading.src,
    gridSpanDesktop: '', // Standard 1x1
  },
  // Item 3 (Profile) fills the next gap
  {
    id: 3,
    imageUrl: TeachingPortraitImg.src,
    gridSpanDesktop: '', // Standard 1x1
  },
  // Item 6 (Car) fills the next available row
  {
    id: 6,
    imageUrl: ClassroomImg.src,
    gridSpanDesktop: 'lg:col-span-2',
  },
  {
    id: 7,
    imageUrl: Chill.src,
    gridSpanDesktop: 'lg:col-span-2',
  },
];

function getNewGridImages(): GalleryItemData[] {
  return galleryData;
}


// Gallery Item Component
interface GalleryItemProps extends GalleryItemData { }

const GalleryItem: React.FC<GalleryItemProps> = ({
  imageUrl,
  gridSpanDesktop,
  gridSpanTablet,
}) => {
  // Combine all the grid span classes
  const gridClasses = `${gridSpanDesktop || ''} ${gridSpanTablet || ''}`;
  return (
    <div
      className={`relative group h-full w-full overflow-hidden rounded-xl shadow-lg ${gridClasses} min-h-[200px]`}
    >
      {/* Image */}
      <img
        src={imageUrl}
        alt={`Gallery Item ${imageUrl.slice(-20)}`} // Using part of URL for a unique alt tag
        className="absolute inset-0 w-full h-full object-contain sm:object-cover transition-transform duration-500 ease-in-out sm:group-hover:scale-110"
      />
    </div>
  );
};


export default function TradersMarathon() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [displayedImages, setDisplayedImages] = useState(() => getNewGridImages());
  const [isFading, setIsFading] = useState(false);
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isPaymentSuccessOpen, setIsPaymentSuccessOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<{ paymentId: string, amount: number } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Hero video carousel
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const heroVideos = [
    "https://res.cloudinary.com/dkkah7att/video/upload/v1782284237/hero_bg_video_x2bhjx_rx2rsj.mp4",
    "https://res.cloudinary.com/dkkah7att/video/upload/v1782284236/tc_video_2_omjqif.mp4",
  ];
  const videoRefs = React.useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeVideoIndex) {
          video.play().catch((err) => {
            console.warn("Video playback failed/interrupted:", err);
          });
        } else {
          video.pause();
        }
      }
    });
  }, [activeVideoIndex]);

  // Mobile Carousel State
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handlePrev = () => {
    setCurrentMobileIndex((prev) => (prev === 0 ? galleryData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentMobileIndex((prev) => (prev === galleryData.length - 1 ? 0 : prev + 1));
  };

  // Minimum swipe distance in pixels
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMobileIndex((prev) => (prev === galleryData.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [currentMobileIndex]);


  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);

      setTimeout(() => {
        setDisplayedImages(getNewGridImages());
        setIsFading(false);
      }, 500); // This duration should match the CSS transition duration

    }, 5000); // 5 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleEnquirySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name")?.toString().trim() || "",
      email: formData.get("email")?.toString().trim() || "",
      phone: formData.get("phone")?.toString().trim() || "",
      experience: formData.get("experience")?.toString().trim() || "",
      message: formData.get("message")?.toString().trim() || "",
    };

    if (Object.values(payload).every((value) => value === "")) {
      setFormError("cannot submit form with empty fields");
      return;
    }

    try {
      setFormError("");
      setIsSubmitting(true);
      const response = await fetch("/api/resistor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit enquiry: ${response.status}`);
      }

      setIsThankYouOpen(true);
      form.reset();
      setFormError("");
    } catch (error) {
      console.error("Failed to submit enquiry", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function for image fallbacks
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, fallbackText: string) => {
    const target = e.target as HTMLImageElement;
    target.src = `https://placehold.co/100x100/777/white?text=${fallbackText}`;
  };


  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden" suppressHydrationWarning>
      <ThankYouModal
        isOpen={isThankYouOpen}
        onClose={() => setIsThankYouOpen(false)}
        autoClose
        autoCloseDelay={5000}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentSuccess={(paymentId, amount) => {
          setPaymentDetails({ paymentId, amount });
          setIsPaymentSuccessOpen(true);
        }}
      />

      <PaymentSuccessModal
        isOpen={isPaymentSuccessOpen}
        onClose={() => {
          setIsPaymentSuccessOpen(false);
          setPaymentDetails(null);
        }}
        paymentId={paymentDetails?.paymentId || ''}
        amount={paymentDetails?.amount || 0}
        autoClose
        autoCloseDelay={10000}
      />

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/95 backdrop-blur-xl border-b border-green-500/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="shrink-0">
              <Image
                src={tradecircle}
                alt="Traders Circle Logo"
                width={280}
                height={100}
                className="h-16 md:h-18 w-auto"
                suppressHydrationWarning
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-sm hover:text-green-500 transition-colors">Home</button>
              <button onClick={() => scrollToSection('features')} className="text-sm hover:text-green-500 transition-colors">Features</button>
              <button onClick={() => scrollToSection('mentors')} className="text-sm hover:text-green-500 transition-colors">Mentors</button>
              <button onClick={() => scrollToSection('pricing')} className="text-sm hover:text-green-500 transition-colors">Pricing</button>
              <button onClick={() => scrollToSection('pricing')} className="bg-linear-to-r from-green-600 to-green-500 px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/98 backdrop-blur-xl border-t border-green-500/20">
            <div className="px-4 pt-2 pb-4 space-y-3">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left py-2 hover:text-green-500">Home</button>
              <button onClick={() => scrollToSection('features')} className="block w-full text-left py-2 hover:text-green-500">Features</button>
              <button onClick={() => scrollToSection('mentors')} className="block w-full text-left py-2 hover:text-green-500">Mentors</button>
              <button onClick={() => scrollToSection('pricing')} className="block w-full text-left py-2 hover:text-green-500">Pricing</button>
              <button onClick={() => scrollToSection('pricing')} className="w-full bg-linear-to-r from-green-600 to-green-500 px-6 py-3 rounded-full font-semibold mt-2">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex flex-col bg-black overflow-hidden" suppressHydrationWarning>

        {/* Line grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(22,182,126,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(22,182,126,0.08) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Animated orbs */}
        <div className="absolute top-1/4 left-[10%] w-80 h-80 bg-green-600/15 rounded-full blur-3xl pointer-events-none animate-float-orb" style={{ animationDuration: '9s', animationDelay: '0s' }} />
        <div className="absolute top-1/2 right-[8%] w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none animate-float-orb" style={{ animationDuration: '13s', animationDelay: '-4s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-green-600/10 rounded-full blur-3xl pointer-events-none animate-float-orb" style={{ animationDuration: '11s', animationDelay: '-7s' }} />
        <div className="absolute top-[15%] right-[30%] w-48 h-48 bg-green-400/8 rounded-full blur-2xl pointer-events-none animate-float-orb" style={{ animationDuration: '15s', animationDelay: '-2s' }} />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col flex-1 pt-24 pb-12">

          {/* Two-column layout */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 flex-1 py-10">

            {/* Left: Text + Buttons */}
            <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="inline-block mb-4 px-4 py-2 border border-green-500 rounded-full">
                <span className="text-green-400 text-lg md:text-lg font-bold uppercase">Online</span>
              </div>

              <div className="relative mb-6">
                {/* Glow blob behind text */}
                <div className="absolute inset-0 -z-10 translate-y-4 scale-110 blur-2xl opacity-60 bg-green-500/40 rounded-full pointer-events-none" />
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-medium leading-tight">
                  <span className="text-white uppercase [text-shadow:0_2px_8px_rgba(0,0,0,0.9)]">Traders'<em className="text-green-500">Circle</em></span>
                </h1>
              </div>

              <div className="mb-4 flex items-center gap-2">
                <span className="relative flex size-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
                </span>
                <p className="text-sm md:text-base font-semibold animate-text-pulse">Limited Seats Available</p>
              </div>

              <p className="text-sm sm:text-base md:text-sm text-gray-300 tracking-wide mb-6 max-w-lg">
                Master Crypto, Forex & Gold trading in just 15 days. Learn from experts with 7-12+ years of experience and learn to multiply your capital.
              </p>

              <div className="flex flex-row gap-4 items-center">
                <button onClick={() => scrollToSection('pricing')} className="bg-linear-to-r from-green-600 to-green-500 px-5 py-3 md:px-4 md:py-3 rounded-xl font-semibold text-sm md:text-lg hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 flex items-center gap-2 cursor-pointer">
                  <span className="text-sm">Enroll Now</span> <ArrowRight size={20} className="hidden md:block" />
                </button>
                <button onClick={() => scrollToSection('features')} className="border border-green-500/60 px-5 py-3 md:px-4 md:py-2 rounded-xl font-semibold text-sm md:text-lg hover:bg-green-500/10 transition-all duration-300 cursor-pointer">
                  <span className="text-sm">Learn More</span>
                </button>
              </div>
            </div>

            {/* Right: Video Carousel */}
            <div className="w-full lg:w-3/2 flex flex-col gap-3">
              {/* Video container */}
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-green-500/60 shadow-xl shadow-green-500/30">
                {heroVideos.map((src, i) => (
                  <video
                    key={src}
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls={i === activeVideoIndex}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      i === activeVideoIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                    suppressHydrationWarning
                  >
                    <source src={src} type="video/mp4" />
                  </video>
                ))}

                {/* Prev arrow */}
                <button
                  type="button"
                  onClick={() => setActiveVideoIndex((prev) => (prev === 0 ? heroVideos.length - 1 : prev - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-green-500 text-white p-2 rounded-full border border-green-500/30 transition-all duration-300 hover:scale-110 cursor-pointer"
                  aria-label="Previous video"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Next arrow */}
                <button
                  type="button"
                  onClick={() => setActiveVideoIndex((prev) => (prev === heroVideos.length - 1 ? 0 : prev + 1))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-green-500 text-white p-2 rounded-full border border-green-500/30 transition-all duration-300 hover:scale-110 cursor-pointer"
                  aria-label="Next video"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Dot indicators */}
              <div className="flex justify-center gap-2">
                {heroVideos.map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setActiveVideoIndex(i)}
                    aria-label={`Switch to video ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      i === activeVideoIndex ? 'w-6 bg-green-500 shadow-md shadow-green-500/50' : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Stats — centered below */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full">
            <div className="bg-linear-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-2xl p-6 text-center flex flex-col items-center justify-center group hover:border-green-500/40 transition-all duration-300">
              <div className="bg-green-500/10 p-3 rounded-xl mb-3 text-green-500 group-hover:scale-110 transition-transform duration-300">
                <Calendar size={24} />
              </div>
              <div className="text-xl md:text-2xl font-bold text-green-500 mb-2">Fifteen</div>
              <div className="text-md text-gray-400">Days Online Program</div>
            </div>
            <div className="bg-linear-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-2xl p-6 text-center flex flex-col items-center justify-center group hover:border-green-500/40 transition-all duration-300">
              <div className="bg-green-500/10 p-3 rounded-xl mb-3 text-green-500 group-hover:scale-110 transition-transform duration-300">
                <ChartCandlestick size={24} />
              </div>
              <div className="text-xl md:text-2xl font-bold text-green-500 mb-2">Three</div>
              <div className="text-md text-gray-400">Markets Covered</div>
            </div>
            <div className="bg-linear-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-2xl p-6 text-center flex flex-col items-center justify-center group hover:border-green-500/40 transition-all duration-300">
              <div className="bg-green-500/10 p-3 rounded-xl mb-3 text-green-500 group-hover:scale-110 transition-transform duration-300">
                <LockKeyhole size={24} />
              </div>
              <div className="text-xl md:text-2xl font-bold text-green-500 mb-2">Secret</div>
              <div className="text-md text-gray-400">Strategies Taught</div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Traders Marathon */}
      <section className="bg-gray-900 py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">What is <span className="text-green-500">Traders' Circle?</span></h2>
            <div className="w-24 h-1 bg-linear-to-r from-green-600 to-green-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-linear-to-br from-green-500/5 to-transparent border border-green-500/20 rounded-2xl p-8 md:p-11">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                The difference between the 99% and the 1% isn't capital. It's <em className="text-green-500">Mentorship</em>.
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                The Traders' Circle is an intensive <span className="text-green-500 font-semibold">15 days trading bootcamp</span> designed for serious traders who want to master Crypto, Forex, and Gold markets.
              </p>
              <p className="text-gray-400 mb-6 leading-relaxed">
                This isn't just another theory-heavy course—it's a <span className="text-green-500 font-semibold">hands-on, profit-focused program</span> where you'll learn proven strategies and trade alongside experienced mentors in real market conditions.
              </p>
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                <p className="text-sm text-green-300">
                  <strong>Our Mission:</strong> Help you understand the markets, minimize your losses and help you walk on the path of your profitable journey.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-linear-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-2xl p-6 hover:border-green-500/40 transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500/20 p-3 rounded-xl">
                    <BookOpen className="text-green-500" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">15 Days Intensive Learning!</h4>
                    <p className="text-gray-400 text-sm">Master technicals, fundamentals and advanced strategies.</p>
                  </div>
                </div>
              </div>

              <div className="bg-linear-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-2xl p-6 hover:border-green-500/40 transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500/20 p-3 rounded-xl">
                    <TrendingUp className="text-green-500" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Live Trading sessions with Mentors!</h4>
                    <p className="text-gray-400 text-sm">Learn the execution of trades in live market alongside your mentors.</p>
                  </div>
                </div>
              </div>

              <div className="bg-linear-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-2xl p-6 hover:border-green-500/40 transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500/20 p-3 rounded-xl">
                    <Users className="text-green-500" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Lifetime Access to MTF Indicators for Gold & BTC!</h4>
                    <p className="text-gray-400 text-sm">Get lifetime free access for Indicators worth $500 monthly for <em className="font-bold text-green-500">free!</em>.</p>
                  </div>
                </div>
              </div>

              <div className="bg-linear-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-2xl p-6 hover:border-green-500/40 transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500/20 p-3 rounded-xl">
                    <Users className="text-green-500" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">3 months Access to 5x VIP Channel!</h4>
                    <p className="text-gray-400 text-sm">A <em className="font-bold text-green-500">VIP community</em> where mentors and other community members share their market bias and trade setups.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prerequisites */}
      <section className="py-20 px-4 bg-linear-to-b from-black via-green-950/5 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Prerequisites</h2>
            <p className="text-gray-400 text-lg">What you must have before entering the bootcamp...</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "A Basic Mobile Phone ", desc: "That supports basic trading apps" },
              { title: "A Functional Laptop ", desc: "To analyse and understand the charts better" },
              { title: "Learning Attitude", desc: "Carry an open mind to learn and understand new approaches" },
              { title: "Patience and Disipline", desc: "These are the 2 primary prerequisites to become a trader" }
            ].map((item, idx) => (
              <div key={idx} className="bg-linear-to-br from-green-500/5 to-transparent border border-green-500/20 rounded-2xl p-6 hover:border-green-500/40 transition-all">
                <div className="text-green-500 font-bold text-2xl mb-3">0{idx + 1}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Markets Covered */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Markets <span className="text-green-500">Covered</span></h2>
            <p className="text-gray-400 text-lg mb-2">
              We cover the most active, volatile and yet profitable markets - <em className="italic">because that's where the real game lies.</em>
            </p>
            <div className="w-24 h-1 bg-linear-to-r from-green-600 to-green-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative bg-linear-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-3xl p-8 hover:border-green-500/60 transition-all hover:scale-105">
              <div className="absolute inset-0 bg-linear-to-br from-green-600/10 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity"></div>
              <div className="relative">
                <div className="text-4xl mb-4">
                  <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#FFD43B" d="M72 320C72 183 183 72 320 72C457 72 568 183 568 320C568 457 457 568 320 568C183 568 72 457 72 320zM426.3 284.7C431.2 251.7 406.1 234 371.7 222.1L382.8 177.4L355.6 170.6L344.7 214.1C337.5 212.3 330.2 210.6 322.9 209L333.8 165.2L306.6 158.4L295.4 203.1C289.5 201.8 283.7 200.4 278 199L278 198.9L240.5 189.5L233.3 218.6C233.3 218.6 253.5 223.2 253.1 223.5C264.1 226.3 266.1 233.5 265.8 239.3L253.1 290.2C253.9 290.4 254.8 290.7 255.9 291.1C255 290.9 254 290.6 253 290.4L235.2 361.7C233.9 365 230.4 370.1 222.7 368.2C223 368.6 202.9 363.3 202.9 363.3L189.4 394.4L224.8 403.2C231.4 404.9 237.8 406.6 244.2 408.2L232.9 453.4L260.1 460.2L271.3 415.5C278.5 417.5 285.7 419.3 293 421.1L281.9 465.6L309.1 472.4L320.4 427.3C366.8 436.1 401.7 432.5 416.4 390.6C428.2 356.8 415.8 337.3 391.4 324.6C409.2 320.5 422.6 308.8 426.1 284.7zM364.1 371.9C355.7 405.7 298.8 387.4 280.3 382.8L295.2 322.9C313.6 327.5 372.8 336.6 364 371.9zM372.5 284.2C364.8 314.9 317.5 299.3 302.1 295.5L315.6 241.2C331 245 380.4 252.2 372.4 284.2z" /></svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Cryptocurrency</h3>
                <p className="text-gray-400 mb-4">Bitcoin (BTC), Ethereum (ETH), and major altcoins</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-500/20 rounded-full text-xs">BTC</span>
                  <span className="px-3 py-1 bg-green-500/20 rounded-full text-xs">ETH</span>
                  <span className="px-3 py-1 bg-green-500/20 rounded-full text-xs">Altcoins</span>
                </div>
              </div>
            </div>

            <div className="group relative bg-linear-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-3xl p-8 hover:border-green-500/60 transition-all hover:scale-105">
              <div className="absolute inset-0 bg-linear-to-br from-green-600/10 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity"></div>
              <div className="relative">
                <div className="text-4xl mb-4">
                  <Image src={ForexIcon} alt="Forex" width={40} height={40} className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Forex</h3>
                <p className="text-gray-400 mb-4">All major currency pairs and cross pairs</p>
                <div className="flex flex-wrap gap-2 mt-8">
                  <span className="px-3 py-1 bg-green-500/20 rounded-full text-xs">EUR/USD</span>
                  <span className="px-3 py-1 bg-green-500/20 rounded-full text-xs">GBP/USD</span>
                  <span className="px-3 py-1 bg-green-500/20 rounded-full text-xs">USD/JPY</span>
                </div>
              </div>
            </div>

            <div className="group relative bg-linear-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-3xl p-8 hover:border-green-500/60 transition-all hover:scale-105">
              <div className="absolute inset-0 bg-linear-to-br from-green-600/10 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity"></div>
              <div className="relative">
                <div className="text-4xl mb-4">
                  <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#FFD43B" d="M192 160L192 144C192 99.8 278 64 384 64C490 64 576 99.8 576 144L576 160C576 190.6 534.7 217.2 474 230.7C471.6 227.9 469.1 225.2 466.6 222.7C451.1 207.4 431.1 195.8 410.2 187.2C368.3 169.7 313.7 160.1 256 160.1C234.1 160.1 212.7 161.5 192.2 164.2C192 162.9 192 161.5 192 160.1zM496 417L496 370.8C511.1 366.9 525.3 362.3 538.2 356.9C551.4 351.4 564.3 344.7 576 336.6L576 352C576 378.8 544.5 402.5 496 417zM496 321L496 288C496 283.5 495.6 279.2 495 275C510.5 271.1 525 266.4 538.2 260.8C551.4 255.2 564.3 248.6 576 240.5L576 255.9C576 282.7 544.5 306.4 496 320.9zM64 304L64 288C64 243.8 150 208 256 208C362 208 448 243.8 448 288L448 304C448 348.2 362 384 256 384C150 384 64 348.2 64 304zM448 400C448 444.2 362 480 256 480C150 480 64 444.2 64 400L64 384.6C75.6 392.7 88.5 399.3 101.8 404.9C143.7 422.4 198.3 432 256 432C313.7 432 368.3 422.3 410.2 404.9C423.4 399.4 436.3 392.7 448 384.6L448 400zM448 480.6L448 496C448 540.2 362 576 256 576C150 576 64 540.2 64 496L64 480.6C75.6 488.7 88.5 495.3 101.8 500.9C143.7 518.4 198.3 528 256 528C313.7 528 368.3 518.3 410.2 500.9C423.4 495.4 436.3 488.7 448 480.6z" /></svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Gold</h3>
                <p className="text-gray-400 mb-4">Spot Gold and Gold Futures trading</p>
                <div className="flex flex-wrap gap-2 mt-8">
                  <span className="px-3 py-1 bg-green-500/20 rounded-full text-xs">XAU/USD</span>
                  <span className="px-3 py-1 bg-green-500/20 rounded-full text-xs">Futures</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features/What You'll Learn */}
      <section id="features" className="py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">What You'll <span className="text-green-500">Learn</span></h2>
            <p className="text-gray-400 text-lg">Detailed curriculum designed for beginners as well as well as avid traders...</p>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "Foundation Modules",
                items: [
                  "Technical Analysis Fundamentals",
                  "Support & Resistance Mastery",
                  "Trendlines & Market Psychology",
                  "Candlestick Pattern Analysis",
                  "Live Chart Application"
                ]
              },
              {
                title: "Advanced Techniques",
                items: [
                  "Advanced Technical Analysis",
                  "Smart Money Concepts",
                  "Price Action Mastery",
                  "Institutional Trading Strategies"
                ]
              },
              {
                title: "Execution & Risk Management",
                items: [
                  "Order Execution Mastery",
                  "Live Market Monitoring",
                  "Trading Psychology & Discipline",
                  "Mentored Live Trading Sessions"
                ]
              }
            ].map((section, idx) => (
              <div key={idx} className="bg-linear-to-br from-green-500/5 to-transparent border border-green-500/20 rounded-2xl p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-green-500">{section.title}</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full shrink-0"></div>
                      <span className="text-gray-300 text-sm md:text-base">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Circle */}
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why <span className="text-green-500">Traders' Circle?</span></h2>
            <div className="w-24 h-1 bg-linear-to-r from-green-600 to-green-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Target className="text-green-500"/>, title: "Couldn't afford Traders' Villa?", desc: "Learn from the same mentors, same techniques but jsut at in affordable price." },
              { icon: <UsersRound className="text-green-500"/>, title: "Missed the Trader's Marathon?", desc: "Location is no longer an issue because  are having it online." },
              { icon: <Lightbulb className="text-green-500"/>, title: "100% Practical", desc: "No theory overload—just profitable, real-world strategies" },
              { icon: <Zap className="text-green-500"/>, title: "Fast-Track Results", desc: "15 days intensive to accelerate your trading success" },
              { icon: <Handshake className="text-green-500"/>, title: "Ongoing Support", desc: "Lifetime access to mentorship and community" },
              { icon: <ChartNoAxesCombined className="text-green-500"/>, title: "Lifetime access to MTF Indicators", desc: "Get lifetime buy & sell signals in BTC & Gold when the setup is made." },
              // { icon: "🎓", title: "Same Strategies Used by Our Mentors", desc: "Learn same strategies used by our mentors" },
              // { icon: "💲", title: "Risk Management Capital Multiplier", desc: "See how the Risk Management Capital Multiplier helps traders scale smarter, protect capital, and achieve steady long-term growth." }
            ].map((item, idx) => (
              <div key={idx} className="bg-linear-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-2xl p-6 hover:border-green-500/40 transition-all group hover:scale-105">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-10 px-4 bg-gray-200/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Exclusive <span className="text-green-500">Perks</span></h2>
            <p className="text-gray-400 text-lg">Everything you will get after being a part of Trader's Circle</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                { icon: <Award className="text-green-500" size={24} />, title: "You Will Get Access To Our Exclusive 5x Trader's Club", desc: "You will get access to our 5x Trader's Club 3 months. Its a VIP community where mentors and other community members share their market bias and trade setups." },
                { icon: <Users className="text-green-500" size={24} />, title: "Direct Mentorship", desc: "Learn directly from expert traders who guide you step-by-step with personalised support. Resolve doubts instantly and follow a clear roadmap built for your growth." },
                { icon: <BookOpen className="text-green-500" size={24} />, title: "Lifetime Access to Video Lectures", desc: "Enjoy lifetime access to all video lectures and modules. Revisit lessons anytime so your learning stays relevant as markets evolve." }
              ].map((perk, idx) => (
                <div key={idx} className="flex items-start gap-4 bg-linear-to-br from-green-500/5 to-transparent border border-green-500/20 rounded-xl p-6 hover:border-green-500/40 transition-all">
                  <div className="bg-green-500/20 p-3 rounded-lg shrink-0">{perk.icon}</div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{perk.title}</h4>
                    <p className="text-gray-400 text-sm">{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {[
                { icon: <TrendingUp className="text-green-500" size={24} />, title: "Live Trading Sessions", desc: "Join live market sessions where mentors analyse charts, take trades, and explain real-time strategies. Experience practical learning and learn to trade with confidence." },
                { icon: <HousePlus className="text-green-500" size={24} />, title: "Access to MTF Indicators", desc: "Get lifetime access for MTF Indicators for Gold & BTC worth $500 monthly for free! That gives buy & sell signals in BTC & Gold whenever the setup is made." },
                { icon: <DollarSign className="text-green-500" size={24} />, title: "Capital Growth Focus", desc: "Every lesson, strategy, and session is designed with one aim—building your trading capital. Learn practical methods to scale smartly, reduce risks, and grow sustainably." }
              ].map((perk, idx) => (
                <div key={idx} className="flex items-start gap-4 bg-linear-to-br from-green-500/5 to-transparent border border-green-500/20 rounded-xl p-6 hover:border-green-500/40 transition-all">
                  <div className="bg-green-500/20 p-3 rounded-lg shrink-0">{perk.icon}</div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{perk.title}</h4>
                    <p className="text-gray-400 text-sm">{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mentors */}
      <section id="mentors" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Meet Your <span className="text-green-500">Mentors</span></h2>
            <p className="text-gray-400 text-lg">Learn from industry experts with proven track records</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            
            <div className="group bg-linear-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-3xl p-8 hover:border-green-500/60 transition-all">
              <div className="w-68 h-68 bg-linear-to-br from-green-600 to-green-400 rounded-2xl mb-6 flex items-center justify-center text-4xl font-bold">
                <Image src={YashSirImg} alt="Yash Gupta" width={100} height={100} className="w-68 h-68 rounded-2xl border-2 border-green-500/20" suppressHydrationWarning />
              </div>
              <h3 className="text-2xl font-bold mb-2">Yash Gupta</h3>
              <div className="text-green-500 font-semibold mb-4">12+ Years of Experience</div>
              <p className="text-gray-300 font-semibold mb-4">Specialization: Crypto, Gold & Forex Markets</p>
              <p className="text-sm text-gray-400">
                With over 10+ years of experience in the Crypto and Financial
                markets, Yash Gupta has established himself as a leading expert
                in scalping, swing trading, capital management, and risk
                management. His deep market knowledge, sharp analytical
                skills and practical approach to trading have made him a trusted
                mentor for aspiring and seasoned traders alike. Yash’s
                commitment to helping others succeed in the fast-paced world
                of crypto trading has earned him a reputation for delivering
                results-driven strategies and insights.
              </p>
            </div>

            <div className="group bg-linear-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-3xl p-8 hover:border-green-500/60 transition-all">
              <div className="w-64 h-68 bg-linear-to-br from-green-600 to-green-400 rounded-2xl mb-6 flex items-center justify-center text-4xl font-bold">
                <Image src={NiteshSirImg} alt="Nitesh Choudhary" width={200} height={200} className="w-64 h-68 rounded-2xl border-2 border-green-500/20 object-cover" suppressHydrationWarning />
              </div>
              <h3 className="text-2xl font-bold mb-2">Hitesh Dadhich</h3>
              <div className="text-green-500 font-semibold mb-4">7+ Years of Experience</div>
              <p className="text-gray-300 mb-4 font-semibold">Specialization: Crypto, Gold & Forex Markets</p>
              <p className="text-sm text-gray-400">
                With over 7 years of experience in financial markets Hitesh Dadhich has built several strategies, tested and refined the over the years. He is known for his spot on analysis in the Gold and Forex market. As a mentor he has a very practical teaching style, he knows how to simplify even the most complex market concepts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Dicord */}
      <section className="py-10 px-4 bg-linear-to-b from-black via-green-950/5 to-black">
        {/* Main container for the two-column layout */}
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:space-x-8 lg:space-x-12">

            {/* Left Column (Discord Card) */}
            <div className="w-full md:w-7/12 flex justify-center items-center py-8">

              {/* Start of the Discord Join Section Card */}
              <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-lg w-full border border-gray-700 transform transition-all duration-300 hover:shadow-indigo-500/20 hover:border-gray-600">

                {/* Header with Discord Logo */}
                <div className="flex flex-col items-center mb-6">
                  {/* Inline SVG Discord Logo */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-18 h-18 mb-2">
                    <path fill="#ffffff" d="M524.5 133.8C524.3 133.5 524.1 133.2 523.7 133.1C485.6 115.6 445.3 103.1 404 96C403.6 95.9 403.2 96 402.9 96.1C402.6 96.2 402.3 96.5 402.1 96.9C396.6 106.8 391.6 117.1 387.2 127.5C342.6 120.7 297.3 120.7 252.8 127.5C248.3 117 243.3 106.8 237.7 96.9C237.5 96.6 237.2 96.3 236.9 96.1C236.6 95.9 236.2 95.9 235.8 95.9C194.5 103 154.2 115.5 116.1 133C115.8 133.1 115.5 133.4 115.3 133.7C39.1 247.5 18.2 358.6 28.4 468.2C28.4 468.5 28.5 468.7 28.6 469C28.7 469.3 28.9 469.4 29.1 469.6C73.5 502.5 123.1 527.6 175.9 543.8C176.3 543.9 176.7 543.9 177 543.8C177.3 543.7 177.7 543.4 177.9 543.1C189.2 527.7 199.3 511.3 207.9 494.3C208 494.1 208.1 493.8 208.1 493.5C208.1 493.2 208.1 493 208 492.7C207.9 492.4 207.8 492.2 207.6 492.1C207.4 492 207.2 491.8 206.9 491.7C191.1 485.6 175.7 478.3 161 469.8C160.7 469.6 160.5 469.4 160.3 469.2C160.1 469 160 468.6 160 468.3C160 468 160 467.7 160.2 467.4C160.4 467.1 160.5 466.9 160.8 466.7C163.9 464.4 167 462 169.9 459.6C170.2 459.4 170.5 459.2 170.8 459.2C171.1 459.2 171.5 459.2 171.8 459.3C268 503.2 372.2 503.2 467.3 459.3C467.6 459.2 468 459.1 468.3 459.1C468.6 459.1 469 459.3 469.2 459.5C472.1 461.9 475.2 464.4 478.3 466.7C478.5 466.9 478.7 467.1 478.9 467.4C479.1 467.7 479.1 468 479.1 468.3C479.1 468.6 479 468.9 478.8 469.2C478.6 469.5 478.4 469.7 478.2 469.8C463.5 478.4 448.2 485.7 432.3 491.6C432.1 491.7 431.8 491.8 431.6 492C431.4 492.2 431.3 492.4 431.2 492.7C431.1 493 431.1 493.2 431.1 493.5C431.1 493.8 431.2 494 431.3 494.3C440.1 511.3 450.1 527.6 461.3 543.1C461.5 543.4 461.9 543.7 462.2 543.8C462.5 543.9 463 543.9 463.3 543.8C516.2 527.6 565.9 502.5 610.4 469.6C610.6 469.4 610.8 469.2 610.9 469C611 468.8 611.1 468.5 611.1 468.2C623.4 341.4 590.6 231.3 524.2 133.7zM222.5 401.5C193.5 401.5 169.7 374.9 169.7 342.3C169.7 309.7 193.1 283.1 222.5 283.1C252.2 283.1 275.8 309.9 275.3 342.3C275.3 375 251.9 401.5 222.5 401.5zM417.9 401.5C388.9 401.5 365.1 374.9 365.1 342.3C365.1 309.7 388.5 283.1 417.9 283.1C447.6 283.1 471.2 309.9 470.7 342.3C470.7 375 447.5 401.5 417.9 401.5z" />
                  </svg>
                  <h2 className="text-2xl font-bold text-white text-center">
                    You're Invited!
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">Join the official community server.</p>
                </div>

                {/* Main Content */}
                <div className="text-center">
                  <p className="text-gray-300 mb-6">
                    Chat with other members, get exclusive updates,
                    participate in events, and get help from the team.
                  </p>

                  {/* Member Count */}
                  <div className="flex items-center justify-center space-x-2 text-gray-400 mb-8">
                    <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                    <span><strong className="text-white">350+</strong> Members Online</span>
                    <span className="w-3 h-3 bg-gray-600 rounded-full"></span>
                    <span><strong className="text-white">2000+</strong> Total Members</span>
                  </div>
                </div>

                {/* Join Button */}
                <a
                  href="https://discord.com/channels/1435594387789844492/1437398692058370162"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 text-center text-lg"
                >
                  Join Discord
                </a>
              </div>
              {/* End of the Discord Join Section Card */}
            </div>

            {/* Right Column (Community Info) */}
            <div className="w-full md:w-5/12 flex flex-col justify-center py-8 md:py-16 px-4">

              {/* Floating Circles Container */}
              <div className="relative w-full h-48 md:h-64 mb-12">
                <img src="https://res.cloudinary.com/dksyz8vcv/image/upload/v1763014547/ang_discord_profile_img/9440461_x4rcpj.jpg" alt="User Avatar 1" className="absolute top-0 left-16 w-16 h-16 rounded-full border-4 border-gray-800 shadow-lg opacity-90 transform hover:scale-110 transition-transform duration-300" onError={(e) => handleImageError(e, 'U1')} />
                <img src="https://res.cloudinary.com/dksyz8vcv/image/upload/v1763014572/ang_discord_profile_img/bitcoin_dss471.jpg" alt="User Avatar 2" className="absolute top-20 left-48 w-20 h-20 rounded-full border-4 border-gray-800 shadow-lg opacity-90 transform hover:scale-110 transition-transform duration-300" onError={(e) => handleImageError(e, 'U2')} />
                <img src="https://res.cloudinary.com/dksyz8vcv/image/upload/v1763014426/ang_discord_profile_img/9439678_hgdekh.jpg" alt="User Avatar 3" className="absolute top-12 right-18 w-12 h-12 rounded-full border-4 border-gray-800 shadow-lg opacity-90 transform hover:scale-110 transition-transform duration-300" onError={(e) => handleImageError(e, 'U3')} />
                <img src="https://res.cloudinary.com/dksyz8vcv/image/upload/v1763014440/ang_discord_profile_img/9441186_ihokji.jpg" alt="User Avatar 4" className="absolute bottom-0 left-12 w-14 h-14 rounded-full border-4 border-gray-800 shadow-lg opacity-90 transform hover:scale-110 transition-transform duration-300" onError={(e) => handleImageError(e, 'U4')} />
                <img src="https://res.cloudinary.com/dksyz8vcv/image/upload/v1763014414/ang_discord_profile_img/9439692_cqruhm.jpg" alt="User Avatar 5" className="absolute bottom-16 right-30 w-18 h-18 rounded-full border-4 border-gray-800 shadow-lg opacity-90 transform hover:scale-110 transition-transform duration-300" onError={(e) => handleImageError(e, 'U5')} />
                <img src="https://res.cloudinary.com/dksyz8vcv/image/upload/v1763014385/ang_discord_profile_img/9439729_nsqd0a.jpg" alt="User Avatar 6" className="absolute top-24 left-10 w-14 h-14 rounded-full border-4 border-gray-800 shadow-lg opacity-90 transform hover:scale-110 transition-transform duration-300" onError={(e) => handleImageError(e, 'U6')} />
                <img src="https://res.cloudinary.com/dksyz8vcv/image/upload/v1763014304/ang_discord_profile_img/9439727_qciwqg.jpg" alt="User Avatar 7" className="absolute top-4 right-38 w-14 h-14 rounded-full border-4 border-gray-800 shadow-lg opacity-90 transform hover:scale-110 transition-transform duration-300" onError={(e) => handleImageError(e, 'U7')} />
                <img src="https://res.cloudinary.com/dksyz8vcv/image/upload/v1763014805/ang_discord_profile_img/eth_nntxtb.png" alt="User Avatar 8" className="absolute bottom-10 left-30 w-16 h-16 rounded-full border-4 border-gray-800 shadow-lg opacity-90 transform hover:scale-110 transition-transform duration-300" onError={(e) => handleImageError(e, 'U8')} />
                <img src="https://res.cloudinary.com/dksyz8vcv/image/upload/v1763015395/ang_discord_profile_img/d665219b-c75e-49c2-89b4-4385390769be.png" alt="User Avatar 9" className="absolute bottom-0 right-16 w-16 h-16 rounded-full border-4 border-gray-800 shadow-lg opacity-90" onError={(e) => handleImageError(e, 'U9')} />
                <img src="https://res.cloudinary.com/dksyz8vcv/image/upload/v1763016225/ang_discord_profile_img/9720016_aagm9w.jpg" alt="User Avatar 9" className="absolute bottom-2 left-54 w-14 h-14 rounded-full border-4 border-gray-800 shadow-lg opacity-90 transform hover:scale-110 transition-transform duration-300" onError={(e) => handleImageError(e, 'U8')} />
                <img src="https://res.cloudinary.com/dksyz8vcv/image/upload/v1763017098/ang_discord_profile_img/9720011_jxcm4z.jpg" alt="User Avatar 10" className="absolute top-18 left-32 w-10 h-10 rounded-full border-4 border-gray-800 shadow-lg opacity-90 transform hover:scale-110 transition-transform duration-300" onError={(e) => handleImageError(e, 'U8')} />
                <img src="https://res.cloudinary.com/dksyz8vcv/image/upload/v1763016206/ang_discord_profile_img/9439726_ygtbf1.jpg" alt="User Avatar 11" className="absolute top-0 right-58 w-16 h-16 rounded-full border-4 border-gray-800 shadow-lg opacity-90 transform hover:scale-110 transition-transform duration-300" onError={(e) => handleImageError(e, 'U8')} />
                <img src="https://res.cloudinary.com/dksyz8vcv/image/upload/v1763016206/ang_discord_profile_img/9439726_ygtbf1.jpg" alt="User Avatar 12" className="absolute bottom-3 right-38 w-8 h-8 rounded-full border-4 border-gray-800 shadow-lg opacity-90 transform hover:scale-110 transition-transform duration-300" onError={(e) => handleImageError(e, 'U8')} />
                <img src="https://res.cloudinary.com/dksyz8vcv/image/upload/v1763017048/ang_discord_profile_img/9439843_b9249p.jpg" alt="User Avatar 13" className="absolute bottom-0 left-38 w-8 h-8 rounded-full border-4 border-gray-800 shadow-lg opacity-90 transform hover:scale-110 transition-transform duration-300" onError={(e) => handleImageError(e, 'U8')} />
              </div>

              {/* Text Content */}
              <div className="text-center md:text-left">
                <h2 className="text-2xl lg:text-3xl font-bold text-green-500 mb-4">
                  Join Our Trading Community
                </h2>
                <p className="text-md text-gray-400">
                  Join our Discord community to learn directly from active traders, and get support whenever you need it.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Student Feedback Carousel */}
      <FeedbackCarousel />

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-blue-950/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple <span className="text-green-500">Pricing</span></h2>
            <p className="text-gray-400">Invest into a valuable mentorship to create a profitable future in trading</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Payment Plan */}
            <div className="bg-linear-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-3xl p-8 hover:border-green-500/60 transition-all">
              <h3 className="text-2xl font-bold mb-6">Program Fee</h3>
              <div className="mb-6">
                <div className="text-5xl font-bold text-green-500 mb-2">₹47,200</div>
                <p className="text-gray-400">Total Program Investment</p>
              </div>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300">Inclusive of all GST</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300">Registration: ₹10,000</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300">Balance: ₹37,200</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300">Balance payment to be made within 7 days</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-linear-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-3xl p-8 hover:border-green-500/60 transition-all">
              <h3 className="text-2xl font-bold mb-6">Payment Methods</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-black/40 rounded-lg border border-green-500/20">
                  <span className="text-2xl">💳</span>
                  <span className="text-gray-300">Credit/Debit Cards</span>
                  <span className="text-yellow-400 text-[10px]">*Charges applicable</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-black/40 rounded-lg border border-green-500/20">
                  <span className="text-2xl">🏦</span>
                  <span className="text-gray-300">Net Banking</span>
                  <span className="text-yellow-400 text-[10px]">*Available</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-black/40 rounded-lg border border-green-500/20">
                  <span className="text-2xl">📱</span>
                  <span className="text-gray-300">UPI Payment</span>
                  <span className="text-yellow-400 text-[10px]">*No charges</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-black/40 rounded-lg border border-green-500/20">
                  <span className="text-2xl">💰</span>
                  <span className="text-gray-300">Bank Transfer</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="https://forms.gle/fr12ZrgohwAXLDz39"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-linear-to-r from-green-600 to-green-500 px-10 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 cursor-pointer"
            >
              Register Now
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-4 bg-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to <span className="text-green-500">Transform?</span></h2>
            <p className="text-gray-400">Join Traders' Circle and start your journey toward consistent profits</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-linear-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-2xl p-8 text-center hover:border-green-500/40 transition-all">
              <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-green-500" size={28} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Call Us</h3>
              <p className="text-gray-400 mb-2">+91 7726969864</p>
              <p className="text-sm text-gray-500">Available Mon-Fri, 10 AM - 6 PM</p>
            </div>

            <div className="bg-linear-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-2xl p-8 text-center hover:border-green-500/40 transition-all">
              <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-green-500" size={28} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Email Us</h3>
              <p className="text-gray-400 mb-2">support@tradecartel.com</p>
              <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
            </div>

            <div className="bg-linear-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-2xl p-8 text-center hover:border-green-500/40 transition-all">
              <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-green-500" size={28} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Visit Us</h3>
              <p className="text-gray-400 mb-2">Elevana Consultancy Private Limited
              8th Floor, Tower A, 8th floor, Baharampur Naya, Sector 61, Gurugram, Ghata, Haryana 122098</p>
              <p className="text-sm text-gray-500">10 AM - 6 PM, Mon-Fri</p>
            </div>
          </div>

          <div className="bg-linear-to-br from-green-500/5 to-transparent border border-green-500/20 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl font-bold mb-6 text-center">Enquire Now</h3>
            <form
              className={`space-y-4 max-w-2xl mx-auto transition-opacity duration-300 ${isSubmitting ? "opacity-60" : ""}`}
              onSubmit={handleEnquirySubmit}
            >
              {formError && (
                <div
                  role="alert"
                  className="w-full rounded-lg border border-red-500/60 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                >
                  {formError}
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-4">
                <input name="name" type="text" placeholder="Your Full Name" className="bg-black/40 border border-green-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/60 transition-all" />
                <input name="email" type="email" placeholder="Your Email" className="bg-black/40 border border-green-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/60 transition-all" suppressHydrationWarning autoComplete="off" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input name="phone" type="tel" placeholder="+91" pattern="[0-9]{10}" className="bg-black/40 border border-green-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/60 transition-all" />
                <input name="experience" type="number" placeholder="Trading Experience" pattern="[0-1]{2}" className="bg-black/40 border border-green-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/60 transition-all" />
              </div>
              <textarea name="message" placeholder="Any questions or comments?" rows={4} className="w-full bg-black/40 border border-green-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/60 transition-all"></textarea>
              <button
                type="submit"
                className="w-full bg-linear-to-r from-green-600 to-green-500 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 bg-gray-200/10">
        <div className="w-full max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Explore Our
            <span className="text-green-500"> Gallery</span>
          </h1>

          {/* Gallery Container */}
          <div className="rounded-lg p-2 bg-white/10">
            {/* Desktop Grid View */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 lg:grid-auto-rows-[200px] lg:grid-flow-row-dense gap-4">
              {galleryData.map((item) => (
                <GalleryItem key={item.id} {...item} />
              ))}
            </div>

            {/* Mobile Carousel View */}
            <div 
              className="md:hidden relative w-full aspect-square sm:aspect-[4/3] overflow-hidden rounded-xl bg-black/40 border border-green-500/20"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div className="relative w-full h-full">
                {galleryData.map((item, index) => (
                  <div
                    key={item.id}
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                      index === currentMobileIndex 
                        ? "opacity-100 scale-100 z-10" 
                        : "opacity-0 scale-95 z-0 pointer-events-none"
                    }`}
                  >
                    <img
                      src={item.imageUrl}
                      alt={`Gallery Item ${item.id}`}
                      className="w-full h-full object-cover"
                    />
                    {/* Shadow overlay at the bottom for aesthetic depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                ))}
              </div>

              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-green-500 text-white p-2 rounded-full border border-green-500/30 transition-all active:scale-90 hover:scale-110 shadow-lg cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-green-500 text-white p-2 rounded-full border border-green-500/30 transition-all active:scale-90 hover:scale-110 shadow-lg cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>

              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {galleryData.map((_, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => setCurrentMobileIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      index === currentMobileIndex ? "w-6 bg-green-500 shadow-md shadow-green-500/50" : "w-2 bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer scrollToSection={scrollToSection} />
    </div>
  );
};
function setIsFading(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function setDisplayedImages(arg0: any[]) {
  throw new Error("Function not implemented.");
}


