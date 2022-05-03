import { readdir, readFile } from "fs/promises";
import Image from "next/image";
import Link from "next/link";
// import Link from "next/link";

export default function search({results}){
  return (
    <main>
    {
      !!results.length &&
        <ul className="max-w-lg m-auto border rounded-lg border-gray-50 bg-gray-50 shadow-xl">
          {
            results.lenght > 0 && <li>Ver {result.length} resultado</li>
          }
          {
            results.map(result => {
              return (
                <li className="px-2 py-1 m-0 z-1 hover:bg-slate-200 rounded-sm" key={result.id}>
                  <Link href={`/comics/${result.id}`}>
                    <a className="text-sm font-semibold block flex items-center">
                      <Image src={result.img} width={50} height={50} layout="intrinsic" alt={result.title} />&nbsp;
                      {result.title}
                    </a>
                  </Link>
                </li>
              )
            })
          }
        </ul>
    }
    </main>
  )
}

export async function getServerSideProps({req, res, query}){
  const queryText = query.q;

  if(!queryText) return { props: {results: []}}

  const list = await readdir('./comics')
  const listPromises = list.map(item => readFile(`./comics/${item}`))

  const resPromises = await Promise.all(listPromises)
  const listFilesParsed = resPromises.map(file => JSON.parse(file))

  const results = listFilesParsed.filter(file => {
    const title = file.title.trim().toLowerCase()
    return title.includes(queryText.trim().toLowerCase())
  })

  console.log(results)

  return {
    props:{
      results
    }
  }
}