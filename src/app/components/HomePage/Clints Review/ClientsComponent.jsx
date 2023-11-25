"use client";
import useAuth from "@/Hooks/useAuth";
import useGetMethod from "@/app/utills/useGetMethod";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import Slider from "react-slick";
import { BeatLoader } from "react-spinners";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../../app/responsive.css";

const ImageApi = process.env.NEXT_PUBLIC_IMAGE_API;

const ClientsComponent = () => {
  const imageURLPer = `https://api.imgbb.com/1/upload?key=${ImageApi}`;
  const { user, googleLogin } = useAuth();
  //   const [clientsReviewDummy, setClientsrevew] = useState();
  const [Loading, setLoading] = useState(false);
  const [inputShow, setInputShow] = useState(false);

  const {
    data: ClientsReviews,
    isLoading,
    refetch,
  } = useGetMethod("clientsreviews");
  //   console.log(data, "from getMethod");

  //   useEffect(() => {
  //     fetch(`${process.env.NEXT_PUBLIC_MAIN_API}/clientsreviews`)
  //       .then((res) => res.json())
  //       .then((data) => setClientsrevew(data));
  //   }, []);

  const handleComment = () => {
    setInputShow(!inputShow);
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data.image);
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
            clientImage: imgLink,
            description: data.description,
            name: data.name,
            phoneNumber: data.number,
            review: data.review,
            time: new Date(),
          };
          fetch(`${process.env.NEXT_PUBLIC_MAIN_API}/adduserreview`, {
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
              toast("Your review submited");
              // window.location.reload();
              setLoading(false);
            });
        }
      });
  };

  const settings = {
    className: "center",
    centerMode: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
          centerMode: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          fade: true,
          marginLeft: "30px ",
          arrow: false,
        },
      },
    ],
  };

  return (
    <section>
      <div className="container mx-auto">
        <div className="sliderBox">
          <Slider {...settings} className="reviewSlider">
            {ClientsReviews?.map(
              ({
                _id,
                clientImage,
                email,
                website,
                companyLogo,
                phoneNumber,
                name,
                review,
                description,
                socialLinks,
                time,
              }) => (
                <div key={_id} className="lg:p-5 text-white">
                  <div className="border review_card">
                    <div className="border p-3 flex justify-between items-center">
                      <div className="">
                        <p className="text-white text-center my">
                          {time &&
                            new Date(time).toLocaleString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              month: "short",
                              day: "numeric",
                              timeZone: "Asia/Dhaka", // Set to Bangladesh time
                            })}
                        </p>
                      </div>
                      <div className="flex gap-5">
                        <FaFacebook />
                        <FaLinkedin />
                      </div>
                    </div>
                    <div className="flex items-center p-5">
                      <Image
                        className="rounded-full border-2 border-lime-500"
                        src={clientImage}
                        width={60}
                        height={60}
                        alt=""
                      />
                      <div className=" ms-3">
                        <p className="text-white">{name}</p>
                        <span>{review} out of 5</span>
                      </div>
                    </div>
                    <div className="pb-5 px-5">
                      <p className="text-white">{description}</p>
                    </div>
                    <div className="border text-xs flex justify-between items-center p-5">
                      <p>{phoneNumber}</p>
                      <p>{email}</p>
                    </div>
                  </div>
                </div>
              )
            )}
          </Slider>
        </div>

        <div className="my-5 text-center">
          {user ? (
            <button
              onClick={handleComment}
              className="bg-white border text-black py-3 px-5"
            >
              Give a review
            </button>
          ) : (
            <Link href="/login">
              <button className="btn bg-white border text-black">
                Give a review
              </button>
            </Link>
          )}

          <div className={`my-12 ${inputShow ? "" : "hidden"}`}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="text-white">Select you image</p>
              <input
                type="file"
                className="block inputReview text-xs border text-white mt-5 mx-auto"
                required
                multiple
                {...register("image", { required: true })}
              />
              <input
                type="name"
                placeholder="Write your name"
                className="block inputReview text-md border text-black mt-5 mx-auto lg:w-1/2 p-3 bg-white"
                required
                {...register("name", { required: true })}
              />
              <input
                type="email"
                placeholder="write your email"
                required
                className="block inputReview text-md border text-black mt-5 mx-auto lg:w-1/2 p-3 bg-white"
                {...register("email", { required: true })}
              />
              <input
                type="number"
                required
                placeholder="Type your number"
                className="block inputReview text-md border text-black mt-5 mx-auto lg:w-1/2 p-3 bg-white"
                {...register("number", { required: true })}
              />
              <input
                type="number"
                required
                placeholder="review us out of 5"
                min={0}
                max={5}
                className="block inputReview text-md border text-black mt-5 mx-auto lg:w-1/2 p-3 bg-white"
                {...register("review", { required: true })}
              />
              <textarea
                type="text"
                required
                placeholder="write your experience with us"
                className="block inputReview text-md border text-black mt-5 mx-auto lg:w-1/2 p-3 bg-white"
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
                    "Submit Review"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsComponent;
