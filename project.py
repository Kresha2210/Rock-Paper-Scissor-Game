# Rock- Papper - Scissor game

# The rules are simple:
# 1. Rock beats Scissors
# 2. Scissors beats Paper
# 3. Paper beats Rock

#if both user and computer choose the same then it's a tie!
#--------------------------------------------------------------------------------------------

# random module 
import random

#define the choices
choices = ["rock", "paper", "scissors"]

# get the user choice
user_choice = input("Choose rock, paper, or scissors: ").lower()

# generate computer choice
computer_choice = random.choice(choices)
print(f"Computer chose: {computer_choice}")

# comparison and declare the winner
if(user_choice not in choices):
    print("Invalid choice! Please choose rock, paper, or scissors.")
elif user_choice == computer_choice:
    print("It's a tie!")
elif (user_choice == "rock" and computer_choice == "scissors") or \
     (user_choice == "scissors" and computer_choice == "paper") or \
     (user_choice == "paper" and computer_choice == "rock"):
    print("You win!")
else:
    print("Computer wins!")