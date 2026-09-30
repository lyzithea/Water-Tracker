// Holt das gespeicherte Wasserziel aus dem localStorage
const waterGoal = localStorage.getItem("waterGoal");



// Zeigt das Wasserziel auf der Tracking-Seite in Litern an
document.getElementById("goal-display").textContent =
    "Your Goal: " + Number(waterGoal) / 1000 + "L";




// Holt das Eingabefeld, den Save-Button, Quit-Button und Reset-Button
const capacityInput = document.getElementById("capacity-input");
const capacityField = document.getElementById("capacity");
const saveCapacity = document.getElementById("save-capacity");
const quitButton = document.getElementById("quitButton");
const resetButton = document.getElementById("resetButton");






// Hier wird später gespeichert, welcher Behälter angeklickt wurde
let selectedContainer;





// Funktion für Cup, Glass und Bottle
function setupContainer(buttonId, capacityId, storageKey, trackingCapacityId) {

    // Holt den jeweiligen Button
    const button = document.getElementById(buttonId);

    // Holt das Element, in dem die ml-Menge angezeigt wird
    const capacityDisplay = document.getElementById(capacityId);

      // Holt das Element, in dem die ml-Menge beim Tracking angezeigt wird
    const trackingCapacityDisplay = document.getElementById(trackingCapacityId);

    // Holt eine bereits gespeicherte Menge aus dem localStorage
    const savedCapacity = localStorage.getItem(storageKey);



    // Falls eine Menge gespeichert ist, wird sie angezeigt
    if (savedCapacity) {
        capacityDisplay.textContent = savedCapacity + " ml";

         // Zeigt die gespeicherte Menge auch beim Tracking-Button an
        trackingCapacityDisplay.textContent =
            savedCapacity + " ml";
    }

      // Wenn der jeweilige Behälter angeklickt wird
    button.addEventListener("click", function() {

        // Merkt sich, welcher Behälter ausgewählt wurde
        selectedContainer = {
            display: capacityDisplay,
            storage: storageKey,
            trackingDisplay: trackingCapacityDisplay
        };

        // Zeigt das Eingabefeld an
        capacityInput.hidden = false;
    });
}






// Führt die Funktion für die Tasse aus
setupContainer("cupButton", "cup-capacity", "cupCapacity", "track-cup-capacity");

// Führt die Funktion für das Glas aus
setupContainer("glassButton", "glass-capacity", "glassCapacity", "track-glass-capacity");

// Führt die Funktion für die Flasche aus
setupContainer("bottleButton", "bottle-capacity", "bottleCapacity", "track-bottle-capacity");







// Wenn auf Save geklickt wird
saveCapacity.addEventListener("click", function() {

    // Holt die eingegebene Menge aus dem Input
    const capacity = capacityField.value;

    // Aktualisiert die Menge beim oberen Button
    selectedContainer.display.textContent =
        capacity + " ml";

      // Aktualisiert die Menge beim unteren Tracking-Button
    selectedContainer.trackingDisplay.textContent =
        capacity + " ml";

    // Speichert die Menge für den ausgewählten Behälter
    localStorage.setItem(
        selectedContainer.storage,
        capacity
    );

    // Das Eingabefeld verschwindet wieder
    capacityInput.hidden = true;

    // Leert das Eingabefeld
    capacityField.value = "";
});






//Wenn auf Quit geklickt wird
quitButton.addEventListener("click", function() {
    capacityField.value = "";
    capacityInput.hidden = true;
     
});







// Holt die gespeicherten Größen aus dem localStorage
const trackCupCapacity =
    localStorage.getItem("cupCapacity");

const trackGlassCapacity =
    localStorage.getItem("glassCapacity");

const trackBottleCapacity =
    localStorage.getItem("bottleCapacity");







// Speichert die bisher getrunkene Wassermenge. Am Anfang wurden 0 ml getrunken.
let waterDrunk = 0;





// Holt die drei Tracking-Buttons aus dem HTML
const trackCupButton = document.getElementById("trackCupButton");
const trackGlassButton = document.getElementById("trackGlassButton");
const trackBottleButton = document.getElementById("trackBottleButton");





// Holt das Element aus dem HTML, das das Wasser im großen Glas darstellt
const waterFill = document.getElementById("water-fill");





// Funktion für das Tracken der getrunkenen Wassermenge
function trackWater(capacity) {

    // Wandelt die Behältergröße in eine Zahl um und addiert sie zur bisher getrunkenen Wassermenge
    waterDrunk = waterDrunk + Number(capacity);

    // Berechnet, wie viel Prozent des Tagesziels erreicht sind
    const percentage =
        (waterDrunk / Number(waterGoal)) * 100;

    // Überträgt die berechnete Prozentzahl auf die Höhe des Wassers im Glas
    waterFill.style.height = percentage + "%";

    // Prüft, ob das Wasserziel erreicht wurde, wenn ja erscheint ein alert
    if (percentage >= 100) {


        // Wartet 500 Millisekunden, damit sich das Glas zuerst vollständig füllen kann, bevor der Alert erscheint
       setTimeout(function() {
            alert("Congratulations! You reached your water goal!");
        }, 500);
    
}
}






// Wenn die Tasse angeklickt wird
trackCupButton.addEventListener("click", function() {

     // Holt die AKTUELL gespeicherte Flaschengröße
    const cupCapacity = localStorage.getItem("cupCapacity");

    // Trackt diese Wassermenge
    trackWater(trackCupCapacity);
});








// Wenn das Glas angeklickt wird
trackGlassButton.addEventListener("click", function() {

     // Holt die AKTUELL gespeicherte Glasgröße
    const glassCapacity = localStorage.getItem("glassCapacity");

     // Trackt diese Wassermenge
    trackWater(trackGlassCapacity);
});







// Wenn die Flasche angeklickt wird
trackBottleButton.addEventListener("click", function() {

    // Holt die AKTUELL gespeicherte Flaschengröße
    const bottleCapacity = localStorage.getItem("bottleCapacity");

      // Trackt diese Wassermenge
    trackWater(trackBottleCapacity);
});








//Funktion für den Reset Button
resetButton.addEventListener("click", function() {

     // Setzt die getrunkene Wassermenge wieder auf 0
     waterDrunk = 0;

    // Leert das Wasserglas wieder
    waterFill.style.height = "0%";
     
});











