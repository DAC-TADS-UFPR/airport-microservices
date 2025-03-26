import { useState, useEffect } from "react";

const useActiveSection = () => {
  const [activeSectionClassName, setActiveSectionClassName] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let activeClassName = null;

      sections.forEach((section) => {
        if (section.classList.contains("ativo")) {
          activeClassName = section.classList.item(0);
        }
      });

      setActiveSectionClassName(activeClassName);
    };

    // Initial check
    handleScroll();

    // Add event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  return activeSectionClassName;
};

export default useActiveSection;
