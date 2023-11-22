import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteProductByCategoryMutation, useGetSellerCategoriesQuery } from "@/api/sellerApiCalls";
import { ICategory } from "@/interface";
import Face from "@/assets/Face.png"
import { Popover, Spin } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Modal from "@/component/Modal/Modal";

const ProductCategory = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);

    const { data: fetchedCategories, error: _ } = useGetSellerCategoriesQuery();

    useEffect(() => {
      setCategories((fetchedCategories as any)?.data);
    }, [fetchedCategories]);

  return (
    <div className="flex flex-col p-6 rounded-lg bg-shades-white min-h-[40vh] h-full">
      {categories?.length > 0 ? (
        <div className="w-full flex flex-row gap-4 flex-wrap">
          {categories.map((item) => (
            <div className="flex flex-col gap-3 max-w-[250px]">
              <div>
                <img
                  src={item?.imageUrl || Face}
                  alt=""
                  className="w-full max-h-[220px] rounded-lg"
                />
              </div>
              <div className="w-full flex flex-row gap-4 flex-wrap justify-between items-center">
                <h3 className="text-[18px] font-normal">{item?.name}</h3>
                <Popover
                  arrow={false}
                  placement="bottomRight"
                  content={<CategoryMenu id={item?.id!} />}
                  trigger="click"
                >
                  <BsThreeDotsVertical
                    className="cursor-pointer"
                    size="1.2rem"
                  />
                </Popover>
              </div>
            </div>
          ))}
        </div>
      ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-white rounded-lg mt-3">
            <h2 className="text-[18px] font-semibold">No Categories Added Yet!</h2>
            <p>Your history will appear here when you have one</p>
          </div>
      )}
    </div>
  );
};

export default ProductCategory;


const CategoryMenu = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const [deleteProductByCategory, { isLoading }] = useDeleteProductByCategoryMutation();

  const { refetch } = useGetSellerCategoriesQuery();

  const handleDelete = () => {
    deleteProductByCategory(id)
      .unwrap()
      .then(() => {
        refetch();
        handleToggle();
        Swal.fire({
          title: "Success!",
          text: "You have successfully deleted a category with its contents",
          icon: "success",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed || result.isDenied || result.isDismissed) {
          }
        });
      })
      .catch((err) => {
        toast.error(
          err?.data?.message || "Error deleting this category and its content, please try agaom"
        );
      });
  };

  return (
    <>
      <div className="flex flex-col">
        <p
          onClick={() => navigate(`/products?categoryId=${id}`)}
          className="text-[14px] cursor-pointer hover:bg-shades-primary/5 px-6 py-2.5"
        >
          View
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
              Delete Category
            </h4>
            <p className="text-[14px] font-normal mb-8">
              Are you sure you want to delete this category and all it contains?
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
