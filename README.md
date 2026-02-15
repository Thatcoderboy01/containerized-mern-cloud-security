# Securing a Containerized Application in the Public Cloud

This project demonstrates the deployment and security hardening of a full-stack MERN application using Docker containers on a public cloud environment. The system implements multiple layers of security including HTTPS, firewall rules, application authentication, and container isolation.

---

## 🚀 Project Overview

The application is deployed on a cloud virtual machine and containerized using Docker. Frontend and backend services run in separate containers and are managed using Docker Compose. NGINX is used as a reverse proxy, and SSL is enabled using Let’s Encrypt.

Key focus areas:

- Cloud deployment
- Containerization
- Reverse proxy configuration
- HTTPS encryption
- Application-level security
- Server and network hardening

---

## 🏗 Architecture

User  
↓ HTTPS  
Domain + SSL  
↓  
NGINX Reverse Proxy  
↓  
Frontend Container (React + NGINX)  
↓ /api  
Backend Container (Node + Express)  
↓  
MongoDB Atlas  

---

## 🛠 Tech Stack

### Frontend
- React.js
- NGINX (static file serving)

### Backend
- Node.js
- Express.js
- JWT Authentication

### Database
- MongoDB Atlas

### DevOps / Infrastructure
- AWS EC2 (Ubuntu Server)
- Docker
- Docker Compose
- NGINX Reverse Proxy
- Let’s Encrypt SSL

---

## 🔐 Security Features

### Application Level
- JWT Authentication
- Helmet (secure HTTP headers)
- Rate Limiting
- CORS configuration
- Environment variables for secrets

### Server Level
- UFW Firewall
- SSH key-based authentication
- Only required ports exposed (22, 80, 443)

### Network Level
- AWS Security Groups
- Backend port not publicly exposed
- HTTPS enforced

---

## 📁 Project Structure
```
├── client/ # React frontend
│ ├── build/ # Production build
│ ├── nginx/ # NGINX config for frontend
│ └── Dockerfile
│
├── server/ # Node/Express backend
│ ├── routes/
│ ├── models/
│ ├── controllers/
│ ├── .env
│ └── Dockerfile
│
├── docker-compose.yml
└── README.md
```
