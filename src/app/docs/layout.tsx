import { Leftbar } from "@/components/leftbar";
import type React from "react";

export default function DocsLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex items-start gap-8">
			<Leftbar key="leftbar" />
			<div className="flex-[5.25]">{children}</div>
		</div>
	);
}
