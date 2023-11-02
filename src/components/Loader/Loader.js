import { ThreeDots } from "react-loader-spinner";

export default function Loader() {
  return (
    <ThreeDots
      height="100"
      width="100"
      radius="9"
      color="#1c6cbc"
      ariaLabel="three-dots-loading"
      wrapperStyle={{ display: "flex", justifyContent: "center" }}
      wrapperClassName="loader"
      visible={true}
    />
  );
}
