import { images } from "@/exports/images";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";

import Logo from "@/assets/Logo 2.png";
import paymentMethod from "@/assets/paymethod.webp";

const Footer = () => {
  return (
    <main className="bg-shades-white p-4">
      <section className="flex flex-wrap bg-shades-white">
        {[
          { imageUrl: images.face1 },
          { imageUrl: images.face2 },
          { imageUrl: images.face3 },
          { imageUrl: images.face4 },
          { imageUrl: images.face5 },
          { imageUrl: images.face6 },
        ].map((item, idx) => (
          <figure
            key={idx}
            className="cardContainer faceCards w-full md:w-2/12"
          >
            <img src={item.imageUrl} alt="" />

            <div className="hoverBg">
              <BsInstagram size={30} />
            </div>
          </figure>
        ))}
      </section>

      <section className="mx-auto mt-4 md:px-8 px-4 md:py-6 py-3 secFooter flex flex-col md:flex-row justify-between">
        <div className="flex flex-col w-full md:w-3/12 text-center md:text-start">
          <small>Find us here:</small>

          <div className="flex gap-1 followUs justify-center md:justify-start">
            <a href="#" target="_blank" rel="noreferrer">
              <BsInstagram />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <BsTwitter />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <BsLinkedin />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <BsFacebook />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <BsYoutube />
            </a>
          </div>
        </div>

        <div className="w-full md:w-3/12 md:my-0 my-5">
          <figure className="w-6/12 mx-auto">
            <img src={Logo} alt="Dandys logo" />
          </figure>
        </div>

        <div className="w-full md:w-3/12 text-center md:text-start">
          <small>Payment Methods::</small>

          <figure className="w-9/12 md:w-full mx-auto">
            <img src={paymentMethod} alt="Dandys logo" />
          </figure>
        </div>
      </section>

      <section className="mx-auto mt-4 md:px-8 px-4 md:py-12 py-6 secFooter flex flex-col md:flex-row gap-4 justify-between text-shades-white bg-shades-primary">
        <div className="max-w-[300px] md:w-[300px] w-full">
          <h3 className="font-medium text-lg">GET IN TOUCH</h3>
          <p>Phone: (+91) 98765 43210</p>
          <p>Email: support@dandysstore.io</p>
          <p>
            Address: KM 21, Ojomu Royal Plaza, Lekki-Epe Expressway, Ikota,
            Lekki, Lagos.
          </p>
        </div>
        <div>
          <h3 className="font-medium text-lg">CATEGORIES</h3>
          <ul>
            <li>Woman</li>
            <li>Man</li>
            <li>Korean</li>
            <li>Hair</li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium text-lg">SUPPORT</h3>
          <ul>
            <li>Blog</li>
            <li>FAQs</li>
            <li>Provacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div className="max-w-[300px] md:w-[300px] w-full">
          <h3 className="font-medium text-lg">SUBSCRIBE</h3>
          <input
            type="text"
            name=""
            placeholder="Enter your email address"
            className="bg-shades-white px-3 py-2 rounded-md block mb-2 w-full"
          />
          <button className="px-6 py-3 bg-shades-green rounded-md">
            SUBSCRIBE NOW
          </button>
        </div>
      </section>
    </main>
  );
};

export default Footer;
