import type { Metadata } from "next";
import "../styles/globals.css";
import { PropsWithChildren } from "react";
import { Toaster } from "sonner";
import AuthProvider from "@/providers/AuthProvider";
import Navbar from "@/components/nav/Navbar";

export const metadata: Metadata = {
  title: "Auth template",
  description: "Generated by create next app",
};

const RootLayout = (props: PropsWithChildren) => {
  return (
    <html lang="en">
      <AuthProvider>
        <body>
          <header>
            <Navbar/>
          </header>
          <main>
            {props.children}
          </main>
          <Toaster richColors/>
        </body>
      </AuthProvider>
    </html>
  );
};

export default RootLayout;