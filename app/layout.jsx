import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"]
});

export const metadata = {
  title: "Todo App",
  description: "Todo App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} relative bg-[#F0F4F3] p-6 md:p-0 md:flex justify-center`}
      >
        {children}
      </body>
    </html>
  );
}
