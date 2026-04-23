import'./userstyle.css'
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

import AnimatedCursor from "react-animated-cursor";

import { Outlet } from "react-router-dom";


const UserLayout = () => {
  return (
    <>
       <AnimatedCursor
        innerSize={12}
        outerSize={60}
        color="181, 113, 58"
        outerAlpha={0.1}
        innerScale={1.5}
        outerScale={1.55}
        clickables={[
          "a",
          'input[type="text"]',
          'input[type="email"]',
          'input[type="number"]',
          'input[type="submit"]',
          'input[type="image"]',
          "label[for]",
          "select",
          "textarea",
          "button",
          ".link",
          "Link",
          "NavLink",
          {
            target: ".linked",
            //  target: 'a, button, input, textarea, select, label, [role="button"], [onClick]',
            options: {
              innerSize: 32,
            },
          },
        ]}
        trailingSpeed={9}
        outerStyle={{
          border: "1px solid rgba(236, 133, 48, 0.584)",
          // background:'transparent',
          background: "rgba(236, 133, 48, 0.184)",
        }}
      />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;