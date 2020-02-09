interface TransformToRows<T> {
    data: T[];
    elementsInRow: number;
    ignore?: Record<number, boolean>;
}

/**
 * transform incoming array inro array of arrays with {elementsInRow} length
 * ({data: [1,2,3,4,5], elementsInRow: 2}) -> [[1,2], [3,4], [5]]
 */
export function transformToRows<T extends { id: number }>({
    data,
    elementsInRow,
    ignore,
}: TransformToRows<T>): T[][] {
    const result: T[][] = [[]];
    let currentIdx = 0;

    for (let i = 0; i < data.length; i++) {
        if (ignore && ignore[data[i].id]) {
            continue;
        }

        currentIdx++;

        result[result.length - 1].push(data[i]);

        if (!(currentIdx % elementsInRow)) {
            result.push([]);
        }
    }

    return result;
}
