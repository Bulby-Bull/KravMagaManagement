from django.shortcuts import render

def tech_dash_main(request):
    return render(request, 'tech_dashboard/tech_dash_main.html')