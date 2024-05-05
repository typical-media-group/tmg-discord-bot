//     ╭───────────────────────────────────────────╮
//     │             Copyright (c)                 │
//     │           ────────────────                │
//     │  Typical Meida Group, All Rights Reserved │
//     ╰───────────────────────────────────────────╯
/**
 * Delays execution for a specified number of milliseconds.
 * @param timeInMilliseconds The number of milliseconds to delay.
 * @returns A promise that resolves after the specified delay.
 */
export function defer(timeInMilliseconds: number): Promise<void> {
    // Ensure the input is a finite number
    if (typeof timeInMilliseconds !== 'number' || !Number.isFinite(timeInMilliseconds)) {
        throw new TypeError('`timeInMilliseconds` must be a finite number');
    }

    // Ensure the time is non-negative
    if (timeInMilliseconds < 0) {
        throw new RangeError('`timeInMilliseconds` cannot be negative');
    }

    return new Promise(resolve => setTimeout(resolve, timeInMilliseconds));
}
