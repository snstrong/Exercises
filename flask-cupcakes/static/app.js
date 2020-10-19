const $list = $("#cupcake-list");

async function get_cupcakes() {
  response = await axios.get("http://127.0.0.1:5000/api/cupcakes");
  cupcakes = response.data.cupcakes;
  for (let c of cupcakes) {
    let image_html = format_cupcake_image_html(c);
    let text = format_cupcake_text(c);
    add_cupcake(text, image_html);
  }
}

function format_cupcake_text(cupcake) {
  // Chocolate (small): 8/10
  const data = `${cupcake.flavor} (${cupcake.size}): ${cupcake.rating}/10`;
  return data.charAt(0).toUpperCase() + data.slice(1);
}

function format_cupcake_image_html(cupcake) {
  return `<img src="${cupcake.image}" alt="${cupcake.flavor} cupcake" width=200px>`;
}

function add_cupcake(text, image_html) {
  return $list.append(
    `<li style="list-style: none">${text}<br>${image_html}</li>`
  );
}

$("#new-cupcake-form").on("submit", async function (evt) {
  evt.preventDefault();

  let flavor = $("#flavor").val();
  let rating = $("#rating").val();
  let size = $("#size").val();
  let image = $("#image").val();

  const newCupcakeResponse = await axios.post(
    "http://127.0.0.1:5000/api/cupcakes",
    {
      flavor: flavor,
      rating: rating,
      size: size,
      image: image,
    }
  );
  let image_html = format_cupcake_image_html(newCupcakeResponse.data.cupcake);
  let text = format_cupcake_text(newCupcakeResponse.data.cupcake);
  add_cupcake(text, image_html);
});

get_cupcakes();
