"use client";
import React, { useState } from "react";
import localFont from "next/font/local";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import useAuth from "@/Hooks/useAuth";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import Lottie from "lottie-react";
import lottieFileanimation from "/public/images/lottie.json";
import toast from "react-hot-toast";
import "../../../../app/responsive.css";

const ethFont = localFont({
  src: "../../../../app/my-fonts/ethnocentric-rg.otf",
});
const moonFont = localFont({
  src: "../../../../app/my-fonts/Moonrising.otf",
});
const Cta = () => {
  const { user } = useAuth();
  const [Loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const updateInfo = {
      email: data.email,
      name: data.name,
      number: data.number,
      message: data.message,
      time: new Date(),
    };

    fetch(`${process.env.NEXT_PUBLIC_MAIN_API}/sendemailtouser`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("response data from email sender opt", data);
        reset();
        toast("We are recieved your response. Thank you!");
        // window.location.reload();
        setLoading(false);
      });
    console.log(data);
  };
  return (
    <section className="lg:py-24 bg-white" id="contact">
      <div className="container mx-auto">
        <h1
          className={`${ethFont.className} text-7xl text-black text-center heading`}
        >
          Contact us
        </h1>
        <p
          className={`${moonFont.className} text-center mt-2 text-black subHead`}
        >
          call direct to our whats app
        </p>
        <div className="text-center">
          <div className="flex my-24 gridSections">
            <div className="w-full">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Get a qoute from us.</h2>
                <input
                  type="text"
                  className="block w-full  my-5 p-2 bg-transparent text-black border border-black"
                  placeholder="Your Name"
                  required
                  {...register("name", { required: true })}
                />
                <input
                  required
                  type="email"
                  placeholder="Enter Your Email"
                  className="block w-full  my-5 p-2 bg-transparent text-black border border-black"
                  {...register("email", { required: true })}
                />
                <input
                  required
                  type="number"
                  placeholder="Your phone number"
                  className="block w-full  my-5 p-2 bg-transparent text-black border border-black"
                  {...register("number", { required: true })}
                />
                <textarea
                  required
                  placeholder="Write what you want to know from us."
                  className="block w-full  my-5 p-2 bg-transparent text-black border border-black"
                  {...register("message", { required: true })}
                />
                {errors.exampleRequired && <span>This field is required</span>}
                <div className="mt-2">
                  <button
                    type="submit"
                    className="btn btn-wide bg-black border text-white mt-5 "
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
                        <BeatLoader size={10} color="#fff" />
                      </div>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </form>
            </div>
            <div className="w-full">
              <Lottie
                className="h-96"
                animationData={lottieFileanimation}
                loop={true}
              ></Lottie>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
