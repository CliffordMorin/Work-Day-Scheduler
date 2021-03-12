$(document).ready(function() {
    // listen for save button click
    $('.saveBtn').on('click', function(){

        //get textarea values from description class
        var value = $(this).siblings('.description').val()
        //get id value from time block which we will convert into a number
        var time = $(this).parent().attr('id');

        // save values in local storage
        localStorage.setItem(time, value);
    });

    //loop over the time blocks to check if the current hour is before, equal to, or after the timeblock hour
    function hourTracker() {
        //get current hour ... moment().hours() counts hours in military time 0-23 so id for each block needs to be altered for that... hour-1 needs to be hour-13
        var currentHour = moment().hours()
        // console.log(currentHour);
        //convert the .time-block from "hour-9" to "9" and put that into a variable (blockHour). 
        // parseInt converts string numbers into numbers. The attr grabs the id of .time-block then we split the 'hour-' and grab the 1st index which is the number.
        $('.time-block').each( function(){
           var blockHour = parseInt($(this).attr('id').split('hour-')[1])
        //    console.log(blockHour);
        //    console.log($(this).children('textarea'));
           //if statement (blockHour < currentHour) add .past class to the text area of .time-block
        if (blockHour < currentHour) {
            $(this).children('textarea').addClass('past');
        }
            //else if (blockHour === currentHour) remove the .past class and add .present class to the text area of .time-block
        else if (blockHour === currentHour) {
            $(this).children('textarea').removeClass('past');
            $(this).children('textarea').addClass('present');
        }
        //else (blockHour > currentHour) remove .past and .present class and add .future class to the text area of .time-block
        else {
            $(this).children('textarea').removeClass('past');
            $(this).children('textarea').removeClass('present');
            $(this).children('textarea').addClass('future');
        }

        })
      
        
    }
    hourTracker();
   
    //Updates hour tracker function every second.
    setInterval(hourTracker,1000);

    //load saved data from local storage so it is still in description when you open up a new page
    $('.time-block').each( function (){
        var id = $(this).attr('id')
        $(this).children('textarea').val(localStorage.getItem(id))
    })

    // display current day on page
    $("#currentDay").text(moment().format("dddd, MMMM Do"));
});


 
    

