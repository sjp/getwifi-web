import { GitHubIcon } from "./icons/github-icon";
import { useI18nContext } from "./i18n/i18n-react";
import "./root.css";

export const Footer = () => {
  const { LL } = useI18nContext();

  return (
    <footer>
      <a href="https://sjp.co.nz" target="_blank" rel="noreferrer noopener">
        {LL.authorship({ author: "sjp" })}
      </a>{" "}
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
