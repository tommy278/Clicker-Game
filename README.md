### Pakito

## Introduction
# I built this project to explore the complete full stack development. I also wanted something interactive with different feautures such as rebirth, idle progression, multipiers and so on...

## Distinctiveness and Complexity
# As previously stated, with this project I explored full stack development, which is something I haven't done throughout the course. This implementation also came with its complexities because I had to integrate the frontend and backend semlessly in order for the project to work. This required a thorough understanding of API's and how they can connect the frontend and backend.

## Files
# My backend directory has a singlar app called api. This is used to serialize and return data to distinct url endpoints. Conversely, my frontend directrory is simply meant to consume the created data and then display them in a readable format for the user. In addition, the frontend is also equipped with a framework known as Tailwind. This was the chosen mathod for designing this project, which is meant to give the web app more responsiveness.

## Functionality
# The app works by first sending data to an endpoint as mentioned before. In order to make this data more dynamic I increment the values periodically. My front end fetches this data periodically as well and when the user clicks it sends a patch request which interacts with the db in different ways. A button updates the counter and cash, another updates the multiplier and deducts cash, and anothe resets the user score entirely. This is all communicated to the db in order to always have a reliable source of truth. The leaderboard works in the exact same way by simply listing all of the data of the top 10 people in the game, which is then displayed when the user clicks on it.

## How to run
# # Clicker-Game
