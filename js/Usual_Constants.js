var UsualConstants = {};


UsualConstants.page_constant =
{
    "Ca": "Candidate",
    "Job": "Job",
    "Off": "Offer"
};


UsualConstants.JsonType =
{
    "Bool": "jb",       //0,
    "Enum": "je",       //1,
    "Float": "jf",      //2,
    "Int": "ji",        //3,
    "String": "js",         //4,
    "Null-String": "jns",
    "Null-Float": "jnf",    //5,
    "Null-Int": "jni",      //6,
    "Array-Float": "jaf",   //7,
    "Array-Int": "jai",     //8,
    "Array-String": "jas",  //9,
    "Attachment": "jat"     //10
};


UsualConstants.ElementType =
{
    "CheckBox": 0,
    "Radio": 1,
    "TextBox": 2,
    "TextArea": 3,
    "Combo-SingleSelect": 4,
    "Combo-MultiSelect": 5,
    "Combo-Custom_SingleSelect": 6,
    "DTPicker": 7,
    "Grid": 8,
    "Label": 9,
    "DTPicker_NoIMG": 10,
    "DTPicker_Date": 11,
    "DTPicker_Date_NoIMG": 12,
    "Audio-Player": 13,
    "Attachment-Collection": 14,
    "div": 15,
    "span": 16,
    "AttachmentReadOnly": 17,
    "Audio-PlayerReadOnly": 18
};

UsualConstants.AttachementRule = {
    "aa": { "Extention": ".doc,.txt,.pdf,.docx", "MaxSize": 3072, "CallBackFun": "", "MaxNoOfFiles": 5 },
    "ab": { "Extention": ".mp3,.mp4", "MaxSize": 3072, "CallBackFun": "", "MaxNoOfFiles": 1, "HideNotification": true, "HideFileDetails": true },
    "ac": { "Extention": ".doc,.txt,.docx", "MaxSize": 3072, "CallBackFun": "", "MaxNoOfFiles": 1 }
}

UsualConstants.NormalRule = {
    "txt": "txt",
    "name": "name",
    "username": "username",
    "onlyalphabets": "onlyalphabets",
    "experience": "experience",
    "num": "num",
    "float": "float",
    "int": "int",
    "phone": "phone",
    "mobile": "mobile",
    "mobile10": "mobile10",
    "countrycode": "countrycode",
    "onlydate": "onlydate",
    "email": "email",
    "multiemail": "multiemail",
    "candidatename": "candidatename",
    "mobileno": "mobileno",
    "pancard": "pancard",
    "passport-india": "passport-india"
}

UsualConstants.ElementRule = {
    "Action": "ac",
    "Mandatory": "m",
    "Rule": "r", 
    "Error": "e",
    "CustomMethod": "cm",
    "BindingEnum": "be",
    "BindingCatalog": "bc",
    "BindingMethod": "bm",
    "Label": "l",
    "DTPicker": "dtp", //No value pair for Dtp
    "DTPickerDate": "dp"
};
UsualConstants.Rule = { "Bool": ["CheckBox", "Radio"],
    "Enum": ["CheckBox", "Radio", "Combo-SingleSelect", "Combo-Custom_SingleSelect"],
    "Float": ["TextBox"],
    "Int": ["TextBox", "Combo-SingleSelect", "Combo-MultiSelect", "Combo-Custom_SingleSelect"],
    "String": ["TextBox", "Combo-SingleSelect", "Combo-MultiSelect", "Combo-Custom_SingleSelect", "DTPicker", "DTPicker_NoIMG", "DTPicker_Date", "DTPicker_Date_NoIMG", "TextArea"],
    "Null-String": ["TextBox", "Combo-SingleSelect", "Combo-MultiSelect", "Combo-Custom_SingleSelect", "DTPicker", "DTPicker_NoIMG", "DTPicker_Date", "DTPicker_Date_NoIMG", "TextArea"],
    "Null-Float": ["TextBox"],
    "Null-Int": ["TextBox", "Combo-SingleSelect", "Combo-MultiSelect", "Combo-Custom_SingleSelect"],
    "Array-Float": ["TextBox"],
    "Array-Int": ["Combo-SingleSelect", "Combo-MultiSelect", "Combo-Custom_SingleSelect"],
    "Array-String": ["TextBox", "Combo-SingleSelect", "Combo-MultiSelect", "Combo-Custom_SingleSelect", "TextArea"],
    "Attachment": ["Attachment", "Attachment-Collection"]
};

