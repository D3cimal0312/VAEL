import { useState, useEffect } from "react";

import "./App.css";
import Navbar from "./common/Navbar";
import Land from "./pages/Land";
import AnimatedCursor from "react-animated-cursor";

import AOS from "aos";
import "aos/dist/aos.css";

import Footer from "./common/Footer";

import { Routes, Route } from "react-router-dom";

import DetailCatPage from "./pages/DetailCatPage";
import About from "./pages/About";
import DetailedProduct from "./pages/DetailedProduct";
import Cart from "./pages/Cart"
import Profile from "./pages/Profile";

import Register from "./pages/Register";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
    AOS.refreshHard()

  }, []);

  return (
     <div className="min-h-screen flex flex-col"> 
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
        <Routes>
          <Route path="/" element={<Land />} />
          <Route path="/category/:category" element={<DetailCatPage />} />
          <Route path="/product/:id" element={<DetailedProduct />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth/register" element={<Register />} />


        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
