import "./styles.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          <span>&copy;</span> 2024&nbsp;
          <a
            href="https://github.com/kevinpanchal"
            target="_blank"
            rel="noreferrer"
          >
            Kevin Panchal
          </a>
          ,&nbsp;
          <a
            href="https://www.designite-tools.com/docs/designitejava.html#"
            target="_blank"
            rel="noreferrer"
          >
            DesigniteJava
          </a>
        </p>
      </div>
    </footer>
  );
}
