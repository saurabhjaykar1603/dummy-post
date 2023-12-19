import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import showToast from "crunchy-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./../Signup/Signup.css";

function Login() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!value.email) {
      return showToast("Please enter email", "warnig", 3000);
    }
    if (!value.password) {
      return showToast("Please enter password", "warnig", 3000);
    }
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, value.email, value.password)
      .then((res) => {
        console.log(res);
        setSubmitButtonDisabled(false);

        navigate("/post");
      })
      .catch((err) => {
        console.log("Error: " + err);
        setSubmitButtonDisabled(false);
        showToast(`Hey User${err.message}`, "warning", 3000);
      });
  };

  return (
    <>
      <div className="sticky top-0">
        <Navbar />
      </div>
      <div className="mt-20 flex justify-center">
        <div
          className="relative flex max-w-md flex-col rounded-md bg-white p-4 text-black"
          style={{ boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.3)" }}
        >
          <div className="mb-2 text-center text-2xl font-bold text-[#1e0e4b]">
            Welcome back to <span className="text-blue-700">Dummy App</span>
          </div>
          <div className="mb-4 text-center text-sm font-normal text-[#1e0e4b]">
            Signup to your account
          </div>
          <form className="flex flex-col gap-3">
            <div className="relative block">
              <label
                htmlFor="email"
                className="mb-2 block cursor-text text-sm font-normal leading-[140%] text-gray-600"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                className="m-0 block h-11 w-full appearance-none rounded border border-gray-200 p-[11px] text-sm font-normal leading-[18px] tracking-[0px] text-black outline-0 ring-gray-900  ring-offset-2 focus:ring-2"
                onChange={(event) =>
                  setValue((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }))
                }
              />
            </div>
            <div className="relative block">
              <label
                htmlFor="password"
                className="mb-2 block cursor-text text-sm font-normal leading-[140%] text-gray-600"
                minlength="8"
              >
                Password
              </label>
              <input
                type="text"
                id="password"
                className="m-0 block h-11 w-full appearance-none rounded border border-gray-200 p-[11px] text-sm font-normal leading-[18px] tracking-[0px] text-black outline-0 ring-gray-900 ring-offset-2 focus:ring-2"
                onChange={(event) =>
                  setValue((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }))
                }
              />
            </div>

            <button
              type="button"
              className="m-auto w-max rounded bg-blue-700 px-6 py-2 text-sm font-normal text-white"
              onClick={handleSubmission}
              disabled={submitButtonDisabled}
            >
              Login
            </button>
          </form>
          <div className="mt-[1.2em] text-center text-sm">
            You dont have an Account ?
            <Link to="/signup">
              <p className="text-sm text-blue-600" href="#">
                Signup
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
