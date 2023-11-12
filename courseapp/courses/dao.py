from .models import Category, Course
from django.db.models import Count


def load_courses(params={}):
    q = Course.objects.filter(active=True)

    kw = params.get('kw')
    if kw:
        q = q.filter(subject__icontains=kw)

    cate_id = params.get('cate_id')
    if cate_id:
        q = q.filter(category_id=cate_id)

    return q


def count_courses_by_cate():
    return Category.objects.annotate(count=Count('courses__id')).values("id", "name", "count").order_by('-count')