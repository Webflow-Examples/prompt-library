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
        className="block text-sm font-medium text-[#333] mb-2"
      >
        {schema.label}
        {schema.required && <span className="text-[#146ef5] ml-1">*</span>}
      </label>

      {schema.description && (
        <p className="text-sm text-[#555] mb-3">{schema.description}</p>
      )}

      {schema.type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={schema.placeholder}
          rows={4}
          className="w-full px-4 py-3 rounded-[8px] border border-[#D8D8D8] bg-white text-[#333] text-sm leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-[#146ef5] focus:border-transparent transition-all"
        />
      ) : (
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={schema.placeholder}
          className="w-full px-4 py-3 rounded-[8px] border border-[#D8D8D8] bg-white text-[#333] text-sm focus:outline-none focus:ring-2 focus:ring-[#146ef5] focus:border-transparent transition-all"
        />
      )}
    </div>
  );
}
