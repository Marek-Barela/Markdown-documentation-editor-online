import SimpleMdeReact from "react-simplemde-editor";
import { useCallback, useMemo } from "react";
import "easymde/dist/easymde.min.css";

interface MarkdownProps {
  value: string;
  onChange: (value: string) => void;
}

export const Markdown = ({ value, onChange }: MarkdownProps) => {
  const handleChange = useCallback((value: string) => {
    onChange(value);
  }, []);

  const options = useMemo(
    () => ({
      autofocus: true,
      spellChecker: false,
      toolbar: [
        "bold",
        "italic",
        "heading",
        "quote",
        "unordered-list",
        "ordered-list",
        "link",
        "image",
        "table",
        "horizontal-rule",
        "side-by-side",
        "fullscreen",
        "guide",
      ] as any[],
      status: false,
    }),
    []
  );

  return (
    <>
      <div>
        <SimpleMdeReact options={options} value={value} onChange={handleChange} />
      </div>
    </>
  );
};
