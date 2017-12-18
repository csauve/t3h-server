import cfonts from "cfonts";
import boxen from "boxen";
import chalk from "chalk";

export default function printBanner(text) {
  const name = cfonts.render(text, {
    font: "block",
    colors: ["cyan", "magenta"]
  }).string;

  const box = boxen(name, {
    margin: 1,
    padding: {top: 0, bottom: 0, left: 3, right: 3},
    borderStyle: "double",
    borderColor: "magenta"
  });

  console.log(box);
};
