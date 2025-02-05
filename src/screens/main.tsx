'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from "next/image";
import { Icon } from '@iconify/react';
import { ModuleFeatures } from './modules/features';
import { ModuleCallToAction } from './modules/call-to-action';
import ModuleContributors from './modules/contributor';
import { ModuleFooter } from './modules/footer';

export default function ScreenMain() {
	const [activeTab, setActiveTab] = useState<'mac' | 'linux' | 'windows'>('mac');

	const logos = [
		{ icon: 'logos:nextjs-icon', name: 'Next.js' },
		{ icon: 'logos:astro', name: 'Astro' },
		{ icon: 'logos:go', name: 'Golang' },
		{ icon: 'logos:kotlin', name: 'Kotlin' },
		{ icon: 'simple-icons:hono', name: 'Hono' },
		{ icon: 'logos:rust', name: 'Rust' }
	];

	const installCommands: { [key in 'mac' | 'linux' | 'windows']: string } = {
		mac: "curl -fsSL https://lokio.dev/in/mac.sh | bash",
		linux: "curl -fsSL https://lokio.dev/in/linux.sh | bash",
		windows: 'powershell -c "irm https://lokio.dev/in/win.ps1 | iex"'
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
								<Image src="/logo-black.svg" width={200} height={200} alt="Logo" />
							</div>
							<div className="dark:block hidden">
								<Image src="/logo-white.svg" width={200} height={200} alt="Logo" />
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
								Lokio is an Assistant CLI that helps create more structured, fast, and efficient projects.
							</p>
						</div>

						<div className="flex flex-col space-y-4">
							<div className="flex flex-wrap gap-2 justify-start">
								{Object.keys(installCommands).map((platform) => (
									<button
										type="button"
										key={platform}
										onClick={() => setActiveTab(platform as "mac" | "linux" | "windows")}
										className={`px-4 py-2 rounded-lg transition-colors ${activeTab === platform
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
									onClick={() => navigator.clipboard.writeText(installCommands[activeTab])}
									className="absolute right-2 top-2 p-2 rounded-md hover:bg-primary/10 hidden lg:block"
								>
									<Icon icon="mdi:content-copy" className="w-5 h-5" />
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
									<div className="w-16 lg:w-24 h-16 lg:h-24 flex items-center justify-center rounded-2xl bg-secondary/50 backdrop-blur-sm 
                                hover:bg-secondary transition-all duration-300 hover:shadow-lg hover:scale-105">
										<Icon icon={icon} className="w-12 h-12" />
									</div>
									<span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-sm opacity-0 group-hover:opacity-100 
                                transition-all duration-300 whitespace-nowrap">
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