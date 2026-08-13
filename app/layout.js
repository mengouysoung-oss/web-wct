import "./globals.css";

export const metadata = {
  title: "FOLD — clothes built for the long wear",
  description: "A small, considered clothing collection. Shop outerwear, knitwear, denim and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
