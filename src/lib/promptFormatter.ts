import yaml from "js-yaml";

export interface ParsedPrompt {
  role?: string;
  context?: {
    goal?: string;
    [key: string]: any;
  };
  task?: string | string[];
  instructions?: {
    [key: string]: any;
  };
  [key: string]: any;
}

/**
 * Substitutes variables in a string using {{variableName}} syntax
 */
export function substituteVariables(
  content: string,
  variables: Record<string, string>
): string {
  return content.replace(/\{\{(\w+)\}\}/g, (match, varName) => {
    return variables[varName] !== undefined ? variables[varName] : match;
  });
}

/**
 * Converts YAML prompt content to a readable text format optimized for copy/paste into AI chats
 * @param yamlContent - The YAML content to format
 * @param variables - Optional object with variable values to substitute
 */
export function formatPromptForChat(
  yamlContent: string,
  variables?: Record<string, string>
): string {
  try {
    const parsed = yaml.load(yamlContent) as ParsedPrompt | any;

    if (!parsed || typeof parsed !== "object") {
      return yamlContent; // Fallback to original if parsing fails
    }

    const lines: string[] = [];

    // Handle optimized_target_prompt wrapper (some prompts have this structure)
    let promptData = parsed;
    if (parsed.optimized_target_prompt) {
      promptData = parsed.optimized_target_prompt;
    }

    // Helper to substitute variables in a string
    const subVars = (str: string): string => {
      if (!variables) return str;
      return substituteVariables(str, variables);
    };

    // Role
    if (promptData.role) {
      lines.push(subVars(promptData.role.trim()));
      lines.push("");
    }

    // Context
    if (promptData.context) {
      if (promptData.context.goal) {
        lines.push("## Goal");
        lines.push(subVars(promptData.context.goal.trim()));
        lines.push("");
      }

      // Handle other context fields
      Object.entries(promptData.context).forEach(([key, value]) => {
        if (key !== "goal" && value) {
          const formattedKey =
            key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ");
          if (typeof value === "string") {
            lines.push(`## ${formattedKey}`);
            lines.push(subVars(value.trim()));
            lines.push("");
          }
        }
      });
    }

    // Task
    if (promptData.task) {
      lines.push("## Task");
      if (Array.isArray(promptData.task)) {
        promptData.task.forEach((item: string) => {
          if (typeof item === "string") {
            lines.push(`- ${subVars(item.trim())}`);
          }
        });
      } else if (typeof promptData.task === "string") {
        lines.push(subVars(promptData.task.trim()));
      }
      lines.push("");
    }

    // Instructions
    if (promptData.instructions) {
      lines.push("## Instructions");

      // Format operating principles
      if (promptData.instructions.operating_principles) {
        lines.push("### Operating Principles");
        if (Array.isArray(promptData.instructions.operating_principles)) {
          promptData.instructions.operating_principles.forEach(
            (item: string) => {
              if (typeof item === "string") {
                lines.push(`- ${subVars(item.trim())}`);
              }
            }
          );
        } else if (
          typeof promptData.instructions.operating_principles === "string"
        ) {
          lines.push(
            subVars(promptData.instructions.operating_principles.trim())
          );
        }
        lines.push("");
      }

      // Format tool flow
      if (promptData.instructions.tool_flow) {
        lines.push("### Tool Flow");
        if (Array.isArray(promptData.instructions.tool_flow)) {
          promptData.instructions.tool_flow.forEach((item: string) => {
            if (typeof item === "string") {
              // Remove quotes and clean up
              const cleaned = item.replace(/^["']|["']$/g, "").trim();
              lines.push(`- ${subVars(cleaned)}`);
            }
          });
        } else if (typeof promptData.instructions.tool_flow === "string") {
          lines.push(subVars(promptData.instructions.tool_flow.trim()));
        } else if (typeof promptData.instructions.tool_flow === "object") {
          // Handle object structure
          if (promptData.instructions.tool_flow.steps) {
            const steps = promptData.instructions.tool_flow.steps;
            if (Array.isArray(steps)) {
              steps.forEach((step: string) => {
                if (typeof step === "string") {
                  const cleaned = step.replace(/^["']|["']$/g, "").trim();
                  lines.push(`- ${subVars(cleaned)}`);
                }
              });
            }
          }
        }
        lines.push("");
      }

      // Handle other instruction fields
      Object.entries(promptData.instructions).forEach(([key, value]) => {
        if (!["operating_principles", "tool_flow"].includes(key) && value) {
          const formattedKey =
            key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ");
          if (typeof value === "string") {
            lines.push(`### ${formattedKey}`);
            lines.push(subVars(value.trim()));
            lines.push("");
          } else if (Array.isArray(value)) {
            lines.push(`### ${formattedKey}`);
            value.forEach((item: any) => {
              if (typeof item === "string") {
                lines.push(`- ${subVars(item.trim())}`);
              }
            });
            lines.push("");
          }
        }
      });
    }

    // Handle any top-level fields we haven't covered
    const coveredKeys = [
      "role",
      "context",
      "task",
      "instructions",
      "optimized_target_prompt",
    ];
    Object.entries(promptData).forEach(([key, value]) => {
      if (!coveredKeys.includes(key) && value) {
        const formattedKey =
          key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ");
        if (typeof value === "string") {
          lines.push(`## ${formattedKey}`);
          lines.push(subVars(value.trim()));
          lines.push("");
        } else if (Array.isArray(value)) {
          lines.push(`## ${formattedKey}`);
          value.forEach((item: any) => {
            if (typeof item === "string") {
              lines.push(`- ${subVars(item.trim())}`);
            }
          });
          lines.push("");
        }
      }
    });

    return lines.join("\n").trim();
  } catch (error) {
    console.error("Error formatting prompt:", error);
    // Still try to substitute variables even if YAML parsing fails
    if (variables) {
      return substituteVariables(yamlContent, variables);
    }
    return yamlContent; // Fallback to original YAML
  }
}
