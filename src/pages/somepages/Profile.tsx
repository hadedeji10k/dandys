import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/api/hook";
import {
  useDeleteAccountMutation,
  useGetCurrentUserQuery,
  useUpdatePasswordMutation,
  useUpdateUserMutation,
} from "@/api/sellerApiCalls";
import { saveUser } from "@/api/slices/user";
import FormInput from "@/component/FormInput";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { Spin } from "antd";
import Modal from "@/component/Modal/Modal";
import Button from "@/component/Button";
import { BiSolidLock } from "react-icons/bi";
import { IoCheckbox } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useAuth from "@/api/context";

const Profile = () => {
  const user = useAppSelector((state) => state.user.user);

  const [modal, setModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };

  const handlePasswordModal = () => {
    setPasswordModal(!passwordModal);
  };

  const handleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  return (
    <div className="w-full p-4">
      <div className="flex flex-col px-6 pb-16 pt-6 rounded-lg bg-white mb-5">
        <div className="flex flex-row justify-between mt-2 gap-4 flex-wrap">
          <h1 className="sm:text-[24px] text-[18px] font-bold">
            Profile Information
          </h1>
          <button
            onClick={handleModal}
            className="bg-shades-white text-shades-primary hover:text-shades-white hover:bg-shades-primary py-1 px-3 rounded-md text-[14px] border-2 border-shades-primary transition-all ease-in-out flex flex-row items-center gap-x-2"
          >
            Edit
          </button>
        </div>

        {/* Profile info */}
        <div className="w-full flex sm:flex-col flex-col justify-between">
          <div className="w-full flex sm:flex-row flex-col flex-wrap justify-between gap-x-4">
            <FormInput
              className="max-w-full flex flex-1"
              disabled
              label="First name"
              defaultValue={user?.fullName?.split(" ")[0]}
            />
            <FormInput
              className="max-w-full flex flex-1"
              disabled
              label="Last name"
              defaultValue={user?.fullName?.split(" ")[0]}
            />
          </div>
          <div className="w-full flex sm:flex-row flex-col flex-wrap justify-between gap-x-4">
            <FormInput
              className="max-w-full flex flex-1"
              disabled
              label="Email"
              defaultValue={user?.email}
            />
            <div className="flex flex-col my-3 max-w-full flex-1">
              <label
                htmlFor=""
                className="text-[14px] font-semibold mb-[0.8px]"
              >
                Business Logo
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-6 pb-8 pt-6 rounded-lg bg-white mb-5">
        <div className="flex flex-row justify-between mt-2 gap-4 flex-wrap">
          <h1 className="sm:text-[24px] text-[18px] font-bold">
            Change password
          </h1>
          <button
            onClick={handlePasswordModal}
            className="bg-shades-white text-shades-primary hover:text-shades-white hover:bg-shades-primary py-1 px-3 rounded-md text-[14px] border-2 border-shades-primary transition-all ease-in-out flex flex-row items-center gap-x-2"
          >
            Change
          </button>
        </div>
      </div>
      <div className="flex flex-col px-6 pb-8 pt-6 rounded-lg bg-white">
        <div className="flex flex-row justify-between mt-2 gap-4 flex-wrap">
          <h1 className="sm:text-[24px] text-[18px] font-bold">
            Delete account
          </h1>
          <button
            onClick={handleDeleteModal}
            className="bg-shades-primary text-shades-white hover:text-shades-primary hover:bg-shades-white py-1 px-3 rounded-md text-[14px] border-2 border-shades-primary transition-all ease-in-out flex flex-row items-center gap-x-2"
          >
            Delete my account
          </button>
        </div>
      </div>

      <Modal isOpen={modal} handleClose={handleModal}>
        <EditAccountInformation handleClose={handleModal} />
      </Modal>

      <Modal isOpen={deleteModal} handleClose={handleDeleteModal}>
        <DeleteAccount handleClose={handleDeleteModal} />
      </Modal>

      <Modal isOpen={passwordModal} handleClose={handlePasswordModal}>
        <PasswordModal handleClose={handlePasswordModal} />
      </Modal>
    </div>
  );
};

