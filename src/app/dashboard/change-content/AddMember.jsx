"use client";
import uploadImage3 from "@/Firebase/firebase.addmemberimage";
import uploadPortfolio from "@/Firebase/firebase.portfolioUpload";
import useAuth from "@/Hooks/useAuth";
import PhotoFrameVertical from "@/app/components/PhotoFrameVertical";
import useDynamicGet from "@/app/utills/useDynamicGet";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaInfoCircle, FaTrash } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
const ImageApi = process.env.NEXT_PUBLIC_IMAGE_API;
import "../../../app/responsive.css";

const AddMember = () => {
  const imageURLPer = `https://api.imgbb.com/1/upload?key=${ImageApi}`;
  const { user } = useAuth();
  const [Loading, setLoading] = useState(false);

  const {
    data: AllMembers,
    isLoading,
    refetch,
  } = useDynamicGet("getmembers", user?.email);
  console.log(AllMembers);

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
    const images = Array.from(data.memberClicks);
    const imageUrls = await Promise.all(images.map(uploadImage3));
    const formData = new FormData();
    formData.append("image", data.memberImage[0]);
    await fetch(imageURLPer, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((Img) => {
        console.log("ImgBB API Response:", Img);
        if (Img.success) {
          const imgLink = Img.data.display_url;
          const updateInfo = {
            email: user?.email,
            name: data.name,
            designation: data.designation,
            memberImage: imgLink,
            description: data.description,
            memberClicks: imageUrls,
            time: new Date(),
          };
          fetch(`${process.env.NEXT_PUBLIC_MAIN_API}/addussermemeber`, {
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
        } else {
          toast("not succes");
        }
      });

    console.log(data);
  };

  const handleImageDelete = (id) => {
    const procced = confirm("are you sure to delete this?");
    if (procced) {
      fetch(`${process.env.NEXT_PUBLIC_MAIN_API}/deletemembers/${id}`, {
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
      <h1 className="text-3xl capitalize titlePopins">6. Added New Members</h1>

      <div className="my-3">
        <div className=" my-3 p-3 w-[100%] text-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Add Member Image</h2>
            <input
              type="file"
              className="block text-md border text-white mt-5 mx-auto imageInput"
              required
              {...register("memberImage", { required: true })}
            />
            <input
              required
              type="text"
              placeholder="Name"
              className="block w-full  my-5 p-2 bg-transparent text-white border border-white"
              {...register("name", { required: true })}
            />
            <input
              required
              type="text"
              placeholder="Designation"
              className="block w-full  my-5 p-2 bg-transparent text-white border border-white"
              {...register("designation", { required: true })}
            />
            <textarea
              required
              placeholder="Description"
              className="block w-full  my-5 p-2 bg-transparent text-white border border-white"
              {...register("description", { required: true })}
            />
            <h2 className="text-start">Add Members work or activity Images.</h2>
            <input
              type="file"
              className="block text-xs border text-white mt-5 "
              required
              multiple
              {...register("memberClicks", { required: true })}
            />
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
                  "Add Members"
                )}
              </button>
            </div>
          </form>
        </div>

        <div className=" w-[100%]">
          <div className="">
            Your uploaded members.
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
              <div className="grid grid-cols-2 gap-5 mt-5 gridSections3">
                {AllMembers?.map(
                  ({
                    memberImage,
                    _id,
                    email,
                    time,
                    name,
                    description,
                    memberClicks,
                    designation,
                  }) => (
                    <div
                      className=" relative bg-gray-900 p-3 serviceBody"
                      key={_id}
                    >
                      <div className="flex items-center gap-5 gridSections3 ">
                        <div className="w-[60%]">
                          <PhotoFrameVertical
                            imageUrl={memberImage}
                            altText={memberImage}
                          />
                        </div>

                        <div className="text-strat w-[100%]">
                          <h2 className="capitalize text-2xl">
                            {name?.split(/\s+/).slice(0, 2).join(" ")}
                          </h2>
                          <p className="mb-2">
                            {designation?.split(/\s+/).slice(0, 2).join(" ")}
                          </p>
                          <p className="">
                            {description?.split(/\s+/).slice(0, 30).join(" ")}
                          </p>
                          <p className="text-xs my-3">
                            some of his best clicks
                          </p>
                          <div className="flex">
                            {memberClicks?.slice(0, 3).map((img, i) => (
                              <div key={i} className="">
                                <Image
                                  style={{
                                    maxWidth: "100px",
                                    maxHeight: "180px",
                                    margin: "20px auto",
                                    objectFit: "cover",
                                  }}
                                  src={img}
                                  width={100}
                                  height={180}
                                  alt="images"
                                />
                              </div>
                            ))}
                          </div>
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
              For Member Image vertical image would be great for UI. <br /> and
              members work images will show max 3 images.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddMember;
