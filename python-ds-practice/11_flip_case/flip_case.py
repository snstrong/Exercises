def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """
    new_phrase = ""
    for char in phrase:
        if char.lower() == to_swap.lower():
            if char.isupper():
                new_phrase += char.lower()
            else:
                new_phrase += char.upper()
        else:
            new_phrase += char
        
    return new_phrase