def capitalize(phrase):
    """Capitalize first letter of first word of phrase.

        >>> capitalize('python')
        'Python'

        >>> capitalize('only first word')
        'Only first word'
    """

    capital = phrase[0].upper()
    remaining = phrase[1:len(phrase):1]
    return capital + remaining