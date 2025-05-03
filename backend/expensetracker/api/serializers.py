from rest_framework import serializers
from .models import Expense, Income

# Expense Serializer
class ExpenseSerializer(serializers.Serializer):
    Id = serializers.CharField(read_only=True)
    User = serializers.CharField()
    Title = serializers.CharField(max_length=200)
    Amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    Description = serializers.CharField(max_length=400)
    Tag = serializers.CharField(max_length=200)
    Type = serializers.CharField(max_length=200)
    Paymentmethod = serializers.CharField(max_length=200)
    Date = serializers.CharField()

    def create(self, validated_data):
        return Expense(**validated_data).save()

    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance

# Income Serializer
class IncomeSerializer(serializers.Serializer):
    Id = serializers.CharField(read_only=True)
    User = serializers.CharField()
    Title = serializers.CharField(max_length=200)
    Amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    Tag = serializers.CharField(max_length=200)
    Type = serializers.CharField(max_length=200)
    Date = serializers.CharField()

    def create(self, validated_data):
        return Income(**validated_data).save()

    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance
