const BASEURL = "https://deckofcardsapi.com/api/deck";
let global_deck_id;

// Set deck
//
async function set_deck() {
  let deck = await axios.get(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  return deck;
}

// Get a card
//
async function getCard(deck_id) {
  let card = await axios.get(`${BASEURL}/${deck_id}/draw/?count=1`);
  return card;
}

// Render card in HTML
//
async function extract_card_info(deck_id) {
  let card = await getCard(deck_id);
  console.log(card.data.remaining);
  if (card.data.remaining === 0) {
    alert("Last card in the deck!");
    let button = document.querySelector("button");
    button.parentNode.removeChild(button);
  }
  return card.data.cards[0];
}

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
  let card_label = document.querySelector("#card-label");
  card_label.innerText = `${card.value} of ${card.suit}`;
  let image = render_img(card.image);
  let container = document.querySelector("#cards-container");
  container.appendChild(image);
}

// Handle click to get new card
//
let button = document.querySelector("button");
button.addEventListener("click", () => {
  render_card(global_deck_id);
});

// Set deck for this session
//
set_deck().then((deck) => {
  global_deck_id = deck.data.deck_id;
  return;
});
