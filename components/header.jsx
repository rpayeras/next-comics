import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export default function Header(){
  const [results, setResults] = useState([])
  const searchRef = useRef()
  const {locale, locales} = useRouter()

  const getValue = () => searchRef.current?.value

  const handleChange = async() => {
    const q = getValue()

    if(!q){
      setResults([])
      return
    }

    let res = await fetch('/api/search?q=' + q)
    res = await res.json()

    console.log(res)

    setResults(res.results)
  }

  const restOfLocales = locales.filter(l => l !== locale)

  return (
    <header className="flex justify-between items-center p-4 max-w-xl m-auto">
        <h1 className="font-bold">
          <Link href="/">
            <a>
            Next<span className="font-light">XKCD</span>
            </a>
          </Link>
         </h1>
        <nav>
          <ul className="flex flex-row gap-2 list-none">
            <li>
              <Link href={`/`}>
                <a className="text-sm font-bold">Home</a>
              </Link>
            </li>
            <li>
              <Link href={`/`} locale={restOfLocales[0]}><a>{restOfLocales[0]}</a></Link>
            </li>
            <li className="relative">
              <input ref={searchRef} onChange={handleChange} type="search" className="px-4 py-1 text-xs border border-gray-400 rounded-3xl" />
              {
                !!results.length && <div className="absolute top-8 left-0 z-10">
                  <ul className="w-full border rounded-lg border-gray-50 bg-gray-50 shadow-xl">
                    {
                      results.lenght > 0 && <li>Ver {result.length} resultado</li>
                    }
                    {
                      results.map(result => {
                        return (
                          <li className="px-2 py-1 m-0 z-1 hover:bg-slate-200 rounded-sm" key={result.id}>
                            <Link href={`/comics/${result.id}`}>
                              <a className="text-sm font-semibold block">
                                {result.title}
                              </a>
                            </Link>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              }
            </li>
          </ul>
        </nav>
    </header>
  )
}