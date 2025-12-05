from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def get_questions(request):
    return Response({
        "questions": [
            "Quel est ton niveau ?",
            "Combien de temps par jour ?",
            "Préférence : article, texte ou exercice ?"
        ]
    })

