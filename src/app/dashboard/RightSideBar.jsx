"use client";
import React, { useEffect, useState } from "react";
import useDynamicGet from "../utills/useDynamicGet";
import useAuth from "@/Hooks/useAuth";
import { BeatLoader } from "react-spinners";
import Image from "next/image";
import { Chart } from "react-google-charts";

const RightSideBar = () => {
  const { user } = useAuth();
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

  const data = [
    ["Task", "Hours per Day"],
    ["Site Health", 11],
    ["Visitors", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];

  const options = {
    title: "Site Activities",
    is3D: true,
  };
  return (
    <section className="border border-white backdrop-blur-sm bg-gray/30 p-5 rounded-md">
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
        <>
          <div className="text-center">
            <div className="">
              <Image
                src={image}
                style={{
                  margin: "auto",
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
            <div className="">
              <Chart
                className="custom_chart"
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default RightSideBar;
