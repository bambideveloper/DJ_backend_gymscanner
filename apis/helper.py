class response_object:
    def __init__(self):
        self.data = {}
        self.status = False
        self.error = ""

    def set_response(self, data = {}, status = False, error = ""):
        self.data = data
        self.status = status
        self.error = error

    def get_response(self):
        return {
            "data": self.data, 
            "message": {
                "status": self.status,
                "error": self.error
            }
        }