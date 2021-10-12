
var View = function () {
    
};

var isMobileBlank = false;


var isListView = true;
var timerOn = true;

var blankNomineeObject = config["blankNominee"];

    $(document).ready(function () {
    "use strict";
             var TEMPLATE_ADDNOMINEE_BUTTON = '<button type="button" class="btn btn-warning btn-sm add-nominee" id="addNominee">Add Nominee </button>';
             var TEMPLATE_EDIT_BUTTON = '<button class="btn round-btn btn-sm d-sm-inline-block edit" type="submit"> <i class="fa fa-pencil fa-fw"></i></button>';
             var TEMPLATE_VIEW_BUTTON = '<button class="btn round-btn btn-sm d-sm-inline-block view" type="submit"> <i class="fa fa-eye fa-fw"></i></button>';
             var TEMPLATE_DELETE_BUTTON = '<button class="btn ml-2 round-btn btn-sm d-sm-inline-block delete red" type="submit"> <i class="fa fa-trash fa-fw"></i></button>';
             var TEMPLATE_ADD_BUTTON = '<button class="btn ml-2 round-btn btn-sm d-sm-inline-block" type="submit"> <i class="fa fa-plus fa-fw"></i></button>';
             var TEMPLATE_REFRESH_BUTTON = '<button class="btn round-btn btn-sm d-sm-inline-block" type="submit"> <i class="fas fa-sync fa-fw"></i></button>';
             var TEMPLATE_CANCEL_BUTTON = '<button class="btn round-btn btn-sm d-sm-inline-block" type="submit"> <i class="fa fa-times fa-fw"></i></button>';
             var TEMPLATE_UPDATE_BUTTON = '<button class="btn  btn-lg btn-block mt-2  purple" type="submit" data-type="action">  Update</button>';
                           
             var TEMPLATE_SEND_OTP = '<button type="button" class="btn btn-link btn-sm ml-3 mobile"  >Send OTP</button>';
             var TEMPLATE_RESEND_OTP = '<button type="button" class="btn btn-link btn-sm ml-3 resend-otp center" >Resend OTP</button>';
             var TEMPLATE_VALIDATE_OTP = '<button type="button" class="btn btn-secondary btn-lg btn-block mt-2" onclick="validateOTP()">Validate OTP</button>';
        
           var HEADER_USER_DETAILS = 'Profile Details';
           var HEADER_NOMINEE_DETAILS = 'Nominee Details';
        

    View.prototype = {
        getHeader: function(type){
              var header = ''
              switch(type){
                  case 'user':
                      header = HEADER_USER_DETAILS;
                      break;
                  case 'nominee':
                      header = HEADER_NOMINEE_DETAILS;
                      break;
                  default:
                      header = '';
              }
              return header;
         },
        getActionListItem: function(type,title,value){
            var listItem='';
          if (value==null){
            value = "";
          }
            switch(type){
                case 'dateOfBirth':
                    var listItem = '<li class="list-group-item"><strong data-content="title">'+title+'</strong><br> '+getDOBSubstring(value)+'</li>';
                    break;
                case 'name':
                      var deleteButton = '';
                      var viewOrEdit = '';
                      if(ENABLE_DELETE_NOMINEE){
                            deleteButton = TEMPLATE_DELETE_BUTTON;
                      }
                      if(ENABLE_EDIT_NOMINEE){
                         viewOrEdit = TEMPLATE_EDIT_BUTTON;
                      }else{
                         viewOrEdit = TEMPLATE_VIEW_BUTTON;
                      }
                    var listItem = '<li class="list-group-item"><strong data-content="title">Nominee <span data-content="counter"><span></strong> - '+value+deleteButton+''+viewOrEdit+'<br/><small data-content="e-verify"></small></li>';
                    break;
                case 'dob':
                    var listItem = '<li class="list-group-item"><strong data-content="title">'+title+'</strong><br> '+getDOBSubstring(value)+'</li>';
                    break;
                case 'email':
                    listItem = '<li class="list-group-item"><strong data-content="title">'+title+' </strong><br> '+value+' <span><i class="fas fa-check fa-fw mr-2 text-success"></i> </span></li>';
                    break;
                case 'reset-pin':
                    listItem = '<li class="list-group-item"><strong data-content="title">'+title+' </strong><br> '+value+' <span><i class="fas fa-check fa-fw mr-2 text-success"></i> </span> <span ><small class="text-muted">Not verified</small> <button type="button" class="btn btn-warning btn-sm ml-3">Please Verify</button> </span></li>';
                    break;
                case 'change-password':
                    listItem = '<li class="list-group-item"><strong data-content="title">'+title+' </strong><br> '+value+' <span><i class="fas fa-check fa-fw mr-2 text-success"></i> </span> <span ><small class="text-muted">Not verified</small> <button type="button" class="btn btn-warning btn-sm ml-3">Please Verify</button> </span></li>';
                    break;
                case 'add-nominee':
                      
                    listItem = '<li class="list-group-item">'+TEMPLATE_ADDNOMINEE_BUTTON;
                      if(personalDetailObject['user_type']=='aadhaar' || personalDetailObject['user_type']=='demographic'){
                          if(personalDetailObject['mobile']=="" || personalDetailObject['mobile']==null ){
                            listItem+='<br><small>Link mobile number with your account to enable add nominee feature.</small>';
                          }
                      }else{
                         listItem+='<br><small>Link Aadhaar with your account to enable Nominee feature.</small>';
                      }
                    listItem+='</li>';
                    break;
                case 'gender':
                     listItem = '<li class="list-group-item"><strong data-content="title">'+title+'</strong><br> '+getFullGender(value)+'</li>';
                    break;
                case 'uid':
                      listItem='';
                    break;
               case 'user_alias':
                      if(value!=''){
                        listItem = '<li class="list-group-item"><strong data-content="title">'+title+'</strong><br> '+value+'</li>';
                      }
                      break;
               case 'nominee_id':
                    listItem = '';
                    break;
                case 'action':
                      listItem = '';
                      break;
                default:
                   
                 listItem = '<li class="list-group-item"><strong data-content="title">'+title+'</strong><br> '+value+'</li>';
            }
            
            return listItem;
        },
        getEditActionListItem: function(type,title,value){
            if (value==null){
              value = "";
            }
            var listItem='';
            switch(type){
                case 'dateOfBirth':
                case 'dob':
                      var dobValue = '';
                      if(value!=""){
                        dobValue = getDOBSubstring(value);
                      }
                      var listItem = '<li class="list-group-item"><strong data-content="title">'+title[0]+'</strong><br>';
                      listItem+='<div class="input-group">';
                      listItem+='<input class="form-control disabled"  type="text" name="'+type+'" id="'+type+'" value="'+dobValue+'" placeholder="'+title[1]+'" readonly/><button class="btn round-btn btn-sm d-sm-inline-block view" type="button" id="btnDOB"  ><i class="fa fa-calendar fa-fw"></i></button>';
                      listItem+='<div class="invalid-feedback" id="'+type+'-error"></div>';
                      listItem += '</div></li>';
                      break;
                case 'gender':
                    listItem = '<li class="list-group-item"><strong data-content="title">'+title[0]+' </strong><br>';
                      listItem+='<div class="input-group">';
                      if(value==""){
                        value="M";
                      }
                      $.each(["Male","Female","Other"],function(key,val){
                             var selected = '';
                             if(getShortGender(val)==value){
                                selected = 'checked';
                             }
                           listItem+='<div class="form-check"><label class="form-check-label">';
                             
                           listItem+= '<input type="radio" class="form-check-input" name="'+type+'" value="'+getShortGender(val)+'" '+selected+'>'+val+'</label>';
                           listItem+='</div>&nbsp;&nbsp;';
                     });
                      listItem+='<div class="invalid-feedback" id="'+type+'-error"></div>';
                      listItem+='</div>';
                      
                      listItem += '</li>';
                    break;
                case 'relation':
                    listItem = '<li class="list-group-item"><strong data-content="title">'+title[0]+' </strong><br>'+
                    '<div class="input-group">';
                      
                      listItem += '<select  class="input custom-select" name="'+type+'" id="'+type+'" ><option value=""  selected>Select</option>';
                          
                          $.each(ALL_RELATIONS,function(key,value){
                                 listItem+='<option value="'+value+'">'+value+'</option>';
                           });
                      listItem += '</select>';
                    
                       
                    listItem+='<div class="invalid-feedback" id="'+type+'-error"></div>';
                    listItem += '</div>';
                      
                      listItem += '</li>';
                    break;
                case 'email':
                    listItem = '<li class="list-group-item" data-content="email"><strong data-content="title">'+title[0]+' </strong><br> <input type="email" class="form-control" name="'+type+'" id="'+type+'" value="'+value+'" placeholder="'+title[1]+'"  />';
                      listItem+='<div class="invalid-feedback" id="'+type+'-error"></div>';
                      listItem += '</li>';
                    break;
                case 'mobile':
                case 'mobileno':
                    listItem = '<li class="list-group-item" data-content="mobile"><strong data-content="title">'+title[0]+' </strong><br> <input type="tel" class="form-control " name="'+type+'" value="'+value+'" id="'+type+'" placeholder="'+title[1]+'" maxlength="10"/>';
                      listItem+='<div class="invalid-feedback" id="'+type+'-error"></div>';
                    break;
                case 'otp':
                    listItem = '<li class="list-group-item"><strong data-content="title">'+title+'<input type="number" class="form-control otp" name="'+type+'" id="'+type+'" value="'+value+'" placeholder="Enter OTP" maxlength="6"/> </strong>';
                      listItem+='<div class="invalid-feedback" id="'+type+'-error"></div>';
                      listItem += '</li>';
                    break;
               case 'uid':
                      if(value==""){
                        listItem = '<li class="list-group-item"><strong data-content="title">'+title[0]+' </strong><br> <input type="tel" class="form-control" name="'+type+'" id="'+type+'" value="" placeholder="'+title[1]+'"  maxlength="12"/>';
                      listItem+='<div class="invalid-feedback" id="'+type+'-error"></div>';
                      listItem += '</li>';
                      }
                     
                      break;
              case 'nominee_id':
                      listItem = '<input type="hidden" name="'+type+'" id="'+type+'" value="'+value+'" />';
                      break;
               case 'action':
                      
                      listItem = '<li class="list-group-item " style="text-align:center;">';
                      listItem+='<div class="action-error" id="'+type+'-error"></div>';
                      listItem+='</li>';
                      break;
               case 'validate-otp':
                        listItem = '<li class="list-group-item" style="text-align:center;">  <input type="checkbox" aria-label="Checkbox for following text input" checked> Provide my consent to DigiLocker<br>'+TEMPLATE_VALIDATE_OTP+TEMPLATE_RESEND_OTP+'</li>';
                        break;
               case 'user_alias':
                      if(value!=''){
                         listItem = '<li class="list-group-item" ><strong data-content="title">'+title[0]+' </strong><br><input type="text" class="form-control " name="'+type+'" value="'+value+'" id="'+type+'" /></li>';
                      }
                      
                      break;
             
                default:
                 var listItem = '<li class="list-group-item"><strong data-content="title">'+title[0]+'</strong><br> <input class="form-control"  type="text" name="'+type+'" id="'+type+'" value="'+value+'" placeholder="'+title[1]+'" />';
                      listItem+='<div class="invalid-feedback" id="'+type+'-error"></div>';
                      listItem += '</li>';
            }
            
            return listItem;
        },
      refreshSection:function(headerTitle , obj){
        switch(headerTitle){
           case HEADER_USER_DETAILS:
                refreshSection("1");
                    break;
           case HEADER_NOMINEE_DETAILS:
                 refreshSection("2");
              break;
          default:
               //dataFields = config["personalDataFields"];
                    
               
        }
      },
        renderEditDetails: function(headerTitle , obj){
            isListView = false;
            $('[data-content="user-account-details"]').html('');
            var view = $("#single-card").html();
            var cardView = $(view);
             var title = cardView.find(".text-primary");
            title.text(headerTitle)
           var self = this;
            var actions = cardView.find(".dropdown");
            
            
//            var cancelBtn = $(TEMPLATE_CANCEL_BUTTON);
//            cancelBtn.click(function(){
//                self.render();
//            });
//            actions.append(cancelBtn);
         var dataFields = null;
         var dob = null;
                      
          switch(headerTitle){
             case HEADER_USER_DETAILS:
                  if (obj["isAadhaarSeeded"]=="N"){
                      
                      //actions.append(updateBtn);
                  }
                      dob = getDOBSubstring(obj["dateOfBirth"]);
                      dataFields = config["form-fields"]["personal"];
                      break;
             case HEADER_NOMINEE_DETAILS:
                      var actionBtn = null;
                      if(obj['status'] != ""){
                        actionBtn = $(TEMPLATE_UPDATE_BUTTON);
                        actionBtn.click(function(){
                            updateNomineeData();
                        });
                      }else{
                        actionBtn = $(TEMPLATE_ADD_BUTTON);
                        actionBtn.click(function(){
                            updateNomineeData();
                        });
                      }
                     
                     // actions.append(actionBtn);
                      dob = getDOBSubstring(obj["dob"]);
                      dataFields = config["form-fields"]["nominee"];
                break;
            default:
                 //dataFields = config["personalDataFields"];
                      
                 
          }
                      
            
            var wrapperDetail = cardView.find('[data-content="details"]');
            $.each( dataFields, function( key,value) {
                   var inputVal = obj[key];
                   if(inputVal==null){
                    inputVal = "";
                   }
                   var  profileRow = self.getEditActionListItem(key,value,inputVal);
                    
                   if(key=="action"){
                        var btn = $(TEMPLATE_UPDATE_BUTTON);
                        
                           switch(value){
                                case "personal":
                                   if(personalDetailObject['user_type']=='aadhaar' || personalDetailObject['user_type']=='demographic'){
                                       btn.click(function(){
                                            
                                           updateAadhaarPersonalData(true);
                                            
                                             
                                        });
                                   }else{
                                       btn.click(function(){
                                            
                                                 updatePersonalData(true);
                                            
                                             
                                        });
                                   }
                                   
                                   
                                  
                                    break;
                                case "nominee":
                                   btn.click(function(){
                                             
                                        updateNomineeData(true);
                                   });
                                    
                                   if(obj["nominee_id"]==""){
                                        btn.html("Submit");
                                   }else{
                                        btn.html("Update");
                                   }
                                   
                                    break;
                                default:
                                    
                           }
                        var row = $(profileRow).append(btn);
                        wrapperDetail.append(row);
                   }else{
                            wrapperDetail.append(profileRow);
                   }
                   

              
            });
            $('[data-content="user-account-details"]').append(cardView)
            
            var dobArr = dob.split('-');
            
           switch(headerTitle){
              case HEADER_USER_DETAILS:
                   $('div.card-subtitle').html("Profile Details");
                   if(personalDetailObject['user_type']=='aadhaar' || personalDetailObject['user_type']=='demographic'){
                        $("#full_name").prop('disabled', true);
                        $("#dateOfBirth").prop('disabled', true);
                        $("#user_alias").prop('disabled', true);
                          
                        $('input[name=gender]').attr("disabled",true);
                        $('#btnDOB').remove();
                       var wrapperDetail = $('li.list-group-item');
                       
                       if(wrapperDetail.length>0){
                           var nameFieldIndex = 0;
                           var dobFieldIndex = 1;
                           var genderFieldIndex = 2;
                           
                           if(personalDetailObject['user_alias']){
                               let usernameRow = wrapperDetail[0]
                               let inputField = $(usernameRow).find('input');
                               $(inputField).remove();
                               
                               $(usernameRow).append('<label class="light-gray">'+obj['user_alias']+'</label>');
                               nameFieldIndex = 1;
                               dobFieldIndex = 2
                               genderFieldIndex = 3;
                           }
                           let nameRow = wrapperDetail[nameFieldIndex]
                           let inputField = $(nameRow).find('input');
                           $(inputField).remove();
                           
                           $(nameRow).append('<label class="light-gray">'+obj['full_name']+'</label>');
                           
                           let dobRow = wrapperDetail[dobFieldIndex];
                           
                           let inputField1 = $(dobRow).find('input');
                           $(inputField1).remove();
                           let dobValue = getDOBSubstring(obj['dateOfBirth']);
                           $(dobRow).append('<label class="light-gray">'+dobValue+'</label>');
                           
                           
                           
                           let genderRow = wrapperDetail[genderFieldIndex]
                           let inputGroup = $(genderRow).find('div.input-group');
                           $(inputGroup).remove();
                           
                           $(genderRow).append('<label class="light-gray">'+getFullGender(obj['gender'])+'</label>');
                       }
                       
                      }else{
                          var wrapperDetail = $('li.list-group-item');
                          if(personalDetailObject['user_alias']){
                              let usernameRow = wrapperDetail[0]
                              let inputField = $(usernameRow).find('input');
                              $(inputField).remove();
                              
                              $(usernameRow).append('<label class="light-gray">'+obj['user_alias']+'</label>');
                             
                          }
                          $('#btnDOB').click(function(){
                              showDatePicker();
                          });
                      }
                   
                       break;
              case HEADER_NOMINEE_DETAILS:
                  
                   $('#btnDOB').click(function(){
                       showDatePicker();
                   });
                   
                   
                     
                      if(obj["nominee_id"]!=""){
                          $('.header-text').html("Nominee Details");
                          
                          
                          
                          
                        $("#dob").prop('readonly', true);
                        
                        
                        $('input[name=gender]').attr("disabled",true);
                          var wrapperDetail = $('li.list-group-item');
                          if($('#email').val()==""){
                              
                              
                              if(wrapperDetail.length>0){
                                  let emailRow = wrapperDetail[4]
                                  $(emailRow).hide();
                              }
                          }
                          
                          if(wrapperDetail.length>0){
                              let genderRow = wrapperDetail[2]
                              let inputGroup = $(genderRow).find('div.input-group');
                              $(inputGroup).remove();
                              
                              $(genderRow).append(getFullGender(obj['gender']));
                              
                              $.each(wrapperDetail,function(key, value){
                                  let elements = $(value).find('[data-content="title"]');
                                  if(elements.length > 0){
                                      let title = $(elements[0]).text();
                                      
                                      if (title.indexOf('Relationship')!=-1){
                                          let inputGroup1 = $(value).find('div.input-group');
                                              $(inputGroup1).remove();
                                          
                                               $(value).append(obj['relation']);
                                      }
                                      else if (title.indexOf('Full Name')!=-1){
                                          let inputGroup1 = $(value).find('input.form-control');
                                              $(inputGroup1).remove();

                                               $(value).append(obj['name']);
                                      }else if (title.indexOf('Birth')!=-1){
                                          let inputGroup1 = $(value).find('input.form-control');
                                              $(inputGroup1).remove();

                                               $(value).append(getDOBSubstring(obj['dob']));
                                      }
                                      else if (title.indexOf('Email')!=-1){
                                          let inputGroup1 = $(value).find('input.form-control');
                                              $(inputGroup1).remove();

                                               $(value).append(obj['email']);
                                      }else if (title.indexOf('Mobile')!=-1){
                                          let inputGroup1 = $(value).find('input.form-control');
                                              $(inputGroup1).remove();

                                               $(value).append(obj['mobileno']);
                                      }
                                  }
                                  
                              });
//
                              
                          }
                         
                        $("#name").prop('readonly', true);
                        $("#uid").prop('disabled', true);
                          
                          
                          $("#relation").prop('disabled', true);
                          $("#email").prop('readonly', true);
                          $("#mobileno").prop('readonly', true);
                          $("#relation").prop('disabled', true);
                          $("button").hide();
                          $('#btnDOB').remove();
                          let titles = $('[data-content="title"]');
                          $.each(titles,function(key,val){
                              let singleTitle = $(val).text()

                              if (singleTitle.indexOf('Email')==-1){
                                  $(val).text(singleTitle.substring(0,singleTitle.length-2))
                              }

                          });
                          
                          
                          
                      }else{
                          $('.header-text').html("Enter Nominee Details as per Aadhaar");
                          //$('div.card-subtitle').html("All fields are mandatory");
                      }
                      
                      
                     
                      $("#relation").val(obj['relation']);
                     $("button.mobile").hide();
                 break;
             default:
                    
           }
                      
            
                      
            var gender = obj['gender'];
              if (gender!=""){
                  //var genderVal = getShortGender(gender);
                  $("#gender").val(gender);
              }
            
            
            
        },
        
        renderDetails: function(headerTitle , index, obj){
            isListView = true;
            var view = $("#single-card").html();
            var cardView = $(view);
             var title = cardView.find(".header-text");
            title.text(headerTitle)
           
                      
            var actions = cardView.find(".dropdown");
            var self = this;
              
            
            
            var self = this;
            var wrapperDetail = cardView.find('[data-content="details"]');
                      
          var dataFields = null;
          switch(headerTitle){
             case HEADER_USER_DETAILS:
                      if (obj != null) {
                              var editBtn = $(TEMPLATE_EDIT_BUTTON);
                              var addBtn = $(TEMPLATE_ADD_BUTTON);

                              editBtn.click(function(){
                               self.renderEditDetails(headerTitle, obj);
                              })
                              
                              
                              actions.append(editBtn);
                              
                      }
                      dataFields = config["form-fields"]["personal-list"];
                      break;
             case HEADER_NOMINEE_DETAILS:
                      if (obj != null) {
                              //var editBtn = $(TEMPLATE_EDIT_BUTTON);
                      if(index==0){
                            if(nomineeDetailObject.length<TOTAL_NOMINEES_ALLOWED){
                                var addBtn = $(TEMPLATE_ADD_BUTTON);

                                addBtn.click(function(){
                                             
                                self.renderEditDetails(headerTitle, blankNomineeObject);
                                             
                                })

                                actions.append(addBtn);
                            }
                            
                      }else{
                        var cardHeader = cardView.find('[data-content="header"]');
                        cardHeader.remove();
                      }
                             
                      }
                      if(obj==null){
                        dataFields = {"add-nominee":"Add Nominee"};
                      }else{
                        //dataFields = {"add-nominee":"Add Nominee"};
                        dataFields = config["form-fields"]["nominee-list"];
                        
                      }
                     
                break;
            default:
                 //dataFields = config["personalDataFields"];
                      
                 
          }
           var nomineeCount = index+1;
            $.each( dataFields, function( key,value) {
                   
                   var  profileRow = null;
                   if (obj==null){
                      profileRow = self.getActionListItem(key,value,"");
                   }else{
                      profileRow = self.getActionListItem(key,value,obj[key]);
                   }
                   var profileElement = $(profileRow);
                   
                   var counter = profileElement.find("[data-content='counter']");
                   var everify = profileElement.find("[data-content='e-verify']");
                   var editBtn = profileElement.find("button.edit");
                   var viewBtn = profileElement.find("button.view");
                   if(editBtn){
                      editBtn.click(function(){
                        self.renderEditDetails(headerTitle, obj);
                      })
                   }
                   
                   if(viewBtn){
                      viewBtn.click(function(){
                        self.renderEditDetails(headerTitle, obj);
                      })
                   }
                  
                   
                   var deleteBtn = profileElement.find("button.delete");
                   if(deleteBtn){
                        deleteBtn.click(function(){
                          confirmDeleteNominee(obj);
                        })
                   }
                   var addNominee =  profileElement.find("button.add-nominee");
                   if(addNominee){
                       if(personalDetailObject['user_type']=='aadhaar' || personalDetailObject['user_type']=='demographic'){
                            if(personalDetailObject['mobile']=="" || personalDetailObject['mobile']==null ){
                              
                                 addNominee.prop('disabled', true);
                            }else{
                                addNominee.click(function(){
                                    self.renderEditDetails(headerTitle, blankNomineeObject);
                                });
                            }
                       }else{
                           addNominee.prop('disabled', true);
                       }
                       
                        
                   }
                   
                   
                   
                   if(counter){
                   if (obj!=null){
                       if(obj['status']==STATUS_PENDING){
                            everify.html(VERIFY_PENDING_MSG);
                            everify.hide();
                            
                       }else if(obj['status']==STATUS_SUCCESS){
                            everify.text('');
                            everify.hide();
                            
                       }else{
                            everify.html(VERIFY_FAILURE_MSG);
                            everify.hide();
                       }
                   }
                       
                       
                       if(TOTAL_NOMINEES_ALLOWED>1){
                          counter.text(nomineeCount);
                       }
                   }
                   wrapperDetail.append(profileElement);
                   
            });
                     
            $('[data-content="user-account-details"]').append(cardView)
              if(obj==null && headerTitle == HEADER_NOMINEE_DETAILS ){
                      
              }
                     
                     
        },
        
        renderMobileOTP: function(type){
           var btnMobile = $('[data-content="user-account-details"]').find('button.mobile');
                  
          if (btnMobile != undefined){
              var wrapperDetail = $('[data-content="user-account-details"]').find('[data-content="details"]');
                var  profileRow = this.getEditActionListItem("otp","OTP","");
                var lastRow = $(".list-group-item").last();
                
                var btn = lastRow.find("button");
                      if(btn){
                         btn.html("Validate OTP");
                      }
                                           
                      var resendBtn = $(TEMPLATE_RESEND_OTP);
                      resendBtn.click(function(){
                          sendOrValidateOTP(type,true);
                      });
                lastRow.before(profileRow);
                      lastRow.append(resendBtn);
          }
      },
        render: function () {
                      
            $('[data-content="user-account-details"]').html('');
                      var self = this;
              if (window.personalDetailObject === undefined ){
                
              }else{
                      this.renderDetails(HEADER_USER_DETAILS,0,personalDetailObject);
              }
            
            if (window.nomineeDetailObject === undefined ){
               self.renderDetails(HEADER_NOMINEE_DETAILS,0,null);
            }else{
                if(nomineeDetailObject.length==0){
                     self.renderDetails(HEADER_NOMINEE_DETAILS,0,null);
                }else{
                      $.each(nomineeDetailObject, function(index, value){
                        self.renderDetails(HEADER_NOMINEE_DETAILS,index,value);
                      });
                }
            }
                      
            
          
           

           
        },
        
    }
        var profile = new View();
        profile.render();
    });
 

