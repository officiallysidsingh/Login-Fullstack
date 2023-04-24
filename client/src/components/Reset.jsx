import React from "react";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { resetPasswordValidate } from "../helper/validate";

// Import CSS
import styles from "../styles/UserName.module.css";

export default function Reset() {
  const formik = useFormik({
    initialValues: {
      password: "Admin@123",
      confirm_pwd: "Admin@123",
    },
    validate: resetPasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Reset</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter New Password.
            </span>
          </div>

          <form className="pt-20" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="password"
                placeholder="New Password"
              />
              <input
                {...formik.getFieldProps("confirm_pwd")}
                className={styles.textbox}
                type="password"
                placeholder="Confirm Password"
              />
              <button className={`${styles.btn} bg-indigo-500`} type="submit">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
