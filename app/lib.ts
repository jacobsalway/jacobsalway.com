import Link from "next/link";
import path from "path";
import fs from "fs";
import matter from "gray-matter";

const groupBy = <K, V>(
  array: Array<V>,
  keyGetter: (input: V) => K
): Map<K, Array<V>> => {
  const map = new Map<K, Array<V>>();
  array.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });

  return map;
};

export const formatDate = (date: Date | string, full = true): string => {
  date = typeof date === "string" ? new Date(date) : date;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = date.getDate();
  const month = full
    ? months[date.getMonth()]
    : months[date.getMonth()].slice(0, 3);
  const year = date.getFullYear().toString();

  return `${day} ${month} ${year}`;
};

const postsDir = path.join(process.cwd(), "content");

export const postIds = fs
  .readdirSync(postsDir)
  .map((fileName) => fileName.replace(/\.md$/, ""));

export const loadPost = (id: string) => {
  const postPath = path.join(postsDir, `${id}.md`);
  const contents = fs.readFileSync(postPath);
  const { data, content } = matter(contents);
  const { title, date } = data as Record<any, string>;

  return { id, title, date, content };
};

export const sortByDate = <T extends { date: string }>(
  values: T[],
  ascending = true
): T[] => {
  return values.sort((a, b) => {
    const dateA = Date.parse(a.date).valueOf();
    const dateB = Date.parse(b.date).valueOf();
    return ascending ? dateB - dateA : dateA - dateB;
  });
};

export const groupAndSortByYear = <T extends { date: string }>(
  values: T[]
): { group: string | number; values: T[] }[] => {
  return Array.from(
    groupBy(values, (value) => new Date(value.date).getFullYear())
  )
    .sort((a, b) => b[0] - a[0])
    .map(([year, v]) => ({ group: year, v }))
    .map(({ group, v }) => ({ group, values: sortByDate(v) }));
};
