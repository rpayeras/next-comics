import { readdir, readFile, stat } from "fs/promises";
import Image from "next/image";
import { basename } from "path";

function Comic({id, img, alt, title, width, height, prevId, nextId}) {
  return (
    <main>
      <section className="max-w-lg m-auto">
        <h1 className="font-bold text-center mb-4">{title}</h1>
        <div className="max-w-xs m-auto mb-4">
          <Image 
            layout="responsive" 
            width={width} 
            height={height} 
            src={img} 
            alt={alt}
          />
        </div>

        <p>{alt}</p>

        <div className="flex justify-between mt-4 font-bold">
          {
            prevId && <a href={`/comic/${prevId}`} className="text-gray-600">⬅️ Previous</a>
          }
          {
            nextId && <a href={`/comic/${nextId}`} className="text-gray-600">Next ➡️</a>
          }
        </div>
      </section>
    </main>
  )
}

export async function getStaticPaths({ locales }){
  const files = await readdir('./comics')
  let paths = []

  locales.forEach(locale => {
    paths = paths.concat(
      files.map(file => {
        const id = basename(file, '.json')
        return { params: { id }, locale}
      })
    )
  })

  return {
    paths: paths,
    fallback: false
  }
}

export async function getStaticProps({params}){
  const {id} = params;

  const content = await readFile(`./comics/${id}.json`, 'utf8');
  const comic = JSON.parse(content);

  const idNumber = Number(id)
  const prevId = idNumber - 1
  const nextId = idNumber + 1

  const [prevRes, nextRes] = await Promise.all([
    await stat(`./comics/${prevId}.json`).catch(e => Promise.resolve(new Error(e))),
    await stat(`./comics/${nextId}.json`).catch(e => Promise.resolve(new Error(e)))
  ])

  return {
    props: {
      ...comic,
      prevId: !!prevRes.dev ? prevId : null,
      nextId: !!nextRes.dev ? nextId : null
    }
  }
}

export default Comic