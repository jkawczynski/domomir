from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

TEST_USERNAME = "test"
TEST_PASSWORD = "test"

User = get_user_model()


class Command(BaseCommand):
    help = "Create test user with test/test credentials"

    def handle(self, *args, **options):
        try:
            User.objects.get(username=TEST_USERNAME)
            self.stdout.write("Test user already exists")
        except User.DoesNotExist:
            User.objects.create_user("test", password="test")
            self.stdout.write("Created test user with test/test credentials")
