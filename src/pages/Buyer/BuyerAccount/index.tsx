import { useState } from "react";
import FormInput from "@/component/FormInput";
import { useAppDispatch, useAppSelector } from "@/api/hook";
import Button from "@/component/Button";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  useDeleteAccountMutation,
  useGetCurrentUserQuery,
  useUpdatePasswordMutation,
  useUpdateUserMutation,
} from "@/api/buyerApiCalls";
import { formatDate } from "@/utils/helpers";
import { Badge, Spin } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { saveUser } from "@/api/slices/user";
import Modal from "@/component/Modal/Modal";
import { BiSolidLock } from "react-icons/bi";
import { IoCheckbox } from "react-icons/io5";

const Menu = [
  {
    key: 1,
    title: "Account",
    active: true,
  },
  {
    key: 2,
    title: "Change password",
    active: false,
  },
  {
    key: 3,
    title: "Billing address",
    active: false,
  },
  {
    key: 4,
    title: "My orders",
    active: false,
  },
  {
    key: 5,
    title: "Delete account",
    active: false,
  },
];

const BuyerAccount = () => {
  const user = useAppSelector((state) => state.user.user);

  const [menu, setMenu] = useState(Menu);

  const handleTabChange = (id: number) => {
    const newMenu = menu.map((item) => {
      return {
        ...item,
        active: item.key === id ? true : false,
      };
    });

    setMenu([...newMenu]);
  };

  const active = menu.filter((item) => item.active)[0];

  return (
    <div className="w-full flex flex-row gap-10 justify-between p-14">
      <div className="w-[250px] flex flex-col gap-3">
        {menu.map((item) => (
          <h3
            key={item.key}
            className={`py-2 border-b cursor-pointer ${
              item.active && "text-shades-primary"
            }`}
            onClick={() => handleTabChange(item.key)}
          >
            {item.title}
          </h3>
        ))}
      </div>

      {active.key === 1 ? (
        <Account />
      ) : active.key === 2 ? (
        <Password />
      ) : active.key === 3 ? (
        <BillingAddress />
      ) : active.key === 4 ? (
        <MyOrders />
      ) : active.key === 5 ? (
        <DeleteAccount />
      ) : null}
    </div>
  );
};

export default BuyerAccount;

const Account = () => {
  const user = useAppSelector((state) => state.user.user);

  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="w-full flex sm:flex-col flex-col p-4">
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
        <FormInput
          className="max-w-full flex flex-1"
          disabled
          label="Phone"
          defaultValue={user?.phone!}
        />
      </div>
      <div className="flex flex-col my-3 max-w-full flex-1 mb-6">
        <label htmlFor="" className="text-[14px] font-semibold mb-[0.8px]">
          Avatar
        </label>
      </div>

      <div>
        <Button
          handleClick={handleModal}
          className={"px-8 py-3 mt-5"}
          type={"button"}
          title={"UPDATE"}
          disabled={false}
        />
      </div>

      <Modal isOpen={modal} handleClose={handleModal}>
        <EditAccountInformation handleClose={handleModal} />
      </Modal>
    </div>
  );
};

const Password = () => {
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
        .then(() => {
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
                },
              });
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
    <div className="w-full flex sm:flex-col flex-col p-4">
      <div className="w-full max-w-[400px] flex flex-col">
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
          label="New Password"
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

        <div>
          <Button
            handleClick={formik.handleSubmit}
            className={"px-8 py-3 mt-5"}
            type={"button"}
            title={"UPDATE"}
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
};

const BillingAddress = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className="w-full flex sm:flex-col flex-col p-4">
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
          label="Address"
          defaultValue={user?.email}
        />
        <FormInput
          className="max-w-full flex flex-1"
          disabled
          label="State"
          defaultValue={user?.phone!}
        />
      </div>
      <div className="w-full flex sm:flex-row flex-col flex-wrap justify-between gap-x-4">
        <FormInput
          className="max-w-full flex flex-1"
          disabled
          label="City"
          defaultValue={user?.email}
        />
        <FormInput
          className="max-w-full flex flex-1"
          disabled
          label="Additional Information"
          type="textarea"
          defaultValue={user?.phone!}
        />
      </div>

      <div>
        <Button
          // handleClick={() => navigate("/sign-up")}
          className={"px-8 py-3 mt-5"}
          type={"button"}
          title={"UPDATE"}
          disabled={false}
        />
      </div>
    </div>
  );
};

