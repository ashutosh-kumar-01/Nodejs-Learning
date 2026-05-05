# StudyApp Backend Routes

Base URL: http://localhost:4000/api/v1

All JSON routes require header: Content-Type: application/json

## Recommended Run Order (Serial)

1. POST /auth/sendotp
2. POST /auth/signup
3. POST /auth/login
4. PUT /profile/update
5. PUT /profile/updateDisplayPicture
6. GET /profile/me
7. POST /courses/category (Admin only)
8. POST /courses/course (Instructor only)
9. POST /courses/section (Instructor only)
10. POST /courses/subsection (Instructor only)
11. POST /courses/rating (Student only)
12. POST /payments/capture (Student only)
13. POST /payments/verify

## Auth (/auth)

- POST /auth/sendotp
  - Purpose: Send OTP to email before signup.
  - Note: If mail config is missing, OTP still saves and the API returns success.
  - Response includes OTP for testing.
  - Body (JSON):
    {
      "email": "student@example.com"
    }

- POST /auth/signup
  - Purpose: Create a new user account.
  - Body (JSON):
    {
      "firstName": "Aman",
      "lastName": "Sharma",
      "email": "student@example.com",
      "password": "Pass@1234",
      "confirmPassword": "Pass@1234",
      "accountType": "Student",
      "contactNumber": "9999999999",
      "otp": "123456"
    }

- POST /auth/login
  - Purpose: Login and get auth cookie.
  - Body (JSON):
    {
      "email": "student@example.com",
      "password": "Pass@1234"
    }

- POST /auth/changepassword
  - Purpose: Change password for logged-in user.
  - Auth: Cookie token or Authorization: Bearer <token>
  - Body (JSON):
    {
      "oldPassword": "Pass@1234",
      "newPassword": "Pass@5678",
      "confirmNewPassword": "Pass@5678"
    }

- POST /auth/reset-password-token
  - Purpose: Email a reset password link.
  - Body (JSON):
    {
      "email": "student@example.com"
    }

- POST /auth/reset-password
  - Purpose: Reset password using token.
  - Body (JSON):
    {
      "token": "<token-from-email>",
      "password": "Pass@5678",
      "confirmPassword": "Pass@5678"
    }

## Profile (/profile)

- PUT /profile/update
  - Purpose: Update user profile fields.
  - Auth: Cookie token or Authorization: Bearer <token>
  - Body (JSON):
    {
      "dateOfBirth": "2000-01-01",
      "about": "Learning full stack",
      "contactNumber": "9999999999",
      "gender": "Male"
    }

- PUT /profile/updateDisplayPicture
  - Purpose: Update user profile picture.
  - Auth: Cookie token or Authorization: Bearer <token>
  - Body (form-data):
    - displayPicture: <image file>

- DELETE /profile/delete
  - Purpose: Delete user account.
  - Auth: Cookie token or Authorization: Bearer <token>
  - Body (JSON):
    {}

- GET /profile/me
  - Purpose: Get logged-in user details.
  - Auth: Cookie token or Authorization: Bearer <token>
  - Body (JSON):
    {}

## Courses, Categories, Sections, Ratings (/courses)

- POST /courses/course
  - Purpose: Create a course (Instructor only).
  - Auth: Cookie token or Authorization: Bearer <token>
  - Body (JSON):
    {
      "courseName": "Node.js Basics",
      "courseDescription": "Learn Node from scratch",
      "whatYouWillLearn": "APIs, Express, MongoDB",
      "price": 499,
      "category": "<categoryId>"
    }
  - Note: Send thumbnail image as form-data key: thumbnailImage

- GET /courses/courses
  - Purpose: Get all courses.
  - Body (JSON):
    {}

- POST /courses/course/details
  - Purpose: Get course details by id.
  - Body (JSON):
    {
      "courseId": "<courseId>"
    }

- POST /courses/category
  - Purpose: Create a category (Admin only).
  - Auth: Cookie token or Authorization: Bearer <token>
  - Body (JSON):
    {
      "name": "Web Development",
      "description": "Frontend and backend"
    }

- GET /courses/categories
  - Purpose: Get all categories.
  - Body (JSON):
    {}

- POST /courses/category/details
  - Purpose: Get category page details.
  - Body (JSON):
    {
      "categoryId": "<categoryId>"
    }

- POST /courses/section
  - Purpose: Create a section (Instructor only).
  - Auth: Cookie token or Authorization: Bearer <token>
  - Body (JSON):
    {
      "sectionName": "Introduction",
      "courseId": "<courseId>"
    }

- PUT /courses/section
  - Purpose: Update a section (Instructor only).
  - Auth: Cookie token or Authorization: Bearer <token>
  - Body (JSON):
    {
      "sectionId": "<sectionId>",
      "sectionName": "Getting Started"
    }

- DELETE /courses/section
  - Purpose: Delete a section (Instructor only).
  - Auth: Cookie token or Authorization: Bearer <token>
  - Body (JSON):
    {
      "sectionId": "<sectionId>"
    }

- POST /courses/subsection
  - Purpose: Create a subsection (Instructor only).
  - Auth: Cookie token or Authorization: Bearer <token>
  - Body (JSON):
    {
      "sectionId": "<sectionId>",
      "title": "Intro Video",
      "timeDuration": "5:00",
      "description": "Course overview"
    }
  - Note: Send video file as form-data key: videoFile

- PUT /courses/subsection
  - Purpose: Update a subsection (Instructor only).
  - Auth: Cookie token or Authorization: Bearer <token>
  - Body (JSON):
    {
      "subSectionId": "<subSectionId>",
      "title": "Updated Title",
      "timeDuration": "6:00",
      "description": "Updated description"
    }
  - Note: Send video file as form-data key: videoFile

- DELETE /courses/subsection
  - Purpose: Delete a subsection (Instructor only).
  - Auth: Cookie token or Authorization: Bearer <token>
  - Body (JSON):
    {
      "subSectionId": "<subSectionId>"
    }

- POST /courses/rating
  - Purpose: Create a rating and review (Student only).
  - Auth: Cookie token or Authorization: Bearer <token>
  - Body (JSON):
    {
      "courseId": "<courseId>",
      "rating": 5,
      "review": "Great course"
    }

- POST /courses/rating/average
  - Purpose: Get average rating of a course.
  - Body (JSON):
    {
      "courseId": "<courseId>"
    }

- GET /courses/ratings
  - Purpose: Get all ratings with user and course info.
  - Body (JSON):
    {}

## Payments (/payments)

- POST /payments/capture
  - Purpose: Create Razorpay order (Student only).
  - Auth: Cookie token or Authorization: Bearer <token>
  - Body (JSON):
    {
      "courseId": "<courseId>"
    }

- POST /payments/verify
  - Purpose: Verify Razorpay webhook signature and enroll.
  - Body (JSON):
    {
      "payload": {
        "payment": {
          "entity": {
            "notes": {
              "courseId": "<courseId>",
              "userId": "<userId>"
            }
          }
        }
      }
    }