UsualConstants.CatalogRule = {
    "Radio": ["Enum"],
    "Combo-SingleSelect": ["Enum", "Catalog", "Methods"],
    "Combo-MultiSelect": ["Catalog", "Methods"],
    "Combo-Custom_SingleSelect": ["Enum", "Catalog", "Methods"]
};


// This contains all the enums and the method name, which are used to bind the combos
UsualConstants.Catalogs = {
    "Enum": {
        "eJt": "JobType",
        "ets": "TypesOfSource",
        "esut": "SmsUserType",
        "etu": "TypeOfUser",
        "etcu": "TypeOfCustomer",
        "eg": "Gender",
        "ems": "MaritalStatus",
        "eInt": "InterviewType",
        "ett": "JsonTenantsType"
    },
    "Catalog": {
},
"Methods": {
    "gsn": "GetAllSourceNames",
    "gun": "GetAllUserNames",
    "gjn": "GetAllJobNames",
    "gdn": "GetAllDepartmentNames",
    "gcn": "GetAllCompanyNames",
    "gen": "GetAllEmployeeNames",
    "gbun": "GetAllBusinessUnitNames",
    "gasst": "GetAllAssessmentTemplate",
    "gtn": "GetAllTestNames",
    "gcon": "GetAllConsultancyNames",
    "gcotn": "GetAllContractNames",
    "gappl": "GetAllJobApprovalLevels"
}
};
UsualConstants.CustomMethods = {
    "cmvi": "validate_int_only"
}

