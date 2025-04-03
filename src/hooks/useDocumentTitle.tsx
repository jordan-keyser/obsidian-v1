
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook to set document title based on current route
 * @param baseTitle - Base title prefix for all pages
 */
export const useDocumentTitle = (baseTitle: string = 'Crowe Obsidian') => {
  const location = useLocation();
  
  useEffect(() => {
    // Get the current path
    const path = location.pathname;
    
    // Set the page title based on the current route
    let pageTitle = '';
    
    switch (path) {
      case '/':
        pageTitle = 'Home';
        break;
      case '/gallery':
        pageTitle = 'Gallery';
        break;
      case '/chat':
        pageTitle = 'Chat';
        break;
      case '/feedback':
        pageTitle = 'Feedback';
        break;
      default:
        pageTitle = 'Not Found';
        break;
    }
    
    // Update document title
    document.title = pageTitle ? `${baseTitle} - ${pageTitle}` : baseTitle;
    
    // Cleanup function
    return () => {
      document.title = baseTitle;
    };
  }, [location, baseTitle]);
};
