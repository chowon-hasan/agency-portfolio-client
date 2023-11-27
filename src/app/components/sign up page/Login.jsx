"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import useAuth from "@/Hooks/useAuth";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import createJWT from "@/app/utills/createJWT";
import { BeatLoader } from "react-spinners";
// import { useRouter } from "next/router";
import hero4 from "../../../../public/images/hero-4.png";
import localFont from "next/font/local";
import "../../../app/responsive.css";

const ethFont = localFont({
  src: "../../../app/my-fonts/ethnocentric-rg.otf",
});

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { signIn, googleLogin } = useAuth();
  const search = useSearchParams();
  const from = search.get("redirectUrl") || "/";
  const { replace, push } = useRouter();
  const onSubmit = async (data) => {
    const { email, password } = data;
    const toastId = toast.loading("Loading...");
    try {
      const user = await signIn(email, password);
      await createJWT({ email });
      toast.dismiss(toastId);
      toast.success("signin user sucessfully");
      replace("/dashboard");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("user not sign in");
    }
  };

  const handleGooglePopUp = async () => {
    const toastId = toast.loading("Loading...");
    try {
      const { user } = await googleLogin();
      await createJWT({ email: user.email });
      const userInfo = {
        email: user?.email,
        name: user?.displayName,
        image: user?.photoURL,
        joinedDate: new Date(),
      };
      fetch(`${process.env.NEXT_PUBLIC_MAIN_API}/createuser`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          toast.dismiss(toastId);
          toast.success("signin user sucessfully");
          const loggedUser = { user: user?.email };
          fetch(`${process.env.NEXT_PUBLIC_MAIN_API}/jwt`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(loggedUser),
          })
            .then((res) => res.json())
            .then((jwtdata) => {
              console.log(jwtdata);
              localStorage.setItem("UTHENTICATED_Erorr", jwtdata.token);
              // replace(from);
              window.location.href = "/dashboard";
            });
        });
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("user not sign in");
      console.log(error);
    }
  };

  return (
    <section className="min-h-screen flex items-center log_section">
      <div className="container mx-auto">
        <div className="">
          <h1
            className={`${ethFont.className} text-7xl text-black mt-5 text-center heading`}
          >
            explore dashboard
          </h1>
          <div className="text-center">
            <Image
              src={hero4}
              className="mx-auto"
              width={200}
              height={200}
              alt=""
            />
            <div className="lg:w-1/2 px-3 mx-auto">
              <p className="my-5">
                Welcome to Agency portfolio. In this dynamic landing page built
                with Next.js and the MERN (MongoDB, Express.js, React, Node.js)
                stack, users can enjoy a seamless and interactive experience.
                The dashboard functionality serves as a central hub for users to
                manage and customize the content of their websites effortlessly.
              </p>
              <p>
                Through the dashboard, users gain the ability to modify various
                aspects of their landing page, such as text, images, and other
                dynamic elements, ensuring that the website stays current and
                aligned with their evolving needs.
              </p>
            </div>
          </div>
          <div className="">
            <div className="text-center my-5">
              <p>Lets join with me to explore the dynamic landing page.</p>
              <button
                onClick={handleGooglePopUp}
                className="btn border mt-5 text-white"
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
