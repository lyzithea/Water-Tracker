// Funktion wird ausgeführt, wenn auf "Set Goal" geklickt wird
document.getElementById("set-goal").addEventListener("click", function() {

    // Holt den ausgewählten Wert aus dem Dropdown
    const setGoal = document.getElementById("water-amount").value;

    //Meldung, wenn ohne ein Wasserziel auszuwählen auf den Button geklickt wird
    if (setGoal === "") {
    alert("Please select a water goal.");
    return;
}

    // Zeigt das ausgewählte Wasserziel auf der Goal-Seite an in Liter
    document.getElementById("goalEntry").textContent =  "Your Goal: " + Number(setGoal) / 1000 + "L";

    // Speichert das ausgewählte Wasserziel im localStorage
    localStorage.setItem("waterGoal", setGoal);
});

