"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import useAuth from "@/Hooks/useAuth";
import toast from "react-hot-toast";
import useDynamicGet from "@/app/utills/useDynamicGet";
import { BeatLoader } from "react-spinners";
import Image from "next/image";
import "../../../app/responsive.css";
import localFont from "next/font/local";
import { FaTrash } from "react-icons/fa";
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

  const [Images = {}] = featuredImages || [];
  const { image, _id, email } = Images;
  console.log(Images);

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
              toast("Succesfully added your day");
              setLoading(false);
            });
        }
      });

    console.log(data);
  };

  const handleImageDelete = (id) => {
    const procced = confirm("are you sure to delete this?");
    if (procced) {
      fetch(`${process.env.NEXT_PUBLIC_MAIN_API}/deleteimage/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.deletedCount > 0) {
            toast("Deleted image successfully");
            refetch();
          }
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
            <div className="grid grid-cols-3 items-center gap-5 gridSections5">
              {featuredImages?.map((image, id) => (
                <div
                  className="text-center relative bg-white p-5 text-black dayImgCont"
                  key={id}
                >
                  <div>
                    <Image
                      className="dayImg"
                      style={{
                        maxWidth: "200px",
                        maxHeight: "150px",
                        objectFit: "cover",
                      }}
                      src={image.image}
                      width={300}
                      height={300}
                      alt="images"
                    />
                  </div>

                  <p className="text-sm">
                    Uploaded at: <br />
                    {image?.time &&
                      new Date(image.time).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        timeZone: "Asia/Dhaka", // Set to Bangladesh time
                      })}
                  </p>
                  <div className="">
                    <button
                      onClick={() => handleImageDelete(image?._id)}
                      className="absolute top-0 right-0 z-50 bg-black p-3"
                    >
                      <FaTrash className="text-white" />
                    </button>
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
