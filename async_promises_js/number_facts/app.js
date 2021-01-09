const BASEURL = "http://numbersapi.com";

function element_and_text(element, text) {
  /* Returns specified HTML element with inner text set to string text.*/
  let el = document.createElement(element);
  el.innerText = text;
  return el;
}

let response = axios.get(`${BASEURL}/5..8?json`);
response
  .then((res) => {
    for (let v of Object.values(res.data)) {
      let li = document.createElement("li");
      li.innerText = `${v}`;
      let ul = document.querySelector("ul");
      ul.appendChild(li);
    }
  })
  .catch((err) => console.log(err));

let factsAbout6 = [];
for (let i = 0; i < 4; i++) {
  factsAbout6.push(axios.get(`${BASEURL}/6`));
}
Promise.all(factsAbout6).then((sixArr) => sixArr.forEach((fact) => {}));
