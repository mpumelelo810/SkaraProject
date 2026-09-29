from django.db import migrations


def disable_legacy_passwords(apps, schema_editor):
    UserInfo = apps.get_model('user_info', 'UserInfo')
    UserInfo.objects.all().update(password='disabled')


class Migration(migrations.Migration):
    dependencies = [
        ('user_info', '0010_alter_userinfo_email_alter_userinfo_password_and_more'),
    ]

    operations = [migrations.RunPython(disable_legacy_passwords, migrations.RunPython.noop)]
