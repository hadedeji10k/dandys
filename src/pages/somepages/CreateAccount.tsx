import { useState } from "react";
import FormInput from "@/component/FormInput";
import { Steps } from "antd";
import { BsCircle } from "react-icons/bs";
import Logo from "@/assets/Logo 1.png";
import { IoIosArrowBack } from "react-icons/io";
import Button from "@/component/Button";
import { BiSolidCircle } from "react-icons/bi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if(step === 2) {
      Swal.fire({
        title: "Success!",
        text: "Account updated successfully",
        icon: "success",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed || result.isDenied || result.isDismissed) {
          navigate("/seller-dashboard");
        }
      });
    } else {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-shades-primary bg-no-repeat bg-cover bg-[linear-gradient(to_right_bottom,#903677,rgba(179,70,148,0.8)),url('/public/img/female.png')]">
      <img src={Logo} className="absolute top-5 left-5 w-[120px] h-[40px]" />

      <div className="w-full p-10 max-w-[85%] h-full min-h-[70vh] max-h-[70vh] overflow-y-scroll no_scrollbar flex flex-col items-center lg:justify-center bg-shades-white rounded-lg">
        <div className="w-full lg:mb-12 md:mb-8 mb-6 text-shades-primary">
          <Steps
            className="font-medium"
            progressDot
            current={step}
            items={[
              {
                title: "Seller's Profile",
              },
              {
                title: "Business profile",
              },
              {
                title: "Bank Details",
              },
            ]}
          />
        </div>

        {step === 0 ? (
          <CreateAccount1 />
        ) : step === 1 ? (
          <CreateAccount2 />
        ) : step === 2 ? (
          <CreateAccount3 />
        ) : null}

        <div className="lg:max-w-[90%] max-w-[400px] w-full lg:mt-12 md:mt-8 mt-6 flex flex-row gap-3 items-center justify-between">
          {step > 0 && (
            <div
              onClick={handlePrev}
              className="p-1.5 rounded-md bg-shades-lightGray/40 cursor-pointer"
            >
              <IoIosArrowBack size="1.5rem" />
            </div>
          )}

          <Button
            handleClick={handleNext}
            className={"px-8 py-3"}
            type={"button"}
            title={"Next"}
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
};

const CreateAccount1 = () => {
  const AccountType = [
    {
      title: "Individual Account",
      selected: false,
    },
    {
      title: "Company Account",
      selected: false,
    },
  ];

  const [accountType, setAccountType] = useState(AccountType);

  const handleSelectAccountType = (id: number) => {
    const newAccountType = accountType.map((item, index) => {
      return {
        ...item,
        selected: id === index ? true : false,
      };
    });
    setAccountType([...newAccountType]);
  };

  return (
    <div className="w-full max-w-[500px]">
      <h2 className="text-2xl font-semibold text-center text-shades-primary">
        Tell us a little about your business
      </h2>

      <div className="mt-8 w-full flex flex-row gap-3 flex-wrap justify-between">
        {accountType.map((item, index) => (
          <div
            key={index}
            onClick={() => handleSelectAccountType(index)}
            className={`w-full max-w-[210px] flex flex-col p-3 rounded-md cursor-pointer ${
              item.selected ? "bg-shades-primary/10" : "bg-shades-lightGray/30"
            }`}
          >
            {item.selected ? (
              <BiSolidCircle size="1.2rem" fill="#8F3677" />
            ) : (
              <BsCircle size="1.2rem" />
            )}
            <div
              className={`w-full flex items-center mt-5 mb-3 font-medium ${
                item.selected ? "text-shades-primary" : "text-shades-gray"
              }`}
            >
              {item.title}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full mt-8">
        <FormInput
          label="Shop Name"
          labelClassName="font-medium text-lg !mb-2"
          placeholder="Shop name"
          required
        />
      </div>
    </div>
  );
};

const CreateAccount2 = () => {
  return (
    <div className="w-full lg:max-w-[90%] max-w-[400px]">
      <h2 className="text-2xl font-semibold text-center text-shades-primary">
        Tell us about your business
      </h2>

      <div className="mt-4 w-full flex flex-col md:flex-row md:gap-3 flex-wrap justify-between">
        <div className="w-full flex-1 flex flex-col sm:min-w-[200px]">
          <FormInput
            label="Shop Name"
            labelClassName="font-medium text-lg !mb-2"
            placeholder="Shop name"
            required
          />
          <FormInput
            label="Shop Name"
            labelClassName="font-medium text-lg !mb-2"
            placeholder="Shop name"
            required
          />
          <FormInput
            label="Shop Name"
            labelClassName="font-medium text-lg !mb-2"
            placeholder="Shop name"
            required
          />
        </div>
        <div className="w-full flex-1 flex flex-col sm:min-w-[200px]">
          <FormInput
            label="Shop Name"
            labelClassName="font-medium text-lg !mb-2"
            placeholder="Shop name"
            required
          />
          <FormInput
            label="Shop Name"
            labelClassName="font-medium text-lg !mb-2"
            placeholder="Shop name"
            required
          />
          <FormInput
            label="Shop Name"
            labelClassName="font-medium text-lg !mb-2"
            placeholder="Shop name"
            required
          />
        </div>
        <div className="w-full flex-1 flex flex-col sm:min-w-[200px]">
          <FormInput
            label="Shop Name"
            labelClassName="font-medium text-lg !mb-2"
            placeholder="Shop name"
            required
          />
          <FormInput
            label="Shop Name"
            labelClassName="font-medium text-lg !mb-2"
            placeholder="Shop name"
            required
          />
          <FormInput
            label="Shop Name"
            labelClassName="font-medium text-lg !mb-2"
            placeholder="Shop name"
            required
          />
        </div>
      </div>
    </div>
  );
};

const CreateAccount3 = () => {
  return (
    <div className="w-full max-w-[500px]">
      <h2 className="text-2xl font-semibold text-center text-shades-primary">
        Provide your bank details
      </h2>

      <div className="w-full mt-8">
        <FormInput
          label="Bank Name"
          labelClassName="font-medium text-lg !mb-2"
          placeholder="Bank Name"
          className="mb-4"
        />
        <FormInput
          label="Bank account number"
          labelClassName="font-medium text-lg !mb-2"
          placeholder="Bank account number"
          className="mb-4"
        />
        <FormInput
          label="Bank account name"
          labelClassName="font-medium text-lg !mb-2"
          placeholder="Bank account name"
          className="mb-4"
        />
      </div>
    </div>
  );
};

export default CreateAccount;
