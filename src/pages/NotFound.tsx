
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center px-6">
        <h1 className="text-6xl md:text-9xl font-bold mb-4 text-portfolio-primary">404</h1>
        <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-6">
          Oops! Page not found
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/">
          <Button className="flex items-center gap-2">
            <ArrowLeft size={16} /> Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
