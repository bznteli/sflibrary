/**
 * @description  : 
 * @author       : NTeli LLC
 * Modifications Log 
 * Ver   Date         Author      Modification
 * 1.0   03-31-2021   NTeli LLC   Initial Version
**/
public with sharing class StateManagerController {
    public StateManagerController() {

    }

    public static List<State_Setting__mdt> getStateSettings(String stateId, String stepId) {
        List<State_Setting__mdt> stateSettings = [Select State_Id__c, State_Name__c from State_Setting__mdt Where State_Id__c = :stateId and Step_Id__c = :stepId];
        return stateSettings;
    }

    public static List<State_Setting__mdt> getChildStateSettings(String stepId) {
        List<State_Setting__mdt> stateSettings = 
            [Select State_Id__c, Step_Id__c from State_Setting__mdt where Parent_Step_Id__c = :stepId];

        return stateSettings;
    }
}