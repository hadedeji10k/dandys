import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowBack, IoMdAddCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import FormInput from "@/component/FormInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useGetCategoriesQuery } from "@/api/sellerApiCalls";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import FormSelect from "@/component/FormSelect";
import Loader from "@/component/Loader";
import API from "@/utils/axiosInstance";

interface ICategory {
  label: string;
  value: string;
}

const NewProduct = () => {
  const navigate = useNavigate();

  const search = useLocation().search;
  const categoryId = new URLSearchParams(search).get("categoryId");

  const hiddenFileInput = useRef(null);
  const [images, setImages] = useState<any>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const [categories, setCategories] = useState<ICategory[]>([]);

  const { data: fetchedCategories, error: _ } = useGetCategoriesQuery();

  useEffect(() => {
    const mapped = (fetchedCategories as any)?.data?.map((item: any) => {
      return {
        label: item?.name,
        value: item?.id,
      };
    });
    setCategories(mapped);
  }, [fetchedCategories]);

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls: string[] = [];
    images.forEach((image: any) => {
      newImageUrls.push(URL.createObjectURL(image));
    });
    setImageUrls(newImageUrls);
  }, [images]);

  const handleRemoveImage = (id: number) => {
    const newImageUrls = imageUrls.filter((_, index) => index !== id);
    setImageUrls(newImageUrls);
    const newImages = images.filter((item: any, index: number) => {
      if (index === id) {
        return;
      } else {
        return item;
      }
    });
    setImages(newImages);
  };

  const handleAddImages = (e: any) => {
    setImages([...images, ...e.target.files]);
  };

  const handleClick = () => {
    (hiddenFileInput?.current as any).click();
  };

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
      categoryId: categoryId || "",
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      if (images.length < 1) {
        toast.error("Product Image is required.");
        setSubmitting(false);
        return;
      }

      let form_data = new FormData();
      for (let [key, value] of Object.entries(values)) {
        form_data.append(key, value.toString());
      }

      for (let i = 0; i < images.length; i++) {
        form_data.append("images", images[i]);
      }

      API.post("/products", form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
        .then(() => {
          Swal.fire({
            title: "Success!",
            text: "Product created successfully",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed || result.isDenied || result.isDismissed) {
              navigate("/products");
            }
          });
        })
        .catch((err: any) => {
          console.log("Err Response>>>", err);
          toast.error(
            err?.data?.message ||
              "Error creating product, please try again later"
          );
        })
        .finally(() => {
          setSubmitting(false);
        });
      return;
    },
  });

  return (
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
            New Product
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
              {imageUrls.map((image, index) => (
                <div
                  key={index}
                  className="w-[95px] h-[95px] rounded-md relative"
                >
                  <img
                    src={image}
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
                onClick={handleClick}
              >
                <span className="text-shades-secondary">
                  <IoMdAddCircle size="3rem" />
                </span>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                ref={hiddenFileInput}
                onChange={handleAddImages}
                className="hidden"
              />
            </div>
            {/* Form */}
            <div>
              <FormInput
                name="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                label="Title"
                placeholder="Enter your title"
                error={formik.touched.title && formik.errors.title}
                defaultValue={formik.values.title}
              />
              <FormInput
                name="brandName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                label="Brand name"
                placeholder="Enter your brand name"
                error={formik.touched.brandName && formik.errors.brandName}
                defaultValue={formik.values.brandName}
              />
              <FormInput
                name="model"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                label="Model"
                placeholder="Enter model"
                error={formik.touched.model && formik.errors.model}
                defaultValue={formik.values.model}
              />
              <FormInput
                name="vendor"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Vendor"
                placeholder="Select vendor"
                error={formik.touched.vendor && formik.errors.vendor}
                defaultValue={formik.values.model}
              />
              <FormInput
                name="description"
                type="textarea"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                label="Description"
                placeholder="Enter your description"
                error={formik.touched.description && formik.errors.description}
                defaultValue={formik.values.description}
              />
              <FormInput
                name="expiryDate"
                type="date"
                onChange={(value) => formik.setFieldValue("expiryDate", value)}
                onBlur={formik.handleBlur}
                required
                label="Product expiry date"
                placeholder="Enter date"
                error={formik.touched.expiryDate && formik.errors.expiryDate}
                startDate={formik.values.manufactureDate}
                defaultValue={formik.values.expiryDate}
              />
              <FormInput
                name="manufactureDate"
                type="date"
                onChange={(value) =>
                  formik.setFieldValue("manufactureDate", value)
                }
                onBlur={formik.handleBlur}
                required
                label="Product manufacture date"
                placeholder="Enter date"
                error={
                  formik.touched.manufactureDate &&
                  formik.errors.manufactureDate
                }
                defaultValue={formik.values.manufactureDate}
              />
              <FormInput
                name="isoNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                label="ISO certification number"
                placeholder="Enter number"
                error={formik.touched.isoNumber && formik.errors.isoNumber}
                defaultValue={formik.values.isoNumber}
              />
              <FormInput
                name="nafdacNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                label="NAFDAC registration number *"
                placeholder="Enter number"
                error={
                  formik.touched.nafdacNumber && formik.errors.nafdacNumber
                }
                defaultValue={formik.values.nafdacNumber}
              />
            </div>
          </div>
          <div className="flex-1 w-[50%] bg-white rounded-lg p-4">
            {/* Form */}
            <div>
              <FormSelect
                onChange={(value) => formik.setFieldValue("categoryId", value)}
                onBlur={formik.handleBlur}
                disabled={categoryId?.length! > 0}
                defaultValue={
                  categoryId ? categoryId : formik.values.categoryId
                }
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
                required
                label="Quantity"
                placeholder="Enter item quantity"
                error={formik.touched.quantity && formik.errors.quantity}
                defaultValue={formik.values.quantity}
              />
              <FormInput
                name="height"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Height"
                placeholder="Enter height unit"
                error={formik.touched.height && formik.errors.height}
                defaultValue={formik.values.height}
              />
              <FormInput
                name="weight"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Weight"
                placeholder="Enter weight unit"
                error={formik.touched.weight && formik.errors.weight}
                defaultValue={formik.values.weight}
              />
              <FormInput
                name="costPrice"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                type="number"
                label="Cost price"
                placeholder="Enter cost price"
                error={formik.touched.costPrice && formik.errors.costPrice}
                defaultValue={formik.values.costPrice}
              />
              <FormInput
                name="sellingPrice"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                type="number"
                label="Sale price"
                placeholder="Enter selling price"
                error={
                  formik.touched.sellingPrice && formik.errors.sellingPrice
                }
                defaultValue={formik.values.sellingPrice}
              />
              <FormInput
                name="saleStart"
                type="date"
                onChange={(value) => formik.setFieldValue("saleStart", value)}
                onBlur={formik.handleBlur}
                label="Sale start"
                placeholder="Enter date"
                error={formik.touched.saleStart && formik.errors.saleStart}
                defaultValue={formik.values.saleStart}
              />
              <FormInput
                name="saleEnd"
                type="date"
                onChange={(value) => formik.setFieldValue("saleEnd", value)}
                onBlur={formik.handleBlur}
                label="Sale end"
                placeholder="Enter date"
                error={formik.touched.saleEnd && formik.errors.saleEnd}
                startDate={formik.values.saleStart}
                defaultValue={formik.values.saleEnd}
              />
              <FormInput
                name="stockLimit"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                type="number"
                label="Low stock limit"
                placeholder="Input stock limit"
                error={formik.touched.stockLimit && formik.errors.stockLimit}
                defaultValue={formik.values.stockLimit}
              />
              <FormInput
                name="eanNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                label="EAN/UPC/ISBN"
                placeholder="Input EAN/UPC/ISBN"
                error={formik.touched.eanNumber && formik.errors.eanNumber}
                defaultValue={formik.values.eanNumber}
              />
            </div>
          </div>
        </div>
      </div>
    </Loader>
  );
};

export default NewProduct;
