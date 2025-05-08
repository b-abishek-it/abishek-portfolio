
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, MoreVertical, Plus, Trash } from "lucide-react";
import { toast } from "sonner";
import { useData } from "@/contexts/DataContext";

// Add this type to DataContext.tsx later
export type Skill = {
  id: string;
  name: string;
  category: string;
};

const SkillsManagement: React.FC = () => {
  // We'll hook this up to the DataContext in the next step
  const { addSkill, updateSkill, deleteSkill, skills = [] } = useData();
  
  const [isOpen, setIsOpen] = useState(false);
  const [skillToEdit, setSkillToEdit] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Programming Languages", // Default category
  });
  
  const categories = [
    "Programming Languages",
    "Web Development",
    "Databases", 
    "Version Control",
    "Other"
  ];
  
  const openAddDialog = () => {
    setSkillToEdit(null);
    setFormData({
      name: "",
      category: "Programming Languages",
    });
    setIsOpen(true);
  };
  
  const openEditDialog = (skill: Skill) => {
    setSkillToEdit(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
    });
    setIsOpen(true);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error("Skill name cannot be empty");
      return;
    }
    
    const skillData = {
      name: formData.name,
      category: formData.category
    };
    
    if (skillToEdit) {
      updateSkill({ 
        ...skillToEdit,
        ...skillData
      });
      toast.success("Skill updated successfully!");
    } else {
      addSkill(skillData);
      toast.success("Skill added successfully!");
    }
    
    setIsOpen(false);
  };
  
  const handleDelete = (id: string) => {
    deleteSkill(id);
    toast.success("Skill deleted successfully!");
  };
  
  // Group skills by category
  const skillsByCategory = skills.reduce((acc: Record<string, Skill[]>, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-portfolio-dark dark:text-white">Manage Skills</h2>
        <Button onClick={openAddDialog} className="flex items-center gap-2">
          <Plus size={16} /> Add Skill
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle>{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {categorySkills.map(skill => (
                  <li key={skill.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-portfolio-primary rounded-full mr-2"></div>
                      <span>{skill.name}</span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditDialog(skill)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(skill.id)}
                        >
                          <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                ))}
                {categorySkills.length === 0 && (
                  <li className="text-gray-500 dark:text-gray-400 text-sm italic">
                    No skills added to this category
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{skillToEdit ? "Edit Skill" : "Add Skill"}</DialogTitle>
            <DialogDescription>
              {skillToEdit
                ? "Make changes to your skill here. Click save when you're done."
                : "Add a new skill to your portfolio."}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Skill Name</label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter skill name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md bg-background"
                required
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {skillToEdit ? "Save Changes" : "Add Skill"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SkillsManagement;
