import { ThemeProvider } from "@/components/contexts/theme-provider";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "@/styles/globals.css";
import { ENV } from "@/configs/env";
import NextTopLoader from "nextjs-toploader";

const sansFont = Open_Sans({
	subsets: ["latin"],
	variable: "--font-open-sans",
	display: "swap",
	weight: ["400", "600", "700"],
});

const monoFont = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
	weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
	title: ENV.NAME,
	metadataBase: new URL(ENV.URL),
	description: ENV.DESCRIPTION,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${sansFont.variable} ${monoFont.variable} font-regular antialiased tracking-wide`}
				suppressHydrationWarning
			>
				<NextTopLoader height={2} color="green" showSpinner={false} />
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Navbar />
					<main className="sm:container mx-auto w-[90vw] h-auto scroll-smooth">
						{children}
					</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