const DeleteAccount = () => {
  const user = useAppSelector((state) => state.user.user);

  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();

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
          }
        });
      })
      .catch((err: any) => {
        toast.error(
          err?.data?.message || "Error deleting your account, please try agaom"
        );
      });
  };

  return (
    <div className="w-full flex sm:flex-col flex-col justify-center items-center p-4">
      <div className="p-6 max-w-[400px] flex flex-col items-center justify-center">
        <h4 className="text-base text-shades-primary font-semibold mb-4">
          Delete Account
        </h4>
        <p className="text-[14px] font-normal mb-8">
          Are you sure you want to delete this Account?
        </p>

        <div className="w-full flex flex-row gap-x-3 items-center justify-between">
          <button
            onClick={handleDelete}
            className="w-full bg-shades-secondary text-white hover:text-shades-secondary hover:bg-white py-2 px-3 rounded-md text-[14px] border hover:border-shades-secondary transition-all ease-in-out"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const MyOrders = () => {
  const orders = [
    {
      id: 1,
      orderNo: 123,
      date: new Date(),
      status: "SHIPPED",
      amount: "20,000",
      noOfItems: "5",
    },
    {
      id: 2,
      orderNo: 1265,
      date: new Date(),
      status: "PENDING",
      amount: "20,000",
      noOfItems: "5",
    },
  ];
  return (
    <div className="w-full flex md:flex-row flex-col gap-6 justify-between">
      <div className="w-full md:max-w-[50%] flex flex-1">
        {[1, 2, 3]?.length > 0 ? (
          <div className="flex w-full flex-col mt-3 overflow-x-scroll no_scrollbar bg-white rounded-lg">
            {/* Head */}
            <div className="min-w-max w-full flex flex-row gap-x-3 justify-between py-3 px-3 border-b-2 border-shades-lightGray">
              <div className="min-w-[60px] max-w-[60px] w-full flex items-center text-[14px]">
                Order
              </div>
              <div className="min-w-[100px] max-w-[100px] w-full flex items-center text-[14px]">
                Date
              </div>
              <div className="min-w-[120px] max-w-[120px] w-full flex items-center text-[14px]">
                Status
              </div>
              <div className="min-w-[120px] max-w-[120px] w-full flex items-center text-[14px]">
                Total
              </div>
            </div>
            {/* body */}
            <div className="w-full">
              {orders?.map((item, index) => (
                <div
                  key={index}
                  className={`min-w-max w-full flex flex-row gap-x-3 justify-between py-2.5 px-3 bg-shades-white/80 my-1 border-shades-lightGray ${
                    index + 1 === orders.length ? "" : "border-b-2"
                  }`}
                >
                  <div className="min-w-[60px] max-w-[60px] w-full flex items-center text-[14px] font-medium text-shades-primary">
                    {item?.orderNo}
                  </div>
                  <div className="min-w-[100px] max-w-[100px] w-full flex items-center text-[14px]">
                    {formatDate(item?.date)}
                  </div>
                  <div className="min-w-[120px] max-w-[120px] w-full flex items-center text-[14px]">
                    <span className="py-2 px-2.5 rounded-md bg-shades-lightGreen text-status-success">
                      <Badge status="success" /> {item?.status}
                    </span>
                  </div>
                  <div className="min-w-[120px] max-w-[120px] w-full flex items-center text-[14px] font-medium text-shades-primary">
                    {`N${item?.amount} (${item?.noOfItems} Items)`}
                  </div>
                </div>
              ))}

              {/* Pagination */}
              <div></div>
            </div>
          </div>
        ) : (
          <div className="min-h-[10vh] w-full flex flex-col items-center justify-center bg-white rounded-lg mt-3">
            <h2 className="text-[18px] font-semibold">No Orders Yet!</h2>
            <p className="text-center">
              Your history will appear here when you have one
            </p>
          </div>
        )}
      </div>
      <div className="w-full flex flex-1">
        <div className="">Items</div>
      </div>
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
        .then(() => {
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
              handleClose();
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
