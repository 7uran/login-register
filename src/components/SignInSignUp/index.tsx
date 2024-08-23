"use client";
import React, { useState } from "react";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignInSignUp: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSignUpClick = () => {
        setIsSignUp(!isSignUp);
    };

    const validationSchema = Yup.object({
        name: isSignUp
            ? Yup.string().required("Name is required")
            : Yup.string(),
        username: Yup.string().required("Username is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
    });

    return (
        <div className="wrapper w-full h-screen flex items-center justify-center">
            <div className="w-[768px] h-[480px] rounded-xl shadow-xl overflow-hidden flex">
                <div
                    className={`w-full flex flex-col justify-center gap-3 transform transition-transform duration-500 ${isSignUp ? "translate-x-[384px]" : ""
                        }`}
                >
                    <div className="flex flex-col items-center gap-5">
                        <div>
                            <h1 className="font-extrabold text-3xl">
                                {isSignUp ? "Create Account" : "Sign in"}
                            </h1>
                        </div>
                        <div className="flex gap-3">
                            <button className="rounded-full w-10 h-10 border flex items-center justify-center">
                                <FaFacebookF />
                            </button>
                            <button className="rounded-full w-10 h-10 border flex items-center justify-center">
                                <FaGoogle />
                            </button>
                            <button className="rounded-full w-10 h-10 border flex items-center justify-center">
                                <FaLinkedinIn />
                            </button>
                        </div>
                        <div>
                            <p className="text-xs">
                                {isSignUp ? "or use your email for registration" : "or use your account"}
                            </p>
                        </div>
                    </div>

                    <Formik
                        initialValues={{ name: "", username: "", password: "" }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form className="flex items-center flex-col gap-4">
                                {isSignUp && (
                                    <div className="w-[284px]">
                                        <Field
                                            name="name"
                                            className={`bg-[#EEEEEE] w-full h-[39px] p-2 text-sm outline-none ${errors.name && touched.name ? "border border-red-500" : ""
                                                }`}
                                            placeholder="Name"
                                        />
                                        <ErrorMessage
                                            name="name"
                                            component="div"
                                            className="text-red-500 text-xs"
                                        />
                                    </div>
                                )}
                                <div className="w-[284px]">
                                    <Field
                                        name="username"
                                        type="text"
                                        className={`bg-[#EEEEEE] w-full h-[39px] p-2 text-sm outline-none ${errors.username && touched.username ? "border border-red-500" : ""
                                            }`}
                                        placeholder="Username"
                                    />
                                    <ErrorMessage
                                        name="username"
                                        component="div"
                                        className="text-red-500 text-xs"
                                    />
                                </div>
                                <div className="w-[284px]">
                                    <Field
                                        name="password"
                                        type="password"
                                        className={`bg-[#EEEEEE] w-full h-[39px] p-2 text-sm outline-none ${errors.password && touched.password ? "border border-red-500" : ""
                                            }`}
                                        placeholder="Password"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="text-red-500 text-xs"
                                    />
                                </div>
                                <div className="flex items-center flex-col gap-2">
                                    {!isSignUp && (
                                        <p className="text-sm">Forgot your password?</p>
                                    )}
                                    <button
                                        type="submit"
                                        className="border px-10 py-2 rounded-full bg-[#F44B2C] text-white font-semibold text-xs"
                                    >
                                        {isSignUp ? "SIGN UP" : "SIGN IN"}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div
                    className={`bg-gradient-to-r-custom w-full flex justify-center items-center transform transition-transform duration-500 ${isSignUp ? "translate-x-[-384px]" : ""
                        }`}
                >
                    <div className="flex flex-col items-center p-10 gap-5">
                        <h1 className="text-3xl text-white font-extrabold">
                            {isSignUp ? "Welcome Back!" : "Hello, Friend!"}
                        </h1>
                        <p className="text-sm text-white text-center">
                            {isSignUp
                                ? "To keep connected with us please login with your personal info"
                                : "Enter your personal details and start journey with us"}
                        </p>
                        <button
                            onClick={handleSignUpClick}
                            className="border px-10 py-2 rounded-full bg-transparent text-white font-semibold text-xs"
                        >
                            {isSignUp ? "SIGN IN" : "SIGN UP"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInSignUp;
