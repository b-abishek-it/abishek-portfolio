
import React from "react";
import { GraduationCap } from "lucide-react";

type Education = {
  id: number;
  degree: string;
  institution: string;
  period: string;
  marks: string;
};

const EducationSection: React.FC = () => {
  const educationList: Education[] = [
    {
      id: 1,
      degree: "B.Tech Information Technology",
      institution: "Anjalai Ammal Mahalingam Engineering College, Kovilvenni",
      period: "Currently Studying (2022-2026)",
      marks: "Current CGPA: 8.02"
    },
    {
      id: 2,
      degree: "HSE - 12th Standard",
      institution: "Government Higher Secondary School, Ayyempettai",
      period: "Year of Passing: (2021-2022)",
      marks: "Marks Percentage: 72.6%"
    },
    {
      id: 3,
      degree: "SSLC - 10th Standard",
      institution: "Government Higher Secondary School, Ayyempettai",
      period: "Year of Passing: (2019-2020)",
      marks: "Marks Percentage: 88.8%"
    }
  ];
  
  return (
    <section id="education" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="section-title text-center mx-auto mb-12">Education</h2>
        
        <div className="max-w-3xl mx-auto">
          {educationList.map((edu, index) => (
            <div 
              key={edu.id}
              className="mb-8 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md p-6 transition-all hover:shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-portfolio-primary/10 rounded-full">
                  <GraduationCap size={24} className="text-portfolio-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-portfolio-dark dark:text-white mb-2">
                    {edu.degree}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    {edu.institution}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {edu.period}
                  </p>
                  <p className="text-portfolio-primary font-medium">
                    {edu.marks}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
