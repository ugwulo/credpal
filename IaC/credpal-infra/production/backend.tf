terraform {
  backend "azurerm" {
    resource_group_name = "credpal"
    storage_account_name = "credpalterraformstorage"
    container_name = "credpal-production-tfstate-container"
    key = "production.tfstate"
    use_azuread_auth     = true
  }
}