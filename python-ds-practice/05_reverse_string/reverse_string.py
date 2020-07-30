def reverse_string(phrase):
    """Reverse string,

        >>> reverse_string('awesome')
        'emosewa'

        >>> reverse_string('sauce')
        'ecuas'
    """
    reversedList = []
    count = -1
    for letter in phrase:
        reversedList.insert(count, letter);
        count -= 1
    return "".join(reversedList)


