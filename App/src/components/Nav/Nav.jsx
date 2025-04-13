import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { Link } from "react-scroll";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from "../../auth/AuthContext";
import { FaUser } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import axios from "axios";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [navbar, setNavbar] = useState(false)
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const toggleProfile = () => setProfileOpen(!profileOpen);
  const toggleMenu = () => setIsOpen(!isOpen);
  const [userInfo, setUserInfo] = useState({});

  const handleProfileClick = () => {
    if (window.innerWidth <= 768) {
      toggleProfile(); // Toggle on mobile (click)
    }
  };

  const changeNav = () =>{
    if(window.scrollY >=80){
      setNavbar(true)
    }else{
      setNavbar(false)
    }
  }
  window.addEventListener('scroll', changeNav)
  //Login Status
  useGSAP(() => {
    gsap.from(".navbar-links li", {
      duration: 1,
      opacity: 0,
      ease: "power1.inOut",
      stagger: 0.111,
    });
  });
  useGSAP(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    if (mediaQuery.matches) {
      gsap.from(".navbar-links.active li", {
        duration: 1,
        opacity: 0,
        ease: "power1.inOut",
        stagger: 0.1,
      });
    }
  }, [isOpen]);

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5500/api/v1/gym/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserInfo(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getUser();
    }
  }, [isLoggedIn]);

  return (
    <>
      <nav className={`navbar ${navbar? 'active' : ''}`}>
        <div className="navbar-logo">
          <a href={"/"}>
            <img
              src="\Nav\Logo2.png"
              alt="Logo"
            />
          </a>
        </div>

        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          <GiHamburgerMenu color="white" size={40} />
        </button>

        <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
          <li>
            <Link smooth={true} duration={500} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setIsOpen(false)}
              smooth={true}
              duration={500}
              to="about"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              smooth={true}
              duration={500}
              to="plans"
              onClick={() => setIsOpen(false)}
            >
              Plans
            </Link>
          </li>
          <li>
            <Link
              smooth={true}
              duration={500}
              to="services"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
          </li>
          
          <li>
            <Link
              smooth={true}
              duration={500}
              to="contact"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </li>
          {isLoggedIn ? (
            <div
              className="profileSection"
              onMouseLeave={() => setProfileOpen(false)}
            >
              <img
                tabIndex={0}
                onKeyPress={(e) => e.key === "Enter" && toggleProfile()}
                src={userInfo && userInfo.profilePicture ? `http://localhost:5500${userInfo.profilePicture}` : '/Nav/defaultProfile.jpg'}
                className="profile"
                onClick={handleProfileClick}
                onMouseEnter={() => setProfileOpen(true)} // Open on hover
              />
              {profileOpen && (
                <ul className="profileList">
                  <li
                    onClick={() => {
                      navigate("/profile");
                      setProfileOpen(false);
                    }}
                  >
                    <FaUser /> View Profile
                  </li>
                  {isLoggedIn && userInfo.role === 'admin' ? ( <li
                    onClick={() => {
                      navigate("/Dashboard");
                      setProfileOpen(false);
                    }}
                  >
                    <MdDashboard/> Dashboard
                  </li>) : null}
                 
                  <li
                    onClick={() => {
                      logout();
                      setProfileOpen(false);
                    }}
                  >
                    <CgLogOut size={20} /> Log Out
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <li>
              <button
                className="nav-register"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/login");
                }}
              >
                Login
              </button>
            </li>
          )}
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
