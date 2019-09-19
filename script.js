$(
    () => {
        let $list = $("#list")
        let total = 0;
        let app = function (appe, element) {
            element.append(
                `<div id="xx" style="font-family: 'Oxygen', sans-serif;">
                <button title="Delete question" vvv="x" class="close remove btn btn-danger" aria-label="Close" data-id="${appe["id"]}">&times;</button>
                <p class="text-justify def${appe["id"]}">${appe["id"]}. ${appe["question"]}</p>
                <li><input class="form-radio" id="radio1" name="radio${appe["id"]}" anss="${appe["answer"]}" type="radio" value="1"></input>
                <label for="radio1">${appe["option1"]}</label></li>
                <li><input class="form-radio" id="radio2" name="radio${appe["id"]}" anss="${appe["answer"]}" type="radio" value="2"></input>
                <label for="radio2">${appe["option2"]}</label></li>
                <li><input class="form-radio" id="radio3" name="radio${appe["id"]}" anss="${appe["answer"]}" type="radio" value="3"></input>
                <label for="radio3">${appe["option3"]}</label></li>
                <li><input class="form-radio" id="radio4" name="radio${appe["id"]}" anss="${appe["answer"]}" type="radio" value="4"></input>
                <label  for="radio4">${appe["option4"]}</label></li>
                <button style="margin-top: 7px;" class="ans btn btn-dark" daid="${appe["id"]}">answer</button>
                </div></br>`)
        }

        $("body").on("click","#button4",() => {
            $("#div1").fadeOut()(function() {
                $(this).empty();
             })
        })//clear

        $("#button3").click((e) => {
            $("#div1").empty()
            let q = $("#search").val()
            $.ajax({
                url: `http://localhost:3000/questions/${q}`,
                type: "GET",
                async: true,
                success: (appe) => {
                    $("#search").val("")
                    $("#div1").append(
                        `<div id="sear"><p  class="def${appe["id"]}">${appe["id"]})  ${appe["question"]}</p>
                        <ul >
                        <li>${appe["option1"]}</li> 
                        <li>${appe["option2"]} </li>
                        <li>${appe["option3"]} </li>
                        <li>${appe["option4"]}</li>
                        </ul></div><button id="button4" class="btn btn-primary">clear</button>`).hide().fadeIn()
                },
                error: (e) => {
                    alert("Please enter a valid number")
                    $("#search").val("")
                }
            })
        })//search
        $("#edit").click(() => {
            // $("#upda").toggleClass("hidden")
            $("#upda").slideToggle("hidden","linear")

        })//edit toggle
        $("#load").click(() => {
            let id = $("#id2").val()
            $.ajax({
                url: `http://localhost:3000/questions/${id}`,
                type: "GET",
                success: (data) => {
                    $("#id2").val(data.id)
                    $("#question2").val(data.question)
                    $("#option12").val(data.option1)
                    $("#option22").val(data.option2)
                    $("#option32").val(data.option3)
                    $("#option42").val(data.option4)
                    $("#answer2").val(data.answer)
                },
                error:()=>{
                    alert("Please enter a valid number")
                    $("#id2").val("")
                }
            })
        })//load

        $("#button2").click(() => {
            let obj = {
                id: $("#id2").val(),
                question: $("#question2").val(),
                option1: $("#option12").val(),
                option2: $("#option22").val(),
                option3: $("#option32").val(),
                option4: $("#option42").val(),
                answer: $("#answer2").val()
            }
            $.ajax({
                url: `http://localhost:3000/questions/${obj.id}`,
                type: "PATCH",
                data: obj,
                success: () => {
                    var inp = $("#rdiv input")
                    $.each(inp, ((x, y) => {
                        $(y).val("")
                    }))
                    $("#score p").empty()
                    $("#list").empty()
                    reloadQue()
                }
            })
        })//update

        $("#button1").click(() => {
            let obj = {
                question: $("#question").val(),
                option1: $("#option1").val(),
                option2: $("#option2").val(),
                option3: $("#option3").val(),
                option4: $("#option4").val(),
                answer: $("#answer").val()
            }
            $.ajax({
                url: "http://localhost:3000/questions",
                type: "POST",
                data: obj,
                success: (data) => {
                    app(data, $list)
                }
            })
            var inp = $("#rdiv input")
            $.each(inp, ((x, y) => {
                $(y).val("")
            }))
        })//submit

        $.ajax({
            url: "http://localhost:3000/questions",
            type: "GET",
            success: (data) => {
                $.each(data, (i, e) => {
                    app(e, $list)
                })
            }
        })//get

        $list.on('click', '.remove', (e) => {
            $.ajax({
                url: `http://localhost:3000/questions/${$(e.target).attr('data-id')}`,
                type: "DELETE",
                success: (c) => {
                    $(e.target).parent().remove()
                }
            })
        })//delete element

        $("body").on('click', '.ans', (e) => {
            $.ajax({
                url: `http://localhost:3000/questions/${$(e.target).attr('daid')}`,
                type: "GET",
                success: (data) => {
                    if ($(e.target).prev().children("input").attr("anss") == $(e.target).parent().children("li").children("input[type='radio']:checked").attr("value")) {
                        $(e.target).parent().append(`<span style="color:white;background-color:green"> The answer is correct </span>`)
                    } else {
                        $(e.target).parent().append(`<span style="color:white;background-color:red;">The answer is wrong. The correct is (option ${data.answer})</span>`)
                    }
                    $(e.target).parent().children().attr('disabled', true);

                    $(e.target).parent().children().children().attr('disabled', true);
                }
            })
        })//show answerS

        $("#getscore").click(() => {

            var $q = $("body #xx input[type='radio']:checked")
            var count=$("body #xx").length
            $.each($q, (x, y) => {
                if ($(y).attr("value") == $(y).attr("anss")) {
                    total++
                }
            })
            $("#score").append(`<div><p style="background-color:#808285;display: inline;color:white"> Your total score is ${total} out of ${count}</p></div>`)
        })

        $("#reset").click(() => {
            reloadQue()
        })//reset
        function reloadQue() {
            $("#list").empty()
            $("#score p").empty()
            $.ajax({
                url: "http://localhost:3000/questions",
                type: "GET",
                success: (data) => {
                    $.each(data, (i, e) => {
                        app(e, $list)
                    })
                }
            })
        }

    }
)