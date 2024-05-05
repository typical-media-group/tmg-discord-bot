//     ╭───────────────────────────────────────────╮
//     │             Copyright (c)                 │
//     │           ────────────────                │
//     │  Typical Meida Group, All Rights Reserved │
//     ╰───────────────────────────────────────────╯

//------------------------------------------------------------//

import fs from 'fs';
import path from 'path';

//------------------------------------------------------------//

/**
 * Default filter that excludes common directories and files like node_modules and .git.
 * @param itemName The name of the directory or file.
 * @returns A boolean indicating whether the item should be included.
 */
const Filter = (itemName: string): boolean => !['node_modules', '.git', '.gitignore', '.env'].includes(itemName);

//------------------------------------------------------------//

/**
 * Recursively traverses a directory to find files, applying a filter to include or exclude items.
 * @param directoryPath The path to the directory, either relative or absolute.
 * @param filter A function used to decide whether a directory or file should be included.
 * @param initialDirectoryPath Internal use only for recursion, to calculate relative paths.
 * @returns An array of relative file paths within the `directoryPath`.
 * @throws {Error} If the provided `directoryPath` does not exist or is not a directory.
 */
export function directory(
    directoryPath: string,
    filter: (itemName: string) => boolean = Filter,
    initialDirectoryPath: string | undefined = undefined
): string[] {
    if (!fs.existsSync(directoryPath)) {
        throw new Error(`Path does not exist: ${directoryPath}`);
    }

    const directoryStats = fs.statSync(directoryPath);
    if (!directoryStats.isDirectory()) {
        throw new Error(`Path is not a directory: ${directoryPath}`);
    }

    initialDirectoryPath = initialDirectoryPath ?? directoryPath;

    const foundFilePaths: string[] = [];
    const directoryItems = fs.readdirSync(directoryPath).filter(filter);

    for (const item of directoryItems) {
        const itemPath = path.join(directoryPath, item);
        const itemStats = fs.statSync(itemPath);

        if (itemStats.isDirectory()) {
            const recursiveFilePaths = directory(itemPath, filter, initialDirectoryPath);
            foundFilePaths.push(...recursiveFilePaths);
        } else {
            const relativeFilePath = path.relative(initialDirectoryPath, itemPath).replace(/\\/g, '/');
            foundFilePaths.push(relativeFilePath);
        }
    }

    return foundFilePaths;
}
