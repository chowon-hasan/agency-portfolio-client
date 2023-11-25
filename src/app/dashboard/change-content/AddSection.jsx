"use client";
import useAuth from "@/Hooks/useAuth";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaInfoCircle, FaTrash } from "react-icons/fa";
import CreatableSelect from "react-select/creatable";
import { BeatLoader } from "react-spinners";
import layout1 from "public/images/layout1.png";
import layout2 from "public/images/layout2.png";
import toast from "react-hot-toast";
import useDynamicGet from "@/app/utills/useDynamicGet";
import Layout1 from "./Layout1";
import Layout2 from "./Layout2";
import "../../../app/responsive.css";

const options = [
  { value: "Layout 1", label: "Layout 1" },
  { value: "Layout 2", label: "Layout 2" },
];

const ImageApi = process.env.NEXT_PUBLIC_IMAGE_API;

const AddSection = () => {
  const imageURLPer = `https://api.imgbb.com/1/upload?key=${ImageApi}`;
  const { user } = useAuth();
  const [Loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState();

  const {
    data: AddSection,
    isLoading,
    refetch,
  } = useDynamicGet("getusersection", user?.email);

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
            heading: data.heading,
            title: data.title,
            subheading: data.subheading,
            buttonlink: data.buttonlink,
            description: data.description,
            image: imgLink,
            layout: selectedOption.value,
            time: new Date(),
          };
          fetch(`${process.env.NEXT_PUBLIC_MAIN_API}/addsection`, {
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
              toast("successfully added you section.");
              // window.location.reload();
              setLoading(false);
            });
        }
      });

    console.log(data);
  };

  const handleImageDelete = (id) => {
    console.log(id);
    const procced = confirm("are you sure to delete this?");
    if (procced) {
      fetch(`${process.env.NEXT_PUBLIC_MAIN_API}/deletesection/${id}`, {
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
      <h1 className="text-3xl capitalize titlePopins">8. Add section</h1>

      <div className="my-3">
        <div className=" my-3 p-3 w-[100%] text-center">
          <h2 className="text-2xl titleFont">
            You can add a section in your webpage under your featured section.
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              required
              type="text"
              placeholder="Section Heading. Max two words."
              className="block w-full  my-5 p-2 bg-transparent text-white border border-white"
              {...register("heading", { required: true })}
            />
            <input
              required
              type="text"
              placeholder="Sub Heading. Max ten words."
              className="block w-full  my-5 p-2 bg-transparent text-white border border-white"
              {...register("subheading", { required: true })}
            />
            <input
              required
              type="text"
              placeholder="Add your content Title"
              className="block w-full  my-5 p-2 bg-transparent text-white border border-white"
              {...register("title", { required: true })}
            />
            <textarea
              required
              placeholder="Paragraph"
              className="block w-full  my-5 p-2 bg-transparent text-white border border-white"
              {...register("description", { required: true })}
            />
            <div className="mt-12 mb-5">
              <div className="flex justify-center items-center gap-5">
                <div className="">
                  <p>Layout 1</p>
                  <Image src={layout1} width={400} height={300} alt="" />
                </div>
                <div className="">
                  <p>Layout 2</p>
                  <Image src={layout2} width={400} height={300} alt="" />
                </div>
              </div>
              <h2 className="text-2xl mt-5">Select Layout</h2>
            </div>
            <CreatableSelect
              required
              className="block w-full p-2 bg-white text-black"
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
            <div className="border mt-5">
              <p className="mt-5">Add your Images</p>
              <input
                type="file"
                className="text-xs border text-white mt-5 mb-8 mx-auto"
                required
                {...register("image", { required: true })}
              />
            </div>
            <input
              required
              type="text"
              placeholder="Paste your button Link here"
              className="block w-full  my-5 p-2 bg-transparent text-white border border-white"
              {...register("buttonlink", { required: true })}
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
                  "Add Section"
                )}
              </button>
            </div>
          </form>
        </div>

        <div className=" w-[100%]">
          <div className="">
            Preview Your Section.
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
              <>
                {AddSection?.map((section) => (
                  <div key={section._id} className="">
                    {section.layout == "Layout 1" ? (
                      <div className="relative">
                        <Layout1
                          key={section._id}
                          image={section?.image}
                          heading={section.heading}
                          subheading={section.subheading}
                          buttonLink={section.buttonlink}
                          description={section.description}
                        />
                        <button
                          onClick={() => handleImageDelete(section._id)}
                          className="absolute top-0 right-0 z-50 bg-black p-3"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                    {section.layout == "Layout 2" ? (
                      <div className="relative">
                        <Layout2
                          key={section._id}
                          image={section?.image}
                          heading={section.heading}
                          subheading={section.subheading}
                          buttonLink={section.buttonlink}
                          description={section.description}
                        />
                        <button
                          onClick={() => handleImageDelete(section._id)}
                          className="absolute top-0 right-0 z-50 bg-black p-3"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </>
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

export default AddSection;

// section.layout == "Layout 2" ? (
//     <Layout1
//       key={section._id}
//       image={section?.image}
//       heading={section.heading}
//       subheading={section.subheading}
//       buttonLink={section.buttonlink}
//       description={section.description}
//     />
//   ) : (
//     <Layout2
//       key={section._id}
//       image={section?.image}
//       heading={section.heading}
//       subheading={section.subheading}
//       buttonLink={section.buttonlink}
//       description={section.description}
//     />
//   )
