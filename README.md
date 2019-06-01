# Giphy-API
Using  GIPHY API to make a dynamic web page that populates with gifs of diffrent superhero characters. Technologies used:JavaScript, jQuery,HTML,CSS.


  The app  takes the topics in the array of strings and creates buttons in  HTML using a loop that appends a button for each string in the array. When the user clicks on a button, the page  grabs 10 static, non-animated gif images from the GIPHY API and places them on the page.
 When the user clicks one of the still GIPHY images, the gif  animates. If the user clicks the gif again, it  stops playing. Under every gif,  its rating is displayed (PG, G, so on).
   * This data is provided by the GIPHY API.
 The user can add a topic using a form on the page that takes the value from a user input box and adds it into  `topics` array. Then makes a function call that takes each topic in the array remakes the buttons on the page.
