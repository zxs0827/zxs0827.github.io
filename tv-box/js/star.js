var starNight = {
    container: document.getElementById("star-night"),

    init: function() {
        starNight.setStars();
    },

    setStars: function() {
        for (var i = 0; i < 50; i++) {
            starNight.container.innerHTML += "<span class='star'></span>";
        };
    }
}

document.addEventListener("DOMContentLoaded", starNight.init);