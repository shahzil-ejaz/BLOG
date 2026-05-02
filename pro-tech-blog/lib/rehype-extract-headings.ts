import { toString } from "hast-util-to-string";
import type { Root } from "hast";
import { visit } from "unist-util-visit";

export type TocItem = { id: string; text: string; depth: 2 | 3 };

export function rehypeExtractHeadings(headings: TocItem[]) {
  return () => (tree: Root) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "h2" && node.tagName !== "h3") return;
      const id = node.properties?.id;
      if (typeof id !== "string" || !id) return;
      headings.push({
        id,
        text: toString(node).trim(),
        depth: node.tagName === "h2" ? 2 : 3,
      });
    });
  };
}
