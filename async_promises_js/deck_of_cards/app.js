const BASEURL = "https://deckofcardsapi.com/api/deck";

// Get a card
async function getCard(deck_id) {
  let card = await axios.get(`${BASEURL}/${deck_id}/draw/?count=1`);
  return card;
}

async function extract_card_info(deck_id) {
  let card = await getCard(deck_id);
  return card.data.cards[0];
}

// Render card in HTML
// card container id: cards-container

function render_img(src, alt) {
  // Returns an HTML image element
  // Args: string URL for src and string text for alt property
  let image = document.createElement("img");
  image.src = src;
  image.alt = alt;
  return image;
}

function element_and_text(element, text) {
  /* Returns specified HTML element with inner text set to arg text.*/
  let el = document.createElement(element);
  el.innerText = text;
  return el;
}

async function render_card(deck_id) {
  let card = await extract_card_info(deck_id);
  let image = render_img(card.image);
  let card_label = element_and_text("p", `${card.suit} of ${card.value}`);
  let container = document.querySelector("#cards-container");
  container.appendChild(card_label);
  container.appendChild(image);
  console.log(card);
}

// Handle click to get new card
// Button id: card-button
// Add evt listener to button and on click request new card and render card

// getCard("new")
//   .then((card) => {
//     console.log(card);
//     return getCard(card.data.deck_id);
//   })
//   .then((card) => {
//     console.log(card);
//     return getCard(card.data.deck_id);
//   });

render_card("new");
