import { $query, $update, Record, StableBTreeMap, Vec, match, Result, nat64, ic, Opt } from 'azle';
import { v4 as uuidv4 } from 'uuid';

//done
type Wish = Record<{
    id: string;
    itemName: string;
    itemAmount: number;
    itemPrice: number;
    totalPrice: number;
    status: boolean;
    priority: boolean;
    createdAt: nat64;
    updatedAt: Opt<nat64>;
}>

//DONE
type WishPayload = Record<{
    itemName: string;
    itemAmount: number;
    itemPrice: number;
    totalPrice: number;
    status: boolean;
    priority: boolean;
}>

//DONE
const wishList = new StableBTreeMap<string, Wish>(0, 44, 1024);

//DONE
$query;
export function getWishList(): Result<Vec<Wish>, string> {
    return Result.Ok(wishList.values());
}

//DONE
$query;
export function getWishById(id: string): Result<Wish, string> {
    return match(wishList.get(id), {
        Some: (wish) => Result.Ok<Wish, string>(wish),
        None: () => Result.Err<Wish, string>(`a message with id=${id} not found`)
    });
}

//DONE
$query;
export function getCompleteWish(): Result<Vec<Wish>, string> {
    const wish = wishList.values();
    const wishFilter = wish.filter(record => record.status === true);
    return Result.Ok(wishFilter);
}

$query
export function getIncompleteWish(): Result<Vec<Wish>, string> {
    const wish = wishList.values();
    const wishFilter = wish.filter(record => record.status === false);
    return Result.Ok(wishFilter);
}

$query
export function getPriorityWish(): Result<Vec<Wish>, string>{
    const wish = wishList.values();
    const wishFilter = wish.filter(record => record.priority === true);
    return Result.Ok(wishFilter);
}

$query
export function getWishByItemPrice(minim: number, maxim: number): Result<Vec<Wish>, string>{
    const wish = wishList.values();
    const wishFilter = wish.filter(record => record.itemPrice >= minim && record.itemPrice <= maxim);
    return Result.Ok(wishFilter);
}

$query
export function getWishByTotalPrice(minim: number, maxim: number): Result<Vec<Wish>, string>{
    const wish = wishList.values();
    const wishFilter = wish.filter(record => record.totalPrice >= minim && record.totalPrice <= maxim);
    return Result.Ok(wishFilter);
}


//QUERY ATAS
//==========================================================================================================================
//UPDATE BAWAH


//DONE
$update;
export function addWish(payload: WishPayload): Result<Wish, string> {
    const wish: Wish = { id: uuidv4(), createdAt: ic.time(), updatedAt: Opt.None, ...payload };
    wishList.insert(wish.id, wish);
    return Result.Ok(wish);
}

//DONE
$update;
export function updateWish(id: string, payload: WishPayload): Result<Wish, string> {
    return match(wishList.get(id), {
        Some: (wish) => {
            const updatedWish: Wish = {...wish, ...payload, updatedAt: Opt.Some(ic.time())};
            wishList.insert(wish.id, updatedWish);
            return Result.Ok<Wish, string>(updatedWish);
        },
        None: () => Result.Err<Wish, string>(`couldn't update a message with id=${id}. message not found`)
    });
}

//DONE
$update;
export function deleteWish(id: string): Result<Wish, string> {
    return match(wishList.remove(id), {
        Some: (deletedWish) => Result.Ok<Wish, string>(deletedWish),
        None: () => Result.Err<Wish, string>(`couldn't delete a message with id=${id}. message not found.`)
    });
}

// a workaround to make uuid package work with Azle
globalThis.crypto = {
     // @ts-ignore
    getRandomValues: () => {
        let array = new Uint8Array(32);

        for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256);
        }

        return array;
    }
};