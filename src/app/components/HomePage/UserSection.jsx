"use client";
import React, { useEffect } from "react";
import useAuth from "@/Hooks/useAuth";
import useDynamicGet from "@/app/utills/useDynamicGet";
import Layout2 from "@/app/dashboard/change-content/Layout2";
import SectionLay1home from "./SectionLay1home";
import SectionLay2Home from "./SectionLay2Home";

const UserSection = () => {
  const { user } = useAuth();

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

  if (!Array.isArray(AddSection)) {
    return null; // or handle the case when AddSection is not an array
  }
  return (
    <div className="">
      {AddSection?.map((section) => (
        <div key={section._id} className="">
          {section.layout == "Layout 1" ? (
            <div className="relative">
              <SectionLay1home
                key={section._id}
                image={section?.image}
                heading={section.heading}
                subheading={section.subheading}
                buttonLink={section.buttonlink}
                description={section.description}
                title={section.title}
              />
            </div>
          ) : (
            ""
          )}
          {section.layout == "Layout 2" ? (
            <div className="relative">
              <SectionLay2Home
                key={section._id}
                image={section?.image}
                heading={section.heading}
                subheading={section.subheading}
                buttonLink={section.buttonlink}
                description={section.description}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
};

export default UserSection;
