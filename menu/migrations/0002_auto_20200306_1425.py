# Generated by Django 3.0.2 on 2020-03-06 14:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='dinnerplatter',
            name='img_url',
            field=models.URLField(null=True),
        ),
        migrations.AddField(
            model_name='pasta',
            name='img_url',
            field=models.URLField(null=True),
        ),
        migrations.AddField(
            model_name='pizza',
            name='img_url',
            field=models.URLField(null=True),
        ),
        migrations.AddField(
            model_name='salad',
            name='img_url',
            field=models.URLField(null=True),
        ),
        migrations.AddField(
            model_name='subs',
            name='img_url',
            field=models.URLField(null=True),
        ),
        migrations.AddField(
            model_name='subsaddition',
            name='img_url',
            field=models.URLField(null=True),
        ),
        migrations.AddField(
            model_name='topping',
            name='img_url',
            field=models.URLField(null=True),
        ),
    ]
