'use client';
import Copy from "@/components/markdown/copy";
import { buttonVariants } from "@/components/ui/button";
import { page_routes } from "@/lib/routes-config";
import { TerminalSquareIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ScreenMain() {
	return (
		<div className="flex sm:min-h-[85.5vh] min-h-[85vh] flex-col items-center justify-center text-center px-2 sm:py-8 py-12">
			<div className="mb-4">
				<div className="dark:hidden block">
					<Image src="/logo-black.svg" width={200} height={200} alt="Logo" />
				</div>
				<div className="dark:block hidden">
					<Image src="/logo-white.svg" width={200} height={200} alt="Logo" />
				</div>
			</div>
			<h1 className="text-2xl font-bold mb-4 sm:text-4xl">
				Structuring Code, One Command at a Time
			</h1>
			<p className="mb-8 sm:text-lg max-w-[800px] text-muted-foreground">
				Lokio is an Assistant CLI that will help us in making projects that are more structured, fast and efficient.
			</p>
			<div className="flex flex-row items-center gap-5">
				<Link
					href={`/docs${page_routes[0].href}`}
					className={buttonVariants({ className: "px-6", size: "lg" })}
				>
					Get Stared
				</Link>
				<Link
					href="/blog"
					className={buttonVariants({
						variant: "secondary",
						className: "px-6",
						size: "lg",
					})}
				>
					Read Blog
				</Link>
			</div>
			<div className="flex items-center bg-secondary px-2 py-1.5 rounded-lg flex-row sm:gap-2 gap-0.5 text-muted-foreground text-md mt-7 -mb-12 max-[800px]:mb-12 font-code sm:text-base text-sm font-medium">
				<TerminalSquareIcon className="w-5 h-5 sm:mr-1 mt-0.5" />
				<div className="flex justify-start items-center gap-x-2">
					<span className="font-bold">bun add -g lokio</span>
				</div>
				<Copy content="bun add -g lokio" />
			</div>
		</div>
	);
}