function setDOBDate(selDate){
    var dob = document.getElementById("dob");
    
    if(typeof(dob) != 'undefined' && dob != null){
        $('#dob').val(selDate);
    }
    
    var dateOfBirth = document.getElementById("dateOfBirth");
    
    if(typeof(dateOfBirth) != 'undefined' && dateOfBirth != null){
        $('#dateOfBirth').val(selDate);
    }
   
}
function showDatePicker(){
    try {
        var os = this.getMobileOperatingSystem();
       if(os=="ios"){
             webkit.messageHandlers.showDatePicker.postMessage('');
       }else if(os=="android"){
             JSBridgePlugin.showDatePicker('');
       }



    } catch(err) {
        console.log('error');
    }
}

function updateAadhaarPersonalData(isSendOTP=false){
    
    
    var flag = 0;
    var mobile = $("#mobile").val();
    flag+=fieldValidation($('#mobile'),'mobile');
    
   if(flag>0){
       var msg = '';
       if(flag==1){
           msg = ''
       }else{
           msg = '';
       }
        $('#action-error').html('');
        
        return;
    }else{
        $('#action-error').html('');
         
    }
    $('#action-error').hide();
    if(isSendOTP){
      if(personalDetailObject["mobile"]!=mobile){
            sendOrValidateOTP("personal",false);
          return;
       }
    }
    
    switchToViewMode(0);
    
}


