
import React, { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreVertical, Plus, Trash, Image } from "lucide-react";
import { toast } from "sonner";
import { useData, Achievement } from "@/contexts/DataContext";

const AchievementsManagement: React.FC = () => {
  const { achievements, addAchievement, updateAchievement, deleteAchievement, handleImageChange } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [achievementToEdit, setAchievementToEdit] = useState<Achievement | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    imagePreview: ""
  });
  
  const openAddDialog = () => {
    setAchievementToEdit(null);
    setFormData({
      title: "",
      image: "",
      imagePreview: ""
    });
    setIsOpen(true);
  };
  
  const openEditDialog = (achievement: Achievement) => {
    setAchievementToEdit(achievement);
    setFormData({
      title: achievement.title,
      image: achievement.image,
      imagePreview: achievement.image
    });
    setIsOpen(true);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imagePreview = await handleImageChange(e);
    if (imagePreview) {
      setFormData(prev => ({ 
        ...prev, 
        imagePreview,
        image: imagePreview
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.imagePreview && !formData.image) {
      toast.error("Please select an image");
      return;
    }
    
    const achievementData = {
      title: formData.title,
      image: formData.imagePreview || formData.image
    };
    
    if (achievementToEdit) {
      updateAchievement({ 
        ...achievementToEdit,
        ...achievementData
      });
      toast.success("Achievement updated successfully!");
    } else {
      addAchievement(achievementData);
      toast.success("Achievement added successfully!");
    }
    
    setIsOpen(false);
  };
  
  const handleDelete = (id: string) => {
    deleteAchievement(id);
    toast.success("Achievement deleted successfully!");
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-portfolio-dark dark:text-white">Manage Achievements</h2>
        <Button onClick={openAddDialog} className="flex items-center gap-2">
          <Plus size={16} /> Add Achievement
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.map((achievement) => (
          <Card key={achievement.id}>
            <div className="relative h-40 overflow-hidden">
              <img 
                src={achievement.image} 
                alt={achievement.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full bg-white dark:bg-gray-800">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openEditDialog(achievement)}>
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-600" 
                      onClick={() => handleDelete(achievement.id)}
                    >
                      <Trash className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <CardHeader>
              <CardTitle className="text-sm">{achievement.title}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{achievementToEdit ? "Edit Achievement" : "Add Achievement"}</DialogTitle>
            <DialogDescription>
              {achievementToEdit 
                ? "Make changes to your achievement here. Click save when you're done."
                : "Add a new achievement to your portfolio."}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Achievement Title</label>
              <Input 
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Achievement Title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">Achievement Image</label>
              <div className="flex items-center space-x-4">
                <label 
                  htmlFor="achievement-image-upload" 
                  className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-md border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {formData.imagePreview ? (
                    <img 
                      src={formData.imagePreview} 
                      alt="Preview" 
                      className="object-cover w-full h-full rounded-md"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Image className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-500">Upload image</span>
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  id="achievement-image-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {achievementToEdit ? "Save Changes" : "Add Achievement"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AchievementsManagement;
