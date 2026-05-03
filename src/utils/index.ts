/**
 * Checks if the provided data is empty.
 *
 * @param data - The data to check, which can be an array of strings or numbers, or an object.
 * @returns `true` if the data is empty, `false` otherwise.
 */
export const isEmpty = (data: Array<string | number> | object) => {
    if (!data) return true;

    if (Array.isArray(data)) {
        return data.length === 0;
    }

    return Object.keys(data).length === 0;
};

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
