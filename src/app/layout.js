import { Poppins } from "next/font/google";

import "./globals.css";
import Providers from "@/Providers";
import Preloader from "./components/Preloader";

const poppinsFont = Poppins({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "Agency Portfolio",
  description: "Nextrump presents Agency Portfolio for business.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={poppinsFont.className}>
        <Providers>
          <div className="">
            <div>
              <main className="">
                <Preloader />
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
};
export default RootLayout;
