from random import randrange
"""Word Finder: finds random words from a dictionary.

You’ll need to make a class that works like this:

-- it is instantiated with a path to a file on disk that contains words, one word per line
-- it reads that file, and makes an attribute of a list of those words
-- it prints out “[num-of-words-read] words read”
-- it doesn’t need to do all of this directly in the __init__ method; it might be a good idea for the __init__ method to call other functions to do some of this.

it provides a method, random(), which returns a random word from that list of words

Note: the random method should not re-read the list of words each time; it should work with the already-read-in list of words.
"""


class WordFinder:
    def __init__(self, file_path):
        self.working_file = open(f"{file_path}", "r")
        self.word_list = [line.rstrip("\n") for line in self.working_file]
        self.words_read = len(self.word_list)
        print(f"{self.words_read} words read")
    
    def random(self):
        return self.word_list[randrange(len(self.word_list))]
    
    def __repr__(self):
        return f"""Working file: {self.working_file}
        Word list: {self.word_list}
        Words read: {self.words_read}
        """
    
class SpecialWordFinder(WordFinder):
    def __init__(self, file_path):
        super().__init__(file_path)
        self.word_list = [word for word in self.word_list if word and word[0] != "#"]




