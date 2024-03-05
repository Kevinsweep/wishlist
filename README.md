
# Wishlist Recorder
## Overview

This documentation provides an overview of a smartcontract to record user's wishlist called Wishlist Recorder. This system is built using TypeScript using the Azle framework. Wishlist Recorder helps users to track their wishlist, including Add, Read, Update, and Delete the track record.

## Data Structures

The Wishlist Recorder system utilizes the following data structure:
1. Wish
   - `id`: A unique identifier for the wishlist recorder.
   - `itemName`: The name of the item.
   - `itemAmount`: The amount of the item.
   - `itemPrice`: The cost of the item.
   - `totalPrice`: The total cost of all items.
   - `status`: The information whether the wish is fulfilled.
   - `priority`: To decide the priority of wishlist that is to be showed.
   - `createdAt`: The timestamp when the wishlist recorder was created.
   - `updatedAt`: An optional field indicating the timestamp when the wishlist recorder was last updated.
2. WishPayload: A simplified version of Wishlist Recorder used for adding new item, containing the `itemName`, `itemAmount`, `itemPrice`, `totalPrice`, `status`, and `priority` fields.

## Functions
1. getWishList
   - Description: Retrieves all wishlist records stored in the system.
   - Parameters: -
2. getWishById
   - Description: Retrieves a specific item stored in the system.
   - Parameters:
     - `id`: The ID of the item record to retrieve.
3. getCompleteWish
   - Description: Retrieves all wishlist records stored in the system based on completed-wish search.
   - Parameters: -
4. getIncompleteWish
    - Description: Retrieves all wishlist records stored in the system based on incomplete-wish search.
    - Parameters: -
5. getPriorityWish
    - Description: Retrieves wishlist records stored in the system based on priority search.
    - Parameters: -
6. getWishByItemPrice
    - Description: Retrieves wishlist records stored in the system based on item price search.
    - Parameters:
      - `itemPrice`: The minimum and maximum price of the searched wishlist records stored in the system to retrieve.
7. getWishByTotalPrice
    - Description: Retrieves wishlist records stored in the system based on total item price search.
    - Parameters:
      - `itemPrice`: The minimum and maximum price of the searched wishlist records stored in the system to retrieve.
8. addWish
   - Description: Adds a new item record to the system.
   - Parameters:
     - payload: `WishPayload` object containing the details of the wishlist record.
9. updateWish
    - Description: Updates an existing specific item record from the system with new data by ID.
    - Parameters:
      - `id`: The ID of the wishlist record to update.
      - `payload`: `WishPayload` object containing the details of the wishlist.
10. deleteWish
    - Description: Delete a specific item record from the system by ID.
    - Parameters:
      - `id`: The ID of the item record to delete.

## Installation
1. Clone the repository
   
   
   git clone https://github.com/Kevinsweep/wishlist.git
   
2. Install dependencies

   
   npm install
   
4. Start the IC local development environment

   
   dfx start --background --clean
   
5. Deploy the canisters to the local development environment

   
   dfx deploy
   ```
```
