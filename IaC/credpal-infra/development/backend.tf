terraform {
  backend "azurerm" {
    resource_group_name = "credpal"
    storage_account_name = "credpalterraformstorage"
    container_name = "credpal-development-tfstate-container"
    key = "development.tfstate"
    use_azuread_auth     = true
  }
}