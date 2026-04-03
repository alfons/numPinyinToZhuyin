# numPinyinToZhuyin

A tiny utility for converting numbered **Hànyǔ Pīnyīn** (e.g. `fei1 chang2`) into **Zhuyin / Bopomofo** with tone marks.

## Overview

This function takes Pinyin syllables annotated with tone numbers (`1–5`) and outputs the corresponding Zhuyin symbols with proper tone diacritics.

One function, no dependencies, straightforward mapping.

## Example

```js
numPinyinToZhuyin("fei1 chang2 gan3 xie4");
```
``` 
ㄈㄟ ㄔㄤˊ ㄍㄢˇ ㄒㄧㄝˋ
```

## More Examples

### 1. Basic string input

```js
numPinyinToZhuyin("ni3 hao3")
```
``` 
ㄋㄧˇ ㄏㄠˇ
```



### 2. Array input

```js
numPinyinToZhuyin(["ni3", "hao3"])
```
``` 
ㄋㄧˇ ㄏㄠˇ
```



### 3. Mixed tones (including neutral tone)

```js
numPinyinToZhuyin("wo3 de5 ming2 zi4")
```
``` 
ㄨㄛˇ ˙ㄉㄜ ㄇㄧㄥˊ ㄗˋ
```



### 4. No tone numbers (defaults to no tone mark)

```js
numPinyinToZhuyin("ni hao")
```
``` 
ㄋㄧ ㄏㄠ
```



### 5. Using `returnArray = true`

```js
numPinyinToZhuyin("fei1 chang2", true)
```
```js
["ㄈㄟ", "ㄔㄤˊ"]
```



### 6. Orthographic normalization (contracted finals)

```js
numPinyinToZhuyin("you3 wei4")
```
``` 
ㄧㄡˇ ㄨㄟˋ
```



### 7. Umlaut handling (`ü` cases)

```js
numPinyinToZhuyin("lü4 se4")
```
``` 
ㄌㄩˋ ㄙㄜˋ
```

```js
numPinyinToZhuyin("ju4 qu4 xu1")
```
``` 
ㄐㄩˋ ㄑㄩˋ ㄒㄩ
```



### 8. Apical vowels (no explicit ㄧ)

```js
numPinyinToZhuyin("zhi1 chi1 shi1 ri4 zi3 ci4 si1")
```
``` 
ㄓ ㄔ ㄕ ㄖˋ ㄗˇ ㄘˋ ㄙ
```



### 9. Mixed array + missing tones

```js
numPinyinToZhuyin(["ma5", "ma", "ma3"])
```
``` 
˙ㄇㄚ ㄇㄚ ㄇㄚˇ
```

## Features

- Converts standard numbered Pinyin → Zhuyin
- Handles all five tones (including neutral tone `5`)
- Accepts either a space-separated string or an array of syllables
- Tone numbers are optional (no number = no tone mark)
- Optional array output via `returnArray`
- Handles common Pinyin orthographic normalization (e.g. `you → iu`, `wei → ui`, `yu → ü`)
- Correct handling of apical vowels (`zhi`, `chi`, `shi`, `zi`, `ci`, `si`)
- Preserves syllable boundaries

## Input Format

- Accepts:
  - Space-separated string: `"gan3 xie4"`
  - Array of syllables: `["gan3", "xie4"]`
- Tone numbers (`1–5`) are optional

## Output Format

- Zhuyin symbols with tone marks:
  - Tone 1: no mark
  - Tone 2: ˊ
  - Tone 3: ˇ
  - Tone 4: ˋ
  - Tone 5: ˙ (neutral tone, placed before the syllable)
- Returns a string by default, or an array if `returnArray = true`

## Installation

Just copy the function into your project — no package needed.

## License

MIT
