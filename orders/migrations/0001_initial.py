# Generated by Django 3.0.2 on 2020-02-13 14:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('menu', '0001_initial'),
        ('contenttypes', '0002_remove_content_type_name'),
        ('userdetails', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time_ordered', models.DateTimeField(auto_now_add=True)),
                ('total_price', models.DecimalField(decimal_places=2, max_digits=4)),
                ('customer', models.ForeignKey(default=5, on_delete=django.db.models.deletion.CASCADE, related_name='order', to='userdetails.UserProfile')),
            ],
        ),
        migrations.CreateModel(
            name='OrderedPizza',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pizza_type', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='pizza_orders', to='menu.Pizza')),
            ],
        ),
        migrations.CreateModel(
            name='OrderedSubs',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subs_additions', models.ManyToManyField(related_name='subs_additions_orders', to='menu.SubsAddition')),
                ('subs_type', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='subs_orders', to='menu.Subs')),
            ],
        ),
        migrations.CreateModel(
            name='OrderedPizzaToppings',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.PositiveSmallIntegerField(default=1)),
                ('pizza', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='orders.OrderedPizza')),
                ('toppings', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='topping_orders', to='menu.Topping')),
            ],
        ),
        migrations.AddField(
            model_name='orderedpizza',
            name='toppings',
            field=models.ManyToManyField(blank=True, through='orders.OrderedPizzaToppings', to='menu.Topping'),
        ),
        migrations.CreateModel(
            name='OrderedFood',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.PositiveSmallIntegerField(default=1)),
                ('object_id', models.PositiveIntegerField()),
                ('content_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contenttypes.ContentType')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='items_ordered', to='orders.Order')),
            ],
        ),
    ]
