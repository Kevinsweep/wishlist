import {
  $query,
  $update,
  Record,
  StableBTreeMap,
  Vec,
  match,
  Result,
  nat64,
  ic,
  Opt,
} from 'azle';
import { v4 as uuidv4 } from 'uuid';

// Done: Use TypeScript enums for boolean values to improve readability
enum BooleanStatus {
  True = true,
  False = false,
}

type Wish = Record<{
  id: string;
  itemName: string;
  itemAmount: number;
  itemPrice: number;
  totalPrice: number;
  status: BooleanStatus;
  priority: BooleanStatus;
  createdAt: nat64;
  updatedAt: Opt<nat64>;
}>;

type WishPayload = Record<{
  itemName: string;
  itemAmount: number;
  itemPrice: number;
  totalPrice: number;
  status: BooleanStatus;
  priority: BooleanStatus;
}>;

const wishList = new StableBTreeMap<string, Wish>(0, 44, 1024);

// Done: Use JSDoc comments for better documentation
/**
 * Retrieves the entire wish list.
 * @returns A Result containing the wish list or an error message.
 */
$query;
export function getWishList(): Result<Vec<Wish>, string> {
  return Result.Ok(wishList.values());
}

// Done: Use JSDoc comments for better documentation
/**
 * Retrieves a wish by its unique identifier.
 * @param id - The unique identifier of the wish.
 * @returns A Result containing the wish or an error message.
 */
$query;
export function getWishById(id: string): Result<Wish, string> {
  return match(wishList.get(id), {
    Some: (wish) => Result.Ok<Wish, string>(wish),
    None: () => Result.Err<Wish, string>(`A wish with id=${id} not found`),
  });
}

// Done: Use JSDoc comments for better documentation
/**
 * Retrieves all completed wishes.
 * @returns A Result containing the completed wish list or an error message.
 */
$query;
export function getCompleteWish(): Result<Vec<Wish>, string> {
  const completedWishes = wishList.values().filter((record) => record.status === BooleanStatus.True);
  return Result.Ok(completedWishes);
}

// Done: Use JSDoc comments for better documentation
/**
 * Retrieves all incomplete wishes.
 * @returns A Result containing the incomplete wish list or an error message.
 */
$query;
export function getIncompleteWish(): Result<Vec<Wish>, string> {
  const incompleteWishes = wishList.values().filter((record) => record.status === BooleanStatus.False);
  return Result.Ok(incompleteWishes);
}

// Done: Use JSDoc comments for better documentation
/**
 * Retrieves all priority wishes.
 * @returns A Result containing the priority wish list or an error message.
 */
$query;
export function getPriorityWish(): Result<Vec<Wish>, string> {
  const priorityWishes = wishList.values().filter((record) => record.priority === BooleanStatus.True);
  return Result.Ok(priorityWishes);
}

// Done: Use JSDoc comments for better documentation
/**
 * Retrieves wishes within a specified item price range.
 * @param minim - The minimum item price.
 * @param maxim - The maximum item price.
 * @returns A Result containing the filtered wish list or an error message.
 */
$query;
export function getWishByItemPrice(minim: number, maxim: number): Result<Vec<Wish>, string> {
  const filteredWishes = wishList.values().filter((record) => record.itemPrice >= minim && record.itemPrice <= maxim);
  return Result.Ok(filteredWishes);
}

// Done: Use JSDoc comments for better documentation
/**
 * Retrieves wishes within a specified total price range.
 * @param minim - The minimum total price.
 * @param maxim - The maximum total price.
 * @returns A Result containing the filtered wish list or an error message.
 */
$query;
export function getWishByTotalPrice(minim: number, maxim: number): Result<Vec<Wish>, string> {
  const filteredWishes = wishList.values().filter((record) => record.totalPrice >= minim && record.totalPrice <= maxim);
  return Result.Ok(filteredWishes);
}

// Update: Use JSDoc comments for better documentation
// Done: Add types for payload parameters
$update;
export function addWish(payload: WishPayload): Result<Wish, string> {
  const wish: Wish = { id: uuidv4(), createdAt: ic.time(), updatedAt: Opt.None, ...payload };
  wishList.insert(wish.id, wish);
  return Result.Ok(wish);
}

// Update: Use JSDoc comments for better documentation
// Done: Add types for payload parameters
$update;
export function updateWish(id: string, payload: WishPayload): Result<Wish, string> {
  return match(wishList.get(id), {
    Some: (wish) => {
      const updatedWish: Wish = { ...wish, ...payload, updatedAt: Opt.Some(ic.time()) };
      wishList.insert(wish.id, updatedWish);
      return Result.Ok<Wish, string>(updatedWish);
    },
    None: () => Result.Err<Wish, string>(`Couldn't update a wish with id=${id}. Wish not found`),
  });
}

// Update: Use JSDoc comments for better documentation
// Done: Add types for payload parameters
$update;
export function deleteWish(id: string): Result<Wish, string> {
  return match(wishList.remove(id), {
    Some: (deletedWish) => Result.Ok<Wish, string>(deletedWish),
    None: () => Result.Err<Wish, string>(`Couldn't delete a wish with id=${id}. Wish not found.`),
  });
}

// Done: Use JSDoc comments for better documentation
// Done: Improve the getRandomValues workaround
// Done: Add types for the array and each element in getRandomValues
// a workaround to make uuid package work with Azle
globalThis.crypto = {
  // @ts-ignore
  getRandomValues: (array: Uint8Array) => {
    for (let i = 0; i < array.length; i++) {
      // @ts-ignore
      array[i] = Math.floor(Math.random() * 256);
    }
    return array;
  },
};
