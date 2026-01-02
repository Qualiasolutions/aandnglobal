'use client';

import { useState, useEffect, useCallback } from 'react';
import { SLIDESHOW_INTERVAL } from '@/lib/constants';

export function useSlideshow(totalSlides: number) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    if (totalSlides <= 1) return;
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    if (totalSlides <= 1) return;
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const pause = useCallback(() => {
    setIsPaused(true);
    // Resume after interval of inactivity
    setTimeout(() => setIsPaused(false), SLIDESHOW_INTERVAL);
  }, []);

  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const timer = setInterval(nextSlide, SLIDESHOW_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide, totalSlides]);

  return {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
    pause,
    isPaused,
  };
}
