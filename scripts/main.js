'use strict';

import { displayCards } from "./actions.js"

const init = async () => {
    
	const head = document.getElementById("head");
	head.innerHTML = "Card search";

	const typeSelect = document.getElementById("searchType");
    const typesToChoose = ["fuzzy", "exact", "random card"];
    typeSelect.defaultValue = typesToChoose[0];

    for (const type of typesToChoose) {
        const option = document.createElement('option');
        option.value = type;
        option.innerHTML = type;

		typeSelect.appendChild(option);
}

	const cardsForm = document.getElementById('cardsForm');
    cardsForm.addEventListener("submit", (event) => displayCards(event, cardsForm));
}

init();