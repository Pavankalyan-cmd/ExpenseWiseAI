from mongoengine import Document, StringField, DecimalField,DateField
import datetime
import uuid

def generate_unique_id():
    return str(uuid.uuid4())

class Expense(Document):
    Id = StringField(primary_key=True, default=generate_unique_id)
    User = StringField(required=True)
    Title = StringField(max_length=200, required=True)
    Amount = DecimalField(precision=2, required=True)  # Use precision
    Description = StringField(max_length=400, required=True)
    Tag = StringField(max_length=200, required=True)
    Type = StringField(max_length=200, required=True)
    Paymentmethod = StringField(max_length=200, required=True)
    Date = DateField( required=True)

class Income(Document):
    Id = StringField(primary_key=True, default=generate_unique_id)
    User = StringField(required=True)
    Title = StringField(max_length=200, required=True)
    Amount = DecimalField(precision=2, required=True)  # Use precision
    Tag = StringField(max_length=200, required=True)
    Type = StringField(max_length=200, required=True)
    Date = DateField( required=True)
