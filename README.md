Project Description:
Our target audience is professors, students and UW Administrators. Our audience will use our application to provide feedback on classes at the University and voice their opinions and point out areas of improvement. The audience can also view feedback collected from students. By doing this, the professors and administrators will know what areas to improve on (if any). We as developers want to build this application to provide our users with a centralized platform/forum to discuss school-related matters. Existing platforms like reddit do not provide a centralized platform.



Technical Description:

Priority
User
Description
Technical Implementation
P0
As a student
I would like to post about my experiences without having my name attached
POSTing new posts to website
P0
As a student
View posts
GETting posts
P0
As a student, professor, admin
Sign up/ Log in
POSTing user data (UW netid, password, role)
P1
As a student
Liking posts
POSTing likes
P1
As a professor
I can view the posts of students in classes so I can improve the course.
GETting posts from website
P2
As an UW administrator
I want to see sentiment data for a certain course
GET sentiment analysis for a certain course
P3
As an Site admin
Remove posts
DELETE posts
P3 
As a site admin
Ban users
POST to account blacklist
P3
As a site admin
Increase account permissions
POST to admin list

 
Additionally include:
Include a list of available endpoints your application will provide and what is the purpose it serves. Ex. GET /driver/{id}, POST "/driver/{id}/rating",
Include any database schemas as an appendix

List of available endpoints:

Method
Description
Endpoint
GET
Retrieve all posts
/all
GET
Retrieve a post
/p/{id}
POST
Write a post
/p/new
DELETE
Delete a post
/p/delete?id={id}
POST
Like/Unlike a post
/p/{id}?like={boolean}
GET
Get a course
/c/{id}
POST
Create a course
/c/new
DELETE
Delete a course
/c/{id}
POST
Create user
/a/new
POST
Update user
/a/{accountID}?action={action}
GET
Get user information
/a/{accountID}/


Database Schemas:
POSTS {
	Posts: Array<post>
}

POST {
	Id: String
	courseId: String
	Likes: Int
}

COURSE {
	Id: String
Posts: Array<String> // ids of posts belonging to course?
}
