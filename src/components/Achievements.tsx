
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

const Achievements = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<number | null>(null);
  
  // Replace with actual achievement data when available
  const achievements = [
    { id: 1, image: "/C1.jpg", title: "Introduction to Microsoft Excel" },
    { id: 2, image: "/C2.jpg", title: "TCS iON Career Edge - Young Professional" },
    { id: 3, image: "/C3.jpg", title: "Workshop" },
    { id: 4, image: "/C4.jpg", title: "Internship" }
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % achievements.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + achievements.length) % achievements.length);
  };

  const openAchievementDialog = (index: number) => {
    setSelectedAchievement(index);
    setDialogOpen(true);
  };

  return (
    <section id="achievements" className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="section-heading">Achievements</h2>
        
        <div className="relative max-w-3xl mx-auto aspect-[4/3] bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
             onClick={() => openAchievementDialog(currentImage)}>
          <img 
            src={achievements[currentImage].image} 
            alt={achievements[currentImage].title}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute bottom-0 left-0 right-0 py-4 px-6 bg-gradient-to-t from-black/70 to-transparent">
            <p className="text-white font-medium text-lg">Achievement {currentImage + 1} of {achievements.length}</p>
          </div>
          
          {/* Navigation buttons */}
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }} 
            className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full p-2 h-10 w-10"
            variant="secondary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </Button>
          
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }} 
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

        {/* Achievement Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-xl">
                {selectedAchievement !== null && achievements[selectedAchievement].title}
              </DialogTitle>
            </DialogHeader>
            <div className="flex justify-center p-4">
              <div className="w-full aspect-[4/3] rounded-md overflow-hidden">
                {selectedAchievement !== null && (
                  <img 
                    src={achievements[selectedAchievement].image} 
                    alt={achievements[selectedAchievement].title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Achievements;
