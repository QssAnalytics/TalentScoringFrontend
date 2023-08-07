import Footer from "pages/Landing/components/Footer";
import NavBar from "pages/Landing/components/NavBar";
import ImageSection from "../components/ImageSection";
import LoginSection from "./components/LoginSection";

const Login = () => {
  return (
    <div className="h-screeen">
      <div className="w-full z-10 relative px-[220px]">
        <NavBar />
      </div>
      <div className="flex w-full items-center">
        <ImageSection />
        <LoginSection />
      </div>
      <Footer />
    </div>
  );
};

export default Login;