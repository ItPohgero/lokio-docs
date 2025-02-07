"use client";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ModuleCallToAction } from "./modules/call-to-action";
import ModuleContributors from "./modules/contributor";
import { ModuleFeatures } from "./modules/features";
import { ModuleFooter } from "./modules/footer";

export default function ScreenMain() {
	const [copy, setCopy] = useState<boolean>(false);
	const [activeTab, setActiveTab] = useState<"mac or linux" | "windows">(
		"mac or linux",
	);

	const logos = [
		{ icon: "lineicons:nextjs", name: "Next.js" },
		{ icon: "lineicons:astro", name: "Astro" },
		{ icon: "fa6-brands:golang", name: "Golang" },
		{ icon: "devicon-plain:kotlin", name: "Kotlin" },
		{ icon: "simple-icons:bun", name: "Bun" },
		{ icon: "simple-icons:hono", name: "Hono" },
		{ icon: "fa6-brands:rust", name: "Rust" },
		{ icon: "lineicons:vuejs", name: "Vue" },
		{ icon: "lineicons:nuxt", name: "Nuxt.js" },
		{ icon: "lineicons:react", name: "React" },
		{ icon: "lineicons:flutter", name: "Flutter" },
		{ icon: "lineicons:tailwindcss", name: "Tailwind CSS" },
		{ icon: "lineicons:typescript", name: "Typescript" },
	];

	const installCommands: { [key in "mac or linux" | "windows"]: string } = {
		"mac or linux": "curl -fsSL lokio.dev/install.sh | bash",
		windows: 'powershell -c "irm lokio.dev/install.ps1 | iex"',
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(installCommands[activeTab]);
		setCopy(true);
		setTimeout(() => {
			setCopy(false);
		}, 2000);
	};

	return (
		<div className="min-h-screen">
			<div className="container mx-auto pt-32 px-0">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="space-y-8"
					>
						<div className="flex justify-start">
							<div className="dark:hidden block">
								<Image
									src="/logo-black.svg"
									width={200}
									height={200}
									alt="Logo"
								/>
							</div>
							<div className="dark:block hidden">
								<Image
									src="/logo-white.svg"
									width={200}
									height={200}
									alt="Logo"
								/>
							</div>
						</div>

						<div className="space-y-4 text-left">
							<h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
								Structuring Code,{" "}
								<span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
									One Command at a Time
								</span>
							</h1>
							<p className="lg:text-xl text-muted-foreground max-w-2xl">
								Lokio is an Assistant CLI that helps create more structured,
								fast, and efficient projects.
							</p>
						</div>

						<div className="flex flex-col space-y-4">
							<div className="flex flex-wrap gap-2 justify-start">
								{Object.keys(installCommands).map((platform) => (
									<button
										type="button"
										key={platform}
										onClick={() =>
											setActiveTab(platform as "mac or linux" | "windows")
										}
										className={`px-4 py-2 rounded-lg transition-colors ${
											activeTab === platform
												? "bg-primary text-primary-foreground"
												: "bg-secondary hover:bg-secondary/80"
										}`}
									>
										{platform.charAt(0).toUpperCase() + platform.slice(1)}
									</button>
								))}
							</div>

							<div className="relative group w-full max-w-full overflow-hidden">
								<div
									className="w-full bg-secondary rounded-lg p-4 font-mono text-xs lg:text-base overflow-x-auto"
									style={{ whiteSpace: "nowrap" }} // Memastikan teks tidak wrap
								>
									<code>{installCommands[activeTab]}</code>
								</div>
								<button
									type="button"
									onClick={handleCopy}
									className="absolute right-2 top-2 p-2 rounded-md hover:bg-primary/10 hidden lg:block"
								>
									{copy ? (
										<Icon icon="mdi:check" className="w-5 h-5" />
									) : (
										<Icon icon="mdi:content-copy" className="w-5 h-5" />
									)}
								</button>
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="space-y-8"
					>
						<div className="flex flex-wrap justify-center gap-2 lg:gap-6">
							{logos.map(({ icon, name }, index) => (
								<motion.div
									key={name}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: index * 0.1 }}
									className="group relative mt-2"
								>
									<div
										className="w-16 lg:w-24 h-16 lg:h-24 flex items-center justify-center rounded-2xl bg-secondary/50 backdrop-blur-sm 
                hover:bg-secondary transition-all duration-300 hover:shadow-lg hover:scale-105"
									>
										<Icon icon={icon} className="w-12 h-12 text-muted-foreground" />
									</div>

									<span
										className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-sm opacity-0 group-hover:opacity-100 
                                transition-all duration-300 whitespace-nowrap hidden lg:block"
									>
										{name}
									</span>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</div>
			<ModuleCallToAction />
			<ModuleFeatures />
			{/* <ModuleTestimoni /> */}
			<ModuleContributors />
			<ModuleFooter />
		</div>
	);
}
