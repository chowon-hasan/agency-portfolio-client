"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./portfolio.css";
import useGetMethod from "@/app/utills/useGetMethod";
import { BeatLoader } from "react-spinners";
import PhotoFrame from "../../PhotoFrame";
import "../../../../app/responsive.css";

const PortfolioClient = () => {
  const [wedding, setWedding] = useState([]);
  const [portrait, setPortrait] = useState([]);
  const [event, setEvent] = useState([]);
  const [travel, setTravel] = useState([]);
  const [images, setImages] = useState([]);

  const {
    data: portfolioImages,
    isLoading,
    refetch,
  } = useGetMethod("myportfolio");
  console.log(portfolioImages, "hello");

  useEffect(() => {
    if (portfolioImages) {
      const weddingImages = portfolioImages.filter(
        (image) => image.category === "wedding"
      );
      const portraitImages = portfolioImages.filter(
        (image) => image.category === "portrait"
      );
      const travelImages = portfolioImages.filter(
        (image) => image.category === "travel"
      );
      const eventImages = portfolioImages.filter(
        (image) => image.category === "event"
      );

      setWedding(weddingImages);
      setPortrait(portraitImages);
      setTravel(travelImages);
      setEvent(eventImages);
      setImages(portfolioImages);
    }
  }, [portfolioImages]);

  return (
    <section className="lg:my-12">
      <h1 className="my-5 text-center bg-black text-white p-5">
        Deafault Portfolio showcase.
      </h1>
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
          <div className="">
            <Tabs>
              <TabList>
                <Tab>Wedding</Tab>
                <Tab>Travel</Tab>
                <Tab>Portrait</Tab>
                <Tab>Event</Tab>
              </TabList>

              <TabPanel
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "20px",
                }}
                className="gridSections2"
              >
                {wedding?.map(({ image, id }) => (
                  <>
                    <div key={id}>
                      <PhotoFrame imageUrl={image} altText={image} />
                    </div>
                  </>
                ))}
              </TabPanel>
              <TabPanel
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "20px",
                }}
                className="gridSections2"
              >
                {travel?.map(({ image, id }) => (
                  <>
                    <div key={id}>
                      <PhotoFrame imageUrl={image} altText={image} />
                    </div>
                  </>
                ))}
              </TabPanel>
              <TabPanel
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "20px",
                }}
                className="gridSections2"
              >
                {portrait?.map(({ image, id }) => (
                  <>
                    <div key={id}>
                      <PhotoFrame imageUrl={image} altText={image} />
                    </div>
                  </>
                ))}
              </TabPanel>
              <TabPanel
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "20px",
                }}
                className="gridSections2"
              >
                {event?.map(({ image, id }) => (
                  <>
                    <div key={id}>
                      <PhotoFrame imageUrl={image} altText={image} />
                    </div>
                  </>
                ))}
              </TabPanel>
            </Tabs>
          </div>
        </>
      )}
    </section>
  );
};

export default PortfolioClient;