function updatePersonalData(isSendOTP=false){
    
    var name = $("#full_name").val();
    var dateOfBirth = $("#dateOfBirth").val();
    
    var gender = $('input[name="gender"]:checked').val();
    
    var mobile = $("#mobile").val();
    var flag = 0;
    
    flag+=fieldValidation($('#dateOfBirth'),'dateOfBirth');
    
    
    flag+=fieldValidation($('#dateOfBirth'),'dateOfBirth');
    flag+=fieldValidation($('#full_name'),'full_name');
    flag+=fieldValidation($('#mobile'),'mobile');
    if(!$("input:radio[name='gender']").is(":checked")) {
        $("input:radio[name='gender']").addClass("is-invalid");
        $('#gender-error').html('Select gender');
        $('#gender-error').show();
        flag+=1;
    }else{
        $("input:radio[name='gender']").removeClass("is-invalid");
        $('#gender-error').html('');
        $('#gender-error').hide();
    }
    
    var selVal = $("input[name='gendder']:checked").val()
    
   
   if(flag>0){
       var msg = '';
       if(flag==1){
           msg = ''
       }else{
           msg = '';
       }
        $('#action-error').html('');
        
        return;
    }else{
        $('#action-error').html('');
         
    }
    $('#action-error').hide();
    var dob = dateOfBirth.replace(/\//g,"-");
    var arr = dob.split("-");
    var revDOB = arr[2]+'-'+arr[1]+'-'+arr[0];
    var jsonDOB = personalDetailObject["dateOfBirth"].substring(0, 10);
    
    if(isSendOTP){
      if(personalDetailObject["mobile"]!=mobile){
            sendOrValidateOTP("personal",false);
          return;
       }
    }
    
    if(name!=personalDetailObject["full_name"] || revDOB != jsonDOB || gender!=personalDetailObject["gender"]){
        var details = {"full_name":name,"dob":dob, "gender":gender,"mobile":mobile,"type":"personal"}
        
          try {
              var os = this.getMobileOperatingSystem();
             if(os=="ios"){
                   webkit.messageHandlers.updateProfileData.postMessage(details);
             }else if(os=="android"){
                   JSBridgePlugin.updateProfileData(JSON.stringify(details));
             }



          } catch(err) {
              console.log('error');
          }
    }else{
        switchToViewMode(0);
        
    }
    
}

function updateNomineeData(isSendOTP=false){
   
    var flag = 0;
    
    var name = $("#name").val();
    
    var gender = $('input[name="gender"]:checked').val();
    var relation = $("#relation").val();
    var mobile = $("#mobileno").val();
    var email = $("#email").val();
    var aadhaar = $("#uid").val();
    var nomineeId =  $("#nominee_id").val();
    
    var requestType=null;
    var details = null;
    
    flag+=fieldValidation($('#dob'),"dob");
    
    flag+=fieldValidation($('#relation'),'relation');
    flag+=fieldValidation($('#name'),'name');
    flag+=fieldValidation($('#mobileno'),'mobileno');
    flag+=fieldValidation($('#email'),'email');
    if(nomineeId==""){
       flag+=fieldValidation($('#uid'),'uid');
    }
    
    if(!$("input:radio[name='gender']").is(":checked")) {
        $("input:radio[name='gender']").addClass("is-invalid");
        $('#gender-error').html('Select gender.');
        $('#gender-error').show();
        flag+=1;
    }else{
        $("input:radio[name='gender']").removeClass("is-invalid");
        $('#gender-error').html('');
        $('#gender-error').hide();
    }
    
   
    
    var dobStr = $("#dob").val();
    var arrDOB = dobStr.split("/");
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    
    if(arrDOB[2] < 1920 || arrDOB[2] > parseInt(year)){
        flag = 1;
        $('#dob-error').html('Enter valid date of birth');
        $('#dob-error').show();
    }
    
    
    
    
    if(flag>0){
       var msg = '';
       if(flag==1){
           msg = ''
       }else{
           msg = '';
       }
        $('#action-error').html('');
        return;
    }else{
        $('#action-error').html('');
    }
     $('#action-error').hide();
    var dobStr = $("#dob").val();
    var dob = dobStr.replace(/\//g,"");
    
    if(isSendOTP){
        
        sendOrValidateOTP("nominee",false);
        return;
    }
    
    if(nomineeId!=""){
        requestType = 'U';
        details = {"uid":aadhaar,"name":name,"dob":dob, "gender":gender, "relation":relation, "mobileno":mobile, "email":email,"request_type":requestType,"nominee_id":nomineeId,"type":"nominee"}
    }else{
        requestType = 'C';
        details = {"uid":aadhaar,"name":name,"dob":dob, "gender":gender, "relation":relation, "mobileno":mobile, "email":email,"request_type":requestType}
        
    }
  
    
    
    try {
        var os = this.getMobileOperatingSystem();
        if(os=="ios"){
           webkit.messageHandlers.updateNomineeData.postMessage(details);
        } else if (os=="android"){
         JSBridgePlugin.updateNomineeData(JSON.stringify(details));
        }

       // webkit.messageHandlers.refreshWebPage.postMessage(dictionary);

    } catch(err) {
        console.log('error');
    }
    
    
}

function sendOrValidateOTP(type,isResend) {
    
    if(!isResend){
        var resendOTPBtn = $("button.resend-otp");
        
        if(resendOTPBtn.length>0){
            var otpVal = $('#otp').val();
             var flag = 0;
            flag+=fieldValidation($('#otp'),'otp');
           
            
            if(flag>0){
                $('#action-error').html('');
                 
                
            }else{
                
                validateOTP(type);
                
            }
            $('#action-error').hide();
            return;
            
        }
    }
    
    
    
    var mobile = '';
    switch(type){
        case "personal":
            mobile = $("#mobile").val();
            break;
        case "nominee":
            
            mobile = personalDetailObject["mobile"];
            break;
    }
    var value = {"mobile":mobile,"type":type}
    
    
    try {
        var os = this.getMobileOperatingSystem();
        if(os=="ios"){
           webkit.messageHandlers.sendOTP.postMessage(value);
        }else if(os=="android"){
              JSBridgePlugin.sendOTP(JSON.stringify(value));

        }

    } catch(err) {
        console.log('error');
    }
}

function resendOTP(type){}

function otpSuccess(json){
    var response = JSON.parse(json);
    switch(response['type']){
       case "personal":
            personalDetailObject["mobile"] = response['mobile'];
            writeUserPersonalData();
            if(personalDetailObject['user_type']=='aadhaar' || personalDetailObject['user_type']=='demographic'){
                updateAadhaarPersonalData();
            }else{
                updatePersonalData();
            }
            
            
            break;
       case "nominee":
            updateNomineeData();
            break;
        default:
            
    }
    
}
function showMobileOTP(jsonData){
    var userData = JSON.parse(jsonData);
    var resendOTPBtn = $("button.resend-otp");
    
    if(resendOTPBtn.length==0){
        var profile = new View();
        profile.renderMobileOTP(userData['type']);
    }
   timer(30);
}

function validateOTP(type){
    
    var mobile = '';
    if(type=="nominee"){
       mobile = personalDetailObject["mobile"];
    }else{
       mobile = document.getElementById("mobile").value;
    }
    
    var otp = document.getElementById("otp").value;
    var value = {"mobile":mobile,"otp":otp,"type":type }
    
    try {
        var os = this.getMobileOperatingSystem();
        if(os=="ios"){
           webkit.messageHandlers.verifyOTP.postMessage(value);
        }else if(os=="android"){
           JSBridgePlugin.verifyOTP(JSON.stringify(value));
            
        }
        
        
      
    } catch(err) {
        console.log('error');
    }
}

function checkVerificationStatus(nominees){
    
    var value = {"nominee":nominees}
    
    try {
        var os = this.getMobileOperatingSystem();
        if(os=="ios"){
           webkit.messageHandlers.checkVerificationStatus.postMessage(value);
        }else if(os=="android"){
           JSBridgePlugin.checkVerificationStatus(JSON.stringify(value));
            
        }
        
        
      
    } catch(err) {
        console.log('error');
    }
}


function writeNomineeData(){
    
    
    
    try {
        var os = this.getMobileOperatingSystem();
        if(os=="ios"){
           webkit.messageHandlers.writeNomineeData.postMessage(nomineeDetailObject);
        }else if(os=="android"){
           JSBridgePlugin.writeNomineeData(JSON.stringify(nomineeDetailObject));
            
        }
        
        
      
    } catch(err) {
        console.log('error');
    }
}

function writeUserPersonalData(){
    
    
    
    try {
        var os = this.getMobileOperatingSystem();
        if(os=="ios"){
           webkit.messageHandlers.writeUserPersonalData.postMessage(personalDetailObject);
        }else if(os=="android"){
           JSBridgePlugin.writeUserPersonalData(JSON.stringify(personalDetailObject));
            
        }
        
        
      
    } catch(err) {
        console.log('error');
    }
}



function refreshSection(index){
    
    try {
        var os = this.getMobileOperatingSystem();
        if(os=="ios"){
           webkit.messageHandlers.refreshSection.postMessage({"section":index});
        }else if(os=="android"){
           JSBridgePlugin.refreshSection(JSON.stringify({"section":index}));
            
        }
        
        
      
    } catch(err) {
        console.log('error');
    }
}

function editPersonalData(jsonData) {
    console.log('jsonData =' , jsonData);
    var userData = JSON.parse(jsonData);
    var dobArr = userData['dob'].split('-');
    personalDetailObject['full_name'] = userData['full_name'];
    personalDetailObject['dateOfBirth'] = dobArr[2]+'-'+dobArr[1]+'-'+dobArr[0];
    personalDetailObject['gender'] = userData['gender'];
    switchToViewMode(0);
    writeUserPersonalData();
}

function editMobileData(jsonData) {
    console.log('jsonData =' , jsonData);
    var userData = JSON.parse(jsonData);
    
    personalDetailObject['mobile'] = userData['mobile'];
    switchToViewMode(0);
    writeUserPersonalData();
}

function deleteNomineeData(jsonData){
    var userData = JSON.parse(jsonData);
    var nomineeIndex = -1;
    $.each(nomineeDetailObject, function(index, obj){
           if(obj["nominee_id"]==userData['nominee_id']){
               nomineeIndex = index;
              return false;
           }
    });
    
    if(nomineeIndex>-1){
        nomineeDetailObject.splice(nomineeIndex,1);
    }
    switchToViewMode(0);
    writeNomineeData();
}

function editNomineeData(jsonData) {
    console.log('jsonData =' , jsonData);
    var userData = JSON.parse(jsonData);
    
    var obj = null;
    var isNewObject = false;
    var nomineeObject = getNomineeObject(userData);
   // var nomineeObject = userData;
    if(nomineeObject){
        obj = nomineeObject;
    }else{
        obj = JSON.parse(JSON.stringify(blankNomineeObject));
        isNewObject = true;
    }
    
    obj["name"] = userData['name'];
    var dateOfBirth = userData['dob'];
    obj["dob"] = dateOfBirth.substring(4, 8)+'-'+dateOfBirth.substring(2, 4)+'-'+dateOfBirth.substring(0, 2);
    
    
    obj["gender"] = userData['gender'];
    obj["status"] = STATUS_PENDING;
    obj["relation"] = userData['relation'];
    obj["mobileno"] = userData['mobileno'];
    obj["uid"] = userData['uid'];
    obj["email"] = userData['email'];
    obj["nominee_id"] = userData['nominee_id'];
    if(isNewObject){
       nomineeDetailObject.push(obj);
    }else{
        $.each(nomineeDetailObject, function(index, obj){
               if(obj["nominee_id"]==userData['nominee_id']){
                   obj=userData;
                  return false;
               }
        });
    }
    
    switchToViewMode(0);
    writeNomineeData();
    //checkVerificationStatus(userData['nominee_id']);
}

function getNomineeObject(userData){
    var response = null;
    if (window.nomineeDetailObject === undefined) {
        return response;
    }else{
     $.each(nomineeDetailObject, function(index, obj){
            if(obj["nominee_id"]==userData['nominee_id']){
                response = obj;
                return false;
            }
     });
    }
    return response;
}


function editMobile(jsonData) {
    console.log('jsonData =' , jsonData);
    var userData = JSON.parse(jsonData);
    personalDetailObject['mobile'] = userData['mobile'];
    switchToViewMode();
}

function switchToViewMode(val=0){
    var profile = new View();
    switch(val){
        case 0:
            profile.render();
        
        break;
        case 1:
         profile.renderDetails(profile.getHeader('user'),0,personalDetailObject);
            break;
        case 2:
            if(nomineeDetailObject.length==0){
                 profile.renderDetails(profile.getHeader('nominee'),0,null);
            }else{
                  $.each(nomineeDetailObject, function(index, value){
                    profile.renderDetails(profile.getHeader('nominee'),index,value);
                  });
            }
        break;
    }
    
}

function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "windows";
    }

    if (/android/i.test(userAgent)) {
        return "android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "ios";
    }

    return "unknown";
}



