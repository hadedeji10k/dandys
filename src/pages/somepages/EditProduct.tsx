import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack, IoMdAddCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import Image from "@/assets/image.jpg";
import FormInput from "@/component/FormInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useGetCategoriesQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/api/sellerApiCalls";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import FormSelect from "@/component/FormSelect";
import Loader from "@/component/Loader";

interface ICategory {
  label: string;
  value: string;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  brandName: Yup.string().required("Brand name is required"),
  model: Yup.string().required("Model is required"),
  vendor: Yup.string(),
  expiryDate: Yup.string().required("Expiry date is required"),
  manufactureDate: Yup.string().required("Manufacture date is required"),
  isoNumber: Yup.string().required("ISO number is required"),
  nafdacNumber: Yup.string().required("NAFDAC number is required"),
  height: Yup.string(),
  weight: Yup.string(),
  quantity: Yup.number().moreThan(0).required("Quantity is required"),
  stockLimit: Yup.number(),
  costPrice: Yup.number().required("Cost price is required"),
  sellingPrice: Yup.number().required("Selling price is required"),
  saleStart: Yup.string(),
  saleEnd: Yup.string(),
  eanNumber: Yup.string().required("EAN/UPC/ISBN is required"),
  categoryId: Yup.string().required("Category is required"),
});

