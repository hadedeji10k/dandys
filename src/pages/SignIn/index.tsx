import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useAppDispatch } from "@/api/hook";
import FormInput from "@/component/FormInput";
import { MdOutlineMailOutline } from "react-icons/md";
import { BiSolidLock } from "react-icons/bi";
import Button from "@/component/Button";
import Logo from "@/assets/Logo 1.png";
import Logo2 from "@/assets/Logo 2.png";
import {
  useGetCurrentUserQuery,
  useSignInMutation,
} from "@/api/sellerApiCalls";
import { encode } from "@/utils/helpers";
import { saveUser } from "@/api/slices/user";
import useAuth from "@/api/context";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { login, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate("/seller-dashboard");
    }
  }, []);

  const [signIn] = useSignInMutation();
  const {
    data: userData,
    error: getUserError,
    refetch: refetchUser,
  } = useGetCurrentUserQuery();

  const signInSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email address is required"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: signInSchema,
    onSubmit: (values, { setSubmitting }) => {
      signIn(values)
        .unwrap()
        .then((res) => {
          const encodedToken = encode(res?.data?.token);
          const token = {
            value: encodedToken,
            expires: res?.data?.expiresIn,
          };
          login(res?.data?.user, token);

          Swal.fire({
            title: "Success!",
            text: "You have successfully logged in",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed || result.isDenied || result.isDismissed) {
              refetchUser();

              const currentUser = (userData as any)?.data;
              dispatch(saveUser(currentUser));

              navigate("/seller-dashboard");
            }
          });
        })
        .catch((err) => {
          toast.error(err?.data?.message || "Login Failed");
        })
        .finally(() => {
          setSubmitting(false);
        });
      return;
    },
  });

  return (
    <div className="w-full h-screen flex items-start">
      <div className="relative sm:w-1/2 sm:flex flex-col h-full bg-no-repeat bg-cover bg-[linear-gradient(to_right_bottom,#903677,rgba(179,70,148,0.8)),url('/public/img/female.png')]">
        <img src={Logo} className="absolute top-5 left-5 w-[120px] h-[40px]" />
      </div>
      <div className="sm:w-1/2 w-full h-full bg-white flex flex-col p-20 justify-center">
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-col mb-2 items-center justify-center">
            <div className="flex items-center w-full justify-center mb-10 sm:hidden">
              <img src={Logo2} className="top-5 left-5 w-[120px] h-[40px]" />
            </div>
            <h3 className="xs:text-2xl text-xl font-semibold mb-4">Login</h3>
            <p className="xs:text-sm text-[13px] mb-2 text-center">
              Welcome Back! please enter your details.
            </p>
          </div>
          <div className="w-full flex flex-col">
            <FormInput
              name="email"
              type="email"
              label="Email Address"
              placeholder="Enter your email address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email}
              icon={<MdOutlineMailOutline />}
            />
            <FormInput
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && formik.errors.password}
              icon={<BiSolidLock />}
            />

            <Button
              handleClick={formik.handleSubmit}
              className={"w-full mt-5"}
              type={"button"}
              title={"Sign in"}
              disabled={formik.isSubmitting}
              loading={formik.isSubmitting}
            />
          </div>
          <div className="w-full mt-5 flex flex-row items-center justify-between gap-x-3 flex-wrap">
            <div className="flex flex-row">
              <input type="checkbox" className="w-4 h-4 mr-2 bg-white" />
              <p className="text-sm">Remember Me</p>
            </div>
            <p
              className="text-sm cursor-pointer"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password
            </p>
          </div>
        </div>
        <div className="w-full flex items-center justify-center mt-10">
          <p
            className="text-sm font-normal text-[#666365]"
            onClick={() => navigate("/sign-up")}
          >
            Don’t have an account?{" "}
            <span className="font-semibold text-[#903677] cursor-pointer">
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
