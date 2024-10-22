import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { DarkThemeToggle } from "flowbite-react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);


  function ThemeTogglerBtn0() {
    return (
      <button
        onClick={() => setIsDarkMode((prev) => !prev)}
        className="p-2 bg-gray-700 text-1xl rounded-full"
      >
        {isDarkMode ? (
          <span className="text-2xl">⚪🌞</span>
          
        ) : (
          <span className="text-2xl">🌛⚫</span>
        )}
      </button>
    );
  }
  
  //eslint-disable-next-line
  function ThemeTogglerBtn1() {
    return (
      <button
        onClick={() => setIsDarkMode((prev) => !prev)}
        className="p-2 bg-gray-700 text-1xl rounded-full"
      >
        {isDarkMode ? (
          <FaSun className="text-orange-500" />
          
        ) : (
          <FaMoon className="text-blue-400" />
        )}
      </button>
    );
  }

  //eslint-disable-next-line
  function ThemeTogglerBtn2() {
    return (
      <button
        onClick={() => setIsDarkMode((prev) => !prev)}
        className="p-2 bg-gray-700 text-white rounded-full"
      >
        {isDarkMode ? <FaSun /> : <FaMoon />}
      </button>
    );
  }

  //eslint-disable-next-line
  function ThemeTogglerBtn3() {
    return (
      <>
        {/*Nees this   import { DarkThemeToggle } from "flowbite-react"; */}
        <DarkThemeToggle className="mx-2" />
      </>
    );
  }

  return (
    <>
      { ThemeTogglerBtn0() }
     {/* ThemeTogglerBtn1() */}
      {/* ThemeTogglerBtn2() */}
      {/* ThemeTogglerBtn3() */}
    </>
  );
};

// to use that them toggler just add the following  <ThemeToggle /> to the palce u wanna be
export default ThemeToggle;
