public with sharing class LWCFUN_MemoryGameController {
    @AuraEnabled
    public static void incrementVictories(Id contactId){
        try {
            Decimal numVictories=[SELECT NumberOfVictories__c FROM Contact WHERE Id=:contactId].NumberOfVictories__c;
            update new Contact(
                Id=contactId,NumberOfVictories__c=numVictories!=null?numVictories+1:1
            );
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
