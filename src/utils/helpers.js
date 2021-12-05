export const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}
export const isNumber = (n) => {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}