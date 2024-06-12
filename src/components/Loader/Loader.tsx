import loaderImage from "../../images/loader.png";

export const Loader = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          minHeight: "calc(100vh - 192px)",
        }}
      >
        <img
          style={{ width: "380px", height: "330px" }}
          src={loaderImage}
          alt="Loading..."
        />
      </div>
    </>
  );
};
