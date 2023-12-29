import useAuth from "@/Hooks/useAuth";
import useDynamicGet from "@/app/utills/useDynamicGet";
import Image from "next/image";
import React, { useEffect } from "react";
import Slider from "react-slick";
import PhotoFrameVertical from "../../PhotoFrameVertical";
import "@/app/responsive.css";
const UserAddmembers = () => {
  const { user } = useAuth();

  const {
    data: AllMembers,
    isLoading,
    refetch,
  } = useDynamicGet("getmembers", user?.email);

  useEffect(() => {
    if (user?.email) {
      refetch();
    }
  }, [user?.email, refetch]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  return (
    <section className="my-12">
      {AllMembers?.length > 0 ? (
        <div>
          <h1 className="my-5 text-center bg-black text-white p-5">
            Your uploaded Portfolios from dashboard
          </h1>
          <div className="memberCaro">
            <Slider {...settings}>
              {AllMembers?.map(
                ({
                  _id,
                  memberImage,
                  name,
                  designation,
                  description,
                  memberClicks,
                }) => (
                  <>
                    <div key={_id} className="lg:flex">
                      <div className="mx-2">
                        <PhotoFrameVertical
                          imageUrl={memberImage}
                          altText={memberImage}
                        />
                      </div>
                      <div className="ms-5 flex flex-col justify-around">
                        <div className="">
                          <h2 className="text-xl capitalize">{name}</h2>
                          <h5>{designation}</h5>
                        </div>
                        <p>{description}</p>
                        <p className="text-xs">some of his best click</p>
                        <div className="flex gap-5">
                          {memberClicks?.map((c) => (
                            <Image
                              key={_id}
                              src={c}
                              width={200}
                              height={148}
                              alt="clicks"
                              className="best_click"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )
              )}
            </Slider>
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default UserAddmembers;
