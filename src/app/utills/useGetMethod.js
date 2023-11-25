import { useQuery } from "@tanstack/react-query";

const useGetMethod = (endpoint) => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: [endpoint], // Use the endpoint as the key
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MAIN_API}/${endpoint}`
      );
      const data = await res.json();
      return data;
    },
  });

  return { data, isLoading, refetch };
};

export default useGetMethod;
