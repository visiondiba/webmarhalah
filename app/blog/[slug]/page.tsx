import { client } from "../../../tina/__generated__/client";
import { notFound } from "next/navigation";
import BlogPostClient from "./blog-post-client";

export async function generateStaticParams() {
  const posts = await client.queries.eventConnection();
  return (
    posts.data.eventConnection.edges?.map((edge: any) => ({
      slug: edge?.node?._sys.filename,
    })) ?? []
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const post = await client.queries.event({
      relativePath: `${slug}.mdx`,
    });
    return {
      title: `${post.data.event.title} — Impervious Media`,
      description: post.data.event.desc ?? "",
    };
  } catch {
    return { title: "Blog — Impervious Media" };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let result;
  try {
    result = await client.queries.event({
      relativePath: `${slug}.mdx`,
    });
  } catch {
    notFound();
  }

  return (
    <BlogPostClient
      data={result!.data}
      query={result!.query}
      variables={result!.variables}
    />
  );
}
