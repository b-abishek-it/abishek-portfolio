
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { useData, Project } from "@/contexts/DataContext";

const ProjectsManagement: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject, handleImageChange } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    imagePreview: "",
    codeLink: "",
    demoLink: ""
  });
  
  const openAddDialog = () => {
    setProjectToEdit(null);
    setFormData({
      title: "",
      description: "",
      image: "",
      imagePreview: "",
      codeLink: "",
      demoLink: ""
    });
    setIsOpen(true);
  };
  
  const openEditDialog = (project: Project) => {
    setProjectToEdit(project);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      imagePreview: project.image,
      codeLink: project.codeLink,
      demoLink: project.demoLink
    });
    setIsOpen(true);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    
    const projectData = {
      title: formData.title,
      description: formData.description,
      image: formData.imagePreview || formData.image,
      codeLink: formData.codeLink,
      demoLink: formData.demoLink
    };
    
    if (projectToEdit) {
      updateProject({ 
        ...projectToEdit,
        ...projectData
      });
      toast.success("Project updated successfully!");
    } else {
      addProject(projectData);
      toast.success("Project added successfully!");
    }
    
    setIsOpen(false);
  };
  
  const handleDelete = (id: string) => {
    deleteProject(id);
    toast.success("Project deleted successfully!");
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-portfolio-dark dark:text-white">Manage Projects</h2>
        <Button onClick={openAddDialog} className="flex items-center gap-2">
          <Plus size={16} /> Add Project
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id}>
            <div className="relative h-40 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <CardHeader className="flex flex-row items-start justify-between">
              <CardTitle className="text-lg">{project.title}</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => openEditDialog(project)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-red-600" 
                    onClick={() => handleDelete(project.id)}
                  >
                    <Trash className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                {project.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{projectToEdit ? "Edit Project" : "Add Project"}</DialogTitle>
            <DialogDescription>
              {projectToEdit 
                ? "Make changes to your project here. Click save when you're done."
                : "Add a new project to your portfolio."}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Project Title</label>
              <Input 
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Project Title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea 
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Project Description"
                required
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">Project Image</label>
              <div className="flex items-center space-x-4">
                <label 
                  htmlFor="image-upload" 
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
                  id="image-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="codeLink" className="text-sm font-medium">Code Link</label>
              <Input 
                id="codeLink"
                name="codeLink"
                value={formData.codeLink}
                onChange={handleChange}
                placeholder="https://github.com/username/repo"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="demoLink" className="text-sm font-medium">Demo Link</label>
              <Input 
                id="demoLink"
                name="demoLink"
                value={formData.demoLink}
                onChange={handleChange}
                placeholder="https://demo-link.com"
                required
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {projectToEdit ? "Save Changes" : "Add Project"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectsManagement;
