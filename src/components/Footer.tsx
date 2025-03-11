import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-900 py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 dark:text-gray-400">
              © {currentYear} Iqbal Roudatul Irfan. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="https://www.instagram.com/iqbalri._" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              <FaGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/iqbalri" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              <FaLinkedin size={20} />
            </a>
            <a href="https://www.instagram.com/iqbalri._" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Uses FaGithub, FaLinkedin, FaInstagram - will work after installing react-icons
