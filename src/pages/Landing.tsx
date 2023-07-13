import About from "../components/Landing/About";
import Footer from "../components/Landing/Footer";
import HeroSection from "../components/Landing/HeroSection";
import NavBar from "../components/Landing/NavBar";
import Process from "../components/Landing/Process";

const Landing = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="w-full z-10 min-h-screen relative px-[220px]">
        <NavBar />
        <HeroSection />
        <About />
        <Process />
        <div className="h-36">
          <Footer />
        </div>
      </div>
      <div className="absolute -top-20 -right-52 z-0">
        <Circle />
      </div>
      <div className=" absolute top-72 -right-40 -rotate-[45deg]">
        <VectorTrip />
      </div>
      <div className="absolute -bottom-96 -left-96 z-0">
        <Circle />
      </div>
      <div className=" absolute top-1/2 right-0 -rotate-[90deg]">
        <VectorTrip />
      </div>
      <div className=" absolute -bottom-1/2 -right-96 rotate-[90deg]">
        <VectorTrip />
      </div>
    </div>
  );
};

export default Landing;

export const Circle = () => (
  <svg
    width="1260"
    height="1260"
    viewBox="0 0 1260 1260"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="630" cy="630" r="630" fill="#E5F2F0" fillOpacity="0.38" />
  </svg>
);

export const VectorTrip = () => (
  <svg
    width="1883"
    height="1460"
    viewBox="0 0 1883 1460"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1880.68 1030.9C1848.71 999.928 1760.38 953.132 1662.77 1013.69C1540.77 1089.39 1554.92 1240.2 1399.71 1216.69C1244.5 1193.17 1204.79 1089.98 1178.01 1020.42C1151.23 950.864 1069.04 554.903 755.68 365.837C504.995 214.583 167.181 391.493 1.0001 431.021"
      stroke="#E4F1F0"
      strokeWidth="3"
      strokeDasharray="8 8"
    />
    <ellipse
      cx="254.939"
      cy="351.267"
      rx="6.35142"
      ry="6.06971"
      transform="rotate(-147.341 254.939 351.267)"
      fill="#A9D4CF"
    />
    <ellipse
      cx="740.661"
      cy="360.033"
      rx="6.35142"
      ry="6.06971"
      transform="rotate(-147.341 740.661 360.033)"
      fill="#A9D4CF"
    />
    <ellipse
      cx="1050.62"
      cy="688.537"
      rx="6.35142"
      ry="6.06971"
      transform="rotate(-147.341 1050.62 688.537)"
      fill="#A9D4CF"
    />
    <ellipse
      cx="1318.23"
      cy="1194.56"
      rx="6.35142"
      ry="6.06971"
      transform="rotate(-147.341 1318.23 1194.56)"
      fill="#A9D4CF"
    />
  </svg>
);
