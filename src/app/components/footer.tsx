/* eslint-disable react/no-unescaped-entities */
// Footer component providing information and a link to the source code on GitHub
export default function Footer() {
  return (
    <p className="bottom-4 text-xs font-light text-center">
      We upload your files to the database, but we do not store them. <br />
      You can monitor the background processes in your browser's developer
      console. <br />
      Check out the source code on {/* GitHub link with styling */}
      <a
        href="https://github.com/sametcn99/markdown-file-renamer-web-app"
        className="text-blue-600"
        target="_blank"
        rel="noreferrer"
      >
        Github
      </a>
    </p>
  );
}
