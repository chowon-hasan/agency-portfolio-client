"use client";
import useAuth from "@/Hooks/useAuth";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uploadImage from "@/Firebase/firebase.imageupload";
import toast from "react-hot-toast";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import useDynamicGet from "@/app/utills/useDynamicGet";
import PhotoFrame from "@/app/components/PhotoFrame";
import "../../../app/responsive.css";

const AddRecentworks = () => {
  //   const [recentImages, setImages] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const { user } = useAuth();
  const [Loading, setLoading] = useState(false);

  const {
    data: RecentWorks,
    isLoading,
    refetch,
  } = useDynamicGet("getrecentworkimages", user?.email);
  console.log(RecentWorks);

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
      // Upload each image and get the download URL
      const imageUrls = await Promise.all(images.map(uploadImage));

      // Do something with the imageUrls, for example, log them
      console.log(
        "Uploaded image URLs:",
        imageUrls?.map((url) => url.downloadURL)
      );
      if (imageUrls) {
        const updateInfo = {
          user: user?.email,
          time: new Date(),
          images: imageUrls?.map((url) => url.downloadURL),
        };
        fetch(
          `${process.env.NEXT_PUBLIC_MAIN_API}/addrecentworkimages/${user?.email}`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(updateInfo),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log("response data", data);
            refetch();
            reset();
            toast("Uploaded your images successfully");
            // window.location.reload();
            setLoading(false);
          });
      }

      // Reset the form and loading state
      reset();
      setLoading(false);
    } catch (error) {
      console.error("Error uploading images:", error);
      setLoading(false);
    }
  };

  const handleImageDelete = (imglink) => {
    console.log(imglink);
    const procced = confirm("Are you sure you want to delete this?");
    if (procced) {
      fetch(
        `${
          process.env.NEXT_PUBLIC_MAIN_API
        }/deleterecentimage/${encodeURIComponent(imglink)}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            toast("Deleted image successfully");
            refetch();
          } else {
            toast("Failed to delete image");
          }
        })
        .catch((error) => {
          console.error("Error deleting image:", error);
          toast("Error deleting image");
        });
    }
  };

  return (
    <section className="bg-black my-5 p-5 rounded-md border">
      <h1 className="text-3xl capitalize titlePopins">
        4. Add images to your recent work gallary.
      </h1>
      <div className="text-center py-5">
        <h2 className="">
          You can choose multiple images for your recent works gallary
        </h2>
      </div>
      <div className="">
        <div className="p-3 w-[100%] text-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="file"
              name="image"
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
                  "Add Images"
                )}
              </button>
            </div>
          </form>
        </div>

        <div className=" w-[100%]">
          <div className="">
            History of your uploaded Images.
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
                {RecentWorks?.map(({ images, _id, user, time }) => (
                  <div className="text-center  bg-gray-900 p-3" key={_id}>
                    <div className="grid grid-cols-4 items-center gap-5 mt-5 gridSections3">
                      {images
                        .slice()
                        .reverse()
                        .map((img, index) => (
                          <div key={index} className=" relative">
                            <PhotoFrame imageUrl={img} altText={img} />
                            <button
                              onClick={() => handleImageDelete(img)}
                              className=" bg-black p-3 absolute  top-0 right-0 z-50"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddRecentworks;
