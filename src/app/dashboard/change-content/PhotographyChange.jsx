"use client";
import useAuth from "@/Hooks/useAuth";
import useDynamicGet from "@/app/utills/useDynamicGet";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import localFont from "next/font/local";
import { FaInfoCircle, FaTrash } from "react-icons/fa";
import "../../../app/responsive.css";

const ImageApi = process.env.NEXT_PUBLIC_IMAGE_API;

const ethFont = localFont({
  src: "../../../app/my-fonts/ethnocentric-rg.otf",
});

const PhotographyChange = () => {
  const imageURLPer = `https://api.imgbb.com/1/upload?key=${ImageApi}`;
  const { user } = useAuth();
  const [Loading, setLoading] = useState(false);

  const {
    data: photoService,
    isLoading,
    refetch,
  } = useDynamicGet("getphotoservice", user?.email);

  //   const [logo = {}] = Logos || [];
  //   const { image } = logo;

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
            title: data.title,
            description: data.description,
            image: imgLink,
            time: new Date(),
          };
          fetch(`${process.env.NEXT_PUBLIC_MAIN_API}/addservicephoto`, {
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
              toast("Uploaded Your service successfully.");
              // window.location.reload();
              setLoading(false);
            });
        }
      });

    console.log(data);
  };

  const handleImageDelete = (id) => {
    const procced = confirm("are you sure to delete this?");
    if (procced) {
      fetch(`${process.env.NEXT_PUBLIC_MAIN_API}/deletephotoservice/${id}`, {
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
    <section className="bg-black my-16 p-5 rounded-md border">
      <h1 className="text-3xl capitalize titlePopins">
        2. Upload your services
      </h1>

      <div className="my-3">
        <div className=" my-3 p-3 w-[100%] text-center">
          <h2 className="text-2xl titlePopins">Photography Section</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="file"
              className="block text-xs border text-white mt-5 mx-auto"
              required
              {...register("image", { required: true })}
            />
            <input
              required
              type="text"
              placeholder="Title"
              className="block w-full  my-5 p-2 bg-transparent text-white border border-white"
              {...register("title", { required: true })}
            />
            <textarea
              required
              placeholder="Description"
              className="block w-full  my-5 p-2 bg-transparent text-white border border-white"
              {...register("description", { required: true })}
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
                  "Publish Your Service"
                )}
              </button>
            </div>
          </form>
        </div>

        <div className=" w-[100%]">
          <div className="">
            Preview Your services.
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
              <div className="grid grid-cols-3 gap-5 mt-5 gridSections3">
                {photoService?.map(
                  ({ image, _id, email, time, title, description }) => (
                    <div
                      className=" relative bg-gray-900 p-3 serviceBody"
                      key={_id}
                    >
                      <div className="flex items-center gap-5">
                        <div>
                          <Image
                            style={{
                              maxWidth: "100px",
                              maxHeight: "180px",
                              margin: "20px auto",
                              objectFit: "cover",
                            }}
                            src={image}
                            width={100}
                            height={180}
                            alt="images"
                          />
                        </div>

                        <div className="text-strat">
                          <h2 className="capitalize">
                            {title?.split(/\s+/).slice(0, 2).join(" ")}
                          </h2>
                          <p className="text-xs">
                            {description?.split(/\s+/).slice(0, 30).join(" ")}
                          </p>
                          <button
                            className={`${ethFont.className} bg-white text-red-900 mt-5 py-3 px-2 text-xs mb-5`}
                          >
                            Call Us Today
                          </button>
                        </div>
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
                        className="absolute top-2 right-2 z-50 bg-black p-3"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )
                )}
              </div>
            )}
            <p className="mt-5 text-xs">
              <FaInfoCircle /> Word Limits
            </p>
            <p className="text-xs">
              Two words for title and max 30 words for description.
            </p>
            <p className="text-xs">
              For Image 200x300 would be great for Home UI.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotographyChange;
