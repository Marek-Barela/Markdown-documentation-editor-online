import SimpleMdeReact from "react-simplemde-editor";
import { useCallback, useState, useMemo, useEffect } from "react";
import "easymde/dist/easymde.min.css";

interface MarkdownProps {
  value: string;
  onChange: (value: string) => void;
}

export const Markdown = ({ value, onChange }: MarkdownProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = useCallback((value: string) => {
    onChange(value);
  }, []);

  useEffect(() => {
    const handleLoad = () => {
      const sideBySide = document.getElementsByClassName(
        "side-by-side"
      )[0] as HTMLButtonElement;

      if (sideBySide) {
        sideBySide.click();
        sideBySide.style.display = "none";
      }
      setIsLoading(false);
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
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
    }),
    []
  );

  return (
    <>
      <div style={{ display: isLoading ? "block" : "none" }}>Loading...</div>
      <div style={{ display: isLoading ? "none" : "block" }}>
        <SimpleMdeReact options={options} value={value} onChange={handleChange} />
      </div>
    </>
  );
};
