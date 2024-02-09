import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineExport } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import { Badge, Popover, Spin } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  useGetSellerProductsQuery,
  useDeleteProductMutation,
  useGetSellerProductsByCategoryIdQuery,
} from "@/api/sellerApiCalls";
import { IProduct } from "@/interface";
import Modal from "@/component/Modal/Modal";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { formatDate } from "@/utils/helpers";
import Loader from "@/component/Loader";

const AllProduct = () => {
  const navigate = useNavigate();
   const search = useLocation().search;
   const categoryId = new URLSearchParams(search).get("categoryId");

  const [products, setProducts] = useState<IProduct[]>([]);

  const { data: fetchedProducts, isLoading: isProductLoading } =
    useGetSellerProductsQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
  const { data: fetchedProductsByCategory, isLoading: isCategoryProductLoading } = useGetSellerProductsByCategoryIdQuery(categoryId!);
  
  useEffect(() => {
    if (categoryId) {
      setProducts((fetchedProductsByCategory as any)?.data?.result);
    } else {
      setProducts((fetchedProducts as any)?.data?.result);
    }
  }, [fetchedProducts, fetchedProductsByCategory]);

  return (
    <Loader spinning={isProductLoading || isCategoryProductLoading}>
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between gap-4 flex-wrap items-center bg-white p-3 rounded-lg">
          <div className="flex flex-row gap-3 flex-wrap">
            <button className="py-2 px-3 text-[14px] font-medium bg-[#DEC3D6]/90 text-shades-gray border border-[#DEC3D6] hover:bg-[#DEC3D6] hover:text-shades-white rounded-lg">
              All
            </button>
            <button className="py-2 px-3 text-[14px] font-medium border border-shades-gray/30 text-shades-gray hover:bg-[#DEC3D6] hover:border-[#DEC3D6] hover:text-shades-white rounded-lg">
              Active
            </button>
            <button className="py-2 px-3 text-[14px] font-medium border border-shades-gray/30 text-shades-gray hover:bg-[#DEC3D6] hover:border-[#DEC3D6] hover:text-shades-white rounded-lg">
              Draft
            </button>
            <button className="py-2 px-3 text-[14px] font-medium border border-shades-gray/30 text-shades-gray hover:bg-[#DEC3D6] hover:border-[#DEC3D6] hover:text-shades-white rounded-lg">
              Archived
            </button>
          </div>
          <div className="flex flex-row gap-3 flex-wrap">
            <button className="text-shades-secondary py-2 px-3 rounded-md text-[14px] font-semibold border-2 border-shades-secondary hover:bg-shades-secondary hover:text-white transition-all ease-in-out flex flex-row items-center gap-x-2">
              <AiOutlineExport /> Export
            </button>
            <button
              onClick={() =>
                navigate(
                  categoryId
                    ? `/new-product?categoryId=${categoryId}`
                    : "/new-product"
                )
              }
              className="bg-shades-secondary text-white hover:text-shades-secondary hover:bg-white py-2 px-3 rounded-md text-[14px] border hover:border-shades-secondary transition-all ease-in-out flex flex-row items-center gap-x-2"
            >
              Add new product
            </button>
          </div>
        </div>
        <div className="w-full mt-3 flex flex-row justify-between gap-x-3 items-center bg-white py-2 px-3 rounded-lg text-shades-primary">
          <div className="w-full bg-shades-secondary/[12%] h-8 rounded-lg px-2 flex flex-row items-center gap-x-2 ">
            <BiSearch size="1.5rem" />
            <input
              type="text"
              className="bg-transparent w-full border-none outline-none placeholder:text-shades-primary"
              placeholder="Search products"
            />
          </div>
          <button className="p-1 rounded-md bg-white border-2 border-shades-primary hover:bg-shades-primary hover:text-white">
            <FiFilter size="1.5rem" />
          </button>
        </div>

        {/* Table */}
        {products?.length > 0 ? (
          <div className="flex w-full flex-col mt-3 overflow-x-scroll font-medium no_scrollbar bg-white rounded-lg mb-5">
            {/* Head */}
            <div className="min-w-max w-full flex flex-row gap-x-3 justify-between py-3 px-3 bg-shades-lightGray/90">
              <div className="min-w-[50px] max-w-[50px] w-full"></div>
              <div className="min-w-[150px] max-w-[150px] w-full flex items-center text-[14px]">
                Product
              </div>
              <div className="min-w-[100px] max-w-[100px] w-full flex items-center text-[14px]">
                SKU
              </div>
              <div className="min-w-[120px] max-w-[120px] w-full flex items-center text-[14px]">
                Category
              </div>
              <div className="min-w-[120px] max-w-[120px] w-full flex items-center text-[14px]">
                Vendor
              </div>
              <div className="min-w-[120px] max-w-[120px] w-full flex items-center text-[14px]">
                Cost Price
              </div>
              <div className="min-w-[120px] max-w-[120px] w-full flex items-center text-[14px]">
                Selling Price
              </div>
              <div className="min-w-[70px] max-w-[70px] w-full flex items-center text-[14px]">
                QTY
              </div>
              <div className="min-w-[100px] max-w-[100px] w-full flex items-center text-[14px]">
                Created
              </div>
              <div className="min-w-[100px] max-w-[100px] w-full flex items-center text-[14px]">
                Status
              </div>
              <div className="min-w-[40px] max-w-[40px] w-full flex items-center text-[14px] cursor-pointer">
                <BsThreeDotsVertical size="1.2rem" />
              </div>
            </div>
            {/* body */}
            <div className="w-full">
              {products?.map((item, index) => (
                <div
                  key={index}
                  className={`min-w-max w-full flex flex-row gap-x-3 justify-between py-2.5 px-3 bg-shades-white/80 my-1 border-shades-lightGray ${
                    index + 1 === products.length ? "" : "border-b-2"
                  }`}
                >
                  <div className="min-w-[50px] max-w-[50px] w-full flex items-center">
                    <img
                      src={item?.productImage[0]?.imageUrl}
                      className="w-[45px] h-[45px] rounded-lg"
                    />
                  </div>
                  <div className="min-w-[150px] max-w-[150px] w-full flex items-center text-[14px]">
                    {item?.title}
                  </div>
                  <div className="min-w-[100px] max-w-[100px] w-full flex items-center text-[14px] font-medium text-shades-primary">
                    {item?.sku}
                  </div>
                  <div className="min-w-[120px] max-w-[120px] w-full flex items-center text-[14px]">
                    {item?.category?.name}
                  </div>
                  <div className="min-w-[120px] max-w-[120px] w-full flex items-center text-[14px]">
                    {item?.vendor}
                  </div>
                  <div className="min-w-[120px] max-w-[120px] w-full flex items-center text-[14px]">
                    {item?.costPrice}
                  </div>
                  <div className="min-w-[120px] max-w-[120px] w-full flex items-center text-[14px]">
                    {item?.sellingPrice}
                  </div>
                  <div className="min-w-[70px] max-w-[70px] w-full flex items-center text-[14px]">
                    {item?.quantity}
                  </div>
                  <div className="min-w-[100px] max-w-[100px] w-full flex items-center text-[14px]">
                    {formatDate(item?.createdAt!)}
                  </div>
                  <div className="min-w-[100px] max-w-[100px] w-full flex items-center text-[14px]">
                    <span className="py-2 px-2.5 rounded-md bg-shades-lightGreen text-status-success">
                      <Badge status="success" /> Active
                    </span>
                  </div>
                  <div className="min-w-[40px] max-w-[40px] w-full flex items-center text-[14px] cursor-pointer">
                    <Popover
                      arrow={false}
                      placement="bottomRight"
                      content={<ProductMenu id={item?.id!} />}
                      trigger="click"
                    >
                      <BsThreeDotsVertical size="1.2rem" />
                    </Popover>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              <div></div>
            </div>
          </div>
        ) : (
          <div className="min-h-[30vh] w-full flex flex-col items-center justify-center bg-white rounded-lg mt-3">
            <h2 className="text-[18px] font-semibold mb-2">No Product Added Yet!</h2>
            <p>Your history will appear here when you have one</p>
          </div>
        )}
      </div>
    </Loader>
  );
};

export default AllProduct;

const ProductMenu = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const [deleteProduct, {isLoading}] = useDeleteProductMutation();

  const { refetch } = useGetSellerProductsQuery();

  const handleDelete = () => {
    deleteProduct(id)
      .unwrap()
      .then(() => {
        refetch();
        handleToggle()
        Swal.fire({
          title: "Success!",
          text: "You have successfully deleted a product",
          icon: "success",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed || result.isDenied || result.isDismissed) {
          }
        });
      })
      .catch((err) => {
        toast.error(
          err?.data?.message || "Error deleting this product, please try agaom"
        );
      });
  };

  return (
    <>
      <div className="flex flex-col">
        <p
          onClick={() => navigate(`/product-details/${id}`)}
          className="text-[14px] cursor-pointer hover:bg-shades-primary/5 px-6 py-2.5"
        >
          View
        </p>
        <p
          onClick={() => navigate(`/edit-product/${id}`)}
          className="text-[14px] cursor-pointer hover:bg-shades-primary/5 px-6 py-2.5"
        >
          Edit
        </p>
        <p
          onClick={handleToggle}
          className="text-[14px] cursor-pointer hover:bg-shades-primary/5 px-6 py-2.5 text-status-danger"
        >
          Delete
        </p>
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
    </>
  );
};
