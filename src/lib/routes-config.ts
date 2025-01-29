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
        title: "Create (New Project)",
        href: "/create-new-project",
        noLink: true,
        items: [
          { title: "FS - Next Js", href: "/fs-next" },
          { title: "FE - Next Js", href: "/fe-next" },
          { title: "BE - Hono", href: "/be-hono" },
        ],
      },
      {
        title: "Init (Existing Project)", href: "/existing-project",
      },
      {
        title: "Commands",
        href: "/commands",
        noLink: true,
        items: [
          { title: "Make Screen", href: "/make-screen" },
          { title: "Make Hook", href: "/make-hook" },
          { title: "Make Layout", href: "/make-layout" },
          { title: "Make Controller", href: "/make-controller" },
          { title: "Make Schema", href: "/make-schema" },
          { title: "Make Component", href: "/make-component" },
          { title: "Make Call", href: "/make-call" },
          { title: "Generate Component", href: "/gen-component" },
          { title: "Generate Hook", href: "/gen-hook" },
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
      { title: "Guidelines", href: "/guidelines" }
    ],
  },
];

type Page = { title: string; href: string };

function getRecurrsiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecurrsiveAllLinks(temp));
  });
  return ans;
}

export const page_routes = ROUTES.map((it) => getRecurrsiveAllLinks(it)).flat();
