"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import useAuth from "@/Hooks/useAuth";
import toast from "react-hot-toast";
import useDynamicGet from "@/app/utills/useDynamicGet";
import { BeatLoader } from "react-spinners";
import Image from "next/image";
import "../../../app/responsive.css";
import localFont from "next/font/local";
import { FaTrash } from "react-icons/fa";
import uploadMyday from "@/Firebase/firebase.myday";
const ethFont = localFont({
  src: "../../../../src/app/my-fonts/ethnocentric-rg.otf",
});

const ImageApi = process.env.NEXT_PUBLIC_IMAGE_API;

const FeaturedImageAdd = () => {
  const imageURLPer = `https://api.imgbb.com/1/upload?key=${ImageApi}`;
  const { user } = useAuth();
  const [Loading, setLoading] = useState(false);

  const {
    data: featuredImages,
    isLoading,
    refetch,
  } = useDynamicGet("featuredimage", user?.email);

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

  const onSubmit = async (data) => {
    setLoading(true);
    const images = Array.from(data.image);
    try {
      const imageUrls = await Promise.all(images.map(uploadMyday));

      console.log(
        "Uploaded image URLs for portfolio:",
        imageUrls?.map((url) => url.downloadURL)
      );

      if (imageUrls) {
        const updateInfo = {
          email: user?.email,
          image: imageUrls?.map((url) => url.downloadURL),
          time: new Date(),
        };
        fetch(`${process.env.NEXT_PUBLIC_MAIN_API}/featureimage`, {
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
            toast("Uploaded your images successfully");
            setLoading(false);
          });
      }

      reset();
      setLoading(false);
    } catch (error) {
      console.error("Error uploading images:", error);
      setLoading(false);
    }
    console.log(data);
  };

  const handleImageDelete = (imgLink) => {
    console.log(imgLink);
    const procced = confirm("Are you sure you want to delete this?");
    if (procced) {
      const encodedImgLink = encodeURIComponent(imgLink);
      fetch(
        `${process.env.NEXT_PUBLIC_MAIN_API}/deleteimage/${encodedImgLink}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((result) => {
          if (result.success > 0) {
            toast("Deleted image successfully");
            refetch();
          }
        })
        .catch((error) => {
          console.error("Error deleting image:", error);
          toast("Error deleting image");
        });
    }
  };

  return (
    <section
      style={{ height: "800px" }}
      className=" backdrop-blur-sm bg-gray/30 p-5 rounded-md"
    >
      <div className="">
        <h1
          className={`${ethFont.className} text-7xl text-white mt-5 text-center heading`}
        >
          add your day
        </h1>
        <p className={`text-center mt-2 text-white`}>
          you can add you images as a day from here. this will show at the
          bottom of banner in main page.
        </p>
      </div>
      <div className="flex py-5 text-white gridSections4">
        <div className="w-full mx-auto flex justify-center items-center ">
          <div className="border p-5 rounded-md">
            Add your Images
            <div className="file_wrapper my-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="file"
                  name="image"
                  className="block text-xs border text-white"
                  required
                  multiple
                  {...register("image", { required: true })}
                />
                {/* errors will return when field validation fails */}
                {errors.exampleRequired && <span>This field is required</span>}

                <div className="file_names">
                  {Array.isArray(watch("exampleRequired")) &&
                    watch("exampleRequired").map((file, index) => (
                      <div key={index}>{file.name}</div>
                    ))}
                </div>
                <div className="mt-5 text-center">
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
                      "Add My Day"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div
          className="w-full mydayContainer"
          style={{ height: "400px", overflowY: "scroll", overflowX: "hidden" }}
        >
          Your featured images History
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
            <div className="">
              {featuredImages?.map((featField, _id) => (
                <div
                  className="text-center  bg-white p-5 text-black dayImgCont grid grid-cols-3 gap-5"
                  key={_id}
                >
                  {featField?.image.map((img, index) => (
                    <div key={index} className="relative">
                      <Image
                        className="dayImg"
                        style={{
                          maxWidth: "200px",
                          maxHeight: "150px",
                          objectFit: "cover",
                        }}
                        src={img}
                        width={300}
                        height={300}
                        alt="images"
                      />
                      <button
                        onClick={() => handleImageDelete(img)}
                        className="absolute top-0 right-5 z-50 bg-black p-3"
                      >
                        <FaTrash className="text-white" />
                      </button>
                    </div>
                  ))}

                  {/* <p className="text-sm">
                    Uploaded at: <br />
                    {featField?.time &&
                      new Date(featField.time).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        timeZone: "Asia/Dhaka", // Set to Bangladesh time
                      })}
                  </p> */}
                  <div className="">
                    {/* <button
                      onClick={() => handleImageDelete(featField?._id)}
                      className="absolute top-0 right-0 z-50 bg-black p-3"
                    >
                      <FaTrash className="text-white" />
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedImageAdd;
