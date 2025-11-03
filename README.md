# Hospital Management System – Microservices Project

Welcome! This project is a demonstration of a hospital management system built as a set of microservices using Node.js and CSV files for simplicity. Each microservice manages a specific business area, designed for modularity and clarity.

## 🚩 Overview

**Microservices included:**
- Patient Service (`patients-service`)
- Doctor Service (`doctors-service`)
- Appointment Service (`appointments-service`)
- Prescription Service (`prescriptions-service`)
- Billing Service (`bills-service`)
- Payment Service (`payments-service`)

All services are standalone Node.js applications running RESTful APIs on different ports.

---

## 💡 Features

- Basic CRUD endpoints for core data management
- Lightweight CSV file storage—easy for demos or assignments
- Portable with Docker support
- Deployment ready with Kubernetes manifests (Minikube-friendly)
- Example inter-service REST communication

---

## 🚀 Run Locally

### 1. **Clone the repository**
```bash
git clone https://github.com/mdadilansari/hms-project.git
cd hms-project
