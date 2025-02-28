import ReactQueryProvider from "../provider/ReactQueryProvider";
import { Be_Vietnam_Pro} from "next/font/google"
import "./globals.css";
import Image from "next/image";

const vietnam = Be_Vietnam_Pro({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-vietnam"
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={vietnam.variable}>
        <ReactQueryProvider>
          <div className="relative min-h-screen">
            <div className="relative w-full h-[35vh]">
              <div className="absolute left-0 right-0 top-[30%] flex justify-center">
                <Image 
                  src="/Logo.svg"
                  alt="logo"
                  width={200}
                  height={25}
                  priority
                />
              </div>
              <Image
                src="/hero-image.jpg"
                alt="Hero Image"
                width={1920}
                height={600}
                className="w-full h-full object-cover hidden sm:block"
                priority
              />
              <Image
                src="/hero-image-sm.jpg"
                alt="Hero Image"
                width={640}
                height={300}
                className="w-full h-full object-cover sm:hidden"
                priority
              />
            </div>
            {children}
          </div>          
        </ReactQueryProvider>
      </body>
    </html>
  );
}