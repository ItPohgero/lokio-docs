import { HeartIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Image from "next/image";

export function Footer() {
	return (
		<footer className="border-t w-full h-16">
			<div className="container flex items-center sm:justify-between justify-center sm:gap-0 gap-4 h-full text-muted-foreground text-sm flex-wrap sm:py-0 py-3 max-sm:px-4">
				<div className="flex items-center gap-3">
					<Image src="/logo.png" width={20} height={20} alt="Logo" />
					<p className="text-center">
						&copy; {new Date().getFullYear()}
						<Link
							className="px-1 font-bold"
							href="https://github.com/any-source"
						>
							any-source (itpohgero)
						</Link>
					</p>
				</div>

				<div className="gap-4 items-center hidden md:flex">
					<FooterButtons />
				</div>
			</div>
		</footer>
	);
}

export function FooterButtons() {
	return (
		<>
			<Link
				href="https://saweria.co/itpohgero"
				className={buttonVariants({ variant: "outline", size: "sm" })}
			>
				<HeartIcon className="h-4 w-4 mr-2 text-red-600 fill-current" />
				Sponsor
			</Link>
		</>
	);
}
