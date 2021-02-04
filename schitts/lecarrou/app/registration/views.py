from django.shortcuts import render
from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect
from registration.forms import SignUpForm, ProfileForm
from django.contrib.auth.models import User
from cafe.models import Customers


def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            user.refresh_from_db()  # load the profile instance created by the signal
            # user.customers.pseudo = form.cleaned_data.get('pseudo')
            user.save()
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=user.username, password=raw_password)
            login(request, user)
            return redirect('registration:profile')
    else:
        form = SignUpForm()
    return render(request, 'registration/signup.html', {'form': form})

def profile(request):
    if request.method == 'POST':
        form = ProfileForm(request.POST)
        if form.is_valid():
            user = request.user.id
            User.objects.filter(id=user).update(first_name=request.POST.get("first_name", ""),last_name=request.POST.get("last_name", ""),email=request.POST.get("email", ""))
            Customers.objects.filter(user_id=user).update(customer_type=request.POST.get("customer_type", ""),drink_preferences=request.POST.get("drink_preferences", ""),food_preferences=request.POST.get("food_preferences", ""))
            return redirect('home')
    else:
        form = ProfileForm()
    return render(request, 'registration/profile.html', {'form': form})