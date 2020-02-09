export const debounce = (fn: Function, timeout = 1000) => {
    let activeTimeout: NodeJS.Timeout;
    let storedArgs: any;

    return (...args: any) => {
        storedArgs = args;

        clearInterval(activeTimeout);

        activeTimeout = setTimeout(() => storedArgs && fn(...storedArgs), timeout);
    };
};
