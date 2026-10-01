const SHY = "­";
/** Words shorter than this fit a table tile at 11px without breaking. */
const MIN_WORD = 8;
const MIN_PART = 3;
const VOWEL = /[aeiouy]/i;
const DIGRAPH_HEAD = /[cstpgw]/i;

/**
 * Insert soft hyphens into long Latin words so narrow tiles break them at
 * syllable-like points ("Dis-cern-ment"). CSS `hyphens: auto` is not
 * reliable here: Chromium on some platforms ships no hyphenation dictionary.
 */
export function softHyphenate(text: string): string {
  return text.replace(/[A-Za-z]+/g, (word) => (word.length < MIN_WORD ? word : hyphenateWord(word)));
}

/** Break before a consonant that is followed by a vowel (V-CV, VC-CV), keeping digraphs whole. */
function isBreak(word: string, i: number): boolean {
  const [prev, cur, next] = [word[i - 1], word[i], word[i + 1]];
  if (VOWEL.test(cur) || !VOWEL.test(next)) return false;
  return !(cur.toLowerCase() === "h" && DIGRAPH_HEAD.test(prev));
}

function hyphenateWord(word: string): string {
  let out = "";
  let last = 0;
  for (let i = MIN_PART; i <= word.length - MIN_PART; i++) {
    if (isBreak(word, i) && i - last >= MIN_PART) {
      out += word.slice(last, i) + SHY;
      last = i;
    }
  }
  return out + word.slice(last);
}
