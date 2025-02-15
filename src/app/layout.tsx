import ReactQueryProvider from "../provider/ReactQueryProvider";
import { Be_Vietnam_Pro} from "next/font/google"
import "./globals.css";

const vietnam = Be_Vietnam_Pro({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-vietnam"
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={vietnam.variable}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}