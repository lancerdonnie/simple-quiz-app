$(
    () => {
        var $list = $("#list")
        var total = 0;
        var app = function (appe, element) {
            element.append(
                `<li class="def${appe["id"]}">${appe["id"]}.  ${appe["question"]}
                <input id="radio1" name="radio${appe["id"]}" anss="${appe["answer"]}" type="radio" value="1">${appe["option1"]}</input>
                <input id="radio2" name="radio${appe["id"]}" anss="${appe["answer"]}" type="radio" value="2">${appe["option2"]}</input>
                <input id="radio3" name="radio${appe["id"]}" anss="${appe["answer"]}" type="radio" value="3">${appe["option3"]}</input> 
                <input id="radio4" name="radio${appe["id"]}" anss="${appe["answer"]}" type="radio" value="4">${appe["option4"]}</input>
                <button class="ans" daid="${appe["id"]}">answer</button>
                <button class="remove" data-id="${appe["id"]}">X</button></li>`)
        }
        // <form id="myform">
        //         </form>

        $("#button5").click(() => {
            // var eee=$("input[type='radio']:checked")
            // eee.change(()=>{
            //     eee.each($("input[type='radio']:checked"), (i, e) => {
            //         console.log($(this));
            //     })
            // })
            // console.log(eee.val())
            // var f = []
            //     $("#myform").each($("input[type='radio']:checked"), (i,e) => {
            //        f.push()
            //     })
            //     console.log(f)

        })

        $("#button4").click(() => {
            $("#div1").empty()
        })//clear

        $("#button3").click((e) => {
            let q = $("#search").val()
            $.ajax({
                url: `http://localhost:3000/questions/${q}`,
                type: "GET",
                async: true,
                success: (appe) => {
                    // app(data)
                    $("#search").val("")
                    $("#div1").append(
                        `<li class="def${appe["id"]}">${appe["id"]})  ${appe["question"]}
                        <input id="radio1" name="radio${appe["id"]}" type="radio" value="on">${appe["option1"]}</input> 
                        <input id="radio2" name="radio${appe["id"]}" type="radio" value="on">${appe["option2"]}</input> 
                        <input id="radio3" name="radio${appe["id"]}" type="radio" value="on">${appe["option3"]}</input> 
                        <input id="radio4" name="radio${appe["id"]}" type="radio" value="on">${appe["option4"]}</input>
                        </li>`)
                },
                error: (e) => {
                    alert("Please enter a valid number")
                }
            })
        })//search
        $("#edit").click(() => {
            $("#upda").toggleClass("hidden")
        })
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
                    $("#answer2").val(data.option4)
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
                async: true,
                success: (data) => {
                    $("#list").empty()
                    $("#score p").empty()
                    // app(data, $list)
                }
            })
            var inp = $("#rdiv input")
            $.each(inp, ((x, y) => {
                $(y).val("")
            }))
            reloadQue()
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
                async: true,
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
        })//remove element

        $("body").on('click', '.ans', (e) => {
            $.ajax({
                url: `http://localhost:3000/questions/${$(e.target).attr('daid')}`,
                type: "GET",
                success: (data) => {
                    if ($(e.target).prev().attr("anss") == $(e.target).parent().children("input[type='radio']:checked").attr("value")) {
                        $(e.target).parent().append(`The answer is correct `)
                    } else {
                        $(e.target).parent().append(`The answer is wrong. The correct is (option ${data.answer})`)
                    }
                    $(e.target).parent().children().attr('disabled', true);

                    // //if the clicked answer attr = answer provided
                    // //It helpful to add .change() to the end to trigger any other events on the page
                }

            })


        })//show answerS

        $("body").on("change", "input[type='radio']", function (e) {
            if ($(e.target).val() == $(e.target).attr("anss")) {
                console.log("correct")
                // total++
            }
            else {
                console.log("wrong")
            }
            // $(e.target).attr("disabled",true)
        });

        // $(".ans").click(()=>{
        //     console.log("fff")
        //     $("#list").append(`khdanwdlnwdai`)
        // })


        $("#getscore").click(() => {
            var p = []
            var $q = $("body li input[type='radio']:checked")
            $.each($q, (x, y) => {
                if ($(y).attr("value") == $(y).attr("anss")) {
                    total++
                }
            })
            $("#score").append(`<p> your total score is ${total}</p>`)
        })
        $("#reset").click(() => {
            reloadQue()
        })//reset
        function reloadQue(){
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