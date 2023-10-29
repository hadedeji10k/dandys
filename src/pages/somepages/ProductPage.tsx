import { IoIosArrowBack } from "react-icons/io";
import { BiSolidEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import ProductImage from "@/assets/image.jpg"

const ProductPage = () => {
  return (
    <div className="w-full flex flex-col p-6">
      <div className="flex flex-row justify-start gap-x-3 items-center">
        <div className="p-1.5 rounded-md bg-white">
          <IoIosArrowBack size="1.5rem" />
        </div>
        <h2 className="font-semibold text-[20px] text-shades-gray">
          Product Details
        </h2>
      </div>
      <div className="flex flex-row justify-between items-center bg-white rounded-lg py-2 px-3 mt-3">
        <h2 className="font-normal text-[16px]">
          Product I.D - <span className="text-shades-primary">#CR727HLA</span>
        </h2>
        <div className="flex flex-row gap-x-2">
          <button className="text-shades-red py-1 px-2 rounded-md text-[14px] border border-shades-red hover:bg-shades-red hover:text-white transition-all ease-in-out flex flex-row items-center gap-x-2">
            <RiDeleteBin6Line /> Delete product
          </button>
          <button className="bg-shades-primary text-white hover:text-shades-primary hover:bg-white py-1 px-2 rounded-md text-[14px] border hover:border-shades-primary transition-all ease-in-out flex flex-row items-center gap-x-2">
            <BiSolidEditAlt /> Edit product
          </button>
        </div>
      </div>

      <div className="w-full flex flex-row justify-between gap-x-10 bg-white p-4 rounded-lg mt-3">
        <div className="max-w-[380px] max-h-[380px] rounded-lg">
          <img src={ProductImage} alt="" className="w-full h-full rounded-lg" />
        </div>
        <div className="w-full flex flex-col">
          <h2 className="text-shades-gray text-[28px] font-semibold mt-10 mb-12">
            Body Shampoo
          </h2>

          <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-10">
            <div className="mb-4">
              <p className="text-[14px] text-shades-gray">Category</p>
              <p className="text-[14px] text-shades-gray font-medium">
                Women / body{" "}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-[14px] text-shades-gray">Category</p>
              <p className="text-[14px] text-shades-gray font-medium">
                Women / body{" "}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-[14px] text-shades-gray">Category</p>
              <p className="text-[14px] text-shades-gray font-medium">
                Women / body{" "}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-[14px] text-shades-gray">Category</p>
              <p className="text-[14px] text-shades-gray font-medium">
                Women / body{" "}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-[14px] text-shades-gray">Category</p>
              <p className="text-[14px] text-shades-gray font-medium">
                Women / body{" "}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-[14px] text-shades-gray">Category</p>
              <p className="text-[14px] text-shades-gray font-medium">
                Women / body{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
