import { readdir, readFile } from "fs/promises";

export default async function search(req, res) {
  const list = await readdir("./comics");
  const listPromises = list.map((item) => readFile(`./comics/${item}`));

  const resPromises = await Promise.all(listPromises);
  const listFilesParsed = resPromises.map((file) => JSON.parse(file));

  const results = listFilesParsed.filter((file) => {
    const title = file.title.trim().toLowerCase();
    return title.includes(req.query.q.trim().toLowerCase());
  });

  res.json({
    results,
  });
}
