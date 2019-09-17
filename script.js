$(
    () => {
        var $list = $("#list")
        var total=0;
        var app = function (appe) {

            $list.append(
                `<li class="def${appe["id"]}">${appe["id"]})  ${appe["question"]}
                <input id="radio1" name="radio${appe["id"]}" type="radio" value="on">${appe["option1"]}</input> 
                <input id="radio2" name="radio${appe["id"]}" type="radio" value="on">${appe["option2"]}</input> 
                <input id="radio3" name="radio${appe["id"]}" type="radio" value="on">${appe["option3"]}</input> 
                <input id="radio4" name="radio${appe["id"]}" type="radio" value="on">${appe["option4"]}</input>
                <button class="ans" daid="${appe["id"]}">answer</button>
                <button class="remove" data-id="${appe["id"]}">X</button></li>`)
        }
        
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

                    app(data)
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
                    app(data)
                }
            })
        })//submit

        $.ajax({
            url: "http://localhost:3000/questions",
            type: "GET",
            success: (data) => {
                tut = data

                $.each(data, (i, e) => {
                    app(e)
                })
                total=data.length
            }
        })

        $list.on('click', '.remove', (e) => {
            $.ajax({
                url: `http://localhost:3000/questions/${$(e.target).attr('data-id')}`,
                type: "DELETE",
                success: (c) => {
                    $(this).parent("li").remove()
                    // console.log(e.target)
                    // console.log(c)
                }
            })
        })//remove element
        $list.on('click', '.ans', (e) => {
            $.ajax({
                url: `http://localhost:3000/questions/${$(e.target).attr('daid')}`,
                type: "GET",
                success: (data) => {
                    $("li").append(data.answer)
                }
            })
        })//remove element

        // $(".ans").click(()=>{
        //     console.log("fff")
        //     $("#list").append(`khdanwdlnwdai`)
        // })


        $("#getscore").click(() => {
            $("#score").append(`<p> your total score is 0</p>`)
        })
        // $list.on("click",".remove",() => {
        //     $(this).closest("li").remove();
        // })
    }
)