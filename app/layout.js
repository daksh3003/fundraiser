// app/layout.js

import "./globals.css"; // Import global styles
import { NavBar, Footer } from "@/Components"; // Adjust the import based on your directory structure

export const metadata = {
  title: 'My App Title',
  description: 'Description of my app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children} {/* This will render the page content */}
        <Footer />
      </body>
    </html>
  );
}
