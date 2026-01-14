module "resource_group" {
  source = "../../modules/resource-groups"
   config = local.resource-group-env.rg
}


module "key-vault" {
  source = "../../modules/key-vault"
  config = local.keyvault-env.vault
}