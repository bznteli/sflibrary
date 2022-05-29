({
    closeQA : function(component, event, helper) {
		$A.get("e.force:closeQuickAction").fire();
	},
    
    refresh : function(component, event, helper) {
        $A.get("e.force:refreshView").fire();
    }
})