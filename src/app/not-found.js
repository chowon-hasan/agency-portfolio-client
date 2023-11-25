import Link from "next/link";
import localFont from "next/font/local";
const ethFont = localFont({
  src: "../app/my-fonts/ethnocentric-rg.otf",
});
export default function NotFound() {
  return (
    <section className="min-h-screen bg-black text-white flex justify-center items-center">
      <div className="">
        <h1 className={`${ethFont.className} text-7xl  mb-5 text-center`}>
          agency portfolio
        </h1>
        <div className="text-center">
          <h2>Page Not Found</h2>
          <p>Could not find requested resource</p>
          <div className="">
            <Link href="/">
              <button className="border py-3 px-5 mt-5">Return Home</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
