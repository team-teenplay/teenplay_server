# Generated by Django 5.0.2 on 2024-02-29 10:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notice', '0002_alter_notice_notice_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notice',
            name='notice_type',
            field=models.SmallIntegerField(choices=[(1, ' 자주 묻는 질문'), (0, '공지사항')]),
        ),
    ]
