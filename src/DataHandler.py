from RPi.GPIO import setmode, BCM, setup, OUT, HIGH, LOW, output


class DataHandler:
    """
    Base class for data handlers.
    """

    def __init__(self, pin):
        self.pin = pin
        setmode(BCM)
        setup(self.pin, OUT)
        output(self.pin, LOW)

    def read():
        pass


class LoadCell(DataHandler):
    """
    Class for handling load cell data.
    """

    def __init__(self, pin):
        super().__init__(pin)

    def read(self):
        output(self.pin, HIGH)


class StepMotor(DataHandler):
    """
    Class for handling step motor data.
    """

    def __init__(self, pin):
        super().__init__(pin)

    def read(self):
        output(self.pin, HIGH)
