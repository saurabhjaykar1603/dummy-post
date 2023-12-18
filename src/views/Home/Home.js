import { Button } from "@mui/material";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import homeImg from "./images/hompost.png";

function Home() {
  return (
    <>
      <div className="sticky top-0">
        <Navbar />
      </div>

      <div className="flex flex-wrap items-center justify-center  ">
        <div className="right">
          <img src={homeImg} alt="" className="mx-auto block h-[550px]" />
        </div>
        <div className="left ">
          <h1 className="my-3 px-4 text-3xl font-bold text-stone-600">
            Welcome to{" "}
            <span className="text-blue-600 md:text-3xl lg:text-5xl ">
              Dummy Post
            </span>
          </h1>
          <div className="p-3 md:w-[300px] lg:w-[600px] ">
            <p className="text-xl leading-7">
              The home page of the "Dummy Post" website serves as the central
              hub where users can explore and engage with various posts.
              Designed with simplicity and user-friendliness in mind, the home
              page provides an intuitive interface for seamless navigation.
              Users can discover a collection of dummy posts, each presented in
              a clear and organized manner, fostering a straightforward browsing
              experience
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
