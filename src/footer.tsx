import "./root.css";

export const Footer = () => {
  return (
    <>
      <footer>
        <div class="container">
          Made by me &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </>
  );
};
