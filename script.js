$(
    () => {
        var $list = $("#list")
        var total = 0;
        var app = function (appe, element) {

            element.append(
                `<li class="def${appe["id"]}">${appe["id"]})  ${appe["question"]}
                <input id="radio1" name="radio" type="radio" value="1">${appe["option1"]}</input> 
                <input id="radio2" name="radio" type="radio" value="2">${appe["option2"]}</input> 
                <input id="radio3" name="radio" type="radio" value="3">${appe["option3"]}</input> 
                <input id="radio4" name="radio" type="radio" value="4">${appe["option4"]}</input>
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

        $("#button2").click(() => {
            let obj = {
                id: $("#idd").val(),
                question: $("#question").val(),
                option1: $("#option1").val(),
                option2: $("#option2").val(),
                option3: $("#option3").val(),
                option4: $("#option4").val(),
                answer: $("#answer").val()
            }
            $.ajax({
                url: `http://localhost:3000/questions/${obj.id}`,
                type: "PUT",
                data: obj,
                async: true,
                success: (data) => {

                    app(data, $list)
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
                async: true,
                success: (data) => {
                    app(data, $list)
                }
            })
        })//submit

        $.ajax({
            url: "http://localhost:3000/questions",
            type: "GET",
            success: (data) => {
                tut = data

                $.each(data, (i, e) => {
                    app(e, $list)
                })
                total = data.length
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

        $list.on('click', '.ans', (e) => {
            $.ajax({
                url: `http://localhost:3000/questions/${$(e.target).attr('daid')}`,
                type: "GET",
                success: (data) => {
                    $("li").append(data.answer)
                    // $(e.target).parent(":first-child").attr('disabled', true);

                    // $("input[name='radio']").on("change", function () {
                    //     alert(this.value);
                    // });
                    // if ($("radio").prop("checked")) {
                    // }
                    // //if the clicked answer attr = answer provided
                    // //It helpful to add .change() to the end to trigger any other events on the page
                }

            })


        })//show answerS

        $("input[type='radio']").on("change", function () {
            var selvalue = $("[type='radio']:checked").val()
            console.log("ggg")
        });

        $(".ans").click(()=>{
            console.log("fff")
            $("#list").append(`khdanwdlnwdai`)
        })


        $("#getscore").click(() => {
            $("#score").append(`<p> your total score is 0</p>`)
        })
        
    }
)