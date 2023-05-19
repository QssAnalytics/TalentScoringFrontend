import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo-second.svg";
import { Bars3Icon } from "@heroicons/react/24/outline";

export interface IWebMenu {
  links: { text: string; path: string }[];
}

export const WebMenu = ({ links }: IWebMenu) => {
  return (
    <div className="flex gap-8">
      {links.map(({ text, path }, index) => {
        return (
          <Link
            key={index}
            to={path}
            className="group overflow-hidden hover:text-qss-secondary"
          >
            {text}
            <div className="w-full h-0.5 bg-qss-secondary rounded-full group-hover:translate-x-0 transition-all -translate-x-[110%] duration-300"></div>
          </Link>
        );
      })}
    </div>
  );
};

const NavBar = () => {
  const links = [
    {
      text: "Home",
      path: "/#home",
    },
    {
      text: "About Product",
      path: "/#aboutproduct",
    },
    {
      text: "About Us",
      path: "/#aboutus",
    },
    {
      text: "Contact",
      path: "/#contact",
    },
  ];

  return (
    <div className="py-8">
      <div className="hidden lg:flex justify-between items-center m-auto ">
        <div className="w-40">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div>
          <nav className="flex sm:justify-center space-x-10">
            <WebMenu links={links} />
          </nav>
        </div>
        <div className="flex gap-6 text">
          <button className="text-qss-secondary\">Sign in</button>

          <button className="bg-qss-secondary text-white rounded-3xl px-10 py-2">
            Sign up
          </button>
        </div>
      </div>

      <div className="flex justify-end w-full h-8 lg:hidden">
        <Bars3Icon />
      </div>
    </div>
  );
};

export default NavBar;
