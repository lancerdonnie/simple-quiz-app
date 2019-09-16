$(
    () => {
        var $list = $("#list")
        $("#button1").click(() => {
            let obj = {
                $question: $("#question").val(),
                $option1: $("#option1").val(),
                $option2: $("#option2").val(),
                $option3: $("#option3").val(),
                $option4: $("#option4").val(),
                $answer: $("#answer").val()
            }
            $.post(
                "http://localhost:3000/questions",
                obj,
                (data, status) => {
                    $list.append($(
                        `<li>${data["id"]})  ${data["question"]}</li> 
                        <p>${data["option1"]}</p> 
                        <p>${data["option2"]}</p> 
                        <p>${data["option3"]}</p> 
                        <p>${data["option4"]}</p>
                        <button>answer</button>
                        <button class="remove${data["id"]}" data-id=${data["id"]}>delete</button>`))

                }
            )

        })//submit
        $.get(
            "http://localhost:3000/questions",
            (data, status) => {
                $.each(data, (i, e) => {
                    $list.append(
                        `<li>${data[i]["id"]})  ${data[i]["question"]}</li>
                        <p>${data[i]["option1"]}</p> 
                        <p>${data[i]["option2"]}</p> 
                        <p>${data[i]["option3"]}</p> 
                        <p>${data[i]["option4"]}</p>
                        <button >answer</button>
                        <button class="remove${data[i]["id"]}" data-id=${data[i]["id"]}>delete</button> 
                       `)
                       
                })
            }
        )//total list

       
        // $list.delegate(".remove","click",() => {
        // $(".remove").click(() => {
        //     $.ajax({
        //         // url: "http://localhost:3000/questions/"+$(this).attr("data-id"),
        //         url: "http://localhost:3000/questions/"+,
        //         type: "DELETE",
        //         success: (result) => {
        //             //add a successfully deleted line
        //         }
        //     })
        // })//remove element

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