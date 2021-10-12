var config = {
    "form-fields": {
        "personal": { "user_alias": ["Username", "Enter full name"], "full_name": ["Full Name", "Enter full name"], "dateOfBirth": ["Date Of Birth", "Enter DOB in dd/mm/yyyy format"], "gender": ["Gender"], "mobile": ["Mobile Number", "Enter mobile no"], "action": "personal" },
        "personal-list": { "user_alias": "Username", "full_name": "Full Name", "dateOfBirth": "Date of Birth", "gender": "Gender", "mobile": "Mobile" },

        "nominee": { "name": ["Full Name *", "Enter here"], "dob": ["Date Of Birth *", "dd/mm/yyyy"], "gender": ["Gender *"], "mobileno": ["Mobile Number *", "Enter here"], "email": ["Email", "Enter here"], "uid": ["Nominee Aadhaar Number *", "Enter here"], "relation": ["Relationship with Nominee *"], "nominee_id": "", "action": "nominee" },
        "nominee-list": { "name": "Full Name" }
    },
    "blankNominee": { "name": "", "dob": "", "gender": "", "mobileno": "", "email": "", "uid": "", "relation": "", "username": "", "created_on": "", "consent": "", "uid_token": "", "status": "", "nominee_id": "", "action": "nominee" },
}


var ALL_RELATIONS = ["Mother", "Father", "Sister", "Brother", "Spouse", "Daughter", "Son"];
var TOTAL_NOMINEES_ALLOWED = 1;
var ENABLE_DELETE_NOMINEE = false;
var ENABLE_EDIT_NOMINEE = false;

var STATUS_PENDING = 'pending';
var STATUS_SUCCESS = 'success';
var STATUS_FAILED = 'failed';

var VERIFY_PENDING_MSG = "";
var VERIFY_FAILURE_MSG = "Verification - <span class='red'>Failed</span>";
