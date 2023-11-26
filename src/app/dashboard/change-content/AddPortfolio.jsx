"use client";
import useAuth from "@/Hooks/useAuth";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import toast from "react-hot-toast";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import useDynamicGet from "@/app/utills/useDynamicGet";
import Select from "react-select";
import uploadPortfolio from "@/Firebase/firebase.portfolioUpload";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "../../components/HomePage/Portfolios/portfolio.css";
import PhotoFrame from "@/app/components/PhotoFrame";
import "../../../app/responsive.css";
const options = [
  { value: "Wedding", label: "Wedding" },
  { value: "Event", label: "Event" },
  { value: "Landscape", label: "Landscape" },
  { value: "Food", label: "Food" },
  { value: "Product", label: "Product" },
  { value: "Portrait", label: "Portrait" },
  { value: "Travel", label: "Travel" },
];

const AddPortfolio = () => {
  const { user } = useAuth();
  const [selectedOption, setSelectedOption] = useState();
  const [Loading, setLoading] = useState(false);

  const {
    data: UserPortfolioImages,
    isLoading,
    refetch,
  } = useDynamicGet("getportfolioimages", user?.email);
  console.log(
    UserPortfolioImages?.map((port) =>
      port.portfolio.map((c) => c.categoryName)
    )
  );

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
      const imageUrls = await Promise.all(images.map(uploadPortfolio));

      console.log(
        "Uploaded image URLs for portfolio:",
        imageUrls?.map((url) => url.downloadURL)
      );
      if (imageUrls) {
        const updateInfo = {
          user: user?.email,
          category: selectedOption?.value,
          time: new Date(),
          images: imageUrls?.map((url) => url.downloadURL),
        };
        fetch(
          `${process.env.NEXT_PUBLIC_MAIN_API}/addportfolio/${user?.email}`,
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
            setLoading(false);
          });
      }

      reset();
      setLoading(false);
    } catch (error) {
      console.error("Error uploading images:", error);
      setLoading(false);
    }
  };

  const handleImageDelete = (imglink) => {
    const procced = confirm("Are you sure you want to delete this?");
    if (procced) {
      fetch(
        `${process.env.NEXT_PUBLIC_MAIN_API}/deleteportfolioimages/${user?.email}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: imglink }),
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
    <section className="bg-white text-black mt-16 p-5 rounded-md border">
      <h1 className="text-3xl capitalize titlePopins">
        5. Add images to your Portfolio gallery by category.
      </h1>

      <div className="">
        <div className="">
          <div className=" w-[100%]">
            <div className="capitalize">
              <h2 className="my-5">
                History of your uploaded portfolio Images.
              </h2>
              {isLoading ? (
                <div className="h-[10px] flex flex-col justify-center items-center">
                  <BeatLoader size={10} color="#ffffff" />
                </div>
              ) : (
                <Tabs>
                  <TabList>
                    {UserPortfolioImages?.map((p) =>
                      p.portfolio?.map((cat) => (
                        <Tab key={cat.categoryName}>{cat.categoryName}</Tab>
                      ))
                    )}
                  </TabList>

                  {UserPortfolioImages?.map((p) =>
                    p.portfolio?.map((cat) => (
                      <TabPanel
                        key={cat.categoryName}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(4, 1fr)",
                          gap: "20px",
                        }}
                        className="gridSections3 mt-5"
                      >
                        {cat.images.flat().map((image, index) => (
                          <div key={index} className="relative">
                            {isLoading ? (
                              <div className="h-[10px] flex flex-col justify-center items-center">
                                <BeatLoader size={10} color="#000" />
                              </div>
                            ) : (
                              <div className="">
                                <PhotoFrame imageUrl={image} altText={image} />
                                {/* <Image
                                  src={image}
                                  style={{
                                    maxHeight: "100px",
                                    width: "100%",
                                    margin: "20px auto",
                                  }}
                                  alt={`Image ${index}`}
                                  width={200}
                                  height={200}
                                  className="rounded-md"
                                /> */}
                                <button
                                  onClick={() => handleImageDelete(image)}
                                  className=" border p-3 absolute  top-0 right-0 z-50"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </TabPanel>
                    ))
                  )}
                </Tabs>
              )}
            </div>
          </div>

          <div className="p-3 lg:w-[50%] mx-auto text-center ">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="file"
                name="image"
                className="block text-xs border text-black mt-5 mx-auto"
                required
                multiple
                {...register("image", { required: true })}
              />
              <h2 className="my-5">Select category</h2>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                required
                options={options}
              />
              {errors.exampleRequired && <span>This field is required</span>}

              <div className="mt-2">
                <button
                  type="submit"
                  className="btn btn-wide bg-black border-0 text-white mt-5 hover:bg-black"
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
                    "Add Images"
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="text-center py-5">
            <h2 className="">
              You can choose multiple images for your recent works gallery
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddPortfolio;
