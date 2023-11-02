import "./ErrorMessage.css";
export default function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔️ </span>
      {message}
    </p>
  );
}
