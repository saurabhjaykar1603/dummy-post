import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import showToast from "crunchy-toast";


function ViewPost() {
  const { id } = useParams();
  const [postData, setPostData] = useState({});
  const LoadPost = async () => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
    );
    console.log(response?.data);
    if (response?.data) {
      showToast("See Post Details", "success", 5000);
    }
    setPostData(response?.data);
  };
  useEffect(() => {
    LoadPost();
  }, []);
  return (
    <>
      <div className="sticky top-0">
        <Navbar />
      </div>

      <div
        className="mx-auto mt-10 h-96 rounded-lg bg-slate-100 p-5 md:w-[500px] lg:w-[700px]"
        style={{ boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.3)" }}
      >
        <p className="text-xl">
          {" "}
          <span className="font-bold text-blue-600">User id :</span>{" "}
          {postData.userId}
        </p>
        <p className="mt-10 text-xl">
          {" "}
          <span className="font-bold text-blue-600">post id :</span>{" "}
          {postData.id}
        </p>
        <div className="mt-10">
          <p className="text-xl">
            {" "}
            <span className="font-bold text-blue-600">title :</span>{" "}
            {postData.title}
          </p>
        </div>
        <div className="mt-10">
          <p className="text-xl">
            {" "}
            <span className="font-bold text-blue-600">Description :</span>{" "}
            {postData.title}
          </p>
        </div>
      </div>
    </>
  );
}

export default ViewPost;
