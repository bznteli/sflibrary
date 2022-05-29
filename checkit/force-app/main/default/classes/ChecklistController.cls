/**
 * @description  : 
 * @author       : NTeli LLC
 * Modifications Log 
 * Ver   Date         Author      Modification
 * 1.0   04-03-2021   NTeli LLC   Initial Version
**/
public with sharing class ChecklistController {
    @AuraEnabled(cacheable=true)
    public static List<Checklist_Item__c> getChecklistItems(){
        System.debug('in getChecklistItems');
        List<Checklist_Item__c> items = 
            [Select Id, Name, Checklist_Type__c, Checklist_Item_Text__c, Section__c from Checklist_Item__c];

        System.debug('checklistItems.size(): ' + items.size());
        return items;
    }

    @AuraEnabled
    public static void createChecklistItemsFor(String parentRecordId, List<String> checklistItemIds){
        Map<Id, Checklist_Response__c> mapChecklistResponses = getChecklistResponses(parentRecordId);
        Map<Id, Checklist_Item__c> mapChecklistItems = new Map<Id, Checklist_Item__c>();
        List<Checklist_Response__c> addChecklistResponses = new List<Checklist_Response__c>();
        List<Id> deleteChecklistResponses = new List<Id>();

        try {
            //Loop over selected items
            for (String checklistItemId : checklistItemIds) {
                //if checklist item is already in the checklist response nothing to do
                if (mapChecklistResponses.get(checklistItemId) != null) {
                    //nothing to do
                }
                else if (mapChecklistResponses.get(checklistItemId) == null) {
                    addChecklistResponses.add(new Checklist_Response__c(Checklist_Item__c = checklistItemId, Parent_Id__c = parentRecordId, Response__c = true));
                }
            }

            //Loop over checklistResponses to see what needs to be deleted
            for(Id checklistResponseId : mapChecklistResponses.keySet()) {
                if (!checklistItemIds.contains(checklistResponseId)) {
                    deleteChecklistResponses.add(mapChecklistResponses.get(checklistResponseId).Id);
                }
            }

            if (addChecklistResponses.size() > 0) {
                Database.insert(addChecklistResponses);
            }

            if (deleteChecklistResponses.size() > 0) {
                Database.delete(deleteChecklistResponses);
            }

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static Map<Id, Checklist_Response__c> getChecklistResponses(String parentRecordId){
        try {
            System.debug('parentRecordId: ' + parentRecordId);
            Map<Id, Checklist_Response__c> mapChecklistResponse = new Map<id, Checklist_Response__c>(); 
            List<Checklist_Response__c> checklistResponses = Database.query('select Id, Checklist_Item__c, Parent_Id__c from Checklist_Response__c where Parent_Id__c = :parentRecordId');
            for (Checklist_Response__c cr : checklistResponses) {
                mapChecklistResponse.put(cr.Checklist_Item__c, cr);
            }

            System.debug('mapChecklistResponse: ' + mapChecklistResponse);
            return mapChecklistResponse;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    /*
    @AuraEnabled
    public static List<Checklist_Type__c> getAllChecklistTypes(){
        try {
            return [select Id, Name from Checklist_Type__c];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }    
    */
    
}