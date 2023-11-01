import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { BiSolidEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import ProductImage from "@/assets/image.jpg";
import { useEffect, useState } from "react";
import { IProduct } from "@/interface";
import {
  useGetProductByIdQuery,
  useDeleteProductMutation,
} from "@/api/sellerApiCalls";
import { formatDate } from "@/utils/helpers";
import Modal from "@/component/Modal/Modal";
import { Spin } from "antd";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState<IProduct>();

  const { data: fetchedProduct, error: _ } = useGetProductByIdQuery(id!);
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  useEffect(() => {
    setProduct((fetchedProduct as any)?.data);
  }, [fetchedProduct]);

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = () => {
    deleteProduct(id!)
      .unwrap()
      .then(() => {
        handleToggle();
        Swal.fire({
          title: "Success!",
          text: "You have successfully deleted a product",
          icon: "success",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed || result.isDenied || result.isDismissed) {
            navigate(-1)
          }
        });
      })
      .catch((err: any) => {
        toast.error(
          err?.data?.message || "Error deleting this product, please try agaom"
        );
      });
  };

  return (
    <Spin spinning={isLoading}>
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-start gap-x-3 items-center">
          <div
            onClick={() => navigate(-1)}
            className="p-1.5 rounded-md bg-white cursor-pointer"
          >
            <IoIosArrowBack size="1.5rem" />
          </div>
          <h2 className="font-semibold text-[20px] text-shades-gray">
            Product Details
          </h2>
        </div>
        <div className="flex flex-row justify-between items-center bg-white rounded-lg py-2 px-3 mt-3">
          <h2 className="font-normal text-[16px]">
            Product I.D -{" "}
            <span className="text-shades-primary">{product?.sku}</span>
          </h2>
          <div className="flex flex-row gap-x-2">
            <button onClick={handleToggle} className="text-shades-red py-1 px-2 rounded-md text-[14px] border border-shades-red hover:bg-shades-red hover:text-white transition-all ease-in-out flex flex-row items-center gap-x-2">
              <RiDeleteBin6Line /> Delete product
            </button>
            <button
              onClick={() => navigate(`/edit-product/${id}`)}
              className="bg-shades-primary text-white hover:text-shades-primary hover:bg-white py-1 px-2 rounded-md text-[14px] border hover:border-shades-primary transition-all ease-in-out flex flex-row items-center gap-x-2"
            >
              <BiSolidEditAlt /> Edit product
            </button>
          </div>
        </div>

        <div className="w-full flex flex-row justify-between gap-x-10 bg-white p-4 rounded-lg mt-3">
          <div className="max-w-[380px] max-h-[380px] rounded-lg">
            <img
              src={ProductImage}
              alt=""
              className="w-full h-full rounded-lg"
            />
          </div>
          <div className="w-full flex flex-col">
            <h2 className="text-shades-gray text-[28px] font-semibold mt-10 mb-12">
              {product?.title}
            </h2>

            <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-10">
              <div className="mb-4">
                <p className="text-[14px] text-shades-gray">Category</p>
                <p className="text-[14px] text-shades-gray font-medium">
                  {product?.category?.name}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-[14px] text-shades-gray">Brand Name</p>
                <p className="text-[14px] text-shades-gray font-medium">
                  {product?.brandName}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-[14px] text-shades-gray">Model</p>
                <p className="text-[14px] text-shades-gray font-medium">
                  {product?.model}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-[14px] text-shades-gray">Vendor</p>
                <p className="text-[14px] text-shades-gray font-medium">
                  {product?.vendor}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-[14px] text-shades-gray">Cost Price</p>
                <p className="text-[14px] text-shades-gray font-medium">
                  {product?.costPrice}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-[14px] text-shades-gray">Selling Price</p>
                <p className="text-[14px] text-shades-gray font-medium">
                  {product?.sellingPrice}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-[14px] text-shades-gray">
                  Quantity <small>(remaining)</small>
                </p>
                <p className="text-[14px] text-shades-gray font-medium">
                  {product?.quantity}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-[14px] text-shades-gray">Stock Limit</p>
                <p className="text-[14px] text-shades-gray font-medium">
                  {product?.stockLimit}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-[14px] text-shades-gray">Expiry Date</p>
                <p className="text-[14px] text-shades-gray font-medium">
                  {formatDate(product?.expiryDate || "")}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-[14px] text-shades-gray">Manufacture Date</p>
                <p className="text-[14px] text-shades-gray font-medium">
                  {formatDate(product?.manufactureDate || "")}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-[14px] text-shades-gray">ISO Number</p>
                <p className="text-[14px] text-shades-gray font-medium">
                  {product?.isoNumber}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-[14px] text-shades-gray">NAFDAC Number</p>
                <p className="text-[14px] text-shades-gray font-medium">
                  {product?.nafdacNumber}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Modal isOpen={isOpen} handleClose={handleToggle}>
          <Spin spinning={isLoading}>
            <div className="p-6 flex flex-col items-center justify-center">
              <h4 className="text-base text-shades-primary font-semibold mb-4">
                Delete product
              </h4>
              <p className="text-[14px] font-normal mb-8">
                Are you sure you want to delete this Product?
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
    </Spin>
  );
};

export default ProductPage;
