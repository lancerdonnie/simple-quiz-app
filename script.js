$(
    () => {
        var tut = {}
        var $list = $("#list")
        function app(appe) {
            $list.append(
                `<li>${appe["id"]})  ${appe["question"]}</li> 
                <input type="radio">${appe["option1"]}</input> 
                <input type="radio">${appe["option2"]}</input> 
                <input type="radio">${appe["option3"]}</input> 
                <input type="radio">${appe["option4"]}</input>
                <button>answer</button>
                <button class="remove" id='vee${appe["id"]}'>delete</button>`)
        }
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
                async: false,
                success: (data) => {
                    tut = data
                    app(data)
                }
            })

        })//submit

        $.ajax({
            url: "http://localhost:3000/questions",
            type: "GET",
            async: false,
            success: (data) => {
                tut = data
                $.each(data, (i, e) => {
                    app(e)
                })
            }
        })
        // console.log(tut)

        $list.on("click",".remove",() => {
            $(this).closest("li").remove();
        })
        // $list.delegate(".remove","click", () => {
        //     var ttt=$(this)
        //         console.log("DDD",$(this).attr("name"))

        //         $.ajax({
        //             url: "http://localhost:3000/questions/",
        //             // url: "http://localhost:3000/questions/" +,
        //             type: "DELETE",
        //             success: (result) => {
        //                 //add a successfully deleted line
        //             }
        //         })
        // })//remove element
        

        // $(".ans").click(() => {
        //     $.ajax({
        //         url: `http://localhost:3000/questions/1`,
        //         type: "GET",
        //         success: (result) => {
        //             console.log("hhdhdh")
        //         }
        //     })
        // })


    }
)