// for page navigation & to sort on leftbar

export type EachRoute = {
	title: string;
	href: string;
	noLink?: true; // noLink will create a route segment (section) but cannot be navigated
	items?: EachRoute[];
};

export const ROUTES: EachRoute[] = [
	{
		title: "Getting Started",
		href: "/getting-started",
		noLink: true,
		items: [
			{ title: "Introduction", href: "/introduction" },
			{
				title: "Installation",
				href: "/installation",
			},
			{
				title: "Create",
				href: "/create",
			},
			{
				title: "Structure",
				href: "/structure",
				noLink: true,
				items: [
					{
						title: "Frontend",
						href: "/frontend",
						noLink: true,
						items: [
							{ title: "Angular", href: "/angular" },
							{ title: "Astro", href: "/astro" },
							{ title: "Next", href: "/next" },
							{ title: "Nuxt", href: "/nuxt" },
							{ title: "Vue", href: "/vue" },
						]
					},
					{
						title: "Backend",
						href: "/backend",
						noLink: true,
						items: [
							{ title: "Elysia", href: "/elysia" },
							{ title: "Golang", href: "/golang" },
							{ title: "Hono", href: "/hono" },
						]
					},
					{
						title: "Mobile",
						href: "/mobile",
						noLink: true,
						items: [
							{ title: "Kotlin MVVM", href: "/kotlin-mvvm" },
						]
					},
					{
						title: "Monolith",
						href: "/monolith",
						noLink: true,
						items: [
							{ title: "Next", href: "/next" },
						]
					},
				],
			},
		],
	},
	{
		title: "Contributions",
		href: "/contributions",
		noLink: true,
		items: [
			{ title: "Requirements", href: "/requirements" },
			{ title: "Guidelines", href: "/guidelines" },
		],
	},
];

type Page = { title: string; href: string };

function getRecurrsiveAllLinks(node: EachRoute) {
	const ans: Page[] = [];
	if (!node.noLink) {
		ans.push({ title: node.title, href: node.href });
	}
	if (node.items) {
		for (const subNode of node.items) {
			const temp = { ...subNode, href: `${node.href}${subNode.href}` };
			ans.push(...getRecurrsiveAllLinks(temp));
		}
	}
	return ans;
}

export const page_routes = ROUTES.flatMap((it) => getRecurrsiveAllLinks(it));
