# Generated by Django 3.0.2 on 2020-03-04 09:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userdetails', '0002_auto_20200213_1839'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='token',
            field=models.CharField(max_length=64, null=True),
        ),
    ]