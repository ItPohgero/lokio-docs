import DocsBreadcrumb from "@/components/docs-breadcrumb";
import Pagination from "@/components/pagination";
import Toc from "@/components/toc";
import { page_routes } from "@/lib/routes-config";
import { notFound } from "next/navigation";
import { getDocsForSlug } from "@/lib/markdown";
import { Typography } from "@/components/typography";
import Link from "next/link";
import { Fragment } from "react";

type PageProps = {
  params: Promise<{ slug: string[] }>;
  searchParams?: Promise<{ lang: string }>;
};

export default async function DocsPage(props: PageProps) {
  const params = await props.params;
  const searchParams = await props?.searchParams;

  const {
    slug = []
  } = params;

  const pathName = slug.join("/");
  const res = await getDocsForSlug(pathName, searchParams?.lang);

  if (!res) notFound();
  return (
    <div className="flex items-start gap-10">
      <div className="flex-[4.5] pt-10">
        <DocsBreadcrumb paths={slug} />
        <Typography>
          <div className="mb-2 border-b border-dashed pb-2">
            <div className="flex justify-end items-center gap-x-1 text-xs">
              {searchParams?.lang === "id" ? (
                <Fragment>
                  <span>Terjemahkan Dok ke </span>
                  <Link className="font-bold bg-neutral-100 dark:bg-neutral-800 rounded px-2 py-1 no-underline" href={`/docs/${pathName}`}>EN</Link>
                </Fragment>
              ) : (
                <Fragment>
                  <span>Translate Docs to </span>
                  <Link className="font-bold bg-neutral-100 dark:bg-neutral-800 rounded px-2 py-1 no-underline" href={`/docs/${pathName}?lang=id`}>ID</Link>
                </Fragment>
              )}
            </div>
          </div>
          <h1 className="text-3xl !-mt-0.5">{res.frontmatter.title}</h1>
          <p className="-mt-4 text-muted-foreground text-[16.5px]">
            {res.frontmatter.description}
          </p>
          <div>{res.content}</div>
          <Pagination pathname={pathName} />
        </Typography>
      </div>
      <Toc path={pathName} />
    </div>
  );
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const {
    slug = []
  } = params;

  const pathName = slug.join("/");
  const res = await getDocsForSlug(pathName);
  if (!res) return null;
  const { frontmatter } = res;
  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}

export function generateStaticParams() {
  return page_routes.map((item) => ({
    slug: item.href.split("/").slice(1),
  }));
}
