import { notFound } from "next/navigation";
import { client } from "../lib/sanity";
import { PortableText } from "next-sanity";

async function getPost(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          title,
          content,
          titleImage
      }[0]`;
  const data = await client.fetch(query);

  if (!data) {
    notFound();
  }
  return data;
}

export default async function Page({
  params: { blog },
}: {
  params: { blog: string };
}) {
  const data = await getPost(blog);
  console.log("data is", data);
  return (
    <main>
      <h1>{data.title}</h1>
      <p>{blog}</p>

      <div className="prose prose-blue">
        <PortableText value={data.content} />
      </div>
    </main>
  );
}
