"use strict";

import { getData } from "./fetches.js"


export const displayCards = async (event, form) => {

    event.preventDefault();

    const formData = new FormData(form);
    const data = {};
    //console.log([...formData.entries()]);

    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

    const { searchType, searchText } = data;

    let str = "";
    for (let i = 0; i < searchText.length; i++) {
        if (searchText[i] === " ") { str += ['+']; } else str += searchText[i]
    }
    if (str !== "") {
        const cardInfo = await getData(searchType, str);
        const img = document.getElementById("cardImg")

        if (cardInfo === undefined) {
            const dataParagraph = document.getElementById('card-data');
            dataParagraph.innerHTML = "";
            img.src = "";
            return;
        };
        const { name, price, rarity, tcgplayer, src_png, set, type} = cardInfo;
        if (name === "Snapcaster Mage") {
            img.src = "https://media.tenor.com/h0m34HCx55kAAAAC/thealexera-soyjak.gif";
            img.style = "border-radius: 20px";
            img.width = 300;
            
        }  else {
            img.src = src_png;
            img.width = 300;
        }

        //Setting info of the card
        const dataParagraph = document.getElementById('card-data');
        document.getElementById("cardWrapper").style.display = "none";
        
        let priceTag = document.getElementById("priceTag");
        let buyingLink = document.getElementById("buyingLink");
        let cardName = document.getElementById("cardName");
        let rarityName = document.getElementById("rarityName");
        let setName = document.getElementById("setName");
        let typeName = document.getElementById("typeName");
        
        //Name
        cardName.innerHTML= name;
        
        //Price
        priceTag.innerHTML = (price == null) 
        ? `Price: NaN`
        : `Price: ${price}\$`;
        
        //Rarity
        const rarityCapitalized = rarity[0].toUpperCase() + rarity.substr(1);
        rarityName.innerText = `Rarity: ${rarityCapitalized}`;
        
        //Type name
        typeName.innerText = `Type: ${type}`;
        
        //Set name
        setName.innerText = `Set: ${set}`;

        //Link
        buyingLink.href = tcgplayer;
        buyingLink.setAttribute('target', '_blank');
        buyingLink.innerHTML = `Click to Buy`;

        document.getElementById("cardWrapper").style.display = "flex";
    }
}