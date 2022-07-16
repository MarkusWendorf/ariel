import { type Transformer } from "unified";
export interface Options {
    renderDiagram: (diagram: string) => Promise<string>;
}
export declare function rehypeMermaidSvg(options: Options): Transformer;
