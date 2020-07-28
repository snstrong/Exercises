"""
    Directions:

    1. For a list of words, print out each word on a separate line, but in all uppercase. How can you change a word to uppercase? Ask Python for help on what you can do with strings!

    2. Turn that into a function, print_upper_words. Test it out. (Don’t forget to add a docstring to your function!)

    3. Change that function so that it only prints words that start with the letter ‘e’ (either upper or lowercase).

    4. Make your function more general: you should be able to pass in a set of letters, and it only prints words that start with one of those letters.

"""
words = ["hello", "hey", "goodbye", "yo", "yes"]

def print_upper_words(word_list, must_start_with):
    for word in word_list:
        for char in must_start_with:
            if word[0] == char:
                print(word.upper())

print_upper_words(words, {"y", "h"})
