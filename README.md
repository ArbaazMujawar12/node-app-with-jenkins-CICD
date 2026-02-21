# **Node.js Application Deployment to Target Server using Jenkins Pipeline**

## **Project Overview :**

This project demonstrates CI/CD automation of a Node.js application using:

- Jenkins Pipeline

- GitHub Webhook

- SSH Agent Plugin

- Remote Deployment to Target Server

- Automated Build & Deployment

---

## **Workflow :**

1. Developer pushes code to GitHub

2. GitHub Webhook triggers Jenkins

3. Jenkins pulls latest code

4. Jenkins builds application

5. Jenkins connects to Target Server via SSH

6. Application is deployed on Target Server

---

## **Prerequisites :**

1. Jenkins Server

2. Jenkins Installed

3. Required Plugins Installed

4. Internet Access

---

### **Installed Plugins :**

| Plugin Name      | Purpose                                |
| ---------------- | -------------------------------------- |
| Git Plugin       | Pull code from GitHub repository       |
| GitHub Plugin    | Enable webhook integration with GitHub |
| SSH Agent Plugin | Provide SSH access to remote server    |
| Pipeline Plugin  | Execute Jenkinsfile (CI/CD pipeline)   |

---

## **Target Server :**

### **SG for Target Server :**

| Port | Protocol | Purpose                    |
| ---- | -------- | -------------------------- |
| 22   | TCP      | SSH access to EC2 server   |
| 80   | TCP      | HTTP traffic (Web access)  |
| 443  | TCP      | HTTPS traffic (Secure web) |
| 3000 | TCP      | Node.js application port   |

---

## **STEP 1: Setup Target Server**

Login to Target Server :

```bash
sudo apt update -y
sudo apt install nodejs npm -y
sudo npm install -g pm2
mkdir /home/ubuntu/node-app
cd node-app
```

---

## **STEP 2: Add SSH Credentials in Jenkins**

Go to:

```
Manage Jenkins → Manage Credentials → Global → Add Credentials
```

Select:

- Kind: SSH Username with private key
- Username: ubuntu
- Private Key: Enter directly
- Paste private key

---

## **STEP 3: Update the jenkinsfile environment variables**

Update this :

```
SERVER_IP      = '13.50.101.188'
SSH_CREDENTIAL = 'node-app-key'
REPO_URL       = 'https://github.com/ArbaazMujawar12/node-app-with-jenkins-CICD.git'
BRANCH         = 'main'
REMOTE_USER    = 'ubuntu'
REMOTE_PATH    = '/home/ubuntu/node-app'
```

---

## **STEP 4: Configure GitHub Webhook**

Go to GitHub Repo:

```
Settings → Webhooks → Add Webhook
```

Payload URL:

```
http://<JENKINS_SERVER_IP>:8080/github-webhook/
```

Content Type:

```
application/json
```

Select:
✔ Just the push event

Save

---

## **STEP 5: Create Jenkins Pipeline Job**

1. Click New Item

2. Select Pipeline

3. Enter Job Name

4. Scroll to Pipeline section

5. Select:
   - Pipeline script from SCM

   - SCM: Git

   - Repository URL : https://github.com/ArbaazMujawar12/node-app-with-jenkins-CICD.git

   - Branch: main

   - Script Path: jenkinsfile

6. Enable:

   ✔ GitHub hook trigger for GITScm polling

Save

---

## **Complete CI/CD Execution Flow :**

### **1. Developer Pushes Code :**

```bash
git add .
git commit -m "Updated feature"
git push origin main
```

### **2. GitHub Webhook Sends Trigger :**

GitHub sends POST request to Jenkins.

### **3. Jenkins Pipeline Starts :**

- Pulls latest code

- Installs dependencies

- Connects to target server using SSH Agent

### **4. Deployment Happens on Target Server :**

- Pulls updated code

- Installs dependencies

- Restarts Node app using PM2
