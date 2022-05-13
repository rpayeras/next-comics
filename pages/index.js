import styles from "../styles/Home.module.css";

import fs from "fs/promises";
import Image from "next/image";
import Link from "next/link";
import { useI18N } from "../context/i18n";

export default function Home({ latestComics }) {
  const { t } = useI18N();

  return (
    <main className={styles.main}>
      <h2 className="text-3xl font-bold text-center mb-10">
        {t("LATEST_COMICS")}
      </h2>
      <section className="flex flex-col gap-6 justify-center items-center">
        {latestComics.map((comic) => (
          <Link
            key={comic.id}
            href={`/comic/${encodeURIComponent(comic.id)}`}
            className="pb-4 mb-6 break-inside"
          >
            <a>
              <h3 className="text-semibold text-sm text-center font-bold mb-1">
                {comic.title}
              </h3>
              <Image
                className="aspect-square"
                src={comic.img}
                width={comic.width}
                height={comic.height}
                alt={comic.title}
              />
            </a>
          </Link>
        ))}
      </section>
    </main>
  );
}

export async function getStaticProps(context) {
  const files = await fs.readdir("./comics");
  const lastComics = files.slice(-5, files.length);

  const promisesReadFiles = lastComics.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, "utf8");
    return JSON.parse(content);
  });

  const latestComics = await Promise.all(promisesReadFiles);

  return {
    props: {
      latestComics,
    },
  };
}
