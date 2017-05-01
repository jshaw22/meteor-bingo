Instructions on setting up Meteor: 
 - Mac/Linux: curl https://install.meteor.com/ | sh
 - Windows: Get the installer @ https://install.meteor.com/windows

Once installed, clone this repo. CD into the repo and type `meteor` to start the server.
Tip: To clear the Meteor DB, type `meteor reset` for a clean re-boot.

<h4>Robomongo</h4>
Because Meteor uses MongoDB, you'll need to get a program that can visually display Mongo objects.
I suggest Robomongo. Download it, and you'll need the following configurations:
- Type: Direct Connection
- Name: Choose any name, I use "Meteor Bingosmash"
- Address: 127.0.0.1 : 3001

TODO: 
Onboarding Component
    - profile picture(s) need to be better handled. We should *require* a profile pic? Yes, No? 
    - Store profile images into S3 after local testing?
    - use graphicsmagick to make thumbnails, resize, optimize
    
User Profile Page (editable) 
    - Give user option to add additional details 
        - Textarea for a little something about me
        - Favorite hobbies
        - Sexual orientation
        - relationship status
        - relationship type 
        - ethnicity 
        - body type 
        - height
        - Diet
        - Smoking
        - Drinking
        - Religion
        - Education 
        - etc

Matches Component
    - find matches with filters. Done, but need to add a 'location' parameter. I'm going to leave that blank for now because so little users.
    - message a match. Done, but need to add:
    	- Better sorting and UI
    	- A good way to respond back to matches quickly and efficiently (sort of like OKCupid's mechanism). Will need to componentize this

* Remove autopublish for meteor -- fix publication not being ready stated

Low priority
    - Set email, change pw, etc

Recruitment All-Star team once basic functionality is finished:
- Jonathan for FS??
- Wayne specializing in front-end and design
- Rose for full-stack and front-end design
- Edward for scalability/architecture, backend optimizations