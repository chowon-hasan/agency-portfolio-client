"use client";
import useAuth from "@/Hooks/useAuth";
import useDynamicGet from "@/app/utills/useDynamicGet";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import localFont from "next/font/local";
import "../../../app/responsive.css";
const ethFont = localFont({
  src: "../../../app/my-fonts/ethnocentric-rg.otf",
});
const moonFont = localFont({
  src: "../../../app/my-fonts/Moonrising.otf",
});

const ImageApi = process.env.NEXT_PUBLIC_IMAGE_API;

const MyProfileClient = () => {
  const imageURLPer = `https://api.imgbb.com/1/upload?key=${ImageApi}`;
  const { user } = useAuth();
  const [Loading, setLoading] = useState(false);

  const {
    data: UserInfo,
    isLoading,
    refetch,
  } = useDynamicGet("getuserinfo", user?.email);
  console.log(UserInfo, "hello");
  const [singleUser = {}] = UserInfo || [];
  const { name, image, _id, email, joinedDate } = singleUser;

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
            name: data.name,
            image: imgLink,
          };
          fetch(
            `${process.env.NEXT_PUBLIC_MAIN_API}/updateuserInfo/${user?.email}`,
            {
              method: "PATCH",
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
              toast("Your Profile Updated");
              // window.location.reload();
              setLoading(false);
            });
        }
      });

    console.log(data);
  };

  return (
    <div>
      <section
        style={{ height: "800px" }}
        className=" backdrop-blur-sm bg-gray/30 p-5 rounded-md"
      >
        <div className="">
          <h1
            className={`${ethFont.className} text-7xl text-white mt-5 text-center heading`}
          >
            Your profile
          </h1>
          <p className={`${moonFont.className} text-center mt-2 text-white `}>
            Customize your profile from here
          </p>
        </div>
        <div className="w-3/4 mx-auto py-12">
          <div className="">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="">
                <div className="">
                  <div className="flex justify-between items-center gridSections3">
                    <div className="">
                      <Image
                        src={image}
                        style={{
                          borderRadius: "50%",
                          border: "2px solid #fff",
                          width: "100px",
                          height: "100px",
                        }}
                        width={100}
                        height={100}
                        alt=""
                      />
                    </div>
                    <div className="my-3">
                      <h2 className="text-white">Change Display Picture</h2>
                      <input
                        className="block text-xs border text-white"
                        type="file"
                        required
                        {...register("image", { required: true })}
                      />
                    </div>
                  </div>
                </div>
                <div className="my-3">
                  <p className="text-sm text-white">
                    Full Name :{" "}
                    <span className="text-white capitalize">{name}</span>
                  </p>
                  <p className="text-white text-sm">
                    Logged Email : <span className="text-white">{email}</span>
                  </p>
                  <p className="text-sm text-white">
                    Joined Date :
                    <span className="text-lime-300 ms-3">
                      {new Date(joinedDate).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </p>
                </div>
              </div>

              {/* ----------------------------------------------------- */}

              <label className="text-white" htmlFor="name">
                Change Your Name
              </label>
              <input
                required
                defaultValue={name}
                placeholder="Type your new name"
                className="block w-full  my-5 p-2 bg-transparent text-white border border-white"
                {...register("name", { required: true })}
              />
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
                  "apply changes"
                )}
              </button>
            </form>
          </div>
        </div>
        {/* <div className="mt-5 text-center lg:hidden">
          <label
            htmlFor="my-drawer-2"
            className="btn bg-transparent border border-lime-300 drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div> */}
      </section>
      <Toaster />
    </div>
  );
};

export default MyProfileClient;
