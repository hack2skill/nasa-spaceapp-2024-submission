from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LocationViewSet,OverpassViewSet

router = DefaultRouter()
router.register('locations', LocationViewSet)
router.register('overpass', OverpassViewSet, basename='overpass')

urlpatterns = [
    path('', include(router.urls)),
    # path('overpasses/', OverpassViewSet.as_view({'get': 'list'}), name='overpasses'),
]


