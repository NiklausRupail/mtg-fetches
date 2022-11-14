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
    //console.log(str);
    if (str !== "") {
        const cardInfo = await getData(searchType, str);
        
        if (cardInfo === undefined) {
            const dataParagraph = document.getElementById('card-data');
            dataParagraph.innerHTML = "";
            document.getElementById("cardimg").src = "";
            return;
        };
        const { name, price, rarity, tcgplayer, src_png} = cardInfo;
        if (name === "Snapcaster Mage") {
            const img = document.getElementById("cardimg")
            img.src = "https://media.tenor.com/h0m34HCx55kAAAAC/thealexera-soyjak.gif";
            img.style = "border-radius: 20px";
            img.width = 300;
            
        }  else {
            const img = document.getElementById("cardimg")
            img.src = src_png;
            img.width = 300;
        }

        //Setting info in card-data <p>
        const dataParagraph = document.getElementById('card-data');

        //Name
        dataParagraph.innerHTML = `Name: ${name}`;
        dataParagraph.appendChild(document.createElement("br"));
        
        //Price
        dataParagraph.innerHTML += (price == null) 
        ? `Price: NaN`
        : `Price: ${price}\$`;
        dataParagraph.appendChild(document.createElement("br"));
        
        //Rarity
        const rarityCapitalized = rarity[0].toUpperCase() + rarity.substr(1);
        dataParagraph.innerHTML += `Rarity: ${rarityCapitalized}`;
        dataParagraph.appendChild(document.createElement("br"));
        
        //Link
        const link = document.createElement("a")
        link.href = tcgplayer;
        link.setAttribute('target', '_blank');
        link.innerHTML = `Click to Buy (${price}$)`;
        dataParagraph.appendChild(link);
        dataParagraph.appendChild(document.createElement("br"));
        
        //debugging
        //dataParagraph.innerHTML += "Screen Width: " + screen.width;

    }
}