
import React, { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
        <h2 className="section-title text-center mx-auto mb-12">Achievements</h2>
        
        {/* Main Carousel */}
        <div className="relative max-w-3xl mx-auto">
          <button 
            onClick={handlePrev} 
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center z-10 transition-transform hover:scale-110"
          >
            <ChevronLeft className="text-portfolio-primary" />
          </button>
          
          <div className="overflow-hidden">
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
                  <div className="aspect-w-16 aspect-h-9 relative cursor-pointer">
                    <img 
                      src={achievement.image} 
                      alt={achievement.title} 
                      className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <span className="text-white text-xl font-medium mb-2">{achievement.title}</span>
                      <span className="text-white text-sm">Click to view</span>
                    </div>
                  </div>
                  <h3 className="text-center mt-3 font-medium text-lg">{achievement.title}</h3>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={handleNext} 
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center z-10 transition-transform hover:scale-110"
          >
            <ChevronRight className="text-portfolio-primary" />
          </button>
        </div>
        
        {/* Thumbnails */}
        <div className="flex justify-center mt-6 space-x-2">
          {achievements.map((_, index) => (
            <button 
              key={index} 
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                activeIndex === index 
                  ? "bg-portfolio-primary scale-125" 
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            ></button>
          ))}
        </div>
        
        {/* Dialog for full image view */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{achievements[selectedIndex]?.title}</DialogTitle>
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
