
# 🌐 Static Site Hosting Platform on AWS

## Overview

This project is a **secure**, **scalable**, and **high-performance static site hosting platform** built on AWS. It supports:

* ✅ Custom subdomain-based website hosting (e.g., `cat.clouddrift.com`)
* 🌍 Global content delivery via Amazon CloudFront
* 📊 Usage analytics through AWS Lambda and S3 logging
* ⚡ Asynchronous build system for React/JavaScript apps
* 📦 Support for static HTML/CSS as well as modern JS frameworks
* 🔐 Secure and isolated backend APIs with Node.js, TypeScript, and VPC architecture

---

## 🧱 Architecture

![Architecture Diagram](https://res.cloudinary.com/du06umyos/image/upload/v1749144493/aws.drawio_5_rcokjy.png)

### Key Components

| Component          | Purpose                                                                |
| ------------------ | ---------------------------------------------------------------------- |
| **Amazon VPC**     | Isolated networking for public (proxy) and private (backend) resources |
| **EC2 (Nginx)**    | Reverse proxy to route subdomains to respective S3 paths               |
| **EC2 (Backend)**  | Node.js server to handle file uploads, auth, and APIs                  |
| **S3 Buckets**     | Stores website files (`/static`) and CloudFront logs (`/logs`)         |
| **CloudFront**     | Delivers content with caching and low latency globally                 |
| **Route 53**       | Manages DNS and wildcard subdomain routing                             |
| **DocumentDB**     | Stores metadata like users, domains, and file mappings                 |
| **Lambda**         | Processes CloudFront logs to generate analytics                        |
| **Redis Queue**    | Manages non-blocking build tasks                                       |
| **Builder Worker** | Downloads, builds, and deploys React apps to S3 asynchronously         |

---

## 🧩 Tech Stack

### 🔧 Backend

* Node.js + TypeScript
* `pnpm` for backend APIs
* Redis for job queues
* MongoDB (via AWS DocumentDB)

### ⚙️ `/builder` Component

* Node.js worker that:

  1. Pulls build jobs from Redis queue
  2. Clones user React app repo (or downloads ZIP)
  3. Builds it using `npm run build`
  4. Uploads the output to the corresponding S3 path

### 💻 Frontend

* React.js + Vite
* Deployed via build uploads or Redis-based auto-deploy

---

## 🔄 Workflow

### Static Upload Flow (HTML/ZIP)

1. User uploads site via API
2. Server stores it in user-specific S3 folder
3. Nginx + CloudFront + Route 53 serve site from S3

### Advanced Build Flow (React/JS)

1. User submits repo/zip via `/upload/react`
2. API enqueues a job to Redis
3. **`/builder`** script (worker) picks the job
4. App is built in isolation and uploaded to S3
5. Site becomes live on subdomain (e.g., `user.clouddrift.com`)

---

## 🚀 Deployment

### 🛠 Prerequisites

* AWS CLI configured
* Redis instance running (local or AWS ElastiCache)
* IAM roles and bucket permissions set
* Route 53 domain (e.g., `clouddrift.com`)

### 🧪 Local Development

```bash
# Backend
cd APIs
pnpm install
pnpm dev

# Frontend
cd Web
npm install
npm run dev

# Builder Worker
cd builder
npm install
npm start
```

---

## 🔁 Redis + Builder Queue

* Redis is used as a **non-blocking job queue** for React build tasks
* Queue allows:

  * High concurrency
  * Retry logic
  * Scalability across multiple builder instances
* Builder can scale independently on EC2, ECS, or Lambda (container)

---

## 📈 Analytics Pipeline

* **CloudFront Logs** → S3 (Logs Bucket)
* **Trigger:** S3 → Lambda
* **Lambda:** Generates analytics (IP, region, path, status, etc.)
* Output is stored in DocumentDB or processed for frontend dashboard

---

## 🔐 Security

* Private subnets for backend and builder workers
* IAM policies restrict access to S3 and DocumentDB
* HTTPS enforced with Nginx + SSL
* Subdomain isolation (reverse proxy per site)

---
### 📦 Static Site Delivery Flow

We use a **multi-layered delivery architecture** combining **S3**, **CloudFront**, and **Nginx** to serve user websites efficiently and securely.

![Static Site Flow](https://res.cloudinary.com/du06umyos/image/upload/v1749144740/deve23_kiraaa.png)

### 🔁 How It Works

1.  **User Access via Subdomain**  
    A visitor accesses a user site via a custom subdomain like `cat.clouddrift.com`.
    
2.  **Route 53**  
    DNS is managed by Amazon Route 53, which routes `*.clouddrift.com` to our Nginx proxy server.
    
3.  **Nginx Reverse Proxy**  
    Nginx inspects the subdomain (e.g., `cat`) and rewrites the request to the appropriate CloudFront URL, preserving the subdomain structure:
    
    ```
    cat.clouddrift.com → xyz.cloudfront.net/cat/index.html
    
    ```
    
4.  **CloudFront CDN**  
    CloudFront fetches content from the relevant S3 bucket path (`/cat/`) and caches it globally for ultra-fast delivery.
    
5.  **S3 Static Hosting**  
    Files are stored in S3 with subdomain-based folders (`/cat/`, `/dog/`, etc.). CloudFront retrieves the correct `index.html` and assets from here.
    
6.  **CloudFront Logging → S3**  
    Every access is logged (Date, Time, IP, Path, Status) into a separate S3 bucket, which triggers analytics processing via Lambda.
    

----------

This system ensures:

-   **Global performance** via CDN
    
-   **Subdomain isolation** via Nginx reverse proxy
    
-   **Highly durable** file storage in S3
    
-   **Real-time observability** via CloudFront logs
---

## 📂 Project Structure

```bash
/
├── APIs/                  # Node.js API (TS + Express)
├── Web/                   # React client
├── builder/               # Redis-based worker to build and deploy React apps
├── nginx/                 # Reverse proxy configuration
├── lambda/                # CloudFront log analytics processor
└── README.md
```

---

## ✅ Future Enhancements

* 🧠 AI-generated templates for websites
* 📦 One-click deploy for GitHub repos
* 📊 Real-time analytics via WebSocket

---

## 🙌 Contributors

Rajvardhan Singh – Lead Architect & Developer
