from django.test import TestCase
from courses.models import Category, Course

if __name__ == '__main__':
    Category.objects.bulk_create([
        Category(name='Software Engineering'),
        Category(name='Artificial Intelligence'),
        Category(name='Computer Science')
    ])

    Course.objects.create(name='Introduction to Software Engineering',
                          description='Introduction to SE',
                          image='https://res.cloudinary.com/dxxwcby8l/image/upload/v1690537829/oq9paksbwpwnuxybhvbw.jpg',
                          category=1)

    Course.objects.create(subject='Software Testing',
                          description='Introduction to ST',
                          image='https://res.cloudinary.com/dxxwcby8l/image/upload/v1690537829/oq9paksbwpwnuxybhvbw.jpg',
                          category_id=1)

    Course.objects.create(subject='Introduction to AI',
                          description='Introduction to SE',
                          image='https://res.cloudinary.com/dxxwcby8l/image/upload/v1690537829/oq9paksbwpwnuxybhvbw.jpg',
                          category_id=2)

    Course.objects.create(subject='Machine Learning',
                          description='Introduction to SE',
                          image='https://res.cloudinary.com/dxxwcby8l/image/upload/v1690537829/oq9paksbwpwnuxybhvbw.jpg',
                          category_id=2)

