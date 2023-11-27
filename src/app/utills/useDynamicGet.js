// import { useQuery } from "@tanstack/react-query";

// const useDynamicGet = (endpoint, email) => {
//   const { isLoading, data, refetch } = useQuery({
//     queryKey: [endpoint, email], // Use the endpoint as the key
//     queryFn: async () => {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_MAIN_API}/${endpoint}/${email}`
//       );
//       const data = await res.json();
//       return data;
//     },

//   });

//   return { data, isLoading, refetch };
// };

// export default useDynamicGet;
// useDynamicGet.js

// useDynamicGet.js

import { useQuery } from "@tanstack/react-query";

const useDynamicGet = (endpoint, email) => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: [endpoint, email],
    queryFn: async () => {
      const token = localStorage.getItem("UTHENTICATED_Erorr");
      console.log(token, "token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MAIN_API}/${endpoint}/${email}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      return data;
    },
    enabled: false, // Initially set to false
    staleTime: 60000, // Cache data for 60 seconds
  });

  return { data, isLoading, refetch };
};

export default useDynamicGet;
