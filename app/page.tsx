import React from "react";
import { client, urlFor } from "./lib/sanity";
import { simpleBlogCard } from "./lib/interface";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 60;

async function getData() {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc) {
    title,
      smallDescription,
      "currentSlug": slug.current,
      featuredImage
  }`;

  const data = await client.fetch(query);

  return data;
}

export default async function Page() {
  const data: simpleBlogCard[] = await getData();
  console.log(data);
  return (
    <main>
      {data.map((item) => (
        <Link href={`/${item.currentSlug}`} key={item.currentSlug}>
          <article>
            <Image
              src={urlFor(item.featuredImage).url()}
              alt={item.title}
              title={item.title}
              width={600}
              height={600}
            />
            <h1>{item.title}</h1>
            <p>{item.smallDescription}</p>
          </article>
        </Link>
      ))}
    </main>
  );
}
