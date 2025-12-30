import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from 'react-icons/fa';

const Header = ({ isAdminLoggedIn, adminName, onAdminLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAdminClick = () => {
    if (isAdminLoggedIn) {
      setShowDropdown(!showDropdown);
    } else {
      navigate("/admin-login");
    }
  };

  const handleLogout = () => {
    setShowDropdown(false);
    onAdminLogout();
    navigate("/");
  };

  const handleNavClick = (path) => {
    setShowDropdown(false);
    if (path.startsWith("#")) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-[#d9d9d9] shadow-md transition-all duration-300 ${
        isScrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <img
              src="/INHDTLogo.png"
              alt="INHDT CARE HOSPITAL"
              className="h-12 w-12 rounded-full border-2 border-[#008037] object-cover"
            />
          </Link>
          <span className="ml-3 text-xl font-bold text-[#008037] hidden md:block">
            INHDT CARE HOSPITAL
          </span>
        </div>

        <nav className="hidden md:flex space-x-6">
          {[
            { name: "Home", path: "/" },
            { name: "Appointment", path: "/appointment" },
            { name: "Health Packages", path: "/packages" },
            { name: "Blood Bank", path: "/bloodbank" },
            { name: "Inventory", path: "/inventory" },
            { name: "About Us", path: "/aboutus" },
            { name: "Contact Us", path: "/contactus" },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.path)}
              className="text-gray-800 hover:text-[#008037] font-medium transition-colors"
            >
              {item.name}
            </button>
          ))}
        </nav>

        <div className="flex space-x-3">
          {isAdminLoggedIn ? (
            <div className="relative">
              <button
                onClick={handleAdminClick}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-green-800 text-white shadow-lg hover:shadow-xl transition-all"
                title={`Logged in as ${adminName}`}
              >
                {adminName ? (
                  <span className="text-lg font-semibold">
                    {adminName.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <FaUserCircle className="text-2xl" />
                )}
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      navigate("/donordetailstable");
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    View Donor Details
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/admin-login"
              className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#008037] text-[#008037] hover:bg-[#008037] hover:text-white transition-colors"
              title="Admin Login"
            >
              <FaUser className="text-xl" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;