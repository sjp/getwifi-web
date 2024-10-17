import { GitHubIcon } from "./github-icon";
import "./root.css";

export const Footer = () => {
  return (
    <footer>
      Made by{" "}
      <a href="https://sjp.co.nz" target="_blank" rel="noreferrer noopener">
        sjp
      </a>{" "}
      &copy;{new Date().getFullYear()}{" "}
      <a
        href="https://github.com/sjp/getwifi-web"
        class="secondary"
        target="_blank"
        rel="noreferrer noopener"
      >
        <GitHubIcon />
      </a>
    </footer>
  );
};
