import SimpleMdeReact from "react-simplemde-editor";
import { useCallback, useState, useMemo, useEffect } from "react";
import "easymde/dist/easymde.min.css";

export const Markdown = () => {
  const [value, setValue] = useState("Initial value");

  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  useEffect(() => {
    const handleLoad = () => {
      const sideBySide = document.getElementsByClassName(
        "side-by-side"
      )[0] as HTMLButtonElement;

      if (sideBySide) {
        sideBySide.click();
      }
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
        "preview",
        "side-by-side",
        "fullscreen",
        "guide",
      ] as any[],
      defaultTab: "side-by-side",
    }),
    []
  );

  return <SimpleMdeReact options={options} value={value} onChange={onChange} />;
};
