export const Capitalize = (title: string): string => {
  const titleArr = title.split(" ");
  for (let el in titleArr) {
    el = el[0].toUpperCase() + el.slice(1);
  }
  return titleArr.join(" ");
};
