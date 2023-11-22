import { useNavigate } from "react-router-dom";

const MobileSidebar = ({
  setSidebarIsOpen,
  sidebarIsOpen,
}: {
  setSidebarIsOpen: any;
  sidebarIsOpen: boolean;
}) => {
  //   const { logout } = useAuth();

  const navigate = useNavigate();
  //   const goTo = (route: string) => {
  //     setSidebarIsOpen(!sidebarIsOpen);
  //     navigate(route);
  //   };

  //   const handleLogout = () => {
  //     logout();
  //     setSidebarIsOpen(!sidebarIsOpen);
  //     navigate("/");
  //   };

  return (
    <div
      className={`top-[100px] w-full h-full fixed z-[1000] bg-shades-primary text-shades-white ${
        !sidebarIsOpen ? "hidden" : ""
      } transition-all duration-500`}
    >
      <div className="h-full pt-2 pl-6 pr-4 w-full">
          <div className="w-full flex flex-col">
            <div
              className={`flex w-full items-center justify-between gap-x-4 py-4 cursor-pointer ${
                false ? "text-shades-primary" : ""
              }`}
              onClick={() => {
                navigate("/");
                setSidebarIsOpen(!sidebarIsOpen);
              }}
            >
              <h4 className={`${false ? "font-semibold" : "font-medium"}`}>
                HOME
              </h4>
            </div>
            <div
              className={`flex w-full items-center justify-between gap-x-4 py-4 cursor-pointer ${
                false ? "text-shades-primary" : ""
              }`}
              onClick={() => {
                navigate("/");
                setSidebarIsOpen(!sidebarIsOpen);
              }}
            >
              <h4 className={`${false ? "font-semibold" : "font-medium"}`}>
                ABOUT
              </h4>
            </div>
            <div
              className={`flex w-full items-center justify-between gap-x-4 py-4 cursor-pointer ${
                false ? "text-shades-primary" : ""
              }`}
              onClick={() => {
                navigate("/");
                setSidebarIsOpen(!sidebarIsOpen);
              }}
            >
              <h4 className={`${false ? "font-semibold" : "font-medium"}`}>
                CONTACT
              </h4>
            </div>
          </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
