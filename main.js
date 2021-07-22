prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 370,
    height: 280,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById('camera');
Webcam.attach('#camera');

function takeSnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("resultImg").innerHTML = '<img id="captured_img" src="'+data_uri+'" />';
    });
}

console.log('ml5 version: ', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/medxCZWq1/model.json', modelLoaded);

function modelLoaded() {
    window.alert('Your teachable machine model has been loaded');
}

function speak() {
    var synth = window.speechSynthesis;
    var speak_data1 = "The first prediction is" + prediction_1;
    var speak_data2 = "The second prediction is" + prediction_2;
    var utter = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    utter.rate = 1;
    synth.speak(utter);
}

function preEmotion() {
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        emoji1 = document.getElementById("update_emoji");
        emoji2 = document.getElementById("update_emoji2");
        speak();

        if(results[0].label == "Happy") {
            emoji1.innerHTML = "&#128522;";
        }
        else if(results[0].label == "Sad") {
            emoji1.innerHTML = "&#128532;";
        }
        else if(results[0].label == "Angry") {
            emoji1.innerHTML = "&#128548;";
        }
        else if(results[0].label == "Crying") {
            emoji1.innerHTML = "&#128557;";
        }
        else if(results[0].label == "Fear") {
            emoji1.innerHTML = "&#128561;";
        }
        else if(results[0].label == "Excited") {
            emoji1.innerHTML = "&#128516;";
        }
        else if(results[0].label == "Surprised") {
            emoji1.innerHTML = "&#128550;";
        }

        if(results[1].label == "Happy") {
            emoji2.innerHTML = "&#128522;";
        }
        else if(results[1].label == "Sad") {
            emoji2.innerHTML = "&#128532;";
        }
        else if(results[1].label == "Angry") {
            emoji2.innerHTML = "&#128548;";
        }
        else if(results[1].label == "Crying") {
            emoji2.innerHTML = "&#128557;";
        }
        else if(results[1].label == "Fear") {
            emoji2.innerHTML = "&#128561;";
        }
        else if(results[1].label == "Excited") {
            emoji2.innerHTML = "&#128516;";
        }
        else if(results[1].label == "Surprised") {
            emoji2.innerHTML = "&#128550;";
        }
    }
}