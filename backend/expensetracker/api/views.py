from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Expense, Income
from .serializers import ExpenseSerializer, IncomeSerializer

# Expense Views
class ExpenseListCreateView(APIView):
    def get(self, request):
        expenses = Expense.objects.all()
        serializer = ExpenseSerializer(expenses, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ExpenseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ExpenseDetailView(APIView):
    def get_object(self, pk):
        try:
            return Expense.objects.get(Id=pk)
        except Expense.DoesNotExist:
            return None
    def get_objects(self, pk):
        try:
            expenses = Expense.objects.filter(User=pk)
            serializer = ExpenseSerializer(expenses, many=True)
            return serializer.data
        except Expense.DoesNotExist:
            return []            

    def get(self, request, pk):
        expenses = self.get_objects(pk)
        return Response(expenses)

    def put(self, request, pk):
        expense = self.get_object(pk)
        if not expense:
            return Response({"error": "Expense not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ExpenseSerializer(expense, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        expense = self.get_object(pk)
        if not expense:
            return Response({"error": "Expense not found"}, status=status.HTTP_404_NOT_FOUND)
        expense.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Income Views
class IncomeListCreateView(APIView):
    def get(self, request):
        incomes = Income.objects.all()
        serializer = IncomeSerializer(incomes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = IncomeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class IncomeDetailView(APIView):
    def get_object(self, pk):
        try:
            return Income.objects.get(Id=pk)
        except Income.DoesNotExist:
            return None
    def get_objects(self, pk):
        try:
            incomes = Income.objects.filter(User=pk)
            serializer = IncomeSerializer(incomes, many=True)
            return serializer.data
        except Income.DoesNotExist:
            return []            
    def get(self, request, pk):
        incomes = self.get_objects(pk)
        return Response(incomes)

    def put(self, request, pk):
        income = self.get_object(pk)
        if not income:
            return Response({"error": "Income not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = IncomeSerializer(income, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

 
    def delete(self, request, pk):
        income = self.get_object(pk)
        if not income:
            return Response({"error": "income not found"}, status=status.HTTP_404_NOT_FOUND)
        income.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)