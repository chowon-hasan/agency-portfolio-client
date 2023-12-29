"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import localFont from "next/font/local";
import Link from "next/link";
import { BeatLoader } from "react-spinners";
import useDynamicGet from "@/app/utills/useDynamicGet";
import useAuth from "@/Hooks/useAuth";
import Button from "../../Button/Button";
import "@/app/responsive.css";

const moonFont = localFont({
  src: "../../../../app/my-fonts/Moonrising.otf",
});
const ethFont = localFont({
  src: "../../../../app/my-fonts/ethnocentric-rg.otf",
});

const PhotoCard = () => {
  const { user } = useAuth();
  const {
    data: photoService,
    isLoading,
    refetch,
  } = useDynamicGet("getphotoservice", user?.email);

  //   const [logo = {}] = Logos || [];
  //   const { image } = logo;

  useEffect(() => {
    if (user?.email) {
      refetch();
    }
  }, [user?.email, refetch]);

  return (
    <section>
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
        <div className="grid grid-cols-2 gap-5 gridSections">
          {photoService?.length > 0
            ? photoService?.map(({ _id, title, description, image }, index) => (
                <div key={_id} className="flex items-center">
                  {index % 2 === 0 ? (
                    <>
                      <div className="flex-grow items-center text-end me-5">
                        <h1 className={`${moonFont.className} text-lg`}>
                          {title?.split(/\s+/).slice(0, 2).join(" ")}
                        </h1>
                        <p className="my-2">
                          {" "}
                          {description?.split(/\s+/).slice(0, 30).join(" ")}
                        </p>
                        <div className="flex justify-end">
                          <Button />
                        </div>
                      </div>
                      <Image
                        src={image}
                        width={200}
                        height={200}
                        style={{ width: "200px", height: "300px" }}
                        alt="Service image"
                        className="photographyImage"
                      />
                    </>
                  ) : (
                    <>
                      <Image
                        src={image}
                        width={200}
                        height={200}
                        style={{ width: "200px", height: "300px" }}
                        alt="Service image"
                      />
                      <div className="flex-grow ms-5">
                        <h1 className={`${moonFont.className} text-lg`}>
                          {title?.split(/\s+/).slice(0, 2).join(" ")}
                        </h1>
                        <p className="my-2">
                          {description?.split(/\s+/).slice(0, 30).join(" ")}
                        </p>
                        <Button />
                      </div>
                    </>
                  )}
                </div>
              ))
            : ""}
        </div>
      )}
    </section>
  );
};

export default PhotoCard;
