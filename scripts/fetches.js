"use strict";


export const getData = async (searchType, searchText) => { 
    
    //console.log(searchText)
    
    const request = 
    (searchType != "random card") 
    ? `https://api.scryfall.com/cards/named?${searchType}=${searchText}`
    : `https://api.scryfall.com/cards/random`;
    
    //console.log(request);

    console.log(await fetch(request).then((response) => response.json()));
    
    return await fetch(request)
        .then((response) => response.json())
        .then((data) => ({
            name: data.name,
            price: data.prices.usd,
            rarity: data.rarity,
            tcgplayer: data.purchase_uris.tcgplayer,
            src_png: data.image_uris.normal 
        }));
    }