UsualConstants.Actions = {
    "ca1": {
        "Key": "jsa1",
        "Action": "GetAllJobNames",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Hide",
        "Label": "Hide Customer Business Owners"
    },
    "jsa1": {
        "Key": "jsa1",
        "Action": "HideCustomerBusinessOwners",
        "Visblity": "1",
        "Module": "JobManagement",
        "sub_module": "Hide",
        "Label": "Hide Customer Business Owners"
    },
    "jsa2": {
        "Key": "jsa2",
        "Action": "HideHiringManager",
        "Visblity": "1",
        "Module": "JobManagement",
        "sub_module": "Hide",
        "Label": "Hide Hiring Manager"
    },
    "jsa3": {
        "Key": "jsa3",
        "Action": "HideRecruiter",
        "Visblity": "1",
        "Module": "JobManagement",
        "sub_module": "Hide",
        "Label": "Hide Recruiter"
    },
    "jsa4": {
        "Key": "jsa4",
        "Action": "HideTargetOfferReleaseDate",
        "Visblity": "1",
        "Module": "JobManagement",
        "sub_module": "Hide",
        "Label": "Hide Target Offer Release Date"
    },
    "jsa5": {
        "Key": "jsa5",
        "Action": "HideTargetApplicantBoardingDate",
        "Visblity": "1",
        "Module": "JobManagement",
        "sub_module": "Hide",
        "Label": "Hide Target Applicant Boarding Date"
    },
    "jsa6": {
        "Key": "jsa6",
        "Action": "HideMyApplicantsMenuItem",
        "Visblity": "1",
        "Module": "JobManagement",
        "sub_module": "Hide",
        "Label": "Hides My Applicant Menu Item in Requisition Tab"
    },
    "jsa7": {
        "Key": "jsa7",
        "Action": "HideAllApplicantsMenuItem",
        "Visblity": "1",
        "Module": "JobManagement",
        "sub_module": "Hide",
        "Label": "Hides All Applicant Menu Item in Requisition Tab"
    },
    "jsa8": {
        "Key": "jsa8",
        "Action": "HideBillingDetailsIfContractLevelNotPresent",
        "Visblity": "1",
        "Module": "JobManagement",
        "sub_module": "Hide",
        "Label": "Hide Billing Details If Level Not Present in assigned contract"
    },
    "jsa9": {
        "Key": "jsa9",
        "Action": "GetListOfJobsByJobSearch",
        "Visblity": "1",
        "Module": "JobManagement",
        "sub_module": "Hide",
        "Label": "Enable Search In Requisition"
    },
    "jsa10": {
        "Key": "jsa10",
        "Action": "GetAllJobNames",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Hide",
        "Label": "Enable Manage Requisitions Dropdown"
    },
    "jsa11": {
        "Key": "jsa11",
        "Action": "HideJobProperties",
        "Visblity": "1",
        "Module": "JobManagement",
        "sub_module": "Hide",
        "Label": "Hide Requisition Properties In Vendor"
    },
    "jsa12": {
        "Key": "jsa12",
        "Action": "ShowAllJobsBasedOnStatus",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Hide",
        "Label": "Enable Requisition Status Dropdown"
    },
    "jsa13": {
        "Key": "jsa13",
        "Action": "CreateBusinessDashBoard",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Others",
        "Label": ""
    },
    "jsa14": {
        "Key": "jsa14",
        "Action": "UpdateBusinessDashBoard",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Others",
        "Label": ""
    },
    "jsa15": {
        "Key": "jsa15",
        "Action": "GetBusinessDashBoard",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Others",
        "Label": ""
    },
    "jsa16": {
        "Key": "jsa16",
        "Action": "CreateJobClosure",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Others",
        "Label": ""
    },
    "jsa17": {
        "Key": "jsa17",
        "Action": "UpdateJobClosure",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Others",
        "Label": ""
    },
    "jsa18": {
        "Key": "jsa18",
        "Action": "GetJobClosure",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Others",
        "Label": ""
    },
    "jsa19": {
        "Key": "jsa19",
        "Action": "MigrateExperienceRange",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Others",
        "Label": ""
    },
    "jsa20": {
        "Key": "jsa20",
        "Action": "CreateNotification",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Others",
        "Label": "Create Notification"
    },
    "jsa21": {
        "Key": "jsa21",
        "Action": "CreateExperienceRange",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Others",
        "Label": ""
    },
    "jsa22": {
        "Key": "jsa22",
        "Action": "UpdateExperienceRange",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Others",
        "Label": ""
    },
    "jsa23": {
        "Key": "jsa23",
        "Action": "StopJobSourcing",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Others",
        "Label": "Stop Job Sourcing"
    },
    "jsa24": {
        "Key": "jsa24",
        "Action": "GetAllExperienceRanges",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Others",
        "Label": ""
    },
    "jsa25": {
        "Key": "jsa25",
        "Action": "GetJobDetailsReport",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Others",
        "Label": ""
    },
    "jsa26": {
        "Key": "jsa26",
        "Action": "GetUserActivityReport",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Others",
        "Label": ""
    },
    "jsa27": {
        "Key": "jsa27",
        "Action": "GetCandidatesCountForUsers",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Others",
        "Label": ""
    },
    "jsa28": {
        "Key": "jsa28",
        "Action": "DeleteEmployee",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Others",
        "Label": ""
    },
    "jsa29": {
        "Key": "jsa29",
        "Action": "DelayNotRequired",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Others",
        "Label": "View Delay Not Required"
    },
    "jsa30": {
        "Key": "jsa30",
        "Action": "GetRequisitionStatusDashBoard",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Others",
        "Label": ""
    },
    "jsa31": {
        "Key": "jsa31",
        "Action": "MigratePrimaryInternalOwners",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Others",
        "Label": ""
    },
    "jsa32": {
        "Key": "jsa32",
        "Action": "SendCandidatesBillingAmountInfoMail",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Others",
        "Label": ""
    },
    "jsa33": {
        "Key": "jsa33",
        "Action": "UpdateResumeStatus",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Others",
        "Label": ""
    },
    "jsa34": {
        "Key": "jsa34",
        "Action": "DeleteResumeStatus",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Others",
        "Label": ""
    },
    "jsa35": {
        "Key": "jsa35",
        "Action": "UnDeleteResumeStatus",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Others",
        "Label": ""
    },
    "jsa36": {
        "Key": "jsa36",
        "Action": "CreateSLA",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Others",
        "Label": ""
    },
    "jsa37": {
        "Key": "jsa37",
        "Action": "UpdateSLA",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Others",
        "Label": ""
    },
    "jsa38": {
        "Key": "jsa38",
        "Action": "GetSLAsByJobId",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Others",
        "Label": ""
    },
    "jsa39": {
        "Key": "jsa39",
        "Action": "UpdateJobDelay",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Others",
        "Label": "To Update Requisition Delay"
    },
    "jsa40": {
        "Key": "jsa40",
        "Action": "InterviewerGetListOfJobsByCandidateId",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Others",
        "Label": "View Requisition Related to a Candidate for Interviewer"
    },
    "jsa41": {
        "Key": "jsa41",
        "Action": "InterviewerEditGetListOfJobsByCandidateId",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Others",
        "Label": "Edit Requisition Related to a Candidate for Interviewer"
    },
    "jsa42": {
        "Key": "jsa42",
        "Action": "AddCandidatesForJob",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Read Only",
        "Label": "Read Only View Of Requisition Details"
    },
    "jsa43": {
        "Key": "jsa43",
        "Action": "ReadOnlyJobDescription",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Read Only",
        "Label": "Read Only View Of Job Description"
    },
    "jsa44": {
        "Key": "jsa44",
        "Action": "AllJobPageFieldsUpdatable",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "To update all fields in job page"
    },
    "jsa45": {
        "Key": "jsa45",
        "Action": "AddJobCostCenter",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "View Level In Requisition Page"
    },
    "jsa46": {
        "Key": "jsa46",
        "Action": "ViewLocation",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "View Location In Add and Update Job"
    },
    "jsa47": {
        "Key": "jsa47",
        "Action": "HideCTCRangeInJob",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "Hide CTC range in requisition page"
    },
    "jsa48": {
        "Key": "jsa48",
        "Action": "ViewGrade",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "View Grade In Add and Update Job"
    },
    "jsa49": {
        "Key": "jsa49",
        "Action": "HideAttachmentLblInJob",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "Hide Attachment Text In Requisition Page"
    },
    "jsa50": {
        "Key": "jsa50",
        "Action": "ViewSkillCategory",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "View SkillCategory In Add and Update Job"
    },
    "jsa51": {
        "Key": "jsa51",
        "Action": "HideAttachmentsInJob",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "Hide Attachment Control In Requisition Page"
    },
    "jsa52": {
        "Key": "jsa52",
        "Action": "CreateJob",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "Add Requisition"
    },
    "jsa53": {
        "Key": "jsa53",
        "Action": "DeleteAssessmentTemplateToJob",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "View Delete Button In Assessment Template"
    },
    "jsa54": {
        "Key": "jsa54",
        "Action": "GetJobById",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "View Requisition Details"
    },
    "jsa55": {
        "Key": "jsa55",
        "Action": "UpdateJob",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "Edit Requisition Details"
    },
    "jsa56": {
        "Key": "jsa56",
        "Action": "EditJobPositionCode",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "Enable Edit Job Position Code"
    },
    "jsa57": {
        "Key": "jsa57",
        "Action": "HideWorkOnShiftsInJob",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "Hide Work On Shifts In Requisition Page"
    },
    "jsa58": {
        "Key": "jsa58",
        "Action": "AddNotesInJob",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "Show Notes"
    },
    "jsa59": {
        "Key": "jsa59",
        "Action": "HideExpRangeInJob",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "Hide Experience Range In Requisition Page"
    },
    "jsa60": {
        "Key": "jsa60",
        "Action": "AllJobPageFieldsUpdatable",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "To update all fields in job page"
    },
    "jsa61": {
        "Key": "jsa61",
        "Action": "ViewSensitivity",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "View Job Sensitivity"
    },
    "jsa62": {
        "Key": "jsa62",
        "Action": "CloseJobPostingDetail",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "Job posted to vendors will be not shown"
    },
    "jsa63": {
        "Key": "jsa63",
        "Action": "HidePriorityInJob",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "Hide Priority In Job"
    },
    "jsa64": {
        "Key": "jsa64",
        "Action": "ViewFullTime",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "View Part / Full Time"
    },
    "jsa65": {
        "Key": "jsa65",
        "Action": "ViewOriginalRequisitionId",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "View Original Requisition Id"
    },
    "jsa66": {
        "Key": "jsa66",
        "Action": "ViewHeadsUpPosition",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "View Heads Up Position"
    },
    "jsa67": {
        "Key": "jsa67",
        "Action": "ViewInternalConversion",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "Others"
    },
    "jsa68": {
        "Key": "jsa68",
        "Action": "ViewJobOpenDate",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "View Requisition Open Date"
    },
    "jsa69": {
        "Key": "jsa69",
        "Action": "ViewPositionType",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "View PositionType in Position Manager Grid"
    },
    "jsa70": {
        "Key": "jsa70",
        "Action": "EditJobStatus",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "Edit Job Status"
    },
    "jsa71": {
        "Key": "jsa71",
        "Action": "ViewJobStatus",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "View Job Status"
    },
    "jsa72": {
        "Key": "jsa72",
        "Action": "ViewCustomerTaOwners",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "View Customer TA Owners"
    },
    "jsa73": {
        "Key": "jsa73",
        "Action": "ViewThirdPartyOwners",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "View Third Party Owners"
    },
    "jsa74": {
        "Key": "jsa74",
        "Action": "EditExtensiveJobSkillCategory",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "Edit Skills Dropdown Of Req Page"
    },
    "jsa75": {
        "Key": "jsa75",
        "Action": "AddDisclaimerInJob",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "Add Disclaimer In Requisition Page"
    },
    "jsa76": {
        "Key": "jsa76",
        "Action": "TalentPortalPostingManager",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "Publish Requisition  To Talent Portal"
    },
    "jsa77": {
        "Key": "jsa77",
        "Action": "CandidatePostingManager",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "Publish Requisition To Candidates"
    },
    "jsa78": {
        "Key": "jsa78",
        "Action": "EmployeePostingManager",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "Publish Requisition To Employees"
    },
    "jsa79": {
        "Key": "jsa79",
        "Action": "VendorPostingManager",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "Publish Requisition To Vendors"
    },
    "jsa80": {
        "Key": "jsa80",
        "Action": "HideLevelInJob",
        "Visblity": "1",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "Hide Level In Requisition Page"
    },
    "jsa81": {
        "Key": "jsa81",
        "Action": "HideDescriptionInJob",
        "Visblity": "1",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "Hide Description In Requisition Page"
    },
    "jsa82": {
        "Key": "jsa82",
        "Action": "HideTypeOfOrgTargetSourcingInJob",
        "Visblity": "1",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "Hide Type Of Organisation Target Sourcing In Requisition Page"
    },
    "jsa83": {
        "Key": "jsa83",
        "Action": "HideInterviewers",
        "Visblity": "1",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "Hide Interviewers In Requisition Page"
    },
    "jsa84": {
        "Key": "jsa84",
        "Action": "ViewSBUForJob",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "View Department In Requisition Page"
    },
    "jsa85": {
        "Key": "jsa85",
        "Action": "HideFunctionalAreaInJob",
        "Visblity": "1",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "Hide Functional area In Requisition Page"
    },
    "jsa86": {
        "Key": "jsa86",
        "Action": "HideHeadCountApprovedInJob",
        "Visblity": "1",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "Hide Head Count Approved In Requisition Page"
    },
    "jsa87": {
        "Key": "jsa87",
        "Action": "HideEducationDetailsInJob",
        "Visblity": "1",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "Hide Education Details In Requisition Page"
    },
    "jsa88": {
        "Key": "jsa88",
        "Action": "HideJobCodeTitleInJob",
        "Visblity": "1",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "Hide Job Code title In Requisition Page"
    },
    "jsa89": {
        "Key": "jsa89",
        "Action": "HideSkillSetInJob",
        "Visblity": "1",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "Hide Skill Set In Requisition Page"
    },
    "jsa90": {
        "Key": "jsa90",
        "Action": "HideTravelRequiredInJob",
        "Visblity": "1",
        "Module": "JobManagement",
        "sub_module": "Requisition Screen",
        "Label": "Hide Travel Required In Requisition Page"
    },
    "jsa91": {
        "Key": "jsa91",
        "Action": "GiveFeedbackFromRecruiter",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition/Applicant Operation",
        "Label": "Give Feedback From Recruiter"
    },
    "jsa92": {
        "Key": "jsa92",
        "Action": "ArchiveJob",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition/Applicant Operation",
        "Label": "Remove Requisition"
    },
    "jsa93": {
        "Key": "jsa93",
        "Action": "UnArchiveJob",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition/Applicant Operation",
        "Label": "Retrieve Removed Requisition"
    },
    "jsa94": {
        "Key": "jsa94",
        "Action": "ResetApplicantStatus",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition/Applicant Operation",
        "Label": "Reset Candidate Applicant Status"
    },
    "jsa95": {
        "Key": "jsa95",
        "Action": "SaveRecruitersFeedBackForm",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition/Applicant Operation",
        "Label": "Add/View Recruiter Feedback"
    },
    "jsa96": {
        "Key": "jsa96",
        "Action": "BulkJobUpdate",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition/Applicant Operation",
        "Label": "Bulk Update"
    },
    "jsa97": {
        "Key": "jsa97",
        "Action": "PublishRequisitionsToVendors",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition/Applicant Operation",
        "Label": "Publish Requisitions To Vendors"
    },
    "jsa98": {
        "Key": "jsa98",
        "Action": "MIFCandidateKey",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition/Applicant Operation",
        "Label": "Apply Candidate For Requisition"
    },
    "jsa99": {
        "Key": "jsa99",
        "Action": "CloneAssessmentTemplate",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition/Applicant Operation",
        "Label": "Make Duplicate Copy Of Assessment Template"
    },
    "jsa100": {
        "Key": "jsa100",
        "Action": "ResetApplicantStatus",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition/Applicant Operation",
        "Label": "Reset Candidate Applicant Status"
    },
    "jsa101": {
        "Key": "jsa101",
        "Action": "StopAllVendorSourcing",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition/Applicant Operation",
        "Label": "Stop Resume Sourcing By Vendors"
    },
    "jsa102": {
        "Key": "jsa102",
        "Action": "AddOrRemoveCandidateFromBulkInterview",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition/Applicant Operation",
        "Label": "Bulk Tagging Of Candidates For Interview"
    },
    "jsa103": {
        "Key": "jsa103",
        "Action": "ViewArchivedRequisitions",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition/Applicant Operation",
        "Label": "View Removed Requisitions"
    },
    "jsa104": {
        "Key": "jsa104",
        "Action": "RescheduleInterview",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition/Applicant Operation",
        "Label": "Reschedule Interview"
    },
    "jsa105": {
        "Key": "jsa105",
        "Action": "ViewInterviewerFeedBack",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition/Applicant Operation",
        "Label": "View Interviewers FeedBack"
    },
    "jsa106": {
        "Key": "jsa106",
        "Action": "ConductInterview",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition/Applicant Operation",
        "Label": "Conduct Interview"
    },
    "jsa107": {
        "Key": "jsa107",
        "Action": "SaveInterviewRequest",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition/Applicant Operation",
        "Label": "Schedule Interview"
    },
    "jsa108": {
        "Key": "jsa108",
        "Action": "SendResumeToInterviewer",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition/Applicant Operation",
        "Label": "Send Resume For Technical Screening"
    },
    "jsa109": {
        "Key": "jsa109",
        "Action": "AssessmentFeedbackManagerInJob",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "Requisition/Applicant Operation",
        "Label": "Associate Interview Template For Feedback"
    },
    "jsa110": {
        "Key": "jsa110",
        "Action": "ViewAllApplicants",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "View Applicants"
    },
    "jsa111": {
        "Key": "jsa111",
        "Action": "ViewAllRejectedCandidates",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "View All Rejected Candidates"
    },
    "jsa112": {
        "Key": "jsa112",
        "Action": "PositionManager",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "Position Manager"
    },
    "jsa113": {
        "Key": "jsa113",
        "Action": "GetAllJobs",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "View Requisition Module"
    },
    "jsa114": {
        "Key": "jsa114",
        "Action": "GetListOfApplicants",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "View Applicants"
    },
    "jsa115": {
        "Key": "jsa115",
        "Action": "GetAllApprovedJobs",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "View Approved Requisition"
    },
    "jsa116": {
        "Key": "jsa116",
        "Action": "HideCustomEntityInVendor",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "Hide CustomEntity In Vendor Job"
    },
    "jsa117": {
        "Key": "jsa117",
        "Action": "ViewPositionManagerModification",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "View Add/Drop Position"
    },
    "jsa118": {
        "Key": "jsa118",
        "Action": "ViewResumeStatus",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "View Resume Status info"
    },
    "jsa119": {
        "Key": "jsa119",
        "Action": "ApplicantFilter",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "Advance Report for Applicant"
    },
    "jsa120": {
        "Key": "jsa120",
        "Action": "GetAllOffers",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "View All Offers"
    },
    "jsa121": {
        "Key": "jsa121",
        "Action": "AddAutoScreeningRule",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "Add AutoScreening Rule"
    },
    "jsa122": {
        "Key": "jsa122",
        "Action": "TagAutoScreeningRule",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "Tag AutoScreening Rule"
    },
    "jsa123": {
        "Key": "jsa123",
        "Action": "ViewAllAutoScreeningRule",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "View All AutoScreening Rule"
    },
    "jsa124": {
        "Key": "jsa124",
        "Action": "GetListOfCandidatesByJobId",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "View Candidates Associated To Requisition"
    },
    "jsa125": {
        "Key": "jsa125",
        "Action": "GetListOfJobsByCandidateId",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "View Requisitions Associated To Candidate"
    },
    "jsa126": {
        "Key": "jsa126",
        "Action": "GetListOfOffersByOfferSearch",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "View All Offered Candidates"
    },
    "jsa127": {
        "Key": "jsa127",
        "Action": "GetAllInterviewDetails",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "View Interview Schedules"
    },
    "jsa128": {
        "Key": "jsa128",
        "Action": "GetAllJoinedCandidates",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "View All Joined Candidates"
    },
    "jsa129": {
        "Key": "jsa129",
        "Action": "GetAllOtherJobs",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "View Other Requisitions"
    },
    "jsa130": {
        "Key": "jsa130",
        "Action": "ViewAllEvents",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "View all events"
    },
    "jsa131": {
        "Key": "jsa131",
        "Action": "GetAllMyJobs",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "View My Requisitions"
    },
    "jsa132": {
        "Key": "jsa132",
        "Action": "ViewCandidatesAgainstEvent",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "View candidates against event"
    },
    "jsa133": {
        "Key": "jsa133",
        "Action": "GetAllPendingJobs",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "View All Requisitions Pending For Approval"
    },
    "jsa134": {
        "Key": "jsa134",
        "Action": "TagRequisitonEvent",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "Add or view event to requisition"
    },
    "jsa135": {
        "Key": "jsa135",
        "Action": "GetAllOfferedJobs",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "Offer Manager"
    },
    "jsa136": {
        "Key": "jsa136",
        "Action": "TagTestEvent",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "Tag test to event"
    },
    "jsa137": {
        "Key": "jsa137",
        "Action": "ViewCandidatesAgainstEvent",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "View candidates against event"
    },
    "jsa138": {
        "Key": "jsa138",
        "Action": "TagRequisitonEvent",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "Add or view event to requisition"
    },
    "jsa139": {
        "Key": "jsa139",
        "Action": "TagTestEvent",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "Tag test to event"
    },
    "jsa140": {
        "Key": "jsa140",
        "Action": "GetAllClosedJobs",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "View All Closed Requisitions"
    },
    "jsa141": {
        "Key": "jsa141",
        "Action": "GetAllInterviewRequest",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "View All Interview Requests"
    },
    "jsa142": {
        "Key": "jsa142",
        "Action": "GetAllInterviewedCandidates",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "View All Interviewed Candidates"
    },
    "jsa143": {
        "Key": "jsa143",
        "Action": "GetInterviewerReportForDashboard",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "View Interviewer Report"
    },
    "jsa144": {
        "Key": "jsa144",
        "Action": "GetAllTechnicalScreening",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "View All Technical Screening"
    },
    "jsa145": {
        "Key": "jsa145",
        "Action": "ViewAllJobs",
        "Visblity": "0",
        "Module": "JobManagement",
        "sub_module": "View",
        "Label": "View All Requisitions"
    }
};