const EditAccountInformation = ({ handleClose }: { handleClose: any }) => {
  const user = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();

  const {
    data: userData,
    error: _,
    refetch: refetchUser,
  } = useGetCurrentUserQuery();

  const [updateUser] = useUpdateUserMutation();

  const updateUserSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
    },
    validationSchema: updateUserSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      updateUser(values)
        .unwrap()
        .then((res) => {
          refetchUser();

          const currentUser = (userData as any)?.data;
          dispatch(saveUser(currentUser));

          Swal.fire({
            title: "Success!",
            text: "You have successfully updated your profile.",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed || result.isDenied || result.isDismissed) {
              resetForm({
                values: {
                  firstName: user?.firstName || "",
                  lastName: user?.lastName || "",
                },
              });
              handleClose()
            }
          });
        })
        .catch((err) => {
          toast.error(err?.data?.message || "Error updating profile");
        })
        .finally(() => {
          setSubmitting(false);
        });
      return;
    },
  });

  return (
    <Spin spinning={formik.isSubmitting}>
      <div className="w-full max-w-2xl md:py-8 py-6 md:px-8 px-4">
        <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>

        <div className="w-full flex flex-col">
          <FormInput
            name="firstName"
            type="text"
            label="First Name"
            placeholder="Enter your first name"
            defaultValue={user?.firstName!}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && formik.errors.firstName}
          />
          <FormInput
            name="lastName"
            type="text"
            label="Last Name"
            placeholder="Enter your last name"
            defaultValue={user?.lastName!}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && formik.errors.lastName}
          />
        </div>

        <div>
          <Button
            handleClick={formik.handleSubmit}
            className={"w-full mt-5"}
            type={"button"}
            title={"Save"}
            disabled={formik.isSubmitting}
            loading={formik.isSubmitting}
          />
        </div>
      </div>
    </Spin>
  );
};

