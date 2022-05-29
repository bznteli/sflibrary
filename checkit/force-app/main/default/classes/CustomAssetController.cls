/**
 * @description  : 
 * @author       : NTeli LLC
 * Modifications Log 
 * Ver   Date         Author      Modification
 * 1.0   03-17-2021   NTeli LLC   Initial Version
**/
public with sharing class CustomAssetController {
    @AuraEnabled(cacheable=true)
    public static List<Custom_Asset__c> getCustomAssetList(String productName) {
        String key = '%' + productName + '%';
        List<Custom_Asset__c> l = [
            Select Id, Name, Asset_Tag__c, Status__c, Vehicle_Identification_Number__c
            From Custom_Asset__c
            where Name like :key or Asset_Tag__c like :key or Vehicle_Identification_Number__c like :key
            LIMIT 100
        ];
        System.debug('l.size: ' + l.size());
        return l;
    }

    @AuraEnabled
    public static void addCustomAssetToQuote(String quoteRecordId, List<String> customAssetIds) {
        List<Quote_Line_Item__c> quoteLineItems = new List<Quote_Line_Item__c>();
        if (customAssetIds.size() > 0) {
            for (String customAssetId : customAssetIds) {
                Quote_Line_Item__c lineItem = new Quote_Line_Item__c();
                lineItem.Quote__c = quoteRecordId;
                lineItem.Asset__c = customAssetId;
                quoteLineItems.add(lineItem);
            }
        }
        System.debug('quoteLineItems: ' + quoteLineItems);

        if (quoteLineItems.size() > 0) {
            Database.insert(quoteLineItems);
        }
    }
}