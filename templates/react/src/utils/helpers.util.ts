export enum Environments {
    ServerUrl = 'REACT_APP_URL'
}

export const GetEnv = (type: Environments) => {
    return process.env[type]
}


export type Order = 'asc' | 'desc';

function sort(a: any, b: any, orderBy: string,) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export function readImage(file: any) {
    if (!file) {
        return "";
    }
    if (typeof file == "string") {
        return file;
    } else {
        return URL.createObjectURL(file);
    }
}

export async function generateFormDataAny(item: any) {
    let form = new FormData();
    for (const key in item) {
        if (typeof item[key] == "object" && Array.isArray(item[key])) {
            for (const a of item[key]) {
                if (a) {
                    await form.append(key, a);
                }
            }
        } else {
            if (item[key]) {
                await form.append(key, item[key]);
            }
        }
    }
    return form;
}


// export function getComparator<Key extends keyof any>(order: Order, orderBy: Key,): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
//     return order === 'desc'
//         ? (a, b) => sort(a, b, orderBy)
//         : (a, b) => -sort(a, b, orderBy);
// }

export function stableSort<T>(array: T[], orderBy: string, order: Order): any[] {
    return array.sort((a, b) => order === "asc" ? sort(a, b, orderBy) : -sort(a, b, orderBy));
}

export function filterByObject<T>(value: T, filter: string, filters: Array<string>) {
    if (filter === '') return true
    // @ts-ignore
    return filters.find((f) => String(value[f]).toLowerCase().indexOf(filter.toLowerCase()) > -1);
}

