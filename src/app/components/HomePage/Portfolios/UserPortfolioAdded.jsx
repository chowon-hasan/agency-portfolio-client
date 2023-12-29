"use client";
import useAuth from "@/Hooks/useAuth";
import useDynamicGet from "@/app/utills/useDynamicGet";
import Image from "next/image";
import React, { useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import PhotoFrame from "../../PhotoFrame";
import "@/app/responsive.css";

const UserPortfolioAdded = () => {
  const { user } = useAuth();
  const {
    data: UserPortfolioImages,
    isLoading,
    refetch,
  } = useDynamicGet("getportfolioimages", user?.email);
  // console.log(
  //   UserPortfolioImages?.map((port) =>
  //     port.portfolio.map((c) => c.categoryName)
  //   )
  // );

  useEffect(() => {
    if (user?.email) {
      refetch();
    }
  }, [user?.email, refetch]);

  if (!Array.isArray(UserPortfolioImages)) {
    return null; // or handle the case when AddSection is not an array
  }
  return (
    <section>
      {UserPortfolioImages?.length > 0 ? (
        <div>
          <h1 className="my-5 text-center bg-black text-white p-5">
            Your uploaded Portfolios from dashboard
          </h1>
          <div className=" w-[100%]">
            <div className="">
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
                        className="gridSections2"
                      >
                        {cat.images.flat().map((image, index) => (
                          <div key={index} className="relative">
                            {isLoading ? (
                              <div className="h-[10px] flex flex-col justify-center items-center">
                                <BeatLoader size={10} color="#ffffff" />
                              </div>
                            ) : (
                              <div className="">
                                <PhotoFrame imageUrl={image} altText={image} />
                                {/* <Image
                                  src={image}
                                  style={{
                                    height: "250px",
                                    width: "100%",
                                    margin: "20px auto",
                                  }}
                                  alt={`Image ${index}`}
                                  width={1000}
                                  height={300}
                                  className="rounded-md"
                                /> */}
                                {/* <button
                                  onClick={() => handleImageDelete(image)}
                                  className=" bg-black p-3 absolute  top-0 right-0 z-50"
                                >
                                  <FaTrash />
                                </button> */}
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
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default UserPortfolioAdded;
