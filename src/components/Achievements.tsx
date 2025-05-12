
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Achievements = () => {
  const [currentImage, setCurrentImage] = useState(0);
  
  // Replace with actual achievement images when available
  const achievements = [
    { id: 1, image: "/achievement1.jpg" },
    { id: 2, image: "/achievement2.jpg" },
    { id: 3, image: "/achievement3.jpg" },
    { id: 4, image: "/achievement4.jpg" }
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % achievements.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + achievements.length) % achievements.length);
  };

  return (
    <section id="achievements" className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="section-heading">Achievements</h2>
        
        <div className="relative max-w-3xl mx-auto aspect-[4/3] bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Placeholder for achievement images */}
          <div className="absolute inset-0 flex items-center justify-center bg-accent/10 text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20v-6M9 20v-9M6 20V4M3 20v-4M18 20v-6M15 20v-3M21 20V2"/>
            </svg>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 py-4 px-6 bg-gradient-to-t from-black/70 to-transparent">
            <p className="text-white font-medium text-lg">Achievement {currentImage + 1} of {achievements.length}</p>
          </div>
          
          {/* Navigation buttons */}
          <Button 
            onClick={prevImage} 
            className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full p-2 h-10 w-10"
            variant="secondary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </Button>
          
          <Button 
            onClick={nextImage} 
            className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full p-2 h-10 w-10"
            variant="secondary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </Button>
        </div>
        
        {/* Thumbnail indicators */}
        <div className="flex justify-center mt-4 gap-2">
          {achievements.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === currentImage ? "bg-accent w-4" : "bg-accent/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
