"use client";
import useAuth from "@/Hooks/useAuth";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import CreatableSelect from "react-select/creatable";
import toast from "react-hot-toast";
import useDynamicGet from "@/app/utills/useDynamicGet";
import { FaCamera, FaMapMarkerAlt } from "react-icons/fa";
import localFont from "next/font/local";
import "../../../app/components/HomePage/Events/events.css";
import "../../../app/responsive.css";

const options = [
  { value: "Photography", label: "Photography" },
  { value: "Cinematography", label: "Cinematography" },
  { value: "Event Mangement", label: "Event Mangement" },
];
const ethFont = localFont({
  src: "../../../app/my-fonts/ethnocentric-rg.otf",
});

const EventsDate = () => {
  const { user } = useAuth();
  const [Loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState();

  const {
    data: Eventsdate,
    isLoading,
    refetch,
  } = useDynamicGet("getuserevents", user?.email);
  console.log(Eventsdate);

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

  const SubmitEventsDate = (data) => {
    setLoading(true);
    const updateInfo = {
      email: user?.email,
      date: data.date,
      location: data.location,
      services: selectedOption?.map((service) => service.value),
      time: new Date(),
    };
    fetch(`${process.env.NEXT_PUBLIC_MAIN_API}/addusserevents`, {
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

    console.log(data);
  };

  return (
    <section className="bg-black my-16 p-5 rounded-md border">
      <h1 className="text-3xl capitalize titlePopins">
        7. Add your upcoming events date and place.
      </h1>

      <div className="my-3">
        <div className=" my-3 p-3 w-[100%] text-center">
          <form onSubmit={handleSubmit(SubmitEventsDate)}>
            <input
              type="date"
              className="block text-md border bg-transparent p-3 text-white mt-5 mx-auto w-full"
              required
              {...register("date", { required: true })}
            />
            <CreatableSelect
              required
              className="block w-full my-2 p-2 bg-white text-black"
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              isMulti
            />
            <input
              required
              type="text"
              placeholder="Location"
              className="block w-full  my-5 p-2 bg-transparent text-white border border-white"
              {...register("location", { required: true })}
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
                  "Add Events"
                )}
              </button>
            </div>
          </form>
        </div>
        <div>
          {isLoading ? (
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
            <div className="grid grid-cols-3 gap-5 gridSections3">
              {Eventsdate?.map(({ _id, date, services, location }) => (
                <>
                  <div key={_id} className="">
                    <div className="date_box">
                      <h2
                        className={`${ethFont.className} text-sm mb-5 text-white`}
                      >
                        {date &&
                          new Date(date).toLocaleString("en-US", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          })}
                      </h2>
                      <div className="text-center">
                        <div className="flex items-center">
                          <FaCamera className="me-5" />{" "}
                          {services.map((c) => (
                            <>
                              <div className="">
                                <p className="me-5">{c}</p>
                              </div>
                            </>
                          ))}
                        </div>
                        <h2 className="flex items-center">
                          <FaMapMarkerAlt className="me-5" /> {location}
                        </h2>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsDate;
