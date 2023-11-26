"use client";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import useAuth from "@/Hooks/useAuth";
import useDynamicGet from "@/app/utills/useDynamicGet";
import logoUpdateImg from "../../../../public/images/updateLogo.png";
import Image from "next/image";
import toast from "react-hot-toast";
import "../../../app/responsive.css";
import {
  FaFacebookF,
  FaTh,
  FaTrash,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import Link from "next/link";
const ImageApi = process.env.NEXT_PUBLIC_IMAGE_API;

const LogoChange = () => {
  const imageURLPer = `https://api.imgbb.com/1/upload?key=${ImageApi}`;
  const { user } = useAuth();
  const [Loading, setLoading] = useState(false);

  const {
    data: Logos,
    isLoading,
    refetch,
  } = useDynamicGet("getLogos", user?.email);
  console.log(Logos, "hello");

  const [logo = {}] = Logos || [];
  const { image } = logo;

  useEffect(() => {
    if (user?.email) {
      refetch();
    }
  }, [user?.email, refetch]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(imageURLPer, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((Img) => {
        if (Img.success) {
          const imgLink = Img.data.display_url;
          const updateInfo = {
            email: user?.email,
            image: imgLink,
            time: new Date(),
          };
          fetch(`${process.env.NEXT_PUBLIC_MAIN_API}/logos`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(updateInfo),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("response data", data);
              refetch();
              reset();
              toast("Your Logo Updated");
              // window.location.reload();
              setLoading(false);
            });
        }
      });

    console.log(data);
  };

  // const handleImageDelete = (id) => {
  //   const procced = confirm("are you sure to delete this?");
  //   if (procced) {
  //     fetch(`${process.env.NEXT_PUBLIC_MAIN_API}/deletelogos/${id}`, {
  //       method: "DELETE",
  //     })
  //       .then((res) => res.json())
  //       .then((result) => {
  //         if (result.deletedCount > 0) {
  //           toast("Deleted image successfully");
  //           refetch();
  //         }
  //       });
  //   }
  // };
  return (
    <section className="bg-black my-5 p-5 rounded-md border">
      <h1 className="text-3xl capitalize titlePopins">
        1. You can change your site logo
      </h1>
      <div className="my-5 text-center py-5">
        <h2 className="mb-5">See how it will looks after change the logo</h2>
        <div className="border-b border-red-900 w-full z-1 backdrop-blur-md bg-white text-black">
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
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a>Item 1</a>
                  </li>
                  <li>
                    <a>Parent</a>
                    <ul className="p-2">
                      <li>
                        <a>Submenu 1</a>
                      </li>
                      <li>
                        <a>Submenu 2</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a>Item 3</a>
                  </li>
                </ul>
              </div>
              {isLoading ? (
                <div
                  className="
                            h-[10px]
                            flex 
                            flex-col 
                            justify-center 
                            items-center"
                >
                  <BeatLoader size={10} color="#ffffff" />
                </div>
              ) : (
                <Image
                  src={image ? image : logoUpdateImg}
                  width={100}
                  height={100}
                  alt="logo"
                />
              )}
            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <a>Item 1</a>
                </li>
                <li tabIndex={0}>
                  <details>
                    <summary>Parent</summary>
                    <ul className="p-2">
                      <li>
                        <a>Submenu 1</a>
                      </li>
                      <li>
                        <a>Submenu 2</a>
                      </li>
                    </ul>
                  </details>
                </li>
                <li>
                  <a>Item 3</a>
                </li>
              </ul>
            </div>
            <div className="navbar-end">
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
                  <Link href="#">
                    <Image
                      src={user?.photoURL}
                      className="rounded-full"
                      width={40}
                      height={40}
                      alt=""
                      title={user?.displayName}
                    />
                  </Link>
                ) : (
                  <Link href="#">
                    <FaTh className="accent" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-3">
        <div className=" my-3 p-3 w-[100%] text-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="file"
              className="block text-xs border text-white mt-5 mx-auto"
              required
              multiple
              {...register("image", { required: true })}
            />
            {/* errors will return when field validation fails */}
            {errors.exampleRequired && <span>This field is required</span>}

            <div className="mt-2">
              <button
                type="submit"
                className="btn btn-wide bg-white border-0 text-black mt-5 hover:bg-white"
              >
                {Loading ? (
                  <div
                    className="
                            h-[10px]
                            flex 
                            flex-col 
                            justify-center 
                            items-center"
                  >
                    <BeatLoader size={10} color="#000" />
                  </div>
                ) : (
                  "Add Logo"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* <div className=" w-[100%]">
          <div className="">
            Your Previous uploaded Logo.
            {isLoading ? (
              <div
                className="
                            h-[10px]
                            flex 
                            flex-col 
                            justify-center 
                            items-center"
              >
                <BeatLoader size={10} color="#ffffff" />
              </div>
            ) : (
              <div className="grid grid-cols-5 items-center gap-5 mt-5">
                {Logos?.map(({ image, _id, email, time }) => (
                  <div
                    className="text-center relative bg-gray-900 p-3"
                    key={_id}
                  >
                    <div>
                      <Image
                        style={{
                          maxWidth: "150px",
                          maxHeight: "150px",
                          margin: "20px auto",
                          objectFit: "cover",
                        }}
                        src={image}
                        width={150}
                        height={150}
                        alt="images"
                      />
                    </div>

                    <p className="text-sm">
                      Uploaded at: <br />
                      {time &&
                        new Date(time).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                          timeZone: "Asia/Dhaka", // Set to Bangladesh time
                        })}
                    </p>
                    <button
                      onClick={() => handleImageDelete(_id)}
                      className="absolute top-7 right-2 z-50 bg-black p-3"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default LogoChange;
