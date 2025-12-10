"use client";

import * as React from "react";
import {
  VariableInput,
  type VariableSchema,
} from "../VariableInput/VariableInput";
import { CodeBlock } from "../CodeBlock/CodeBlock";
import { PromptActions } from "../PromptActions/PromptActions";
import { formatPromptForChat } from "@/lib/promptFormatter";

interface PromptWithVariablesProps {
  yamlContent: string;
  variables?: Record<string, VariableSchema>;
}

export function PromptWithVariables({
  yamlContent,
  variables,
}: PromptWithVariablesProps) {
  // Initialize variable values with defaults
  const [variableValues, setVariableValues] = React.useState<
    Record<string, string>
  >(() => {
    const initial: Record<string, string> = {};
    if (variables) {
      Object.entries(variables).forEach(([key, schema]) => {
        initial[key] = schema.default || "";
      });
    }
    return initial;
  });

  // Format prompt with current variable values
  const formattedPrompt = React.useMemo(() => {
    return formatPromptForChat(yamlContent, variableValues);
  }, [yamlContent, variableValues]);

  const handleVariableChange = (name: string, value: string) => {
    setVariableValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const hasVariables = variables && Object.keys(variables).length > 0;

  return (
    <div>
      {hasVariables && (
        <div className="bg-card rounded-[8px] shadow-[0_2px_4px_rgba(0,0,0,0.1)] border border-border p-6 mb-6">
          <h2 className="text-xl font-semibold text-card-foreground mb-4">
            Configure Prompt
          </h2>
          {Object.entries(variables).map(([name, schema]) => (
            <VariableInput
              key={name}
              name={name}
              schema={schema}
              value={variableValues[name] || ""}
              onChange={(value) => handleVariableChange(name, value)}
            />
          ))}
        </div>
      )}

      <div className="mb-6">
        <PromptActions promptText={formattedPrompt} />
      </div>

      <div className="bg-card rounded-[8px] shadow-[0_2px_4px_rgba(0,0,0,0.1)] border border-border p-6">
        <h2 className="text-xl font-semibold text-card-foreground mb-4">Prompt</h2>
        <CodeBlock code={formattedPrompt} language="text" />
      </div>
    </div>
  );
}
