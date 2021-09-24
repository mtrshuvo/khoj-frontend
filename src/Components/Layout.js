import React, { useEffect } from "react";
import Menu from "./Menu";

export default function Layout({ title = "Title", className, children }) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return (
    <div>
      <div className="mb-3">
        <Menu />
      </div>
      <div className={className}>{children}</div>
    </div>
  );
}
