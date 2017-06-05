Instructions on setting up Meteor: 
 - Mac/Linux: `curl https://install.meteor.com/ | sh`
 - Windows: Get the installer @ https://install.meteor.com/windows

Once installed, clone this repo. CD into the repo and type `meteor` to start the server.
Tip: To clear the Meteor DB, type `meteor reset` for a clean re-boot.

Another dev tip: Download React and Redux dev tools. It will make debugging loads easier!


<h4>Robomongo</h4>
Because Meteor uses MongoDB, you'll need to get a program that can visually display Mongo objects.
I suggest Robomongo. Download it, and you'll need the following configurations:
- Type: Direct Connection
- Name: Choose any name, I use "Meteor Bingosmash"
- Address: 127.0.0.1 : 3001

<h4>TODO:<h4> 
<h5>Onboarding Component<h5>
Profile picture(s) need to be better handled. We should *require* a profile pic? Yes, No? 
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
- Componentize the modals
- Set toastr on success moving between components

<h4>Bug Tracker</h4>
- Need to handle onboarding behavior better - user can nagivate away without filling out required information
- 

<h4>Version Control</h4>
Clone the repo. 

Dev on scratch: git checkout -b user-profile-css-changes

Add, commit, and push to branch. 

Make sure your branch is synced with master. `git checkout master`, `git pull origin 
master`, `git checkout user-profile-css-changes`, `git rebase master`. Once ready, navigate to github and create a pull request, comparing your base branch to master branch. 


Recruitment All-Star team once basic functionality is finished:
- Jonathan for FS??
- Wayne specializing in front-end and design
- Rose for full-stack and front-end design
- Edward for scalability/architecture, backend optimizations