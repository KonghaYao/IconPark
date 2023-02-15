import fs from "fs";
const iconList = fs
    .readdirSync("../react/src/icons/")
    .filter((i) => i.endsWith(".tsx"));

const all = fs
    .readFileSync("./src/all.type.d.ts", "utf-8")
    .replace(`import * as IconMap from "./map";`, ``)
    .replace(
        `export type IconType = keyof typeof IconMap;`,
        `export type IconType = ${iconList
            .map((i) => `"${i.replace(".tsx", "")}"`)
            .join("|")}; `
    )
    .replace(/"\.\/runtime"/g, '"../src/runtime"');
fs.writeFileSync("./es/all.d.ts", all);
const index =
    fs
        .readFileSync("./src/index.type.d.ts", "utf-8")

        .replace(/"\.\/runtime"/g, '"../src/runtime"') +
    `import { Icon } from "../src/runtime";` +
    iconList
        .map((i) => {
            return `export const ${i.replace(".tsx", "")}:Icon;`;
        })
        .join("\n");
fs.writeFileSync("./es/index.d.ts", index);
