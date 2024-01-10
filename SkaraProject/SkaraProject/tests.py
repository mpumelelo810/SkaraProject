from SkaraProject.models import User

all_users = User.objects.all()

for user in all_users:
    print(user.username)
