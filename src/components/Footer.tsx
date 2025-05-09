
import React from "react";
import { Heart } from "lucide-react";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="py-8 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4 md:mb-0">
            © {year} Abishek B. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
