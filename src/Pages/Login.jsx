import { Container } from "@mui/material";
import Nav from "../Components/Nav";
import { MdOutlineMail } from "react-icons/md";
import { IoMdLock  } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { TbFidgetSpinner } from "react-icons/tb";
import { useContext, useState } from "react";
import { AuthContext } from "../authprovider/Authprovider";
import Swal from "sweetalert2";

const Login = () => {
  const { loading, signIn } = useContext(AuthContext);
  const [error, setError] = useState()
  const navigate = useNavigate()
    const onSubmit = (data) => {
      setError('')
        signIn(data.email, data.password)
          .then((res) => {
            console.log(res.user);
             Swal.fire({
               title: "Good Job!",
               text: "you successfully logged in",
               icon: "success",
             });
             navigate('/')
          })
          .catch((err) => {
            setError(err.message);
          });
    };
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    return (
      <div className="pt-20">
        <Nav />
        <Container>
          <h1
            className="text-5xl font-semibold text-center text-[#304D30]
          my-3 "
          >
            Login
          </h1>
          <hr className="w-96 mx-auto border-[#304D30] mt-5" />
          <p className="italic text-center my-5 font-semibold">
            Unlock your task management hub. Log in to streamline tasks, set
            priorities, and collaborate seamlessly. <br /> Our platform offers
            intuitive tools for efficient organization, tracking progress, and
            achieving goals. <br /> Join us to supercharge your productivity
            journey today!
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-10">
            <div className="relative text-center">
              <input
                type="email"
                name="email"
                {...register("email", { required: true })}
                className="border border-[#304D30] py-3 w-1/3 pl-14 bg-gray-100"
                placeholder="Enter your e-mail"
              />
              <MdOutlineMail
                className="absolute left-[397px] top-2"
                color="#304D30"
                fontSize={"2rem"}
              />
            </div>
            <div className="text-center">
              {errors.email && (
                <span className="text-red-600">Email is required</span>
              )}
            </div>
            <div className="relative text-center">
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                name="password"
                className="border border-[#304D30] py-3 w-1/3 pl-14 bg-gray-100"
                placeholder="Enter your password"
              />
              <IoMdLock
                className="absolute left-[397px] top-2"
                color="#304D30"
                fontSize={"2rem"}
              />
            </div>
            <div className="text-center">
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">Password must be 6 characters</p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-600">
                  Password must be less than 20 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600">
                  Password must have one Uppercase one lower case, one number
                  and one special character.
                </p>
              )}
            </div>
            {error && <p className="text-red-600 text-center">{error}</p>}
            <div className="text-center mx-auto w-1/3">
              <button
                className="bg-[#304D30] text-white border-none px-10 py-3 my-3 rounded-lg font-semibold cursor-pointer"
                type="submit"
              >
                {loading ? (
                  <TbFidgetSpinner
                    className="animate-spin"
                    fontSize={"1.5rem"}
                    color="#fffff"
                  />
                ) : (
                  <span>Login</span>
                )}
              </button>
            </div>
          </form>
          <p className="text-center">
            Don't have an account? please
            <Link
              to="/signup"
              className="text-[#304D30] font-bold underline ml-3"
            >
              <span>Sign Up</span>
            </Link>
          </p>
        </Container>
      </div>
    );
};

export default Login;