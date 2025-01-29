import ContributorProfile from "@/components/markdown/contributor-profile";
import Copy from "@/components/markdown/copy";
import { buttonVariants } from "@/components/ui/button";
import { page_routes } from "@/lib/routes-config";
import { TerminalSquareIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ScreenMain() {
    return (
        <div className="flex sm:min-h-[85.5vh] min-h-[85vh] flex-col items-center justify-center text-center px-2 sm:py-8 py-12">
            <div>
                <Image src="/logo.png" width={300} height={300} alt="Aria Docs Logo" />
            </div>
            <h1 className="text-2xl font-bold mb-4 sm:text-4xl">
                Like a lukio who help her child grow
            </h1>
            <p className="mb-8 sm:text-lg max-w-[800px] text-muted-foreground">
                This feature was created to help consistent and structured development in website projects, several architectures are available for nextjs, vue, angular
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
                    <span className="font-bold">npx lukio-cli</span>
                    <span className="font-thin">{"<project-directory>"}</span>
                </div>
                <Copy content="npx lukio-cli <project-directory>" />
            </div>

            <div className="lg:mt-20">
                <p className="mb-2 text-xs text-muted-foreground">Thanks to :</p>
                <div className="flex justify-start gap-x-2">
                    <ContributorProfile username="itpohgero" />
                    <ContributorProfile username="mataramandev" />
                </div>
            </div>
        </div>
    );
}
