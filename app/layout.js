// app/layout.js

import "./globals.css"; // Import global styles
import { NavBar, Footer } from "@/Components"; // Adjust the import based on your directory structure
import { CrowdFundingProvider } from "@/Context/CrowFunding";
export const metadata = {
  title: 'My App Title',
  description: 'Description of my app',
};

export default function RootLayout({ children }) {
  return (
    <>
    <CrowdFundingProvider>
        <NavBar />
        {children} {/* This will render the page content */}
        <Footer />
      </CrowdFundingProvider>
      </>
  );
}
