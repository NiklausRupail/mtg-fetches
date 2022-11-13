'use strict';

import { displayCards } from "./actions.js"

const startScript = async () => {
    
	const head = document.getElementById("head");
	head.innerHTML = "Card search";

	const typeSelect = document.getElementById("search-type");
    const typesToChoose = ["fuzzy", "exact", "random card"];
    typeSelect.defaultValue = typesToChoose[0];

    for (const type of typesToChoose) {
        const option = document.createElement('option');
        option.value = type;
        option.innerHTML = type;

		typeSelect.appendChild(option);
}

	const cardsForm = document.getElementById('cards-form');
    cardsForm.addEventListener("submit", (event) => displayCards(event, cardsForm));
}

startScript();