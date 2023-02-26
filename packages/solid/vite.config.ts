import solidPlugin from "vite-plugin-solid";
import fs from "fs";
import imp from "vite-plugin-imp";
const item: string[] = fs
    .readdirSync("../react/src/icons/")
    .filter((i: string) => i.endsWith(".tsx"));
const bundle = [
    {
        enforce: "pre",
        resolveId(thisFile: string) {
            if (thisFile === "react") {
                // 因为已经没有 react 依赖了，我们把它写成 solid-js...😂
                return { id: "solid-js", external: true };
            } else if (thisFile.startsWith("solid-js")) {
                return { id: thisFile, external: true };
            }
        },
    },
    {
        enforce: "pre",
        resolveId(thisFile: string, importer: string) {
            if (thisFile === "../runtime") {
                // console.log(importer);
                return "../solid/src/runtime/index.tsx";
            }
        },
        transform(code: string, id: string) {
            if (id.includes("src/icons")) {
                const newCode = code
                    .replace(/strokeWidth=/g, "stroke-width=")
                    .replace(/strokeLinejoin=/g, "stroke-linejoin=")
                    .replace(/strokeLinecap=/g, "stroke-linecap=");
                // console.log(newCode);
                // throw new Error("");
                return newCode;
            }
        },
    },
];
const output = {
    outDir: "es",
    lib: {
        entry: {
            ...Object.fromEntries(
                item.map((i) => {
                    return [
                        "icons/" + i.replace(".tsx", ""),
                        "../react/src/icons/" + i,
                    ];
                })
            ),
            all: "./src/all.ts",
            index: "./src/index.ts",
        },
        formats: ["es"],
    },
};
export default ({ mode }) => ({
    plugins: [
        mode === "production" && bundle,
        solidPlugin(),
        mode === "test" &&
            imp({
                libList: [
                    {
                        libName: "icon-park-solid",
                        libDirectory: "es/icons",
                        camel2DashComponentName: false,
                    },
                ],
            }),
    ].flat(),
    server: { port: 3000 },
    build:
        mode === "production"
            ? output
            : {
                  outDir: "dist",
              },
});