const PasswordModal = ({ handleClose }: { handleClose: any }) => {
  // states for mananging validation
  const [hasEightCharacters, setHasEightCharacters] = useState(false);
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasOneNumber, setHasOneNumber] = useState(false);

  const [updatePassword] = useUpdatePasswordMutation();

  const passwordSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(8, "Password must be at least 8 characters!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(.{8,}$)/,
        "Your old password must meet the specified criteria"
      )
      .required("old Password is required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(.{8,}$)/,
        "Your new password must meet the specified criteria"
      )
      .required("New Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: passwordSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      updatePassword(values)
        .unwrap()
        .then((res) => {
          Swal.fire({
            title: "Success!",
            text: "You have successfully updated your password.",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed || result.isDenied || result.isDismissed) {
              resetForm({
                values: {
                  oldPassword: "",
                  newPassword: "",
                }
              });
              handleClose();
            }
          });
        })
        .catch((err) => {
          toast.error(err?.data?.message || "Error updating password");
        })
        .finally(() => {
          setSubmitting(false);
        });
      return;
    },
  });

  const handlePasswordChange = (e: any) => {
    const value = e.target.value;

    // has special characters
    const hasSpecialCharacterTest = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/;
    setHasSpecialCharacter(hasSpecialCharacterTest.test(value));

    // has uppercase characters
    const hasUpperCaseTest = /[A-Z]/;
    setHasUpperCase(hasUpperCaseTest.test(value));

    // has lowercase characters
    const hasLowerCaseTest = /[a-z]/;
    setHasLowerCase(hasLowerCaseTest.test(value));

    // has one number
    const hasOneNumberTest = /\d+/;
    setHasOneNumber(hasOneNumberTest.test(value));

    // has eight characters
    setHasEightCharacters(value.length >= 8 ? true : false);
    formik.setFieldValue("newPassword", value);
  };

  return (
    <Spin spinning={formik.isSubmitting}>
      <div className="w-full max-w-2xl md:py-8 py-6 md:px-8 px-4">
        <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>

        <div className="w-full flex flex-col">
          <FormInput
            name="oldPassword"
            label="Password"
            type="password"
            placeholder="Enter your old password"
            icon={<BiSolidLock />}
            onChange={formik.handleChange}
            error={formik.touched.oldPassword && formik.errors.oldPassword}
          />
          <FormInput
            name="newPassword"
            label="Password"
            type="password"
            placeholder="Enter your new password"
            icon={<BiSolidLock />}
            onChange={(e: any) => {
              formik.handleChange(e);
              handlePasswordChange(e);
            }}
            error={formik.touched.newPassword && formik.errors.newPassword}
          />
          {formik.values.newPassword.length > 0 && (
            <div>
              <div
                className={`flex flex-row gap-x-3 items-center my-2 ${
                  hasEightCharacters ? "text-green-600" : "text-gray-600"
                }`}
              >
                <IoCheckbox />
                <p>At least 8 characters</p>
              </div>
              <div
                className={`flex flex-row gap-x-3 items-center my-2 ${
                  hasOneNumber ? "text-green-600" : "text-gray-600"
                }`}
              >
                <IoCheckbox />
                <p>Contains at least one number</p>
              </div>
              <div
                className={`flex flex-row gap-x-3 items-center my-2 ${
                  hasSpecialCharacter ? "text-green-600" : "text-gray-600"
                }`}
              >
                <IoCheckbox />
                <p>Contains a special character</p>
              </div>
              <div
                className={`flex flex-row gap-x-3 items-center my-2 ${
                  hasUpperCase ? "text-green-600" : "text-gray-600"
                }`}
              >
                <IoCheckbox />
                <p>Contains uppercase letter</p>
              </div>
              <div
                className={`flex flex-row gap-x-3 items-center my-2 ${
                  hasLowerCase ? "text-green-600" : "text-gray-600"
                }`}
              >
                <IoCheckbox />
                <p>Contains lowercase letter</p>
              </div>
            </div>
          )}
        </div>

        <div>
          <Button
            handleClick={formik.handleSubmit}
            className={"w-full mt-5"}
            type={"button"}
            title={"Save"}
            disabled={formik.isSubmitting}
            loading={formik.isSubmitting}
          />
        </div>
      </div>
    </Spin>
  );
};

const DeleteAccount = ({ handleClose }: { handleClose: any }) => {
  const navigate = useNavigate();
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();

    const { logout } = useAuth();

  const handleDelete = () => {
    deleteAccount()
      .unwrap()
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "You have successfully deleted your account",
          icon: "success",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed || result.isDenied || result.isDismissed) {
            logout()
            navigate("/sign-in");
          }
        });
      })
      .catch((err: any) => {
        toast.error(
          err?.data?.message || "Error deleting this account, please try agaom"
        );
      });
  };
  return (
    <Spin spinning={isLoading}>
      <div className="p-6 flex flex-col items-center justify-center">
        <h4 className="text-base text-shades-primary font-semibold mb-4">
          Delete Account
        </h4>
        <p className="text-[14px] font-normal mb-8">
          Are you sure you want to delete your Account?
        </p>

        <div className="w-full flex flex-row gap-x-3 items-center justify-between">
          <button
            onClick={handleClose}
            className="w-full text-shades-secondary py-2 px-3 rounded-md text-[14px] border border-shades-secondary hover:bg-shades-secondary hover:text-white transition-all ease-in-out"
          >
            No, don't delete
          </button>
          <button
            onClick={handleDelete}
            className="w-full bg-shades-secondary text-white hover:text-shades-secondary hover:bg-white py-2 px-3 rounded-md text-[14px] border hover:border-shades-secondary transition-all ease-in-out"
          >
            Delete
          </button>
        </div>
      </div>
    </Spin>
  );
};

export default Profile;
