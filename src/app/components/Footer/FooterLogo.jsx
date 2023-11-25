"use client";
import useAuth from "@/Hooks/useAuth";
import defaultlogo from "public/images/Camera.png";
import useDynamicGet from "@/app/utills/useDynamicGet";
import Image from "next/image";
import React, { useEffect } from "react";

const FooterLogo = () => {
  const { user } = useAuth();
  const {
    data: Logos,
    isLoading,
    refetch,
  } = useDynamicGet("getLogos", user?.email);

  const [logo = {}] = Logos || [];
  const { image } = logo;

  useEffect(() => {
    if (user?.email) {
      refetch();
    }
  }, [user?.email, refetch]);
  return (
    <div>
      <Image
        width={100}
        height={100}
        src={image ? image : defaultlogo}
        alt="Logo"
      />
    </div>
  );
};

export default FooterLogo;
