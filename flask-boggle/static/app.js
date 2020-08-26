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
    let responseClass;
    if (response.data.result === "ok") {
        responseClass = "ok"
    }
    else if (response.data.result === "not-on-board") {
        responseClass = "not-on-board"
    }
    else if (response.data.result === "not-word") {
        responseClass = "not-word"
    }
    $('#guessed-words').append(`<span class="${responseClass} guessed-word">${$('#guess').val()}</span>`);
    $guessInput.val("").focus();
    return false;
})