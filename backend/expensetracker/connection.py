# Create a file named test_mongo_connection.py in your app's management/commands directory

from django.core.management.base import BaseCommand
from mongoengine import connect

class Command(BaseCommand):
    help = 'Test MongoDB Atlas connection'

    def handle(self, *args, **kwargs):
        try:
            connect('expensestracker', host='mongodb+srv://PavanKalyan:Pk9705121603@cluster0.8ugew.mongodb.net/expensestracker?retryWrites=true&w=majority&appName=Cluster0')  # Replace with your actual MONGO_URI
            self.stdout.write(self.style.SUCCESS('Successfully connected to MongoDB Atlas!'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Failed to connect to MongoDB Atlas: {e}'))