import { useState } from "react";
import { IoIosArrowBack, IoMdAddCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import Image from "@/assets/image.jpg";
import FormInput from "@/component/FormInput";

const NewProduct = () => {
  const [count, setCount] = useState<number[]>([]);

  const handleRemoveImage = (id: number) => {
    const newCount = count.filter((_, index) => index !== id);
    setCount(newCount as any);
  };
  const handleAddImage = () => {
    setCount([...count, count.length + 1]);
  };

  return (
    <div className="w-full flex flex-col p-6">
      <div className="flex flex-row justify-start gap-x-3 items-center">
        <div className="p-1.5 rounded-md bg-white">
          <IoIosArrowBack size="1.5rem" />
        </div>
        <h2 className="font-semibold text-[20px] text-shades-gray">
          New Product
        </h2>
      </div>

      <div className="flex flex-row justify-between items-center bg-white rounded-lg py-2 px-3 mt-3">
        <div className="flex flex-row items-center">
          <h2 className="font-normal text-[16px] mr-2 pr-2">Body Shampoo</h2>
        </div>

        <div className="flex flex-row gap-x-2">
          <button className="bg-shades-primary text-white hover:text-shades-primary hover:bg-white py-1 px-4 rounded-md text-[14px] border hover:border-shades-primary transition-all ease-in-out flex flex-row items-center gap-x-2">
            Save
          </button>
        </div>
      </div>

      <div className="w-full flex flex-row justify-between flex-wrap gap-4 mt-3">
        <div className="flex-1 w-[50%] bg-white rounded-lg p-4">
          {/* Product Images */}
          <div className="w-full flex flex-row flex-wrap mb-6 gap-3">
            {count.map((_, index) => (
              <div key={index} className="w-[95px] h-[95px] rounded-md relative">
                <img src={Image} alt="" className="w-full h-full rounded-md" />
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
            <FormInput required label="Title" placeholder="Enter your title" />
            <FormInput
              required
              label="Brand name"
              placeholder="Enter your brand name"
            />
            <FormInput required label="Model" placeholder="Enter model" />
            <FormInput required label="Vendor" placeholder="Select vendor" />
            <FormInput
              required
              label="ISO certification number"
              placeholder="Enter number"
            />
            <FormInput
              required
              label="NAFDAC registration number *"
              placeholder="Enter number"
            />
          </div>
        </div>
        <div className="flex-1 w-[50%] bg-white rounded-lg p-4">
          {/* Form */}
          <div>
            <FormInput
              required
              label="Quantity"
              placeholder="Enter item quantity"
            />
            <FormInput
              required
              label="Height"
              placeholder="Enter height unit"
            />
            <FormInput
              required
              label="Weight"
              placeholder="Enter weight unit"
            />
            <FormInput
              required
              type="number"
              label="Cost price"
              placeholder="Enter cost price"
            />
            <FormInput
              required
              type="number"
              label="Sale price"
              placeholder="Enter selling price"
            />
            <FormInput
              required
              type="number"
              label="Low stock limit"
              placeholder="Input stock limit"
            />
            <FormInput
              required
              type="number"
              label="SKU"
              placeholder="Input product SKU"
            />
            <FormInput
              required
              label="EAN/UPC/ISBN"
              placeholder="Input EAN/UPC/ISBN"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
