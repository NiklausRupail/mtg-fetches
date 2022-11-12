"use strict";

export const getImage = async (searchType, searchText) => { 
    console.log(searchText)
  
    console.log(await fetch(`https://api.scryfall.com/cards/named?fuzzy=${searchText}`).then((response) => response.json())); 
    return await fetch(`https://api.scryfall.com/cards/named?fuzzy=${searchText}`)
        .then((response) => response.json())
        .then((data) => data.image_uris.normal);

}
export const getData = async (searchType, searchText) => { 
    
    console.log(searchText)
    console.log(await fetch(`https://api.scryfall.com/cards/named?fuzzy=${searchText}`).then((response) => response.json()));

    return await fetch(`https://api.scryfall.com/cards/named?fuzzy=${searchText}`)
        .then((response) => response.json())
        .then((data) => ({
            name: data.name,
            price: data.prices.usd,
            rarity: data.rarity,
            tcgplayer: data.purchase_uris.tcgplayer 
        }));
    }
export const getAutocomplete = async(text) => {
    return 0;
}