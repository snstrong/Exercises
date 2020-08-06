"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start):
        """Creates instance of serial class, setting initialVal and currentVal to the value passed in as start"""
        self.initialVal = start
        self.currentVal = start

    def generate(self):
        """Sets currentVal to next sequential number"""
        result = self.currentVal
        self.currentVal = self.currentVal + 1
        return result
    
    def reset(self):
        """Resets currentVal to initialVal"""
        self.currentVal = self.initialVal

    def __repr__(self):
        return f"""
        Initial value: {self.initialVal}
        Current value: {self.currentVal}"""

