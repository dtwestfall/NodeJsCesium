var Cesium = require('cesium/Cesium');
require('./css/main.css');
require('cesium/Widgets/widgets.css');
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiNDI5YTczOC1hY2RmLTRiNzItYWRlNy00ZmNiZDkyNGY1MmYiLCJpZCI6MzIzOTQsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1OTgxMjU4NjV9.43V-70Yl3n9libxbngdlAXaEwNz98F_qpOOYa_dREyE'

var viewer = new Cesium.Viewer('cesiumContainer');
var nCats = 999;

// below is the billboard example code to play with
function randomCoordinateJitter(degree, margin) {
    return degree + margin * (Math.random() - 0.5) / 0.5;
}

//creating the entities 
for (var i = 0; i <= nCats; i++) {
    var entity = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(
            randomCoordinateJitter(-77.009003, .5),
            randomCoordinateJitter(38.889931, .5)
        ),
        label: {
            text: 'CUTE #' + i
        },
        billboard: {
            height: 24,
            width: 36,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhFpaxDXCS5O9hx90F3ufJI2VnC_wW0lPnrr6BIb18P4V5JXxBCg'
        },
        ellipse: {
            semiMajorAxis: 100,
            semiMinorAxis: 80
        }
    });
}

function toggler() {
    viewer.entities.values.forEach(entity => {
        entity.show = false;
    });
}

function toggleOn() {
    viewer.entities.values.forEach(entity => {
        entity.show = true;
    });
}
window.onload = function() {
    document.getElementById('toggle').onclick = toggler;
    document.getElementById('toggleOn').onclick = toggleOn;
}

/*
    var wyoming = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-109, 44),
        polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray([-109.080842, 45.002073, -105.91517, 45.002073, -104.058488, 44.996596, -104.053011, 43.002989, -104.053011, 41.003906, -105.728954, 40.998429, -107.919731, 41.003906, -109.04798, 40.998429, -111.047063, 40.998429, -111.047063, 42.000709, -111.047063, 44.476286, -111.05254, 45.002073]),
            height: 0,
            material: Cesium.Color.RED.withAlpha(0.5),
            outline: true,
            outlineColor: Cesium.Color.BLACK
        },
        label: { text: 'Wyoming' }
    });

    var wyoming = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-109, 44),
        polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray([-109.080842, 45.002073, -105.91517, 45.002073, -104.058488, 44.996596, -104.053011, 43.002989, -104.053011, 41.003906, -105.728954, 40.998429, -107.919731, 41.003906, -109.04798, 40.998429, -111.047063, 40.998429, -111.047063, 42.000709, -111.047063, 44.476286, -111.05254, 45.002073]),
            height: 0,
            material: Cesium.Color.RED.withAlpha(0.5),
            outline: true,
            outlineColor: Cesium.Color.BLACK
        },
        label: { text: 'Wyoming', pixelOffset: new Cesium.Cartesian2(100, -100) }
    });

    var wyoming = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-109, 44),
        polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray([-109.080842, 45.002073, -105.91517, 45.002073, -104.058488, 44.996596, -104.053011, 43.002989, -104.053011, 41.003906, -105.728954, 40.998429, -107.919731, 41.003906, -109.04798, 40.998429, -111.047063, 40.998429, -111.047063, 42.000709, -111.047063, 44.476286, -111.05254, 45.002073]),
            height: 0,
            material: Cesium.Color.RED.withAlpha(0.5),
            outline: true,
            outlineColor: Cesium.Color.BLACK
        },
        label: { text: 'Wyoming', pixelOffset: new Cesium.Cartesian2(50, -50) }
    });


    viewer.zoomTo(wyoming);
    */