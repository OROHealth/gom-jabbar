/**
 * This function wraps a setTimeout into a Promise
 * @param ms The duration in milliseconds to apply
 */
export function promiseTimeout(ms: number): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * This function splits an array from environment variables (comma separated)
 * @param array The array to split (format: 'tata,toto,titi')
 * @returns A List of string
 */
export function splitEnvVarArray(array: string): string[] {
    return array.split(',').filter((value) => value !== '');
}
