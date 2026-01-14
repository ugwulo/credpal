locals {
  resource-group-env = yamldecode(file("rg-env.yaml"))
  keyvault-env = yamldecode(file("keyvault-env.yaml"))
}