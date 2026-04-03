/*
 * Number-marked Pinyin → Zhuyin (performance-tuned)
 */
const numPinyinToZhuyin = (function () {
    // ────── Constants (created only ONCE) ──────
    const initialMap = {
        'zh': 'ㄓ', 'ch': 'ㄔ', 'sh': 'ㄕ', 'r': 'ㄖ',
        'z': 'ㄗ', 'c': 'ㄘ', 's': 'ㄙ',
        'j': 'ㄐ', 'q': 'ㄑ', 'x': 'ㄒ',
        'b': 'ㄅ', 'p': 'ㄆ', 'm': 'ㄇ', 'f': 'ㄈ',
        'd': 'ㄉ', 't': 'ㄊ', 'n': 'ㄋ', 'l': 'ㄌ',
        'g': 'ㄍ', 'k': 'ㄎ', 'h': 'ㄏ'
    };

    const finalMap = {
        'a': 'ㄚ', 'ai': 'ㄞ', 'an': 'ㄢ', 'ang': 'ㄤ', 'ao': 'ㄠ',
        'e': 'ㄜ', 'ei': 'ㄟ', 'en': 'ㄣ', 'eng': 'ㄥ', 'er': 'ㄦ',
        'o': 'ㄛ', 'ou': 'ㄡ',
        'i': 'ㄧ',
        'ia': 'ㄧㄚ', 'ian': 'ㄧㄢ', 'iang': 'ㄧㄤ', 'iao': 'ㄧㄠ',
        'ie': 'ㄧㄝ', 'in': 'ㄧㄣ', 'ing': 'ㄧㄥ', 'iong': 'ㄩㄥ',
        'iu': 'ㄧㄡ',
        'u': 'ㄨ',
        'ua': 'ㄨㄚ', 'uai': 'ㄨㄞ', 'uan': 'ㄨㄢ', 'uang': 'ㄨㄤ',
        'ui': 'ㄨㄟ', 'un': 'ㄨㄣ', 'uo': 'ㄨㄛ', 'ong': 'ㄨㄥ',
        'ü': 'ㄩ', 'üan': 'ㄩㄢ', 'üe': 'ㄩㄝ', 'ün': 'ㄩㄣ',
        'v': 'ㄩ', 'van': 'ㄩㄢ', 've': 'ㄩㄝ', 'vn': 'ㄩㄣ'
    };

    const toneMap = { '1': '', '2': 'ˊ', '3': 'ˇ', '4': 'ˋ', '5': '˙' };

    const sortedInitials = Object.keys(initialMap)
        .sort((a, b) => b.length - a.length);

    const apicalInitials = ['zh', 'ch', 'sh', 'r', 'z', 'c', 's'];

    // ────── Inner converter ──────
    function convertPZSyllable(syl) {
        if (!syl) return '';

        // Faster tone extraction (no regex)
        let tone = '';
        let base = syl;
        const lastChar = syl[syl.length - 1];
        if (lastChar >= '1' && lastChar <= '5') {
            tone = lastChar;
            base = syl.slice(0, -1);
        }

        // Normalization chain
        let normalized = base
            .replace(/^you/, 'iu').replace(/^yan/, 'ian').replace(/^yin/, 'in')
            .replace(/^yang/, 'iang').replace(/^ying/, 'ing').replace(/^yong/, 'iong')
            .replace(/^wei/, 'ui').replace(/^wen/, 'un')
            .replace(/^wu/, 'u');

        if (normalized === 'yi' || normalized.startsWith('yi')) {
            normalized = normalized.replace(/^yi/, 'i');
        } else if (normalized.startsWith('y')) {
            normalized = normalized.startsWith('yu')
                ? normalized.replace(/^yu/, 'ü')
                : normalized.replace(/^y/, 'i');
        }
        if (normalized.startsWith('w')) {
            normalized = normalized.replace(/^w/, 'u');
        }

        // Find initial
        let initialStr = '';
        let finalStr = normalized;
        for (const init of sortedInitials) {
            if (normalized.startsWith(init)) {
                initialStr = init;
                finalStr = normalized.slice(init.length);
                break;
            }
        }

        // j/q/x + u → ü handling
        if (['j', 'q', 'x'].includes(initialStr) && finalStr.startsWith('u')) {
            finalStr = 'ü' + finalStr.slice(1);
        }

        // Build Zhuyin
        let zhuyin = initialMap[initialStr] || '';
        if (!(finalStr === 'i' && apicalInitials.includes(initialStr))) {
            zhuyin += (finalMap[finalStr] || finalStr);
        }

        const toneSymbol = toneMap[tone] || '';
        return toneSymbol === '˙' ? '˙' + zhuyin : zhuyin + toneSymbol;
    }

    // ────── Public API ──────
    return function (pinyinInput, returnArray = false) {
        if (!pinyinInput) return returnArray ? [] : '';

        const syllables = Array.isArray(pinyinInput)
            ? pinyinInput.map(s => String(s).toLowerCase().trim())
            : String(pinyinInput).toLowerCase().trim().split(/\s+/).filter(Boolean);

        const result = syllables.map(convertPZSyllable);
        return returnArray ? result : result.join(' ').trim();
    };
})();
