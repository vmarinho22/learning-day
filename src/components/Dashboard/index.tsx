import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useDashboard from "./useDashboard";

const Dashboard: any = (props: any) => {
  const { open, setOpen, Menus, ref } = useDashboard();
  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72" : "w-24"
        } p-5 pt-6 duration-300 h-screen bg-gradient-to-r from-pr-purple to-pr-ocean relative`}
      >
        <div className="absolute cursor-pointer -right-3 top-9 w-7 border-2 border-pr-ocean rounded-full bg-white">
          <div
            className="text-center w-7 h-6 p-1"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaChevronLeft /> : <FaChevronRight />}
          </div>
        </div>
        <div className="flex items-center justify-center h-30 w-full">
          <Image
            src="/img/logo/logo-dark.png"
            alt="Logo"
            width={100}
            height={100}
            className={`cursor-pointer`}
          />
        </div>
        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <li
              key={index}
              className={`text-white text-2xl flex items-center ${
                !open && "justify-center"
              } gap-x-4 cursor-pointer p-2 font-medium italic hover:bg-trans-gray rounded-md origin-left duration-500`}
            >
              <Link key={index} href={`${menu.path}`}>
                <a>{menu.icon}</a>
              </Link>

              <Link href={`${menu.path}`}>
                <a className={`${!open && "hidden"} origin-left duration-200`}>
                  {menu.title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full h-screen overflow-y-auto p-7">{props.children}</div>
    </div>
  );
};

export default Dashboard;
