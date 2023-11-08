export default function TextRegex(text: string) {
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
  return convertedString;
}
