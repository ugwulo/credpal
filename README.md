# CredPal DevOps Assessment: Production-Ready Node.js Stack
This repository contains a fully automated, secure, and scalable infrastructure and CI/CD pipeline for a Node.js application integrated with Docker Hardened PostgreSQL database Image.


## Project Structure
├── .github/workflows/  # CI/CD Pipeline Definitions
├── app/production/     # Node.js Application Source
        └── docker-compose.yml  # Local Orchestration
├── IaC/*               # Terraform IaC for Azure Resources
├── assets/             # Evidence, Screenshots & Diagrams

## How to Run Locally
### Prerequisites
* Docker & Docker Compose installed.
* Node.js v18+ (for manual testing).

Running with Docker (Recommended)
This replicates the production environment using the hardened PostgreSQL image.

1. Clone the repository.
> git clone https://github.com/ugwulo/credpal.git
2. Navigate to the root directory.

3. Run:
> docker-compose up --build

4. Access the app: 
Open http://localhost:3000/health to verify connectivity.



Terraform version Used: Terraform v1.14.0
Azure Provider version = "4.42.0"


## Test the endpoint /process
curl -X POST https://URL/process \
  -H "Content-Type: application/json" \
  -d '{"userId": "123", "amount": 5000, "currency": "NGN"}'