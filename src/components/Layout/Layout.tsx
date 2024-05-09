import { customColors } from "../../styles/colors";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div
        style={{
          background: customColors.grey,
          width: "100%",
          height: "calc(100vh - 128px)",
        }}
      >
        <div style={{ padding: "0 5%" }}>{children}</div>
      </div>
    </>
  );
};