const EditProduct = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [count, setCount] = useState<number[]>([]);

  const [categories, setCategories] = useState<ICategory[]>([]);
  const { data: fetchedCategories, isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  const { data: fetchedProduct, isLoading: productLoading } =
    useGetProductByIdQuery(id!);
  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    const mapped = (fetchedCategories as any)?.data?.map((item: any) => {
      return {
        label: item?.name,
        value: item?.id,
      };
    });
    setCategories(mapped);
  }, [fetchedCategories]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      brandName: "",
      model: "",
      vendor: "",
      expiryDate: "",
      manufactureDate: "",
      isoNumber: "",
      nafdacNumber: "",
      height: "",
      weight: "",
      quantity: 0,
      stockLimit: 0,
      costPrice: 0,
      sellingPrice: 0,
      saleStart: "",
      saleEnd: "",
      eanNumber: "",
      categoryId: "",
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      updateProduct({ payload: values, id: id! })
        .unwrap()
        .then(() => {
          Swal.fire({
            title: "Success!",
            text: "Product updated successfully",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed || result.isDenied || result.isDismissed) {
              navigate("/seller/products");
            }
          });
        })
        .catch((err: any) => {
          console.log("Err Response>>>", err);
          toast.error(
            err?.data?.message ||
              "Error updating product, please try again later"
          );
        })
        .finally(() => {
          setSubmitting(false);
        });
      return;
    },
  });

  useEffect(() => {
    const data = (fetchedProduct as any)?.data;

    formik.setValues({
      title: data?.title,
      description: data?.description,
      brandName: data?.brandName,
      model: data?.model,
      vendor: data?.vendor,
      expiryDate: data?.expiryDate,
      manufactureDate: data?.manufactureDate,
      isoNumber: data?.isoNumber,
      nafdacNumber: data?.nafdacNumber,
      height: data?.height,
      weight: data?.weight,
      quantity: data?.quantity,
      stockLimit: data?.stockLimit,
      costPrice: data?.costPrice,
      sellingPrice: data?.sellingPrice,
      saleStart: data?.saleStart,
      saleEnd: data?.saleEnd,
      eanNumber: data?.eanNumber,
      categoryId: data?.categoryId,
    });
  }, [fetchedProduct]);

  const handleRemoveImage = (id: number) => {
    const newCount = count.filter((_, index) => index !== id);
    setCount(newCount as any);
  };
  const handleAddImage = () => {
    setCount([...count, count.length + 1]);
  };

  return categoriesLoading || productLoading ? (
    <Loader spinning={true}>
      <></>
    </Loader>
  ) : (
    <Loader spinning={formik.isSubmitting}>
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-start gap-x-3 items-center">
          <div
            onClick={() => navigate(-1)}
            className="p-1.5 rounded-md bg-white cursor-pointer"
          >
            <IoIosArrowBack size="1.5rem" />
          </div>
          <h2 className="font-semibold text-[20px] text-shades-gray">
            Edit Product
          </h2>
        </div>

        <div className="flex flex-row justify-between items-center bg-white rounded-lg py-2 px-3 mt-3">
          <div className="flex flex-row items-center">
            <h2 className="font-normal text-[16px] mr-2 pr-2">
              {formik.values.title}
            </h2>
          </div>

          <div className="flex flex-row gap-x-2">
            <button
              type="button"
              disabled={formik.isSubmitting}
              onClick={() => formik.handleSubmit()}
              className="bg-shades-primary text-white hover:text-shades-primary hover:bg-white py-1 px-4 rounded-md text-[14px] border hover:border-shades-primary transition-all ease-in-out flex flex-row items-center gap-x-2"
            >
              Save
            </button>
          </div>
        </div>

        <div className="w-full flex flex-row justify-between flex-wrap gap-4 mt-3">
          <div className="flex-1 w-[50%] bg-white rounded-lg p-4">
            {/* Product Images */}
            <div className="w-full flex flex-row flex-wrap mb-6 gap-3">
              {count.map((_, index) => (
                <div
                  key={index}
                  className="w-[95px] h-[95px] rounded-md relative"
                >
                  <img
                    src={Image}
                    alt=""
                    className="w-full h-full rounded-md"
                  />
                  <span
                    className="absolute top-1 right-1 text-shades-secondary cursor-pointer"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <MdCancel size="1.1rem" />
                  </span>
                </div>
              ))}

              <div
                className="w-[95px] h-[95px] rounded-md flex items-center justify-center bg-shades-lightGray/50 cursor-pointer"
                onClick={() => handleAddImage()}
              >
                <span className="text-shades-secondary">
                  <IoMdAddCircle size="3rem" />
                </span>
              </div>
            </div>
            {/* Form */}
            <div>
              <FormInput
                name="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.title}
                required
                label="Title"
                placeholder="Enter your title"
                error={formik.touched.title && formik.errors.title}
              />
              <FormInput
                name="brandName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.brandName}
                required
                label="Brand name"
                placeholder="Enter your brand name"
                error={formik.touched.brandName && formik.errors.brandName}
              />
              <FormInput
                name="model"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.model}
                required
                label="Model"
                placeholder="Enter model"
                error={formik.touched.model && formik.errors.model}
              />
              <FormInput
                name="vendor"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.vendor}
                label="Vendor"
                placeholder="Select vendor"
                error={formik.touched.vendor && formik.errors.vendor}
              />
              <FormInput
                name="description"
                type="textarea"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.description}
                required
                label="Description"
                placeholder="Enter your description"
                error={formik.touched.description && formik.errors.description}
              />
              <FormInput
                name="expiryDate"
                type="date"
                onChange={(value) => formik.setFieldValue("expiryDate", value)}
                onBlur={formik.handleBlur}
                defaultValue={new Date(
                  formik.values.expiryDate || ""
                )?.toString()}
                required
                label="Product expiry date"
                placeholder="Enter date"
                error={formik.touched.expiryDate && formik.errors.expiryDate}
                startDate={formik.values.manufactureDate}
              />
              <FormInput
                name="manufactureDate"
                type="date"
                onChange={(value) =>
                  formik.setFieldValue("manufactureDate", value)
                }
                onBlur={formik.handleBlur}
                defaultValue={new Date(
                  formik.values.manufactureDate || ""
                )?.toString()}
                required
                label="Product manufacture date"
                placeholder="Enter date"
                error={
                  formik.touched.manufactureDate &&
                  formik.errors.manufactureDate
                }
              />
              <FormInput
                name="isoNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.isoNumber}
                required
                label="ISO certification number"
                placeholder="Enter number"
                error={formik.touched.isoNumber && formik.errors.isoNumber}
              />
              <FormInput
                name="nafdacNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.nafdacNumber}
                required
                label="NAFDAC registration number"
                placeholder="Enter number"
                error={
                  formik.touched.nafdacNumber && formik.errors.nafdacNumber
                }
              />
            </div>
          </div>
          <div className="flex-1 w-[50%] bg-white rounded-lg p-4">
            {/* Form */}
            <div>
              <FormSelect
                onChange={(value) => formik.setFieldValue("categoryId", value)}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.categoryId!}
                required
                label="Category"
                placeholder="Select category"
                options={categories}
                error={formik.touched.categoryId && formik.errors.categoryId}
              />
              <FormInput
                name="quantity"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.quantity}
                required
                label="Quantity"
                placeholder="Enter item quantity"
                error={formik.touched.quantity && formik.errors.quantity}
              />
              <FormInput
                name="height"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.height}
                label="Height"
                placeholder="Enter height unit"
                error={formik.touched.height && formik.errors.height}
              />
              <FormInput
                name="weight"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.weight}
                label="Weight"
                placeholder="Enter weight unit"
                error={formik.touched.weight && formik.errors.weight}
              />
              <FormInput
                name="costPrice"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.costPrice}
                required
                type="number"
                label="Cost price"
                placeholder="Enter cost price"
                error={formik.touched.costPrice && formik.errors.costPrice}
              />
              <FormInput
                name="sellingPrice"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.sellingPrice}
                required
                type="number"
                label="Sale price"
                placeholder="Enter selling price"
                error={
                  formik.touched.sellingPrice && formik.errors.sellingPrice
                }
              />
              <FormInput
                name="saleStart"
                type="date"
                onChange={(value) => formik.setFieldValue("saleStart", value)}
                onBlur={formik.handleBlur}
                defaultValue={new Date(
                  formik.values.saleStart || ""
                )?.toString()}
                label="Sale start"
                placeholder="Enter date"
                error={formik.touched.saleStart && formik.errors.saleStart}
              />
              <FormInput
                name="saleEnd"
                type="date"
                onChange={(value) => formik.setFieldValue("saleEnd", value)}
                onBlur={formik.handleBlur}
                defaultValue={new Date(formik.values.saleEnd || "")?.toString()}
                label="Sale end"
                placeholder="Enter date"
                error={formik.touched.saleEnd && formik.errors.saleEnd}
                startDate={formik.values.saleStart}
              />
              <FormInput
                name="stockLimit"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.stockLimit}
                required
                type="number"
                label="Low stock limit"
                placeholder="Input stock limit"
                error={formik.touched.stockLimit && formik.errors.stockLimit}
              />
              <FormInput
                name="eanNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.eanNumber}
                required
                label="EAN/UPC/ISBN"
                placeholder="Input EAN/UPC/ISBN"
                error={formik.touched.eanNumber && formik.errors.eanNumber}
              />
            </div>
          </div>
        </div>
      </div>
    </Loader>
  );
};

export default EditProduct;
