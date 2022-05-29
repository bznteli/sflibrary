/**
 * @description  : 
 * @author       : NTeli LLC
 * Modifications Log 
 * Ver   Date         Author      Modification
 * 1.0   05-28-2021   NTeli LLC   Initial Version
**/
public with sharing class LeadController {
    @AuraEnabled(cacheable=true)
    public static Lead getLead(String leadId){
        try {
            Lead l;
            if (leadId != null) {
                l = [select FirstName, LastName from Lead where Id = :leadId LIMIT 1];
            }
            
            return l;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void updateLead(Patient_Survey__c patientSurvey){
        try {
            insert patientSurvey;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static Integer getSurveyCount(String leadId){
        System.debug('isSurveyComplete: leadId: ' + leadId);
        try {
            Integer surveyCount = [Select count() from Patient_Survey__c where Lead__c = :leadId];
            return surveyCount;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public LeadController() {

    }
}
