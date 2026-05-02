import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/mdx/callout";
import { Counter } from "@/components/mdx/counter";
import { PreWithCopy } from "@/components/pre-with-copy";
import { StepCard } from "@/components/mdx/step-card";
import { CompareTable } from "@/components/mdx/compare-table";
import { Quiz } from "@/components/mdx/quiz";
import { DataFlowDiagram } from "@/components/mdx/data-flow-diagram";

export function getMDXComponents(): MDXComponents {
  return {
    pre: PreWithCopy,
    Callout,
    Counter,
    StepCard,
    CompareTable,
    Quiz,
    DataFlowDiagram,
  };
}
