import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuthStore } from "../store/store";
import { generateOTP, verifyOTP } from "../helper/helper";
import { useNavigate } from "react-router-dom";

// Import CSS
import styles from "../styles/UserName.module.css";

export default function Recovery() {
  const { username } = useAuthStore((state) => state.auth);
  const [OTP, setOTP] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      if (OTP) return toast.success("OTP sent to your email address.");
      return toast.error("Something went wrong. Please try again.");
    });
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let { status } = await verifyOTP({ username, code: OTP });

      if (status === 200) {
        toast.success("OTP verified successfully.");
        return navigate("/reset");
      }
    } catch (error) {
      return toast.error("OTP verification failed. Wrong OTP...!");
    }
  };

  /* Function to Resend OTP */
  const resendOTP = async () => {
    let sendPromise = generateOTP(username);

    toast.promise(sendPromise, {
      loading: "Sending OTP...",
      success: <b>OTP has been sent to your email successfully...!</b>,
      error: <b>Something went wrong. Please try again...!</b>,
    });
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter OTP to Recover your Account Password
            </span>
          </div>

          <form className="pt-20" onSubmit={handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="py-4 text-sm text-left text-gray-500">
                  Enter 6 digit OTP sent to your email address.
                </span>
                <input
                  className={styles.textbox}
                  type="text"
                  placeholder="OTP"
                  onChange={(e) => setOTP(e.target.value)}
                />
              </div>
              <button className={`${styles.btn} bg-indigo-500`} type="submit">
                Sign In
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Can't get OTP?{" "}
                <button
                  onClick={resendOTP}
                  className="text-red-500"
                  type="button"
                >
                  Resend
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
