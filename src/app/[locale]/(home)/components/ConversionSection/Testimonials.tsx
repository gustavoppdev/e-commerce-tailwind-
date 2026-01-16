// Next-Intl
import { useTranslations } from "next-intl";

// Constants
import { TestimonialsArray } from "@/constants";

// Icons
import { Quote } from "lucide-react";

const Testimonials = () => {
  const t = useTranslations("Sections.Testimonials");

  return (
    <div className="relative z-20">
      <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl my-10">
        {t("headline")}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 lg:gap-10">
        {TestimonialsArray.map((testimonial) => (
          <div
            key={testimonial.author}
            className="flex flex-col sm:flex-row lg:flex-col gap-6 items-start h-full"
          >
            <Quote className="size-6 fill-neutral-300 text-neutral-300 scale-x-[-1]" />

            <div className="flex flex-col gap-6 flex-1">
              <p className="text-muted-foreground text-lg flex-1">
                {t(testimonial.quote)}
              </p>

              <p className="font-semibold">{t(testimonial.author)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
