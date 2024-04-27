import "./styles.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          <span>&copy;</span> {new Date().getFullYear()}&nbsp;
          <a
            href="https://designite-tools.com/products-dj"
            target="_blank"
            rel="noreferrer"
          >
            DesigniteJava
          </a>
          .&nbsp;
          <a href="https://github.com/DesigniteTools/DJ-viz"
            target="_blank"
            rel="noreferrer">
              Contributors.
            </a>
        </p>
      </div>
    </footer>
  );
}
