/* 2.1 */

import { forEach, keys, map } from "ramda";

export const MISSING_KEY = '___MISSING___'

type PromisedStore<K, V> = {
    get(key: K): Promise<V>,
    set(key: K, value: V): Promise<void>,
    delete(key: K): Promise<void>
}


export function makePromisedStore<K, V>(): PromisedStore<K, V> {
    const storeMap = new Map<K, V>();
    return {
        get(key: K) {
            return new Promise<V>((resolve, reject) => {
            const val: V|undefined = storeMap.get(key)
            if(val === undefined)
                reject(MISSING_KEY)
            else
                resolve(val)
             })},
        set(key: K, value: V) {
            return new Promise <void>((resolve) =>{
            storeMap.set(key, value)
            resolve()
            })},
        delete(key: K) {
            return new Promise<void>((resolve, reject) =>{
                if(!storeMap.delete(key))
                    reject(MISSING_KEY)
                else
                    resolve()
            })},
    }
}

export function getAll<K, V>(store: PromisedStore<K, V>, keys: K[]): Promise<V[]> {
    return Promise.all(map((key: K) => store.get(key), keys))
}

/* 2.2 */

// ??? (you may want to add helper functions here)
//
// export function asycMemo<T, R>(f: (param: T) => R): (param: T) => Promise<R> {
//     ???
// }

/* 2.3 */

// export function lazyFilter<T>(genFn: () => Generator<T>, filterFn: ???): ??? {
//     ???
// }

// export function lazyMap<T, R>(genFn: () => Generator<T>, mapFn: ???): ??? {
//     ???
// }

/* 2.4 */
// you can use 'any' in this question

// export async function asyncWaterfallWithRetry(fns: [() => Promise<any>, ...(???)[]]): Promise<any> {
//     ???
// }