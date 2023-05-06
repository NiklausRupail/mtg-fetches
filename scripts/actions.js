"use strict";

import { getData } from "./fetches.js"


export const displayCards = async (event, form) => {

    event.preventDefault();

    const formData = new FormData(form);
    const data = {};
    const br = document.createElement("br");
    //console.log([...formData.entries()]);

    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

    const { searchType, searchText } = data;

    let str = "";
    for (let i = 0; i < searchText.length; i++) {
        if (searchText[i] === " ") { str += ['+']; } else str += searchText[i]
    }
    //console.log(str);
    if (str !== "") {
        const cardInfo = await getData(searchType, str);
        const img = document.getElementById("cardImg")

        if (cardInfo === undefined) {
            //let cardSearchError = document.getElementById("cardSearchError");
            const dataParagraph = document.getElementById('card-data');
            dataParagraph.innerHTML = "";
            img.src = "";
            return;
        };
        const { name, price, rarity, tcgplayer, src_png} = cardInfo;
        if (name === "Snapcaster Mage") {
            img.src = "https://media.tenor.com/h0m34HCx55kAAAAC/thealexera-soyjak.gif";
            img.style = "border-radius: 20px";
            img.width = 300;
            
        }  else {
            img.src = src_png;
            img.width = 300;
        }

        //Setting info in card-data <p>
        const dataParagraph = document.getElementById('card-data');
        document.getElementById("cardWrapper").style.display = "flex";
        let priceTag = document.getElementById("priceTag");
        let buyingLink = document.getElementById("buyingLink");
        let cardName = document.getElementById("cardName");
        let rarityName = document.getElementById("rarityName");
        //Name
        cardName.innerHTML= name;
        
        //Price
        priceTag.innerHTML = (price == null) 
        ? `Price: NaN`
        : `Price: ${price}\$`;
        dataParagraph.appendChild(br);
        
        //Rarity
        const rarityCapitalized = rarity[0].toUpperCase() + rarity.substr(1);
        rarityName.innerText = `Rarity: ${rarityCapitalized}`;
        
        //Link
        buyingLink.href = tcgplayer;
        buyingLink.setAttribute('target', '_blank');
        buyingLink.innerHTML = `Click to Buy`;
        
        //debugging
        //dataParagraph.innerHTML += "Screen Width: " + screen.width;

    }
}