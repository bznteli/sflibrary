({
    clickAdd : function(component, event, helper) {
        debugger;
        var n1 = component.find("num1").get("v.value");
        var n2 = component.find("num2").get("v.value");
        var total = Number(n1) + Number(n2);

        // Display the total in a "toast" status message
        var resultsToast = $A.get("e.force:showToast");
        resultsToast.setParams({
            "title": "Quick Add: " + n1 + " + " + n2,
            "message": "The total is: " + total + "."
        });
        resultsToast.fire();
 
        // Close the action panel
        var dismissActionPanel = $A.get("e.force:closeQuickAction");
        dismissActionPanel.fire();
    }
})