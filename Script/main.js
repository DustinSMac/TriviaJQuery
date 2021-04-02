$(document).ready(function () {
    function randomIT(array) {

        for (i = 0; i < array.length; i++) {
            const j = Math.floor(Math.random() * i);
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };

    $("button.generate").click(function () {
        var choice = document.getElementById("numbers").value;
        var difficulty1 = document.getElementById("trivia_difficulty").value;
        var category1 = document.getElementById("trivia_category").value;
        var url =
            `https://opentdb.com/api.php?amount=${choice}&category=${category1}&difficulty=${difficulty1}&type=multiple`;
        $.get(url, function (data) {
            console.log(data);
            var htmlString = "";
            answers = [];
            
            for (var i in data.results) {
                htmlString += `<div class="card card${i}" id="${i}">
                                    <h3 class="card-title">${data.results[i].question}</h3>
                                    <form class="card-body">`;
                data.results[i].incorrect_answers.push(data.results[i].correct_answer);
                answers.push(data.results[i].correct_answer);
                randomIT(data.results[i].incorrect_answers);
                for(var j in data.results[i].incorrect_answers){
                    htmlString+=`<label id="l${i}${j}"><input type="radio" name="question" id=${i}${j} value="${data.results[i].incorrect_answers[j]}">${data.results[i].incorrect_answers[j]}</label><br>`;
                }
                htmlString += `</form></div>`;
            }
            $("div.trivia").html(htmlString);
        });
    });
    $("button.submit").click(function(){
        CorrectAnswer=0;
        
        for(var i in answers){
            for(var j = 0; j < 4; j++) {
                x = `${i}${j}`;
                y = `l${i}${j}`;
                
                if(document.getElementById(x).value == answers[i]){
                    document.getElementById(y).style.Color="blue";
                    if(document.getElementById(x).checked== true){
                        CorrectAnswer+=1;
                    }
                }
                else{
                    document.getElementById(y).style.Color = "red";
                }
            };
        };
        alert(`You have scored ${CorrectAnswer}/${answers.length} point!!!`)
    });
});
