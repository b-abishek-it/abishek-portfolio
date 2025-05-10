
import React, { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Award, ChevronLeft, ChevronRight } from "lucide-react";

const AchievementsSection: React.FC = () => {
  const { achievements } = useData();
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? achievements.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev === achievements.length - 1 ? 0 : prev + 1));
  };
  
  const openImage = (index: number) => {
    setSelectedIndex(index);
    setOpen(true);
  };
  
  return (
    <section id="achievements" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="section-title text-center mx-auto mb-12">
          <span className="flex items-center justify-center gap-2">
            <Award className="h-6 w-6 text-portfolio-primary" />
            Achievements
          </span>
        </h2>
        
        {/* Main Carousel */}
        <div className="relative max-w-3xl mx-auto">
          <button 
            onClick={handlePrev} 
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center z-10 transition-transform hover:scale-110"
            aria-label="Previous achievement"
          >
            <ChevronLeft className="text-portfolio-primary" />
          </button>
          
          <div className="overflow-hidden rounded-xl shadow-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {achievements.map((achievement, index) => (
                <div 
                  key={achievement.id} 
                  className="min-w-full" 
                  onClick={() => openImage(index)}
                >
                  <div className="aspect-w-16 aspect-h-9 relative cursor-pointer group">
                    <img 
                      src={achievement.image} 
                      alt={achievement.title} 
                      className="w-full h-64 md:h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col items-center justify-end p-6 opacity-100 transition-opacity group-hover:opacity-100">
                      <span className="text-white text-2xl font-bold mb-2">{achievement.title}</span>
                      <span className="text-white text-sm opacity-80 bg-black/30 px-4 py-1 rounded-full">Click to view</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={handleNext} 
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center z-10 transition-transform hover:scale-110"
            aria-label="Next achievement"
          >
            <ChevronRight className="text-portfolio-primary" />
          </button>
        </div>
        
        {/* Thumbnails */}
        <div className="flex justify-center mt-6 space-x-3">
          {achievements.map((achievement, index) => (
            <button 
              key={index} 
              onClick={() => setActiveIndex(index)}
              className="flex-col items-center"
            >
              <div 
                className={`w-16 h-10 overflow-hidden rounded ${
                  activeIndex === index 
                    ? "ring-2 ring-portfolio-primary scale-110" 
                    : "opacity-70"
                } transition-all`}
              >
                <img 
                  src={achievement.image} 
                  alt={achievement.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </button>
          ))}
        </div>
        
        {/* Dialog for full image view */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-portfolio-primary" />
                {achievements[selectedIndex]?.title}
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <img 
                src={achievements[selectedIndex]?.image} 
                alt={achievements[selectedIndex]?.title} 
                className="w-full rounded-lg"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default AchievementsSection;
