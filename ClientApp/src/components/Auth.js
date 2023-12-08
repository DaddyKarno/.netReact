import React, { useState } from "react";
import { useFormik } from "formik";

const Auth = () => {
  const postRegistation = async () => {
    var Headers = {
      "Content-Type": "application/json",
    };
    const newUser = {
      Username: formik.values.login,
      Password: formik.values.password,
    };
    const options = {
      method: "POST",
      headers: Headers,
      body: JSON.stringify(newUser),
    };
    try {
      await fetch("/api/auth/login", options)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          console.log(json);
          const token = json;
          localStorage.setItem("token", token);
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    onSubmit: (values) => {
      postRegistation();
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="login">login</label>
      <input
        id="login"
        name="login"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.login}
      />

      <label htmlFor="lastName">password</label>
      <input
        id="password"
        name="password"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.password}
      />

      <button type="submit">Registration</button>
    </form>
  );
};
export default Auth;
