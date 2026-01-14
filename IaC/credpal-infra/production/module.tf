module "resource_group" {
  source = "../../modules/resource-groups"
   config = local.resource-group-env.rg
}