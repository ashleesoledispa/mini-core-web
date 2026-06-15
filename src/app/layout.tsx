import "./globals.css";

export const metadata = {
  title: "Mini Core Logística",
  description: "Reporte de costos de envíos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}