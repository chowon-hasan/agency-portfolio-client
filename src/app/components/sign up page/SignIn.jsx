// "use client";
// import React from "react";
// import logo from "../../../../public/images/Camera.png";
// import Image from "next/image";
// import { useForm } from "react-hook-form";
// import Link from "next/link";
// import { FaGoogle } from "react-icons/fa";
// import useAuth from "@/Hooks/useAuth";

// const SignIn = () => {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const { createUser, profileUpdate, loading } = useAuth();

//   const onSubmit = (data) => {
//     console.log(data);
//   };

//   return (
//     <section className="min-h-screen flex items-center sign_section">
//       <div className="container mx-auto">
//         <div className="flex items-center sign_cont">
//           <div className="w-1/2 sign_body">
//             <Image src={logo} width={200} height={200} alt="" />
//             <p className="text-sm mt-5">
//               Welcome to TechFusion, the innovative online platform that
//               combines the best of Stack Overflow`s knowledge-sharing prowess
//               with a touch of Facebook`s social interactivity. 🚀
//               <span className="font-bold">welcome to TechFusion!</span>
//             </p>
//           </div>
//           <div className="w-1/2 sign_body-2">
//             <div className="my-5 text-center">
//               <h1 className="font-bold text-white text-xl">Sign Up Here</h1>
//             </div>
//             <div className="w-2/4 mx-auto sign_form_body">
//               <form onSubmit={handleSubmit(onSubmit)}>
//                 <input
//                   type="text"
//                   className="w-full bg-white text-black border rounded p-3 block mb-5"
//                   placeholder="Your Name"
//                   {...register("name", { required: true })}
//                 />
//                 <input
//                   type="email"
//                   placeholder="Your Email"
//                   className="w-full bg-white text-black border rounded p-3 block mb-5"
//                   {...register("email", { required: true })}
//                 />
//                 <input
//                   type="password"
//                   placeholder="password"
//                   className="w-full bg-white text-black border rounded p-3 block mb-5"
//                   {...register("password", { required: true })}
//                 />

//                 {/* errors will return when field validation fails  */}
//                 {errors.exampleRequired && (
//                   <span className="block">This field is required</span>
//                 )}

//                 <div className="text-center">
//                   {/* <input
//                       className="btn btn-wide bg-lime-600 hover:bg-white hover:text-black border-0 text-white"
//                       type="submit"
//                     /> */}
//                   <button
//                     type="submit"
//                     className="btn btn-wide bg-lime-600 hover:bg-white hover:text-black border-0 text-white"
//                   >
//                     {" "}
//                     sign up
//                     {/* {loading ? (
//                         <div
//                           className="
//                               h-[10px]
//                               flex
//                               flex-col
//                               justify-center
//                               items-center"
//                         >
//                           <BeatLoader size={10} color="#000" />
//                         </div>
//                       ) : (
//                         "Sign up"
//                       )} */}
//                   </button>
//                 </div>
//               </form>
//               <div className="text-center mt-5 text-black">
//                 <p className="text-red-500 my-3">error message</p>
//                 <p className="text-white">
//                   Already have an account?
//                   <Link href="/login" className="text-lime-300 ms-3">
//                     Login here
//                   </Link>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SignIn;
