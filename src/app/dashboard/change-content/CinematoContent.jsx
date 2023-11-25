"use client";
import useAuth from "@/Hooks/useAuth";
import useDynamicGet from "@/app/utills/useDynamicGet";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaInfoCircle, FaTrash } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import "../../../app/responsive.css";

const CinematoContent = () => {
  const { user } = useAuth();
  const [Loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const {
    data: cineVideos,
    isLoading,
    refetch,
  } = useDynamicGet("getcinevideos", user?.email);
  console.log(cineVideos);

  //   const [logo = {}] = Logos || [];
  //   const { image } = logo;

  useEffect(() => {
    if (user?.email) {
      refetch();
    }
  }, [user?.email, refetch]);

  const onSubmit = (data) => {
    setLoading(true);
    const updateInfo = {
      email: user?.email,
      link: data.link,
      time: new Date(),
    };

    fetch(`${process.env.NEXT_PUBLIC_MAIN_API}/addcinevideolink`, {
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
        toast("Uploaded Your Video successfully.");
        // window.location.reload();
        setLoading(false);
      });

    console.log(data);
  };

  const handleImageDelete = (id) => {
    const procced = confirm("are you sure to delete this?");
    if (procced) {
      fetch(`${process.env.NEXT_PUBLIC_MAIN_API}/deletevideolink/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.deletedCount > 0) {
            toast("Deleted Video successfully");
            refetch();
          }
        });
    }
  };
  return (
    <section className="bg-black my-16 p-5 rounded-md border">
      <h1 className="text-3xl capitalize titlePopins">
        3. Update your cinematography contents
      </h1>

      <div className="my-3">
        <div className=" my-3 p-3 w-[100%] text-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              required
              type="text"
              placeholder="Paste your video link"
              className="block w-full  my-5 p-2 bg-transparent text-white border border-white"
              {...register("link", { required: true })}
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
                  "Add Video"
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
              <div className="grid grid-cols-4 gap-5 mt-5 gridSections3">
                {cineVideos?.map(({ _id, email, time, link }) => (
                  <div
                    className=" relative bg-gray-900 p-3 serviceBody"
                    key={_id}
                  >
                    <div className="">
                      <div className="w-full">
                        <iframe
                          src={link}
                          title="YouTube video player"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
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
                ))}
              </div>
            )}
            <p className="mt-5 text-xs">
              <FaInfoCircle className="text-red-500" /> Important note
            </p>
            <p className="text-xs">
              For adding a video you have to paste here youtube embed video
              link.
            </p>
            <p className="text-xs">
              Youtube &gt; video &gt; share Link &gt; embed Link &gt; copy the
              url from iframe src and paste it here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematoContent;
