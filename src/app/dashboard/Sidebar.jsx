"use client";
import Image from "next/image";
import React from "react";
import profile from "../../../public/images/profile.png";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import "./dashboard.css";
import useAuth from "@/Hooks/useAuth";
import toast from "react-hot-toast";
// import { useRouter } from "next/router";
import logo from "../../../public/images/Camera.png";
import {
  FaExchangeAlt,
  FaFileSignature,
  FaHashtag,
  FaHome,
  FaPowerOff,
  FaStar,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";

const Sidebar = () => {
  const { user, loading } = useAuth();
  console.log(user);
  const { logout } = useAuth();
  const pathname = usePathname();
  const { replace } = useRouter();
  const path = usePathname();

  const handleLogout = async () => {
    const procced = confirm("are you sure to delete this?");
    if (procced) {
      await logout();
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      const data = await res.json();
      toast.success("logout successful");
      if (path.includes("/dashboard")) {
        replace("/");
        // window.location.reload();
      }
    }
  };

  return (
    <section className="flex flex-col justify-between items-center mb-3 px-5 rounded-lg">
      <div className="flex justify-around items-center">
        <div className="mx-2">
          <nav>
            <ul>
              <li className="dashnav_li">
                <Link
                  className={`link ${
                    pathname === "/dashboard" ? "active" : "regular"
                  }`}
                  href="/dashboard"
                >
                  <FaHashtag className="icons_nav" />
                </Link>
                <p className="text-xs text-white">Dash</p>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mx-2">
          <nav>
            <ul>
              <li className="dashnav_li">
                <Link
                  className={`link ${
                    pathname === "/dashboard/myprofile" ? "active" : "regular"
                  }`}
                  href="/dashboard/myprofile"
                >
                  <FaUser className="icons_nav" />
                </Link>
                <p className="text-xs text-white">Profile</p>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mx-2">
          <nav>
            <ul>
              <li className="dashnav_li">
                <Link
                  className={`link ${
                    pathname === "/dashboard/featured" ? "active" : "regular"
                  }`}
                  href="/dashboard/featured"
                >
                  <FaStar className="icons_nav" />
                </Link>
                <p className="text-xs text-white">MyDay</p>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mx-2">
          <nav>
            <ul>
              <li className="dashnav_li">
                <Link
                  className={`link ${
                    pathname === "/dashboard/change-content"
                      ? "active"
                      : "regular"
                  }`}
                  href="/dashboard/change-content"
                >
                  <FaFileSignature className="icons_nav" />
                </Link>
                <p className="text-xs text-white">Content</p>
              </li>
            </ul>
          </nav>
        </div>

        {/* <div className="mx-2">
          <nav>
            <ul>
              <li className="dashnav_li">
                <Link
                  className={`link ${
                    pathname === "/dashboard/theme" ? "active" : "regular"
                  }`}
                  href="/dashboard/theme"
                >
                  <FaExchangeAlt className="icons_nav" />
                </Link>
                <p className="text-xs text-white">Theme</p>
              </li>
            </ul>
          </nav>
        </div> */}
        <div className="mx-2">
          <Link className="dashnav_li" href="/">
            <button>
              <FaHome className="icons_nav" />
            </button>
            <p className="text-xs text-white">Home</p>
          </Link>
        </div>
        <div className="mx-2">
          <button className="dashnav_li" onClick={handleLogout}>
            <FaPowerOff className="icons_nav" />
            <p className="text-xs text-white">LogOut</p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
