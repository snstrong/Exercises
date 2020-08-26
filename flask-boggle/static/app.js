//  TODO: Get form response from html, send get rq to server
$guessForm = $('#guess-form')

$guessForm.on('submit', async function(evt) {
    evt.preventDefault();
    $guessInput = $('#guess');
    response = await axios.get('/guess', {
        params: 
        {
            guess: $('#guess').val()
        }
    });
    // document.querySelector("#guess-form").reset();
    if (response.data.result === "ok") {
        $('#guessed-words').append(`<span class="ok guessed-word">${$('#guess').val()}</span>`)
    }
    else if (response.data.result === "not-on-board") {
        $('#guessed-words').append(`<span class="not-on-board guessed-word">${$('#guess').val()}</span>`)
    }
    else if (response.data.result === "not-word") {
        $('#guessed-words').append(`<span class="not-word guessed-word">${$('#guess').val()}</span>`)
    }
    $guessInput.val("").focus();
    return false;
})