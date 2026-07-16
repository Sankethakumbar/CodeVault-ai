# CodeVault AI

AI-powered developer knowledge management platform.

## Tech Stack

- Next.js 16
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma
- Auth.js
- Zod
- React Hook Form
- Groq API

## Features

- Authentication
- Email Verification
- CRUD Notes
- AI Summary
- AI Interview Questions
- AI Tags



                 USER
┌─────────────────────────────────┐
│ id                              │
│ username                        │
│ email                           │
│ password                        │
│ isVerified                      │
│ verifyCode                      │
│ verifyCodeExpiry                │
│ createdAt                       │
│ updatedAt                       │
└───────────────┬─────────────────┘
                │
                │ One User
                │
                ▼
             Many Notes
┌─────────────────────────────────┐
│ id                              │
│ title                           │
│ content                         │
│ summary                         │
│ tags                            │
│ interviewQuestions              │
│ userId (Foreign Key)            │
│ createdAt                       │
│ updatedAt                       │
└─────────────────────────────────┘




User fills Signup Form

↓

React Hook Form collects data

↓

Zod validates input

↓

Server Action / API receives request

↓

Check if email already exists

↓

Hash password

↓

Generate OTP

↓

Save user in PostgreSQL
(isVerified = false)

↓

Send OTP email

↓

User enters OTP

↓

Compare OTP

↓

Update
isVerified = true

↓

Allow Login

↓

Dashboard



Why are you using Zod if Prisma already exists?

You can answer:

"Zod validates incoming user input before it reaches the database. Prisma defines and manages the database schema. They solve different problems."



User Types
      │
      ▼
<Input>

      │
      ▼
register()

      │
      ▼
React Hook Form

      │
      ▼
Zod Resolver

      │
      ▼
signupSchema

      │
      ▼
Validation Passed?

      │
  ┌───┴────┐
  │        │
 NO       YES
  │         │
Errors    handleSubmit()
  │         │
  ▼         ▼
Show UI   onSubmit(data)


If an interviewer asks:

Why did you use await signup(data)?

You can answer:

"The signup server action is asynchronous because it performs operations like checking the database, hashing the password, generating an OTP, and sending an email. It returns a Promise. Using await pauses the execution of the current async function until the Promise resolves, ensuring each step completes before moving to the next."

That's an excellent explanation.


Operator: ?? (Nullish Coalescing)

It means:

"Use the value on the left. If it is null or undefined, then use the value on the right."

|| treats any falsy value (0, "", false, null, undefined) as missing.

?? treats only null and undefined as missing.


What is 10?
bcrypt.hash(password, 10)

10 = Salt Rounds (cost factor).

Higher value:

✅ More secure
❌ Slower

For most web apps:

10

is the standard choice.



Does the user exist?

        │
        ▼
Yes

        │
        ▼
Is the user verified?

     ┌───────────────┐
     │               │
   Yes             No
     │               │
Return error    Generate new OTP
                Update expiry
                Send email again


Sonner gives Toast Notifications

Instead of a popup,

a small notification appears.

                ✓

Verification email sent successfully.

──────────────────────────────

After 2–3 seconds,

it disappears automatically.


✓ Verification email sent successfully.

↓

1 second

↓

Redirect to

/verify

Why did you use Sonner?
"I wanted lightweight, non-blocking toast notifications for success and error feedback. It provides a better user experience than browser alerts and integrates well with React."



Next.js gives us

searchParams

Question:

Suppose the URL is

/verify?email=sanketha@gmail.com

What is

searchParams.email

?

Exactly.

sanketha@gmail.com




verify(email, otp)

        │
        ▼
Find User
        │
        ▼
User Exists?
        │
   No ─────► 404
        │
       Yes
        │
        ▼
Already Verified?
        │
   Yes ─────► Redirect to Login
        │
       No
        │
        ▼
Has Active OTP?
        │
   No ─────► Request New OTP
        │
       Yes
        │
        ▼
Expired?
        │
   Yes ─────► Request New OTP
        │
       No
        │
        ▼
OTP Correct?
        │
   No ─────► Invalid OTP
        │
       Yes
        │
        ▼
Update User
        │
        ▼
isVerified = true
verifyCode = null
verifyCodeExpiry = null
        │
        ▼
Success



Request Dashboard
        │
        ▼
Read Cookie
        │
        ▼
Token Exists?
      /     \
    No       Yes
    │         │
    ▼         ▼
 Login   Verify JWT
              │
         Valid? / Invalid?
           │          │
           ▼          ▼
     Dashboard     Login








                USER

                  │
                  ▼
             Signup Page
                  │
                  ▼
        Validate with Zod
                  │
                  ▼
         Hash Password (bcrypt)
                  │
                  ▼
          Save User (Prisma)
                  │
                  ▼
          Generate OTP
                  │
                  ▼
      Send Email using Resend
                  │
                  ▼
           Verify Email
                  │
                  ▼
        Compare Verification Code
                  │
                  ▼
        Email Verified ✅
                  │
                  ▼
             Login Page
                  │
                  ▼
          Validate Credentials
                  │
                  ▼
      Compare Password (bcrypt)
                  │
                  ▼
        Generate JWT Token
                  │
                  ▼
     Store HTTP-only Cookie
                  │
                  ▼
        User visits Dashboard
                  │
                  ▼
      Proxy reads Cookie
                  │
                  ▼
      Verify JWT Signature
                  │
          ┌───────┴────────┐
          │                │
       Valid            Invalid
          │                │
          ▼                ▼
     Dashboard         Redirect Login
          │
          ▼
        Logout
          │
          ▼
    Delete Cookie
          │
          ▼
        Redirect Login




Take this structure:

notes
├── new
│   └── page.tsx
└── [id]
    ├── page.tsx
    └── edit
        └── page.tsx

These routes become:

notes/new          → page.tsx
notes/123          → page.tsx
notes/123/edit     → page.tsx



lib/
├── auth.ts                  ✅ Authentication helpers
├── bcrypt.ts                ✅ Password hashing
├── jwt.ts                   ✅ JWT functions
├── otp.ts                   ✅ OTP generation
├── prisma.ts                ✅ Prisma client
├── sendVerificationEmail.ts ✅ Email utility
└── utils.ts                 ✅ shadcn's cn() helper