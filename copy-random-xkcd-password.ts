import { showToast, Toast, Clipboard } from "@raycast/api";
import wordList from './wordlist.json';

export default async function Command() {
  const password = generateXkcdPassword();
  
  try {
    await Clipboard.copy(password);
    await showToast({
      style: Toast.Style.Success,
      title: "Password Generated & Copied",
      message: password
    });
  } catch (error) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Failed to generate password",
      message: String(error)
    });
  }
}

function capitalizeWord(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function generateTwoDigits(): string {
  return String(Math.floor(Math.random() * 100)).padStart(2, '0');
}

function generateXkcdPassword(wordCount: number = 4, separator: string = '-'): string {
  const words = [];
  // Generate one less word than wordCount to leave room for digits
  for (let i = 0; i < wordCount - 1; i++) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    const word = capitalizeWord(wordList[randomIndex]);
    words.push(word);
  }
  
  // Add two digits at the end
  words.push(generateTwoDigits());
  
  return words.join(separator);
}
