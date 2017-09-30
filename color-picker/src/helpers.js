export const convertHslToRgb = (h, s, l) => {
    let c, x, m;
    let r, g, b;

    s /= 100;
    l /= 100;

    c = (1 - Math.abs(2 * l - 1)) * s;
    x = c * (1 - Math.abs((h / 60) % 2 - 1))
    m = l - c / 2

    if (h >= 0 && h < 60) {
        r = c;
        b = x;
        g = 0;
    }

    if (h >= 60 && h < 120) {
        r = x;
        b = c;
        g = 0;
    }

    if (h >= 120 && h < 180) {
        r = 0;
        b = c;
        g = x;
    }

    if (h >= 180 && h < 240) {
        r = 0;
        b = x;
        g = c;
    }

    if (h >= 240 && h < 300) {
        r = x;
        b = 0;
        g = c;
    }

    if (h >= 300 && h < 360) {
        r = c;
        b = 0;
        g = x;
    }

    return [Math.round((r + m) * 255), Math.round((b + m) * 255), Math.round((g + m) * 255)];
}

export const convertRgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;

    let h, s, l;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);

    let delta = max - min
    l = (max + min) / 2;

    if (delta === 0) {
        h = 0;
        s = 0;
    }
    else {
        switch (max) {
            case r:
                h = ((g - b) / delta) % 6;
                break;
            case g:
                h = (b - r) / delta + 2;
                break;
            case b:
                h = (r - g) / delta + 4;
                break;
        }
        s = delta / (1 - Math.abs(2 * l - 1))
    }
    return [h, s, l]
}