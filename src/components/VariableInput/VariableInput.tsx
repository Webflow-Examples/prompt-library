"use client";

import * as React from "react";

export interface VariableSchema {
  type: "text" | "textarea";
  label: string;
  placeholder?: string;
  default?: string;
  description?: string;
  required?: boolean;
}

interface VariableInputProps {
  name: string;
  schema: VariableSchema;
  value: string;
  onChange: (value: string) => void;
}

export function VariableInput({
  name,
  schema,
  value,
  onChange,
}: VariableInputProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-6">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-foreground mb-2"
      >
        {schema.label}
        {schema.required && <span className="text-primary ml-1">*</span>}
      </label>

      {schema.description && (
        <p className="text-sm text-muted-foreground mb-3">{schema.description}</p>
      )}

      {schema.type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={schema.placeholder}
          rows={4}
          className="w-full px-4 py-3 rounded-[8px] border border-input bg-background text-foreground text-sm leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      ) : (
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={schema.placeholder}
          className="w-full px-4 py-3 rounded-[8px] border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      )}
    </div>
  );
}
