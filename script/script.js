//Function to ease retrieval of DOM elements
const elem = (x) =>{
    return document.querySelector(x)
}

//Current Date
var today = new Date(),
    current_day = today.getDate(),
    current_month = today.getMonth() + 1,
    current_year = today.getFullYear();
    

//Calculate Age functionalities
var day_ans = elem(".day_ans"),//Place for Result for date
    month_ans = elem(".month_ans"),
    year_ans = elem(".year_ans");

const calculateAge = () =>{
    let user_inputs = {
        day: {element: elem("input#date"), min: 1, max: 31},
        month: {element: elem("input#month"), min: 1, max: 12},
        year: {element: elem("input#year"), min: 1800, max: current_year}
    };

    let result = [],
        value_set = [false, false, false], //confirm every field is set in order to calculate, default is false
        errors = document.querySelectorAll("small.error");

    //Use object keys to minimize use of many if conditions
    Object.keys(user_inputs).forEach((key, index) => {
        let input = user_inputs[key].element,
            min = user_inputs[key].min,
            max = user_inputs[key].max;

        if(input.value == ""){
            input.style.border = "1px solid var(--Light-red)";
            errors[index].innerText = "This field is required";
            value_set[index] = false;

        } else if(input.value < min || input.value > max){
            input.style.border = "1px solid var(--Light-red)";
            errors[index].innerText = `Must be ${min} - ${max}`;
            value_set[index] = false;
        } else {
            input.style.border = "1px solid var(--Light-grey)";
            errors[index].innerText = "";
            result[index] = [current_day, current_month, current_year][index] - input.value;
            value_set[index] = true;
        }
    });
    //All the fields are set
    if(value_set.every(val => val == true)){
        //Display the result to the respective elements
        let input_date = new Date(`${user_inputs.year.element.value}-${user_inputs.month.element.value}`),
            last_date = new Date(input_date.getFullYear(), input_date.getMonth() + 1, 0).getDate();
    
        if(user_inputs.day.element.value > last_date){
            errors[0].innerText = "Must be a valid date";
            user_inputs.day.element.style.border = "1px solid var(--Light-red)";
    
            day_ans.innerText = "--";
            month_ans.innerText = "--";
            year_ans.innerText = "--";
        }else{
            errors[0].innerText = "";
            user_inputs.day.element.style.border = "1px solid var(--Light-grey)";
    
            day_ans.innerText = result[0];
            month_ans.innerText = result[1];
            year_ans.innerText = result[2];
        }
    }else{
        day_ans.innerText = "--";
        month_ans.innerText = "--";
        year_ans.innerText = "--";
    }
    
}


