# credpal
CredPal DevOps Infrastructure and Application Deployment

Terraform version Used: Terraform v1.14.0
Azure Provider version = "4.42.0"


## Test the endpoint /process
curl -X POST https://URL/process \
  -H "Content-Type: application/json" \
  -d '{"userId": "123", "amount": 5000, "currency": "NGN"}'