public with sharing class AccountController {
    @AuraEnabled(Cacheable=true)
    public static Account[] getAllAccount(){
        return [SELECT Id, Name, Industry, Type, BillingStreet, BillingCity, BillingState, BillingPostalCode, Phone, Website FROM Account ORDER BY Name LIMIT 50];
    }

    @AuraEnabled(Cacheable=true)
    public static Account[] searchAccount(String searchTerm){
        searchTerm = searchTerm.trim();
        if (searchTerm == '') {
            return getAllAccount();
        }
        searchTerm = '%' + searchTerm + '%';
        return [SELECT Id, Name, Industry, Type, BillingStreet, BillingCity, BillingState, BillingPostalCode, Phone, Website FROM Account WHERE Name LIKE :searchTerm ORDER BY Name LIMIT 50];
    }
}
