import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import "./Post.css";
import { Button } from "@mui/material";
import showToast from "crunchy-toast";
import { auth } from "../../firebase";

function Post() {
  const [postData, setPostData] = useState([]);
  const [isUserAuthenticated, setIsserAuthenticated] = useState("");

  const LoadPost = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts",
    );
    console.log(response?.data);
    if (response?.data) {
      showToast("See all Post", "success", 5000);
    }
    setPostData(response?.data);
  };
  useEffect(() => {
    LoadPost();
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setIsserAuthenticated(user.displayName);
      } else {
        alert("login First");
        window.location.href = "/login";
      }
    });
  }, []);
  return (
    <>
      <div className="sticky top-0">
        <Navbar />
      </div>

      <h1 className="w-46 mx-auto my-1 bg-blue-100 p-5 text-center text-2xl   font-normal">
        All Post Here
      </h1>
      <div className="card-container mt-5 h-[500px]  p-5">
        {postData.map((postObj, i) => {
          const { id, title, userId } = postObj;
          return (
            <div key={i}>
              <div
                className="transaction-card  relative mx-auto my-3 rounded-md  border-2 p-4 py-6 md:w-4/5 lg:w-3/6"
                style={{ boxShadow: "3px 3px 2px rgba(0, 0, 0, 0.3)" }}
              >
                <p className="absolute left-6 top-3">
                  {" "}
                  <span className="font-bold text-blue-700 ">
                    User ID :{" "}
                  </span>{" "}
                  <span className="font-bold">{userId}</span>
                </p>
                <p className="mt-8">
                  {" "}
                  <span className="text-xl font-semibold text-blue-700">
                    Title :
                  </span>{" "}
                  {title}
                </p>
                <p className="absolute bottom-2 right-5 top-3 ">
                  <a href={`/viewpost/${id}`}>
                    <Button variant="contained" size="small">
                      View Details
                    </Button>
                  </a>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Post;
