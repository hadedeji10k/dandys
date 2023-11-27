import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "../../../component/FormInput";
import { MdOutlineMailOutline } from "react-icons/md";
import Button from "../../../component/Button";
import Swal from "sweetalert2";
import { useForgotPasswordMutation } from "@/api/sellerApiCalls";
import Loader from "@/component/Loader";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [forgotPassword] = useForgotPasswordMutation();

  const signInSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email address is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: signInSchema,
    onSubmit: (values, { setSubmitting }) => {
      forgotPassword(values)
        .unwrap()
        .then(() => {
          localStorage.setItem("userEmail", values.email);
          Swal.fire({
            title: "Success!",
            text: "OTP has been sent to your e-mail address.",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed || result.isDenied || result.isDismissed) {
              navigate("/password-otp");
            }
          });
        }).catch(() => {
          toast.error("Error sending mail to your e-mail address, please try again.")
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <Loader spinning={formik.isSubmitting}>
      <div className="w-full h-screen flex items-start">
        <div className="relative sm:w-1/2 sm:flex flex-col h-full bg-no-repeat bg-cover bg-[linear-gradient(to_right_bottom,#903677,rgba(179,70,148,0.8)),url('/public/img/female.png')]"></div>
        <div className="sm:w-1/2 w-full h-full bg-white flex flex-col xs:p-16 p-5 justify-center">
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-col mb-2 items-center justify-center">
              <h3 className="xs:text-2xl text-xl font-semibold mb-4 text-center">
                Forgot Password
              </h3>
              <p className="xs:text-sm text-[13px] mb-2 text-center">
                Enter the email address associated with your account.
              </p>
            </div>
            <div className="w-full flex flex-col">
              <FormInput
                name="email"
                type="email"
                label="Email Address"
                placeholder="Enter your email address"
                icon={<MdOutlineMailOutline />}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && formik.errors.email}
              />
              <Button
                handleClick={formik.handleSubmit}
                className={"w-full mt-5"}
                type={"button"}
                title={"Continue"}
                disabled={formik.isSubmitting}
              />
            </div>
          </div>
        </div>
      </div>
    </Loader>
  );
};

export default ForgotPassword;
