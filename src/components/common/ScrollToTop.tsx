"use client";

// React
import { useEffect, useState } from "react";

// Componentes
import { Button } from "../ui/button";

// Icones & Next-Intl
import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations("Layout.ScrollToTop");

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={scrollToTop}
        className="rounded-full shadow-lg p-3 h-12 w-12 bg-indigo-600/60 hover:bg-indigo-700/80 text-white transition-all duration-300"
        aria-label={t("ariaLabel")}
      >
        <ArrowUp className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default ScrollToTop;
