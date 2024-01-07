from django.urls import path, include
from rest_framework import routers
from courses import views

router = routers.DefaultRouter()
router.register('categories', views.CategoryViewSet, basename='categories')
router.register('courses', views.CourseViewSet, basename='courses')
router.register('lessons', views.LessonViewSet, basename='lessons')
router.register('users', views.UserViewSet, basename='users')
router.register('comments', views.CommentViewSet, basename='comments')

urlpatterns = [
    path('', include(router.urls))
]
