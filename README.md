# CredPal DevOps Assessment: Production-Ready Node.js Stack
This repository contains a fully automated, secure, and scalable infrastructure and CI/CD pipeline for a Node.js application integrated with Docker Hardened PostgreSQL database Image.

## Project Structure
├── .github/workflows/  # CI/CD Pipeline Definitions
├── app/production/     # Node.js Application Source
├── IaC/*               # Terraform IaC for Azure Resources
├── assets/             # Evidence, Screenshots & Diagrams


## Secretless Deployment With OIDC

<p align="center">
  <img src="https://raw.githubusercontent.com/ugwulo/credpal/main/assets/OIDC.png" alt="OIDC Architecture"/>
</p>


## How to Run Locally
### Prerequisites
* Docker & Docker Compose installed.
* Node.js v18+ (for manual testing).

<p align="center">
  <img src="https://raw.githubusercontent.com/ugwulo/credpal/main/assets/docker-desktop-host.png" alt="Docker Desktop"/>
</p>

Running with Docker (Recommended)
This replicates the production environment using the hardened PostgreSQL image.

1. Clone the repository.
> git clone https://github.com/ugwulo/credpal.git
2. Navigate to the root directory.

3. Run:
> docker-compose up --build

4. Access the app: 
Open http://localhost:3000/status to verify connectivity.

<p align="center">
  <img src="https://raw.githubusercontent.com/ugwulo/credpal/main/assets/localhostdocker-compose.png" alt="Localhost"/>
</p>


## How to Access the App
The application is deployed to Azure App Services using a secure OIDC-based pipeline.
* Production URL: https://credpal-prod-app-service.azurewebsites.net
* Health Endpoint: https://credpal-prod-app-service.azurewebsites.net/health
* Status Endpoint: https://credpal-prod-app-service.azurewebsites.net/status

<p align="center">
  <img src="https://raw.githubusercontent.com/ugwulo/credpal/main/assets/app-service-in-production.png" alt="Live Endpoint"/>
</p>

## How to Deploy
The deployment is fully automated via GitHub Actions and Terraform.

1. Infrastructure (Terraform)
The infrastructure is defined as code (IaC) and fully modularised to ensure reproducibility.
OIDC Authentication: No secrets are stored in GitHub; I use Azure Workload Identity (Federated Credentials).
Key Vault: All database credentials are automatically fetched from Azure Key Vault.


<p align="center">
  <img src="https://raw.githubusercontent.com/ugwulo/credpal/main/assets/oidc-azure.png" alt="OIDC Azure"/>
</p>

2. CI/CD Pipeline (GitHub Actions)
The pipeline is designed with "Gateways" to prevent faulty code from reaching production.

<p align="center">
  <img src="https://raw.githubusercontent.com/ugwulo/credpal/main/assets/pipeline-approval.png" alt="Deployment Gates"/>
</p>


Lint & Test: Runs jest unit tests.

<p align="center">
  <img src="https://raw.githubusercontent.com/ugwulo/credpal/main/assets/automated-tests.png" alt="Unit Tests"/>
</p>


Security Scan: Analyzes the Dockerfile and dependencies.
Build & Push: Pushes the image to Azure Container Registry (ACR).


Blue/Green Deployment: Deploys to a "Staging" slot first for verification.

<p align="center">
  <img src="https://raw.githubusercontent.com/ugwulo/credpal/main/assets/deployment-slots.png" alt="Blue-Green Strategy"/>
</p>

# Key Decisions & Architecture
## Security
* Hardened Images: Utilized specialized images to minimize the attack surface.

<p align="center">
  <img src="https://raw.githubusercontent.com/ugwulo/credpal/main/assets/docker-hardened-image.png" alt="DHI"/>
</p>

* Non-Root User: Both Node.js and Postgres containers run as non-privileged users.
* Secrets Management: Implemented Azure Key Vault references. No passwords exist in the code or raw environment variables.
* HTTPS Only: Enforced https_only = true in Terraform for all web traffic.

## CI/CD & Reliability
* Blue-Green Deployment: Utilized Azure Deployment Slots. New code is deployed to the staging slot and "warmed up" * before being swapped to production for Zero Downtime.
* Automated Rollback: If health checks fail in the staging slot, the swap is aborted.
* Pipeline Persistence: Used GitHub Actions caching for npm to optimize build times.

<p align="center">
  <img src="https://raw.githubusercontent.com/ugwulo/credpal/main/assets/deployment-env-rollback.png" alt="Rollback environment"/>
</p>


Terraform version Used: Terraform v1.14.0
Azure Provider version = "4.42.0"


## Test the endpoint /process
curl -X POST https://URL/process \
  -H "Content-Type: application/json" \
  -d '{"userId": "123", "amount": 5000, "currency": "NGN"}'