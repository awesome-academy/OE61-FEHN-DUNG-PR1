"use client";

import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";

const slides = [
    { src: "/images/slide.png", alt: "slide image 1" },
    { src: "/images/slide2.jpg", alt: "slide image 2" },
];

const Hero = () => {

    const [current, setCurrent] = useState(0);
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        slideChanged(slider) {
            setCurrent(slider.track.details.rel);
        },
    });

    return (
        <section>
            <div ref={sliderRef} className="keen-slider w-full md:h-[500px] relative hero-carousel">
                {slides.map((slide, index) => (
                    <div className="keen-slider__slide relative w-full h-[500px]" key={index}>
                        <Image
                            src={slide.src}
                            alt={slide.alt}
                            fill
                            className="object-cover"
                            sizes="100vw"
                            priority={index === 0}
                        />
                    </div>
                ))}
                {/* Pagination Dots */}
                <div className="hero-carousel__dots">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`hero-carousel__dot${current === index ? " hero-carousel__dot--active" : ""}`}
                            onClick={() => instanceRef.current?.moveToIdx(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Hero
