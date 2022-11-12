"use strict";

import { getImage, getData } from "./fetches.js"


export const displayCards = async (event, form) => {
    
    event.preventDefault();

    const formData = new FormData(form);
    const data = {};

    console.log([...formData.entries()]);

    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

    const {searchType, searchText} = data;
    
    let str = "";
    for(let i = 0;i < searchText.length; i++) {
        if (searchText[i] === " "){ str+=['+']; } 
        else str+=searchText[i]
    }
    console.log(str);
    const cardimg = await getImage(searchType, str);
    
    var img = document.getElementById("cardimg")
    img.src = cardimg;

    
    const cardInfo = await getData(searchType, str);
    
    const {name, price, rarity, tcgplayer} = cardInfo;

    const dataParagraph = document.getElementById('card-data');

    dataParagraph.innerHTML= `Name: ${name}`;
    dataParagraph.appendChild(document.createElement("br"));
    if (price === null) dataParagraph.innerHTML += `Price: NaN`;
    else dataParagraph.innerHTML += `Price: ${price}\$`;
    dataParagraph.appendChild(document.createElement("br"));
    dataParagraph.innerHTML+= `Rarity: ${rarity}`;
    dataParagraph.appendChild(document.createElement("br"));
    const link = document.createElement("a")
    link.href = tcgplayer;
    link.setAttribute('target', '_blank');
    link.innerHTML = "TCGplayer link to buy"
    dataParagraph.appendChild(link);
    
}