const createJWT = async (payload) => {
  const res = await fetch("/api/auth", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return data;
};

export default createJWT;
