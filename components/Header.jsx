import Link from "next/link";

export default function header(){
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
              <Link href="/"><a className="text-sm font-bold">Home</a></Link>
            </li>
            <li>
              <Link href="/about"><a className="text-sm font-bold">About</a></Link>
            </li>
            <li>
              <Link href="/search"><a className="text-sm font-bold">Search</a></Link>
            </li>
          </ul>
        </nav>
    </header>
  )
}