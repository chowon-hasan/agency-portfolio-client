"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import defaultlogo from "public/images/Camera.png";
import Link from "next/link";
import { FaTh, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import "./navbar.css";
import useAuth from "@/Hooks/useAuth";
import useDynamicGet from "@/app/utills/useDynamicGet";
import "../../../app/responsive.css";

const NavBar = () => {
  const { user } = useAuth();
  console.log(user);
  const { uid, displayName, photoURL } = user || {};

  const {
    data: Logos,
    isLoading,
    refetch,
  } = useDynamicGet("getLogos", user?.email);

  const [logo = {}] = Logos && Logos.length ? Logos : [];
  const { image } = logo;

  useEffect(() => {
    if (user?.email) {
      refetch();
    }
  }, [user?.email, refetch]);

  return (
    <section
      id="home"
      className=" w-full z-1 backdrop-blur-2xl bg-white/100 header z-10"
    >
      <div className="container mx-auto">
        <div className="">
          <div className="navbar">
            <div className="navbar transparent">
              <div className="navbar-start">
                <div className="dropdown">
                  <label tabIndex={0} className="btn btn-ghost lg:hidden">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                      />
                    </svg>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white text-white rounded-box w-52"
                  >
                    <li>
                      <Link
                        className="navLinks_nav text-[#000] hover:bg-transparent  hover:text-black"
                        href="#"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="navLinks_nav text-[#000] hover:bg-transparent hover:text-black"
                        href="#about"
                      >
                        About
                      </Link>
                    </li>
                    {user ? (
                      <li>
                        <Link
                          className="navLinks_nav text-[#000] hover:bg-transparent hover:text-black"
                          href="#live"
                        >
                          Live Images
                        </Link>
                      </li>
                    ) : (
                      ""
                    )}
                    <li>
                      <Link
                        className="navLinks_nav text-[#000] hover:bg-transparent hover:text-black"
                        href="#services"
                      >
                        Service&apos;s
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="navLinks_nav text-[#000] hover:bg-transparent hover:text-black"
                        href="#recent"
                      >
                        Recent Work&apos;s
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="navLinks_nav text-[#000] hover:bg-transparent hover:text-black"
                        href="#portfolio"
                      >
                        Portfolio&apos;s
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="navLinks_nav text-[#000] hover:bg-transparent hover:text-black"
                        href="#review"
                      >
                        Client&apos;s Word&apos;s
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="navLinks_nav text-[#000] hover:bg-transparent hover:text-black"
                        href="#events"
                      >
                        Event&apos;s
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="navLinks_nav text-[#000] hover:bg-transparent hover:text-black"
                        href="#contact"
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
                <Image
                  width={75}
                  height={50}
                  src={image ? image : defaultlogo}
                  className="laptop_logo"
                  alt="Logo"
                />
              </div>
              <div className="navbar-center ">
                <Image
                  width={75}
                  height={50}
                  className="phoneLogo"
                  src={image ? image : defaultlogo}
                  alt="Logo"
                />
                <ul className="menu menu-horizontal px-1 hidden lg:flex">
                  <li>
                    <Link
                      className="navLinks_nav text-[#000] hover:bg-transparent  hover:text-black"
                      href="#"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="navLinks_nav text-[#000] hover:bg-transparent hover:text-black"
                      href="#about"
                    >
                      About
                    </Link>
                  </li>
                  {user ? (
                    <li>
                      <Link
                        className="navLinks_nav text-[#000] hover:bg-transparent hover:text-black"
                        href="#live"
                      >
                        Live Images
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}
                  <li>
                    <Link
                      className="navLinks_nav text-[#000] hover:bg-transparent hover:text-black"
                      href="#services"
                    >
                      Service&apos;s
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="navLinks_nav text-[#000] hover:bg-transparent hover:text-black"
                      href="#recent"
                    >
                      Recent Work&apos;s
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="navLinks_nav text-[#000] hover:bg-transparent hover:text-black"
                      href="#portfolio"
                    >
                      Portfolio&apos;s
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="navLinks_nav text-[#000] hover:bg-transparent hover:text-black"
                      href="#review"
                    >
                      Client&apos;s Word&apos;s
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="navLinks_nav text-[#000] hover:bg-transparent hover:text-black"
                      href="#events"
                    >
                      Event&apos;s
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="navLinks_nav text-[#000] hover:bg-transparent hover:text-black"
                      href="#contact"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="navbar-end ">
                <Link className="mx-5 accent hidden sm:block" href="#">
                  <FaFacebookF />
                </Link>
                <Link className="mx-5 accent hidden sm:block" href="#">
                  <FaTwitter />
                </Link>
                <Link className="mx-5 accent hidden sm:block" href="#">
                  <FaYoutube />
                </Link>
                <div>
                  {user ? (
                    <Link href="/dashboard">
                      <Image
                        src={photoURL}
                        className="rounded-full"
                        width={50}
                        height={50}
                        alt=""
                        title={displayName}
                      />
                    </Link>
                  ) : (
                    <Link href="/dashboard">
                      <FaTh className="accent" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavBar;
