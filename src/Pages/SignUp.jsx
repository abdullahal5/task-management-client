import { Container } from "@mui/material";
import { useForm } from "react-hook-form";
import { IoMdLock } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../authprovider/Authprovider";
import Swal from "sweetalert2";
import { TbFidgetSpinner } from "react-icons/tb";

const SignUp = () => {
  const [error, setError] = useState(false)
  const { createUser, updateUserProfile, loading } = useContext(AuthContext);
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    setError('')
    const image = data?.image[0];
    const Ddata = new FormData();
    Ddata.append("image", image);
    const res = await axios.post(
      "https://api.imgbb.com/1/upload?key=e0402a6916e18617c709ea2e5087ca44",
      Ddata,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        updateUserProfile(data.name, res.data.data.display_url);
        Swal.fire({
          title: "Good Job!",
          text: "you successfully Signed Up",
          icon: "success",
        });
        navigate('/')
      })
      .catch((err) => {
        setError(err.message)
      });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <div className="">
      <Container>
        <div>
          <h1
            className="text-5xl font-semibold text-center text-[#304D30]
          my-3 "
          >
            Sign UP
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-10">
            <div className="relative text-center">
              <input
                type="text"
                name="name"
                {...register("name", { required: true })}
                className="border border-[#304D30] py-3 w-1/3 pl-14 bg-gray-100"
                placeholder="Enter your Name"
              />
              <FaUser
                className="absolute left-[397px] top-3"
                color="#304D30"
                fontSize={"1.5rem"}
              />
            </div>
            <div className="text-center">
              {errors.name && (
                <span className="text-red-600">Name is required</span>
              )}
            </div>
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
            <div className="text-center border border-[#304D30] py-3 w-1/3 bg-gray-100 mx-auto flex flex-col">
              Upload your profile pic
              <Button
                component="label"
                sx={{ width: "200px", mx: "auto", backgroundColor: "#304D30" }}
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <VisuallyHiddenInput
                  name="image"
                  {...register("image", { required: true })}
                  type="file"
                />
              </Button>
            </div>
            <div className="text-center">
              {errors.image && (
                <span className="text-red-600">Image is required</span>
              )}
            </div>
            <div className="text-center mx-auto w-1/3">
              {error && <p className="text-red-600 text-center">{error}</p>}
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
                  <span>Sign Up</span>
                )}
              </button>
            </div>
          </form>
          <p className="text-center">
            Already have an account? please
            <Link
              to="/login"
              className="text-[#304D30] font-bold underline ml-3"
            >
              Login
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default SignUp;