function confirmDeleteNominee(nominee){
    try {
         var value = {"nominee_id":nominee["nominee_id"]}
           var os = this.getMobileOperatingSystem();
           if(os=="ios"){
              webkit.messageHandlers.confirmDeleteNominee.postMessage(value);
           }else if(os=="android"){
              JSBridgePlugin.confirmDeleteNominee(JSON.stringify(value));
               
           }
           
           
         
       } catch(err) {
           console.log('error');
       }
}

function JSPluginCallbackHandler(data){
    alert(data);
}

function pad2(number) {
   return (number < 10 ? '0' : '') + number
}

function onReloadWeb(){
    try {
      var value = {"reload":"web"}
        var os = this.getMobileOperatingSystem();
        if(os=="ios"){
           webkit.messageHandlers.reloadWeb.postMessage(value);
        }else if(os=="android"){
           JSBridgePlugin.reloadWeb(JSON.stringify(value));
            
        }
        
        
      
    } catch(err) {
        console.log('error');
    }
}

function onBackPressed(){
    if(isListView){
        try {
          
            var os = this.getMobileOperatingSystem();
            if(os=="ios"){
               webkit.messageHandlers.exitTemplate.postMessage("exit");
            }else if(os=="android"){
               JSBridgePlugin.exitTemplate("exit");
                
            }
            
            
          
        } catch(err) {
            console.log('error');
        }
    }else{
        switchToViewMode(0);
        return 0;
    }
}

