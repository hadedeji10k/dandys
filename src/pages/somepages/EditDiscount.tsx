import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import * as Yup from "yup";
import {
  useDeleteDiscountMutation,
  useGetDiscountByIdQuery,
  useUpdateDiscountMutation,
} from "@/api/sellerApiCalls";
import FormInput from "@/component/FormInput";
import FormSelect from "@/component/FormSelect";
// import { IDiscount } from "@/interface";
import { useFormik } from "formik";
import { IoIosArrowBack } from "react-icons/io";
import { Spin } from "antd";
import Modal from "@/component/Modal/Modal";
import { AiOutlineExport } from "react-icons/ai";

const NewDiscount = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // const [discount, setDiscount] = useState<IDiscount>();

  const { data: fetchedDiscount, error: _ } = useGetDiscountByIdQuery(id!);
  const [deleteDiscount, { isLoading }] = useDeleteDiscountMutation();

  const [updateDiscount] = useUpdateDiscountMutation();

  const [discountValueTypeOptions, setDiscountValueTypeOptions] = useState([
    {
      label: "Fixed Amount",
      value: "FIXED_AMOUNT",
      selected: true,
    },
    {
      label: "Percentage",
      value: "PERCENTAGE",
      selected: false,
    },
  ]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string(),
    code: Yup.string().required("Code is required"),
    amount: Yup.number(),
    percentage: Yup.number(),
    numberOfDiscounts: Yup.number()
      .min(1)
      .required("Number of Discount is required"),
    startDate: Yup.string().required("Start date is required"),
    endDate: Yup.string().required("End date is required"),
    type: Yup.string().required("Discount type is required"),
    discountValueType: Yup.string(),
    noOfBuy: Yup.number(),
    noOfGet: Yup.number(),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      code: "",
      amount: 0,
      percentage: 0,
      discountValueType: "FIXED_AMOUNT",
      numberOfDiscounts: "",
      startDate: new Date().toString(),
      endDate: new Date().toString(),
      type: "",
      noOfBuy: 0,
      noOfGet: 0,
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, setFieldError }) => {
      if (
        values.type !== "OFF_PRODUCT" &&
        values.type !== "OFF_ORDER" &&
        values.type !== "BUY_GET"
      ) {
        setFieldError("type", "Select one discount type.");
        return;
      }
      if (values.type === "OFF_PRODUCT" || values.type === "OFF_ORDER") {
        if (values.discountValueType === "PERCENTAGE") {
          if (values.percentage <= 0) {
            setFieldError("percentage", "This field is required.");
            return;
          }
        } else if (values.discountValueType === "FIXED_AMOUNT") {
          if (values.amount <= 0) {
            setFieldError("amount", "This field is required.");
            return;
          }
        }
      } else if (values.type === "BUY_GET") {
        let error = false;
        if (values.noOfBuy <= 0) {
          setFieldError("noOfBuy", "Number of Buy is required.");
          error = true;
        } else if (values.noOfGet <= 0) {
          setFieldError("noOfGet", "Number of Get is required.");
          error = true;
        }
        if (error) return;
      }

      updateDiscount({ payload: values, id: id! })
        .unwrap()
        .then(() => {
          Swal.fire({
            title: "Success!",
            text: "Discount created successfully",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed || result.isDenied || result.isDismissed) {
              navigate("/discounts");
            }
          });
        })
        .catch((err: any) => {
          toast.error(
            err?.data?.message ||
              "Error creating discount, please try again later"
          );
        })
        .finally(() => {
          setSubmitting(false);
        });
      return;
    },
  });

  useEffect(() => {
    const data = (fetchedDiscount as any)?.data;

    formik.setValues({
      title: data?.title,
      description: data?.description,
      code: data?.code,
      amount: data?.amount,
      percentage: data?.percentage,
      discountValueType: data?.discountValueType,
      numberOfDiscounts: data?.numberOfDiscounts,
      startDate: data?.startDate,
      endDate: data?.endDate,
      type: data?.type,
      noOfBuy: data?.noOfBuy,
      noOfGet: data?.noOfGet,
    });

    const newData = discountValueTypeOptions.map((item) => {
      return {
        ...item,
        selected: item.value === data?.discountValueType ? true : false,
      };
    });

    setDiscountValueTypeOptions([...newData]);
  }, [fetchedDiscount]);

  const handleDiscountValueTypeChange = (id: number) => {
    const newData = discountValueTypeOptions.map((item, index) => {
      return {
        ...item,
        selected: index === id ? true : false,
      };
    });

    setDiscountValueTypeOptions([...newData]);
  };

  const DiscountTypeOptions = [
    {
      label: "Amount off product",
      value: "OFF_PRODUCT",
    },
    {
      label: "Amount off order",
      value: "OFF_ORDER",
    },
    {
      label: "Buy X and Get Y",
      value: "BUY_GET",
    },
  ];

  const handleDelete = () => {
    deleteDiscount(id!)
      .unwrap()
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "You have successfully deleted a discount",
          icon: "success",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed || result.isDenied || result.isDismissed) {
            navigate("/discounts");
          }
        });
      })
      .catch((err: any) => {
        toast.error(
          err?.data?.message || "Error deleting this discount, please try agaom"
        );
      });
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-row justify-start gap-x-3 items-center mb-4">
        <div
          onClick={() => navigate(-1)}
          className="p-1.5 rounded-md bg-white cursor-pointer"
        >
          <IoIosArrowBack size="1.5rem" />
        </div>
        <h2 className="font-semibold text-[20px] text-shades-gray">Back</h2>
      </div>

      <div className="bg-white w-full flex flex-row justify-between items-center gap-x-3 rounded-lg px-3 py-2 mb-3">
        <h2 className="text-[18px] font-semibold">Edit Discount</h2>
        <button
          onClick={handleToggle}
          className="text-status-danger py-1 px-2 rounded-md text-[14px] font-semibold border-2 border-status-danger hover:bg-status-danger hover:text-white transition-all ease-in-out flex flex-row items-center gap-x-2"
        >
          <AiOutlineExport size="1.2rem" /> Delete discount
        </button>
      </div>

      <div className="w-full flex-col p-3 pb-14 flex bg-white rounded-lg">
        <div className="w-full flex sm:flex-row flex-col gap-x-3 flex-wrap">
          <div className="w-full flex-1 flex flex-col">
            <FormInput
              name="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              label="Discount title"
              placeholder="Enter your discount title"
              defaultValue={formik.values.title}
              error={formik.touched.title && formik.errors.title}
            />
            <FormInput
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Discount description"
              placeholder="Enter your discount description"
              defaultValue={formik.values.description}
              error={formik.touched.description && formik.errors.description}
            />
            {formik.values.discountValueType?.length > 0 && (
              <FormSelect
                onChange={(value) => formik.setFieldValue("type", value)}
                onBlur={formik.handleBlur}
                required
                label="Select discount type"
                placeholder="Select"
                options={DiscountTypeOptions}
                defaultValue={
                  DiscountTypeOptions.filter(
                    (item) => item.value === formik.values.type
                  )[0]?.value!
                }
                error={formik.touched.type && formik.errors.type}
              />
            )}

            {formik.values.type === "BUY_GET" ? (
              <>
                <FormInput
                  name="amount"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  label="Number of buy"
                  placeholder="Enter number of buy"
                  defaultValue={formik.values.noOfBuy}
                  error={formik.touched.noOfBuy && formik.errors.noOfBuy}
                />
                <FormInput
                  name="amount"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  label="Number of get"
                  placeholder="Enter number of get"
                  defaultValue={formik.values.noOfGet}
                  error={formik.touched.noOfGet && formik.errors.noOfGet}
                />
              </>
            ) : formik.values.type === "OFF_PRODUCT" ||
              formik.values.type === "OFF_ORDER" ? (
              <>
                <div className="flex flex-col my-3">
                  <h3 className="text-[14px] font-semibold mb-[0.8px]">
                    Select discount Value Type
                  </h3>
                  <div className="w-full flex flex-row justify-between px-3 py-2 border-[2px] border-[#d6d6da] rounded-md">
                    {discountValueTypeOptions.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => handleDiscountValueTypeChange(index)}
                        className={`w-full px-2.5 py-1.5 flex items-center justify-center rounded-md cursor-pointer ${
                          item?.selected
                            ? "bg-shades-primary text-shades-white"
                            : ""
                        }`}
                      >
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>
                {formik.values.discountValueType === "PERCENTAGE" ? (
                  <FormInput
                    name="percentage"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    label="Percentage for Discount"
                    placeholder="Enter percentage for discount"
                    defaultValue={formik.values.percentage}
                    error={
                      formik.touched.percentage && formik.errors.percentage
                    }
                  />
                ) : formik.values.discountValueType === "FIXED_AMOUNT" ? (
                  <FormInput
                    name="amount"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    label="Amount for Discount"
                    placeholder="Enter amount for discount"
                    defaultValue={formik.values.amount}
                    error={formik.touched.amount && formik.errors.amount}
                  />
                ) : null}
              </>
            ) : null}

            <FormInput
              name="code"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              label="Discount code"
              placeholder="Enter your discount code"
              defaultValue={formik.values.code}
              error={formik.touched.code && formik.errors.code}
            />
          </div>
          <div className="w-full flex-1 flex flex-col">
            <FormInput
              name="numberOfDiscounts"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              label="Maximum discount uses"
              placeholder="Enter Maximum number"
              defaultValue={formik.values.numberOfDiscounts}
              error={
                formik.touched.numberOfDiscounts &&
                formik.errors.numberOfDiscounts
              }
            />
            <FormInput
              name="startDate"
              type="date"
              onChange={(value) => formik.setFieldValue("startDate", value)}
              onBlur={formik.handleBlur}
              defaultValue={new Date(
                formik.values.startDate || ""
              )?.toString()}
              required
              label="Start date"
              placeholder="Enter date"
              error={formik.touched.startDate && formik.errors.startDate}
            />
            <FormInput
              name="endDate"
              type="date"
              onChange={(value) => formik.setFieldValue("endDate", value)}
              onBlur={formik.handleBlur}
              defaultValue={new Date(
                formik.values.endDate || ""
              )?.toString()}
              required
              label="End date"
              placeholder="Enter date"
              error={formik.touched.endDate && formik.errors.endDate}
              startDate={formik.values.startDate}
            />
          </div>
        </div>
        <div className="w-full max-w-[400px] mx-auto mt-8">
          <button
            type="submit"
            onClick={(e: any) => formik.handleSubmit(e)}
            className="w-full bg-shades-secondary text-white hover:text-shades-secondary hover:bg-white py-2 px-3 rounded-md text-[14px] border hover:border-shades-secondary transition-all ease-in-out"
          >
            Save
          </button>
        </div>
      </div>

      <Modal isOpen={isOpen} handleClose={handleToggle}>
        <Spin spinning={isLoading}>
          <div className="p-6 flex flex-col items-center justify-center">
            <h4 className="text-base text-shades-primary font-semibold mb-4">
              Delete discount
            </h4>
            <p className="text-[14px] font-normal mb-8">
              Are you sure you want to delete this Discount?
            </p>

            <div className="w-full flex flex-row gap-x-3 items-center justify-between">
              <button
                onClick={handleToggle}
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
      </Modal>
    </div>
  );
};

export default NewDiscount;
