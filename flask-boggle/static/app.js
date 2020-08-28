$guessForm = $("#guess-form");
let guessedArr = [];
let currentScore = 0;

$guessForm.on("submit", async function (evt) {
  evt.preventDefault();
  let $guessInput = $("#guess");
  let word = $("#guess").val();
  let response = await checkWord(word);
  if (response === "Can't guess same word twice") {
    console.log(response);
  } else {
    guessedArr.push(word);
    $("#score").text(`Score: ${response.data.score}`).addClass("score");
    addCheckedWord(word, response.data.result);
    currentScore = response.data.score;
  }
  $guessInput.val("").focus();
  return false;
});

function addCheckedWord(word, responseClass) {
    $("#guessed-words").append(
        `<span class="${responseClass} guessed-word">${word}</span>`
    );
    return true;
}

async function checkWord(word) {
  let response;
  if (guessedArr.includes(word)) {
    response = "Can't guess same word twice";
  } else {
    guessedArr.push(word);
    response = await axios.get("/guess", {
      params: {
        guess: word,
      },
    });
  }
  return response;
}

let seconds = 60;
let timer = setInterval(countdown, 1000);
function countdown() {
  seconds -= 1;
  $("#timer").text(`0:${seconds}`);
  if (seconds === 0) {
    clearInterval(timer);
    alert("GAME OVER!");
    $guessForm.hide();
    endGame();
  }
}

async function endGame() {
  let response = await axios.get("/end_game");
  console.log(response);
  let listLength;
  response.data.scores_list.length <= 10 ? listLength = response.data.scores_list.length : listLength = 10;
  for (let i = 0; i < listLength; i++) {
    // for (let score in response.data.scores_list) {
    // console.log(response.data.scores_list[i]);
    let classes = "listed-score";
    if (response.data.scores_list[i] === currentScore) {
        classes = `${classes} current-score"`
    }
    $('#scores-list').append(`<li><span class="${classes}">${response.data.scores_list[i]}</span></li>`)
  }
  $('#end-game').show();
}
$('#end-game').hide();
countdown();
