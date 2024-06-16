import { CUSTOM_COLORS } from "../../styles/colors";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div
        style={{
          background: CUSTOM_COLORS.grey,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          minHeight: "calc(100vh - 128px)",
        }}
      >
        <div style={{ padding: "0 5% 30px" }}>{children}</div>
      </div>
    </>
  );
};
