
function validate(type,inputtxt)
{
    var flag = false;
    var pattern = '';
    switch(type){
       case 'full_name':
       case 'name':
                pattern = /^[a-zA-Z\s]+$/;
           break;
            
       case 'uid':
                pattern = /^\d{12}$/;
               
            break;
       case 'mobile':
            pattern = /^[456789]\d{9}$/;
           
        break;
       case 'mobileno':
           pattern = /^[456789]\d{9}$/;
          
       break;
        case 'otp':
            pattern = /^\d{6}$/;
           
        break;
        case 'dateOfBirth':
            pattern = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
            break;
        case 'email':
              pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
               break;
        default:
            return true;
    }
    if(pattern!=""){
        if(inputtxt.match(pattern))
          {
           return true;
          }
        else
          {
          
          return false;
          }
    }else{
        return true;
    }
    
  
}

function getShortGender(val){
    var gender = '';
    if(val=='Male'){
        gender = "M";
    }else if(val=='Female'){
        gender = "F";
    }else if(val=='Other'){
       gender = "O";
    }
    return gender;
}


function getFullGender(val){
    var gender = '';
    if(val=='M'){
        gender = "Male";
    }else if(val=='F'){
        gender = "Female";
    }else if(val=='O'){
       gender = "Other";
    }
    return gender;
}



function getDOBSubstring(dob){
    if (dob.includes("-")) {
    var str =  dob.substring(0,10);
    var arr = str.split("-");
    return arr[2]+'/'+arr[1]+'/'+arr[0];
    }else{
      return  dob.substring(4, 8)+'/'+dob.substring(2, 4)+'/'+dob.substring(0, 2);
    }
}

function emptyValidation(ele,type){
    var value = ele.val();
    
    if(value==''){
        
        ele.addClass("is-invalid");
        if($('#nominee_id').length>0){
            var formType = config["form-fields"]["nominee"];
            $('#'+type+'-error').html('Enter '+formType[type][0]);
        }else{
            var formType = config["form-fields"]["personal"];
            $('#'+type+'-error').html('Enter '+formType[type][0]);
        }
        
        return 1;
    }else{
        ele.removeClass("is-invalid");
        $('#'+type+'-error').html('');
        return 0;
    }
}

function fieldValidation(ele,type){
    var value = ele.val();
    
    if(value!=''){
        var isValid = validate(type,value);
        
        if (!isValid){
            ele.addClass("is-invalid");
            
            if($('#nominee_id').length>0){
                var formType = config["form-fields"]["nominee"];
                var fieldTitle = formType[type][0];
                if(type=='dob'){
                   $('#'+type+'-error').html('Enter valid '+fieldTitle.toLowerCase()+' in dd/mm/yyyy format');
                }else{
                    $('#'+type+'-error').html('Enter valid '+fieldTitle.toLowerCase());
                }
                
            }else{
                var formType = config["form-fields"]["personal"];
                var fieldTitle = formType[type][0];
                $('#'+type+'-error').html('Enter valid '+fieldTitle.toLowerCase());
            }
            
           
            
            return 1
        }else{
           ele.removeClass("is-invalid");
            $('#'+type+'-error').html('');
            return 0
        }
    }else{
        if(type=='email'){
            return 0;
        }
        ele.addClass("is-invalid");
        
        if($('#nominee_id').length>0){
            var formType = config["form-fields"]["nominee"];
            var fieldTitle = formType[type][0];
            if(type=='gender'){
                $('#'+type+'-error').html('Select '+fieldTitle.toLowerCase());
            }else if(type=='relation'){
                $('#'+type+'-error').html('Select '+fieldTitle.toLowerCase());
            }else{
              $('#'+type+'-error').html('Enter '+fieldTitle.toLowerCase());
            }
            
        }else{
            var formType = config["form-fields"]["personal"];
            var fieldTitle = formType[type][0];
            if(type=='gender'){
               $('#'+type+'-error').html('Select '+fieldTitle.toLowerCase());
            }else{
              $('#'+type+'-error').html('Enter '+fieldTitle.toLowerCase());
            }
            
        }
        return 1;
    }
    
}


function timer(remaining) {
  var m = Math.floor(remaining / 60);
  var s = remaining % 60;
  
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;
  $("#timer").html(m + ':' + s);
  
  remaining -= 1;
  
  if(remaining >= 0 && timerOn) {
    $("button.resend-otp").prop('disabled', true);
    setTimeout(function() {
        timer(remaining);
    }, 1000);
    return;
  }

  if(!timerOn) {
     
    // Do validate stuff here
    return;
  }
  
   $("button.resend-otp").prop('disabled', false);
  
}
                     
