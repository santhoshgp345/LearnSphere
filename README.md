# 🎓 LearnSphere Platform

LearnSphere is a full-fledged MERN-based E-learning platform that bridges the gap between students and instructors through an intuitive UI/UX, secured backend services, and seamless video course delivery. It also integrates secure payment processing and follows modern development workflows with Docker support.

---

## 🚀 Tech Stack

* **Frontend**: React.js (Vite), Tailwind CSS
* **Backend**: Node.js, Express.js
* **Database**: MongoDB 
* **Authentication**: JWT
* **Emails**: Nodemailer with Gmail SMTP
* **Containerization**: Docker, Docker Compose

---

## ✨ Features

### ✅ Authentication & Authorization

* Role-based login: **Instructor** & **Student**
* JWT-based session management via secure HTTP-only cookies
* Email verification & password reset using **Nodemailer** with OTP
* Protected routes for role-specific access

### 📚 Course Management

* **Instructors** can:

  * Create, update, and delete courses
  * Add lectures, manage content
  * View enrolled students and revenue
* **Students** can:

  * Browse, purchase, and access video-based courses
  * Rate and review enrolled courses



### 🖥️ Responsive UI/UX

* Fully responsive layouts using Tailwind CSS
* Clean and accessible dashboards for both user types
* Toast notifications, custom loaders, OTP inputs, video previews

### 🐳 Dockerized Architecture

* Uses 3 containers: `frontend`, `backend`, and `mongo`
* Clean and scalable Docker + Docker Compose setup
* Ideal for local development and production CI/CD setups

---

## 🛠️ Local Development Setup

> ✅ **Ensure Docker is installed and running**
> 👉 [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)



### ⚙️ Create Environment Files

#### 📦 `/backend_server/.env`

```env
PORT=8000
MONGODB_URL=mongodb://mongo:27017/LearnSphere
JWT_SECRET=your_jwt_secret
COOKIE_SECRET=your_cookie_secret

RAZORPAY_KEY=your_test_key_id
RAZORPAY_SECRET=your_test_secret_key

MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASSWORD=your_app_password
```


```env
VITE_BASE_URL=http://localhost:80001/api/v1
```

> 💡 **Gmail SMTP Note**: Enable [2-Step Verification](https://myaccount.google.com/security) and generate [App Password](https://myaccount.google.com/apppasswords)

---

## ▶️ Run via Docker (Recommended)

```bash
docker-compose up --build
```

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend: [http://localhost:8001](http://localhost:8001)

---

## 🔁 Run Manually (Without Docker)

```bash
# Step 1: Start MongoDB locally or use cloud DB

# Step 2: Run Backend
cd backend
npm install
npm run dev

# Step 3: Run Frontend
cd frontend
npm install
npm run dev
```

---



## ⚙️ Scripts

```bash
# Frontend Setup
cd frontend_skillnova && npm install

# Backend Setup
cd backend_server && npm install

# Run both (from frontend folder)
npm run dev
```

Or using Docker:

```bash
docker-compose up --build
```

---

## 🧠 Troubleshooting

| Problem                         | Solution                                                           |
| ------------------------------- | ------------------------------------------------------------------ |
| ❌ Emails not received           | Check `MAIL_USER` and `MAIL_PASSWORD` (Use App Password)           |
| 💳 Razorpay not working         | Use correct Test Mode keys + ensure Test Mode enabled in dashboard |
| 🐳 Docker Errors                | Run `docker system prune` or restart Docker                        |
| 🔁 Frontend not calling backend | Check `VITE_BASE_URL` in `.env` file                               |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
Feel free to fork, contribute, and build upon it!

---
## 📌 Credits
This project is inspired by [SkillNova](https://github.com/username/SkillNova).  
All rights to the original idea/design belong to the SkillNova authors. This project was built purely for **learning and educational purposes**.  



