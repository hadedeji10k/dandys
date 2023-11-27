import { useState } from "react";
import FormInput from "@/component/FormInput";
import { Steps, message } from "antd";
import { BsCircle } from "react-icons/bs";
import Logo from "@/assets/Logo 1.png";
import { IoIosArrowBack } from "react-icons/io";
import Button from "@/component/Button";
import { BiSolidCircle } from "react-icons/bi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  useCreateBankAccountMutation,
} from "@/api/sellerApiCalls";
import { ICreateBankDetails, ICreateSellerInformation } from "@/interface";
import { toast } from "react-toastify";
import Loader from "@/component/Loader";
import { useAppSelector } from "@/api/hook";
import FormSelect from "@/component/FormSelect";
import banks from "@/api/banks.json";
import API from "@/utils/axiosInstance";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [image, setImage] = useState<any>({});

  const [formData, setFormData] = useState<ICreateSellerInformation>({
    managerFullName: "",
    shopName: "",
    cacNumber: "",
    documentType: "",
    document: "",
    phoneNumber: "",
    accountType: "INDIVIDUAL",
  });

  const [bankForm, setBankForm] = useState<ICreateBankDetails>({
    accountNumber: "",
    accountName: "",
    bankName: "",
    bankCode: "",
  });

  const [createBankAccount] = useCreateBankAccountMutation();

  const handleStep1 = () => {
    if (formData.shopName.length <= 0) {
      message.error("Please fill in your shop name");
      return;
    }
    if (formData.accountType.length <= 0) {
      message.error("Please select an account type");
      return;
    }
    setStep(1);
  };

  const handleStep2 = () => {
    setIsLoading(true);

    let form_data = new FormData();
    for (let [key, value] of Object.entries(formData)) {
      form_data.append(key, value.toString());
    }

    form_data.append("businessImage", image);

    API.post("/seller", form_data, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Account information updated successfully",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          setStep(2);
        });
      })
      .catch((err: any) => {
        toast.error(
          err?.data?.message ||
            "Error updating your account information, please try again later"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
    return;
  };

  const handleStep3 = () => {
    setIsLoading(true);
    createBankAccount(bankForm)
      .unwrap()
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Bank account information updated successfully",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          navigate("/dashboard");
        });
      })
      .catch((err: any) => {
        toast.error(
          err?.data?.message ||
            "Error updating your bank account information, please try again later"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
    return;
  };

  const handleNext = () => {
    if (step === 0) {
      handleStep1();
    } else if (step === 1) {
      handleStep2();
    } else if (step === 2) {
      handleStep3();
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <Loader spinning={isLoading}>
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
            <CreateAccount1 formData={formData} setFormData={setFormData} />
          ) : step === 1 ? (
            <CreateAccount2
              formData={formData}
              setFormData={setFormData}
              setImage={setImage}
            />
          ) : step === 2 ? (
            <CreateAccount3 bankForm={bankForm} setBankForm={setBankForm} />
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
    </Loader>
  );
};

const CreateAccount1 = ({
  formData,
  setFormData,
}: {
  formData: ICreateSellerInformation;
  setFormData: any;
}) => {
  const AccountType = [
    {
      title: "Individual Account",
      value: "INDIVIDUAL",
      selected: true,
    },
    {
      title: "Company Account",
      value: "COMPANY",
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

    const selected = accountType.find((_, index) => index === id);
    setFormData({
      ...formData,
      accountType: selected?.value,
    });
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
          defaultValue={formData.shopName}
          onChange={(e: any) => {
            setFormData({
              ...formData,
              shopName: e.target.value,
            });
          }}
        />
      </div>
    </div>
  );
};

const CreateAccount2 = ({
  formData,
  setFormData,
  setImage,
}: {
  formData: ICreateSellerInformation;
  setFormData: any;
  setImage: any;
}) => {
  const user = useAppSelector((state) => state.user.user);
  
  const meansOfIdentification = [
    {
      id: 1,
      label: "Driver's License",
      value: "Driver's License",
    },
    {
      id: 2,
      label: "Voter's Card",
      value: "Voter's Card",
    },
    {
      id: 3,
      label: "National ID Card",
      value: "National ID Card",
    },
    {
      id: 4,
      label: "International Passport",
      value: "International Passport",
    },
  ];

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full lg:max-w-[90%] max-w-[400px]">
      <h2 className="text-2xl font-semibold text-center text-shades-primary">
        Tell us about your business
      </h2>

      <div className="mt-4 w-full flex flex-col md:flex-row md:gap-x-8 flex-wrap justify-between">
        <div className="w-full flex-1 flex flex-col sm:min-w-[200px]">
          <FormInput
            label="Account manager’s first & last name"
            labelClassName="font-medium text-[16px] !mb-2"
            placeholder="Enter first & last name"
            required
            name="managerFullName"
            defaultValue={formData.managerFullName}
            onChange={handleChange}
          />
          <FormInput
            label="Phone number"
            type="tel"
            labelClassName="font-medium text-[16px] !mb-2"
            placeholder="Enter phone number"
            required
            name="phoneNumber"
            defaultValue={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex-1 flex flex-col sm:min-w-[200px]">
          <FormInput
            label="Email Address"
            labelClassName="font-medium text-[16px] !mb-2"
            placeholder="Email address"
            defaultValue={user?.email}
            disabled
          />
          <FormInput
            label="CAC"
            labelClassName="font-medium text-[16px] !mb-2"
            placeholder="Enter your CAC number"
            name="cacNumber"
            defaultValue={formData.cacNumber}
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex-1 flex flex-col sm:min-w-[200px]">
          <FormSelect
            onChange={(value) =>
              setFormData({
                ...formData,
                documentType: value,
              })
            }
            required
            label="Means of Identification"
            placeholder="Select ID means"
            options={meansOfIdentification}
            defaultValue={formData.documentType}
          />
          <FormInput
            label="Upload ID"
            type="file"
            labelClassName="font-medium text-[16px] !mb-2"
            placeholder="Choose file to upload"
            required
            returnRawFile
            onChange={(value) => setImage(value)}
          />
        </div>
      </div>
    </div>
  );
};

const CreateAccount3 = ({
  bankForm,
  setBankForm,
}: {
  bankForm: ICreateBankDetails;
  setBankForm: any;
}) => {
  const handleChange = (e: any) => {
    setBankForm({
      ...bankForm,
      [e.target.name]: e.target.value,
    });
  };

  const options = banks.map((item) => {
    return {
      label: item.name,
      value: item.code,
    };
  });

  return (
    <div className="w-full max-w-[500px]">
      <h2 className="text-2xl font-semibold text-center text-shades-primary">
        Provide your bank details
      </h2>

      <div className="w-full mt-8">
        <FormSelect
          onChange={(value) => {
            const selected = options.find(
              (item) => value.toLowerCase() === item.value.toLowerCase()
            );
            setBankForm({
              ...bankForm,
              bankCode: selected?.value,
              bankName: selected?.label,
            });
          }}
          defaultValue={bankForm?.bankName!}
          required
          label="Bank Name"
          placeholder="Select bank"
          options={options}
        />
        <FormInput
          name="accountNumber"
          label="Bank account number"
          labelClassName="font-medium !mb-2"
          placeholder="Bank account number"
          className="mb-4"
          onChange={handleChange}
          defaultValue={bankForm?.accountNumber}
        />
        <FormInput
          name="accountName"
          label="Bank account name"
          labelClassName="font-medium !mb-2"
          placeholder="Bank account name"
          className="mb-4"
          onChange={handleChange}
          defaultValue={bankForm?.accountName}
        />
      </div>
    </div>
  );
};

export default CreateAccount;
