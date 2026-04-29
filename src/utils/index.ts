/**
 * Converts a string from snake_case to camelCase.
 *
 * @param str - The string to convert.
 * @returns The converted string.
 */
const toCamelCase = (str: string) => {
    return str.replace(/([-_][a-z])/gi, $1 => {
        return $1.toUpperCase().replace("-", "").replace("_", "");
    });
};

export const convertKeysToCamelCase = <T = any>(obj: { [key: string]: any }): T => {
    if (Array.isArray(obj)) {
        return obj.map(item => convertKeysToCamelCase(item)) as unknown as T;
    } else if (typeof obj === "object" && obj !== null) {
        const newObj: { [key: string]: any } = {};
        for (const key in obj) {
            newObj[toCamelCase(key)] = convertKeysToCamelCase((obj as { [key: string]: any })[key]);
        }
        return newObj as unknown as T;
    } else {
        return obj;
    }
};

//** Support Vietnamese text search */
export const normalize = (str: string) =>
    str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

export * from "./date";
export * from "./schema";
