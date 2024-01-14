# Rename Markdown Files Using Frontmatter Title

- This project is a web application that allows users to upload Markdown files, store them locally, and later download the files with renamed filenames.  
- It has been created to help develop the [NextUI Blog Template](https://github.com/sametcn99/nextui-blog-template) project.

## Demo

To try the project online, you can visit the following demo link: [Demo Link](https://markdown-file-renamer-web-app.vercel.app/)

## Technologies

This project is developed using the following technologies:

- [Next.js](https://nextjs.org/): A fast and customizable framework for building web applications using React.

## Project Structure

The project consists of two main files: `upload-files.tsx` and `utils.ts`. Here's a detailed description of both files:

## upload-files.tsx

This file manages the user interface and file upload functionality. It is a React component created using the React and NextUI libraries.

- **useState Hooks:** Used to manage the state of files and the disabled/enabled status of buttons.
- **useDropzone Hook:** Provides functionality for dragging and dropping files or selecting them. It only accepts specific Markdown file types.
- **onDrop Callback Function:** Triggered when files are dropped or selected. It saves the uploaded files to the state variable and enables the upload button.
- **uploadClick Function:** When the upload button is clicked, it saves the selected files to local storage and enables the download button.
- **downloadClick Function:** When the download button is clicked, it reads the files from local storage and allows the user to download them.
- **clearClick Function:** When the clear button is clicked, it clears the uploaded files and local storage.

The component includes a card where users can drag and drop or select files, a table listing the uploaded files, and buttons for uploading, clearing, or downloading files.

## utils.ts

This file contains helper functions for file processing and local storage functionality.

- **handleLocalStorageFiles Function:** Reads the uploaded files using the FileReader API and saves the content to local storage.
- **readFilesFromLocalStorage Function:** Reads files from local storage. If a file exists, it reads the file content and parses the Markdown metadata with the gray-matter library. It renames the file and creates a Blob URL for downloading. If there are multiple files, it bundles them into a ZIP file for downloading.
- **TextRegex Function:** Used for editing file names. It replaces Turkish characters with their English equivalents and makes file names URL-friendly.

Together, these files create a workflow that allows users to upload Markdown files, store them locally, and download the files with renamed filenames. The application provides a user-friendly interface and file processing functionality for easy management of files.

## Contribution

If you'd like to contribute to this project, please follow these steps:

1. Fork the project.
2. Add a new feature or fix a bug.
3. Upload your changes (push).
4. Create a pull request.

## License

This project is licensed under the [GPL-3.0 License](LICENSE). For more information, please review the license file.

## Contact

If you have any questions or feedback, please don't hesitate to reach out to me.
