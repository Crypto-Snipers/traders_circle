"use client";
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface FeedbackItem {
  id: number;
  image: string;
  rating: number;
}

const feedbackData: FeedbackItem[] = [
  { id: 1, image: "https://res.cloudinary.com/dkkah7att/image/upload/v1782196802/WhatsApp_Image_2026-06-23_at_12.00.23_PM_1_iot5bc.jpg", rating: 5 },
  { id: 2, image: "https://res.cloudinary.com/dkkah7att/image/upload/v1782196803/WhatsApp_Image_2026-06-23_at_12.00.25_PM_2_wqmufv.jpg", rating: 5 },
  { id: 3, image: "https://res.cloudinary.com/dkkah7att/image/upload/v1782196802/WhatsApp_Image_2026-06-23_at_12.00.22_PM_2_m2oju4.jpg", rating: 5 },
  { id: 4, image: "https://res.cloudinary.com/dkkah7att/image/upload/v1782196801/WhatsApp_Image_2026-06-23_at_12.00.22_PM_kodktp.jpg", rating: 5 },
  { id: 5, image: "https://res.cloudinary.com/dkkah7att/image/upload/v1782196804/WhatsApp_Image_2026-06-23_at_12.00.26_PM_f2ijgv.jpg", rating: 5 },
  { id: 6, image: "https://res.cloudinary.com/dkkah7att/image/upload/v1782196802/WhatsApp_Image_2026-06-23_at_12.00.25_PM_xhjvcb.jpg", rating: 5 },
  { id: 7, image: "https://res.cloudinary.com/dkkah7att/image/upload/v1782196802/WhatsApp_Image_2026-06-23_at_12.00.25_PM_1_igrgoj.jpg", rating: 5 },
  { id: 8, image: "https://res.cloudinary.com/dkkah7att/image/upload/v1782196802/WhatsApp_Image_2026-06-23_at_12.00.24_PM_1_cgfnif.jpg", rating: 5 },
  { id: 9, image: "https://res.cloudinary.com/dkkah7att/image/upload/v1782196801/WhatsApp_Image_2026-06-23_at_12.00.23_PM_iweyrh.jpg", rating: 5 },
  { id: 10, image: "https://res.cloudinary.com/dkkah7att/image/upload/v1782196801/WhatsApp_Image_2026-06-23_at_12.00.24_PM_sqveqy.jpg", rating: 5 },
  { id: 11, image: "https://res.cloudinary.com/dkkah7att/image/upload/v1782196801/WhatsApp_Image_2026-06-23_at_12.00.22_PM_1_wn1an8.jpg", rating: 5 },
  { id: 12, image: "https://res.cloudinary.com/dkkah7att/image/upload/v1782196801/WhatsApp_Image_2026-06-23_at_12.00.21_PM_idzjho.jpg", rating: 5 },
  { id: 13, image: "https://res.cloudinary.com/dkkah7att/image/upload/v1782196801/WhatsApp_Image_2026-06-23_at_12.00.26_PM_1_g0oxtu.jpg", rating: 5 },
  { id: 14, image: "https://res.cloudinary.com/dkkah7att/image/upload/v1782199877/WhatsApp_Image_2026-06-23_at_12.00.24_PM_2_ue8oia.jpg", rating: 5 },
];

export default function FeedbackCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const maxIndex = Math.max(0, feedbackData.length - cardsPerView);
  const cardWidthPercent = 100 / cardsPerView;

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1024) setCardsPerView(3);
      else if (window.innerWidth >= 640) setCardsPerView(2);
      else setCardsPerView(1);
    };
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, Math.max(0, feedbackData.length - cardsPerView)));
  }, [cardsPerView]);


  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

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
    if (distance > 50) handleNext();
    else if (distance < -50) handlePrev();
  };

  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Community <span className="text-green-500">Feedback</span>
          </h2>
          <p className="text-gray-400 text-lg">Real results from real traders in our community</p>
          <div className="w-24 h-1 bg-linear-to-r from-green-600 to-green-400 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Carousel wrapper */}
        <div className="relative">
          {/* Left arrow */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous feedback"
            className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-green-500 text-white p-2.5 rounded-full border border-green-500/30 transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Track */}
          <div
            className="overflow-hidden mx-4 sm:mx-6"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * cardWidthPercent}%)` }}
            >
              {feedbackData.map((item) => (
                <div
                  key={item.id}
                  className="shrink-0 px-2 sm:px-3"
                  style={{ width: `${cardWidthPercent}%` }}
                >
                  <div className="bg-linear-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-2xl overflow-hidden hover:border-green-500/50 transition-all duration-300 flex flex-col group">

                    {/* Image area */}
                    <div className="w-full aspect-[3/5] bg-white overflow-hidden relative">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={`Student feedback ${item.id}`}
                          className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              `https://placehold.co/400x300/0f1a0f/22c55e?text=Feedback`;
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-950/40 to-gray-900">
                          <span className="text-gray-600 text-xs">Feedback</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/5 transition-all duration-300 pointer-events-none" />
                    </div>

                    {/* Stars strip */}
                    <div className='flex items-center justify-center gap-1'>
                      <span className='text-xs text-gray-200 italic'>Ratings:</span>
                    
                    <div className="flex gap-1 justify-center item-center px-5 py-4 border-t border-green-500/15">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} size={15} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right arrow */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next feedback"
            className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-green-500 text-white p-2.5 rounded-full border border-green-500/30 transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentIndex
                  ? 'w-6 bg-green-500 shadow-md shadow-green-500/50'
                  : 'w-2 bg-white/25 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
