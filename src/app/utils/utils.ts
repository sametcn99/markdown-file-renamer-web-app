import JSZip from "jszip";
import matter from "gray-matter";

/**
 * Reads uploaded file contents and stores them in local storage
 * with the file name as the key.
 *
 * @param uploadedFiles - The files uploaded by the user.
 */
export const handleLocalStorageFiles = async (uploadedFiles: File[]) => {
  uploadedFiles.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const fileContent = event.target!.result;
      localStorage.setItem(file.name, fileContent!.toString());
    };
    reader.readAsText(file);
  });
};

/**
 * Reads all file contents stored in localStorage and downloads them.
 * If there is only one file, it downloads it directly with the converted file name.
 * If there are multiple files, it zips them together into one zip file for download.
 * Clears localStorage after downloading the file(s).
 */
export const readFilesFromLocalStorage = () => {
  const files: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const fileName = localStorage.key(i);
    if (fileName) {
      files.push(fileName);
    }
  }
  if (files.length === 0) {
    alert("Local Storage boş");
  } else if (files.length === 1) {
    const fileContent = localStorage.getItem(files[0]);
    if (fileContent) {
      const matterResult = matter(fileContent);
      const title = matterResult.data.title;
      const blob = new Blob([fileContent], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const convertedFileName = TextRegex(title) + ".md";
      const a = document.createElement("a");
      a.href = url;
      a.download = convertedFileName;
      a.click();
      URL.revokeObjectURL(url);
    }
  } else if (files.length > 1) {
    const zip = new JSZip();
    files.forEach((fileName: string) => {
      const fileContent = localStorage.getItem(fileName);
      if (fileContent) {
        const matterResult = matter(fileContent);
        const title = matterResult.data.title;
        const convertedFileName = TextRegex(title) + ".md";
        zip.file(convertedFileName, fileContent);
      }
    });
    zip.generateAsync({ type: "blob" }).then((content) => {
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = "files.zip";
      a.click();
      URL.revokeObjectURL(url);
    });
  }
  localStorage.clear();
};

export function TextRegex(text: string) {
  // Replace Turkish characters with their English equivalents
  let convertedString = text
    .replace(/ğ/g, "g")
    .replace(/Ğ/g, "G")
    .replace(/ş/g, "s")
    .replace(/Ş/g, "S")
    .replace(/ı/g, "i")
    .replace(/İ/g, "I")
    .replace(/ü/g, "u")
    .replace(/Ü/g, "U")
    .replace(/ö/g, "o")
    .replace(/Ö/g, "O")
    .replace(/ç/g, "c")
    .replace(/Ç/g, "C");

  // Replace any characters that are not letters, numbers, or hyphens with hyphens
  // Replace spaces with hyphens
  convertedString = convertedString
    .replace(/[^a-zA-Z0-9-]/g, "-")
    .replace(/ /g, "-")
    .replace(/-+/g, "-"); // Replace consecutive hyphens with a single hyphen
  console.log("File Regex: " + convertedString + "\nOriginal text: " + text);
  return convertedString;
}
