// Directions

// When the DOM is ready, console.log the message “Let’s get ready to party with jQuery!”
$('document').ready(console.log("Let's get ready to party with jQuery!"));

// Give all images inside of an article tag the class of image-center (this class is defined inside of the style tag in the head).
$('article img').addClass('image-center');

// Remove the last paragraph in the article.
$('p').eq(5).remove();

// Set the font size of the title to be a random pixel size from 0 to 100.
// let rando = Math.round(Math.random() * 100);
$('#title').css('font-size', `${Math.round(Math.random() * 100)}px`);

// Add an item to the list; it can say whatever you want.
$('ol').append('<li>Ope, another list item has appeared!</li>');

// Scratch that; the list is silly. Empty the aside and put a paragraph in it apologizing for the list’s existence.
$('aside').empty().append('<p>This list was silly. I apologize for its existence.</p>');

// When you change the numbers in the three inputs on the bottom, the background color of the body should change to match whatever the three values in the inputs are.

$('input.form-control').on('change', function() {
    let color = `rgb(${$('input.form-control').eq(0).val()}, ${$('input.form-control').eq(1).val()}, ${$('input.form-control').eq(2).val()})`;
    $('body').css('background-color', color);
})

// Add an event listener so that when you click on the image, it is removed from the DOM.
$('img').on('click', function() {
    $(this).remove();
});

