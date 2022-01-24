from rest_framework.response import Response

class response_object:
    def __init__(self):
        self.data = {}

    def set_response(self, data = {}):
        self.data = data

    def get_response(self, status):
        return Response(self.data, status = status)