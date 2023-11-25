"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import localFont from "next/font/local";
import Link from "next/link";
import Button from "../../Button/Button";
import "../../../../app/responsive.css";
const moonFont = localFont({
  src: "../../../../app/my-fonts/Moonrising.otf",
});
const ethFont = localFont({
  src: "../../../../app/my-fonts/ethnocentric-rg.otf",
});

const StaticPhoto = () => {
  const [staticImages, setStaticImages] = useState([]);

  useEffect(() => {
    fetch("service.json")
      .then((res) => res.json())
      .then((data) => setStaticImages(data));
  }, []);

  return (
    <section className="lg:my-5">
      <div className="grid grid-cols-2 gap-5 gridSections">
        {staticImages?.length > 0 ? (
          staticImages?.map(({ id, title, description, image }, index) => (
            <div key={id} className="flex items-center photographycontent">
              {index % 2 === 0 ? (
                <>
                  <div className="flex-grow items-center text-end me-5">
                    <h1
                      className={`${moonFont.className} text-lg photoheading`}
                    >
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
                    className="photographyImage"
                  />
                  <div className="flex-grow ms-5">
                    <h1
                      className={`${moonFont.className} text-lg photoheading`}
                    >
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
        ) : (
          <p>No services available.</p>
        )}
      </div>
    </section>
  );
};

export default StaticPhoto;
