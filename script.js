$(
    () => {
        var $list = $("#list")
        function app(appe) {
            $list.append(
                `<li>${appe["id"]})  ${appe["question"]}</li> 
                <p>${appe["option1"]}</p> 
                <p>${appe["option2"]}</p> 
                <p>${appe["option3"]}</p> 
                <p>${appe["option4"]}</p>
                <button>answer</button>
                <button class="remove" data-id=${appe.id}>delete</button>`)
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
            $.post(
                "http://localhost:3000/questions",
                obj,
                (data, status) => {
                    app(data)
                }
            )

        })//submit
        $.get(
            "http://localhost:3000/questions",
            (data, status) => {
                $.each(data, (i, e) => {
                    app(e)
                })
            }
        )//total list
        $list.delegate(".remove", "click", () => {
                console.log($(this).attr("data-id"))
                $.ajax({
                    url: "http://localhost:3000/questions/"+$(this).attr("data-id"),
                    // url: "http://localhost:3000/questions/" +,
                    type: "DELETE",
                    success: (result) => {
                        //add a successfully deleted line
                    }
                })
        })//remove element

        $(".ans").click(() => {
            $.ajax({
                url: `http://localhost:3000/questions/1`,
                type: "GET",
                success: (result) => {
                    console.log("hhdhdh")
                }
            })
        })


    }
)