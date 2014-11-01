var usual;
var tenantInfo = {TenantId : 123, UserId : "321"}; //getTenantAdamInfo();
var System ={};
    
function UsualInfoDetails() {

    this.RemoveElement = false;   // 'true' element will be remove from the html , 'false' element will be there in html but in display none
    this.ControlsToBeLoaded = {}; // {"parentDivOrModalId": "" , "divIdsPaths" [{"divId":"", "path" : "/Candidate/JSONCandidate/Candidate.ascx"}], "ModalWindowDetails":{"HeaderText":"","Width":,"Height":}};    
    this.serviceCallsFor = [];  //{"type":11, "toBindId":, "id": UsualConstants.ElementType[1], "additionalRequest":request};
    this.elementTypes = []; // This contains array of {"eleId":,"jProperty": , "jtype": , "eleType": , "mandatory":}
    this.elementTypesByEleId = []; // This contains arrays of elements object based on Id as key 
    this.eleIdByJsonProperty = []; // This give element Id by Json Property as a Key 
    this.DefaultText = "Not Specified";
    this.PageLoaded = false;
    this.WaitingForPageLoad = []; //{["methodName":"","request":{}]}; 
    this.ExternalKeyExecute = [];

    var waitTillControlsAreLoaded = false;
    var combosIds = [];
    var browser = detectBrowser();

    this.Load = function () {
        usual = this;
        usual.PageLoaded = false;
        waitTillControlsAreLoaded = false;
        combosIds = [];
        LoadHTMLFromControls();
    }



    var LoadHTMLFromControls = function () { //This method gets the Html string and assigns this to the div id specified or appends to the parent div Id
        var request = { "Path": [] };
        var divIdsPaths = usual.ControlsToBeLoaded.divIdsPaths;
        for (var ci = 0; ci < divIdsPaths.length; ci++) {
            request.Path[request.Path.length] = divIdsPaths[ci].path;
        }
        callAjaxService("GetHtmlforControls", request, callLoadHTMLFromControlsSuccess, callBackUsualFail);

        function callLoadHTMLFromControlsSuccess(response) {
            if (response && (response.IsException == true)) {
                ErrorMessageHandler(response.Message);
                return;
            }
            if (response && response.GetHtmlStingList && response.GetHtmlStingList.length > 0) {
                var combinedHtml = "";
                for (var csi = 0; csi < response.GetHtmlStingList.length; csi++) {
                    if (csi == (response.GetHtmlStingList.length - 1)) {
                        waitTillControlsAreLoaded = true;
                    }
                    for (var ci = 0; ci < divIdsPaths.length; ci++) {
                        if (response.GetHtmlStingList[csi].path == divIdsPaths[ci].path)
                            if (response.GetHtmlStingList[csi].HtmlString) {
                                if (divIdsPaths[ci].divId && divIdsPaths[ci].divId != "") {
                                    $("#" + divIdsPaths[ci].divId).html(""); // Empty the Div 
                                    $("#" + divIdsPaths[ci].divId).html(response.GetHtmlStingList[csi].HtmlString);
                                    usual.LoadGeneralInfo(divIdsPaths[ci].divId);
                                }
                                else {
                                    combinedHtml += response.GetHtmlStingList[csi].HtmlString;
                                }
                            }
                    }
                }
                if (!usual.ControlsToBeLoaded.ModalWindowDetails && usual.ControlsToBeLoaded.parentDivOrModalId && usual.ControlsToBeLoaded.parentDivOrModalId != "" && $("#" + usual.ControlsToBeLoaded.parentDivOrModalId)[0]) {
                    $("#" + usual.ControlsToBeLoaded.parentDivOrModalId).html(combinedHtml);
                    usual.LoadGeneralInfo(usual.ControlsToBeLoaded.parentDivOrModalId);
                }
                else if (usual.ControlsToBeLoaded.ModalWindowDetails) {
                    modal = new Modal();
                    if (usual.ControlsToBeLoaded.ModalWindowDetails.HeaderText && usual.ControlsToBeLoaded.ModalWindowDetails.HeaderText != "")
                        modal.HeaderText = usual.ControlsToBeLoaded.ModalWindowDetails.HeaderText;

                    modal.ModalId = usual.ControlsToBeLoaded.parentDivOrModalId;
                    if (usual.ControlsToBeLoaded.ModalWindowDetails.Height)
                        modal.Height = usual.ControlsToBeLoaded.ModalWindowDetails.Height;
                    if (usual.ControlsToBeLoaded.ModalWindowDetails.Width)
                        modal.Width = usual.ControlsToBeLoaded.ModalWindowDetails.Width;
                    modal.HTML = combinedHtml;
                    modal.Open();

                    usual.LoadGeneralInfo(usual.ControlsToBeLoaded.parentDivOrModalId);
                }
            }
        }
    }



    this.LoadGeneralInfo = function (forDivId) {
        var ids = [];
        //Actions
        //var checkForActionName = $('#' + forDivId + ' [name*="ac$"]');
        //hideControlBasedOnAction(checkForActionName, "name"); 

        var checkForActionClass = $('#' + forDivId + ' [class*="ac$"]');
        hideControlBasedOnAction(checkForActionClass, "class");

        for (var d = 0; d < ids.length; d++) {
            var eleOtherProperty = getElementAttributes(ids[d].id);

            if (eleOtherProperty.jProperty && eleOtherProperty.jProperty != "") {
                usual.elementTypes[usual.elementTypes.length] = eleOtherProperty;
                usual.elementTypesByEleId[ids[d].id] = eleOtherProperty; //{ "eleId":, "jProperty":, "jtype":, "eleType":, "mandatory":, "rule":, "errorMessage":, "label":, "customMethod":, "action":, "BindingMethod":, "BindingCatalog":, "BindingEnum": };
                usual.eleIdByJsonProperty[eleOtherProperty.jProperty] = ids[d].id;
            }
            //            //Action Key
            //            if (eleOtherProperty.action) {
            //                var takeAction = checkWithAction(eleOtherProperty.action);
            //                removeOrDisplay(ids[d].id, takeAction);
            //            }
            //Date time Pickers
            if (eleOtherProperty.eleType == 7 || eleOtherProperty.eleType == 10 || eleOtherProperty.eleType == 11 || eleOtherProperty.eleType == 12) {
                LoadDtpControl({ "id": ids[d].id, "type": eleOtherProperty.eleType });
                continue;
            }
            //Combos 
            if (eleOtherProperty.eleType == 4 || eleOtherProperty.eleType == 5 || eleOtherProperty.eleType == 6 || eleOtherProperty.eleType == 0 || eleOtherProperty.eleType == 1) {
                combosIds[combosIds.length] = { "id": ids[d].id };
                continue;
            }
            if (eleOtherProperty.eleType == 13 || eleOtherProperty.eleType == 14) {
                var defaultRule = { "Extention": ".doc,.txt,.pdf,.docx", "MaxSize": 3072, "CallBackFun": "", "MaxNoOfFiles": 1, "Width": "240" };
                if (eleOtherProperty.rule && eleOtherProperty.rule != "" && UsualConstants.AttachementRule[eleOtherProperty.rule]) {
                    defaultRule = UsualConstants.AttachementRule[eleOtherProperty.rule];
                }
                $("#" + eleOtherProperty.eleId).customAjaxUpload({ UploadMultiFileLimit: defaultRule.MaxNoOfFiles, Extention: defaultRule.Extention, MaxSize: defaultRule.MaxSize, CallBackFun: defaultRule.CallBackFun, Width: defaultRule.Width });
            }
        }
        if (waitTillControlsAreLoaded) {
            if (combosIds && combosIds.length > 0)
                usual.FillCombos(combosIds);
            else
                usual.isPageLoaded(true);
        }
    }



    this.GetJsonObject = function () {
        usual = this;
        var jsonObject = {};
        var linkToMandatory = [];
        if (usual.elementTypes && usual.elementTypes.length > 0) {
            for (var et = 0; et < usual.elementTypes.length; et++) {
                var eleValue;
                var jObject = jsonObject;
                var eleJsonObj = usual.elementTypes[et].jProperty;
                if (usual.elementTypes[et].jProperty.indexOf(".") != -1) { // This if will enable for muilt sub Properties 
                    var subProperty = usual.elementTypes[et].jProperty.split(".");
                    for (var ap = 0; ap < (subProperty.length - 1); ap++) {
                        if (!jObject[subProperty[ap]])
                            jObject[subProperty[ap]] = {};
                        jObject = jObject[subProperty[ap]];
                    }
                    eleJsonObj = subProperty[subProperty.length - 1];
                }
                switch (usual.elementTypes[et].eleType) {
                    case "2":
                    case "7":
                    case "10":
                    case "11":
                    case "12":
                        eleValue = $("#" + usual.elementTypes[et].eleId).val();
                        if (usual.elementTypes[et].mandatory && usual.elementTypes[et].mandatory == 1 && eleValue.trim() == "") {
                            usualDisplayErrorMessage(usual.elementTypes[et].eleId, false, usual.elementTypes[et].label + System.Messages.Usual.Error.textMandatory);
                            return;
                        }
                        else {
                            $("#" + usual.elementTypes[et].eleId.replace("ele", "err")).html("");
                        }
                        if ((usual.elementTypes[et].jtype == "ji" || usual.elementTypes[et].jtype == "jni") && eleValue && eleValue.trim() != "" && eleValue.match('^[0-9]*$'))
                            eleValue = eval(eleValue);
                        if ((usual.elementTypes[et].jtype == "jf" || usual.elementTypes[et].jtype == "jnf") && eleValue && eleValue.trim() != "" && eleValue.match('^[0-9]*\.[0-9]*$'))
                            eleValue = eval(eleValue);
                        if (eleValue != undefined && typeof (eleValue) != "number" && eleValue.trim() == "" && (usual.elementTypes[et].jtype == "ji" || usual.elementTypes[et].jtype == "jf"))
                            eleValue = undefined;
                        if (eleValue != undefined && typeof (eleValue) != "number" && eleValue.trim() == "" && (usual.elementTypes[et].jtype == "jns" || usual.elementTypes[et].jtype == "jnf" || usual.elementTypes[et].jtype == "jni"))
                            eleValue = null;

                        jObject[eleJsonObj] = eleValue;
                        if (eleValue != "" && eleValue != null && usual.elementTypes[et].rule && usual.elementTypes[et].rule != "") {
                            var validated = usualValidate(usual.elementTypes[et].eleId);
                            if (validated) return;
                        }
                        break;
                    case "4": // Html Select Drop Down
                        eleValue = $("#" + usual.elementTypes[et].eleId + " :selected").text();
                        var eleValueId = $("#" + usual.elementTypes[et].eleId + " :selected").val();
                        if (usual.elementTypes[et].mandatory && usual.elementTypes[et].mandatory == 1 && eleValue && (eleValueId == undefined || eleValueId == 0 || eleValueId == "" || eleValueId == "9999" || eleValueId == "Choose")) {
                            usualDisplayErrorMessage(usual.elementTypes[et].eleId, false, System.Messages.Usual.Error.selectMandatory + usual.elementTypes[et].label);
                            return;
                        } else {
                            $("#" + usual.elementTypes[et].eleId.replace("ele", "err")).html("");
                        }
                        if (usual.elementTypes[et].jtype == "ji" && eleValueId && eleValueId != "9999" && eleValueId != "" && eleValueId.match('^[0-9]*$'))
                            jObject[eleJsonObj] = eval(eleValueId);
                        else if (eleValue && eleValue.toLowerCase() != "choose" && eleValue != "")
                            jObject[eleJsonObj] = eleValue;
                        break;
                    case "5": //Combo-MultiSelect 
                        eleValue = getSelectedIdsCustomCombo(usual.elementTypes[et].eleId);
                        if (usual.elementTypes[et].mandatory && usual.elementTypes[et].mandatory == 1 && (eleValue == undefined || eleValue.length == 0)) {
                            usualDisplayErrorMessage(usual.elementTypes[et].eleId, false, System.Messages.Usual.Error.selectMandatory + usual.elementTypes[et].label);
                            return;
                        } else {
                            $("#" + usual.elementTypes[et].eleId.replace("ele", "err")).html("");
                        }
                        jObject[eleJsonObj] = eleValue;
                        break;
                    case "6": // Combo-Custom_SingleSelect
                        var eleValueId = getSelectedIdsCustomCombo(usual.elementTypes[et].eleId);
                        eleValue = getSelectedTextCustomCombo(usual.elementTypes[et].eleId);
                        if (usual.elementTypes[et].mandatory && usual.elementTypes[et].mandatory == 1 && eleValue && (eleValue == "9999" || eleValue == "" || eleValue == 0 || eleValue == "Choose")) {
                            usualDisplayErrorMessage(usual.elementTypes[et].eleId, false, System.Messages.Usual.Error.selectMandatory + usual.elementTypes[et].label);
                            return;
                        } else {
                            $("#" + usual.elementTypes[et].eleId.replace("ele", "err")).html("");
                        }
                        if (usual.elementTypes[et].jtype == "ji" && eleValueId && eleValueId != "9999" && eleValueId != "" && eleValueId.match('^[0-9]*$'))
                            jObject[eleJsonObj] = eval(eleValueId);
                        else if (eleValue && eleValue.toLowerCase() != "choose" && eleValue != "")
                            jObject[eleJsonObj] = eleValue;
                        break;
                    case "1": // For Radio Button
                        eleValue = document.getElementById(usual.elementTypes[et].eleId).checked;
                        var eleValueValue = document.getElementById(usual.elementTypes[et].eleId).value;
                        if (usual.elementTypes[et].jtype == "je" && jObject[eleJsonObj] == undefined)
                            jObject[eleJsonObj] = 0;

                        if (usual.elementTypes[et].mandatory && usual.elementTypes[et].mandatory == 1 && !Contains(linkToMandatory, eleJsonObj))
                            linkToMandatory[linkToMandatory.length] = { "jProperty": eleJsonObj, "eleId": usual.elementTypes[et].eleId };

                        if (eleValueValue && eleValueValue != "on" && eleValue)
                            jObject[eleJsonObj] = eleValueValue;
                        else if (eleValue)
                            jObject[eleJsonObj] = eleValue;
                        break;
                    case "3":  // for TextArea
                        eleValue = $("#" + usual.elementTypes[et].eleId).val();
                        if (usual.elementTypes[et].mandatory && usual.elementTypes[et].mandatory == 1 && eleValue != undefined && eleValue.trim() == "") {
                            usualDisplayErrorMessage(usual.elementTypes[et].eleId, false, usual.elementTypes[et].label + System.Messages.Usual.Error.textMandatory);
                            return;
                        } else {
                            $("#" + usual.elementTypes[et].eleId.replace("ele", "err")).html("");
                        }

                        if (eleValue != undefined && eleValue.trim() == "" && (usual.elementTypes[et].jtype == "jns" || usual.elementTypes[et].jtype == "jnf" || usual.elementTypes[et].jtype == "jni"))
                            eleValue = null;
                        jObject[eleJsonObj] = eleValue;
                        break;
                    case "13":
                    case "14": // For Attachment 
                        jObject[eleJsonObj] = {};
                        eleValue = $.fn.getUpdatedAttachmentsDetails(usual.elementTypes[et].eleId);
                        if (eleValue)
                            jObject[eleJsonObj] = eleValue;
                        else
                            jObject[eleJsonObj] = null;

                        if (usual.elementTypes[et].mandatory && usual.elementTypes[et].mandatory == 1 && jObject[eleJsonObj] == null && eleValue && (!eleValue.ExistingFileDetails || eleValue.ExistingFileDetails.length == 0)) {
                            usualDisplayErrorMessage(usual.elementTypes[et].eleId, false, usual.elementTypes[et].label + System.Messages.Usual.Error.textMandatory);
                            return;
                        }
                        else {
                            $("#" + usual.elementTypes[et].eleId.replace("ele", "err")).html("");
                        }
                        break;
                }
            }
            if (linkToMandatory && linkToMandatory.length > 0) {
                for (var ik = 0; ik < linkToMandatory.length; ik++) {
                    if (!jsonObject[linkToMandatory[ik].jProperty] || jsonObject[linkToMandatory[ik].jProperty] == 0) {
                        usualDisplayErrorMessage(usual.elementTypesByEleId[linkToMandatory[ik].eleId].eleId, false, usual.elementTypesByEleId[linkToMandatory[ik].eleId].label + System.Messages.Usual.Error.textMandatory);
                        return;
                    } else {
                        $("#" + linkToMandatory[ik].eleId.replace("ele", "err")).html("");
                    }
                }
            }
        }
        return jsonObject;
    }



    this.isPageLoaded = function (loaded) {
        if (loaded && waitTillControlsAreLoaded) {
            usual.PageLoaded = true;
            var w = 0;
            while (usual.WaitingForPageLoad.length > w) {
                if (usual.WaitingForPageLoad[w].executedKey && usual.WaitingForPageLoad[w].executedKey != "" && usual.ExternalKeyExecute.length == 0)
                    return;
                if (usual.WaitingForPageLoad[w].executedKey && usual.WaitingForPageLoad[w].executedKey != "" && usual.ExternalKeyExecute && usual.ExternalKeyExecute.length > 0) {
                    if (usual.ExternalKeyExecute.length > 0 && !Contains(usual.ExternalKeyExecute, usual.WaitingForPageLoad[w].executedKey) && usual.WaitingForPageLoad.length > (w + 1)) {
                        w += 1;
                        continue;
                    }
                    else if (!Contains(usual.ExternalKeyExecute, usual.WaitingForPageLoad[w].executedKey)) {
                        return;
                    }
                }

                if (usual.WaitingForPageLoad[w].methodName && usual.WaitingForPageLoad[w].methodName != "") {
                    usual[usual.WaitingForPageLoad[w].methodName](usual.WaitingForPageLoad[w].request);
                }
                else if (usual.WaitingForPageLoad[w].executeFunction) {
                    var functionToExecute = usual.WaitingForPageLoad[w].executeFunction;
                    if (usual.WaitingForPageLoad[w].request && usual.WaitingForPageLoad[w].request != "")
                        functionToExecute(usual.WaitingForPageLoad[w].request);
                    else
                        functionToExecute();
                }
                usual.WaitingForPageLoad.remove(w);
            }
        }
        disableLoading();
    }



    this.FillCombos = function (serviceCallsFor, externalKey) {
        usual = this;
        TenantId = tenantInfo.TenantId;
        UserId = tenantInfo.UserId;
        var request = { "ListRequest": [] };
        var catalogMaster = [];
        var serviceMethodsRequested = [];
        var catalogNameWithElementId = [];

        for (sc = 0; sc < serviceCallsFor.length; sc++) {
            var toBindData;
            var eleDetails = usual.elementTypesByEleId[serviceCallsFor[sc].id];
            if (eleDetails.BindingMethod)
                toBindData = UsualConstants.Catalogs.Methods[eleDetails.BindingMethod];
            else if (eleDetails.BindingEnum)
                toBindData = "Enum";
            else if (eleDetails.BindingCatalog)
                toBindData = "Catalog";
            //Build Empty Combo
            if (usual.elementTypesByEleId[serviceCallsFor[sc].id].eleType == 6)
                var comboCustomSingle = new Combo(serviceCallsFor[sc].id, SINGLE_SELECT);
            if (usual.elementTypesByEleId[serviceCallsFor[sc].id].eleType == 5)
                var comboCustomMulit = new Combo(serviceCallsFor[sc].id, MULTI_SELECT);

            switch (toBindData) {
                case "GetAllDepartmentNames": //Get all Departments          
                    var deptRequest = {};
                    if (serviceCallsFor[sc].additionalRequest)
                        deptRequest = serviceCallsFor[sc].additionalRequest;
                    deptRequest.TenantId = TenantId;
                    deptRequest.UserId = UserId;
                    deptRequest.IsOnlyParentRequired = true;
                    request.ListRequest[request.ListRequest.length] = { "EntityType": 11, "DeptNameRequest": deptRequest }
                    serviceMethodsRequested[serviceMethodsRequested.length] = { "EntityType": 11, "ElementType": eleDetails.eleType, "ElementId": eleDetails.eleId }
                    break;
                case "GetAllUserNames": //Get all Users    
                    var userRequest = {};
                    if (serviceCallsFor[sc].additionalRequest)
                        userRequest.CommonNameRequest = serviceCallsFor[sc].additionalRequest;
                    userRequest.TenantId = TenantId;
                    userRequest.UserId = UserId;
                    if (!userRequest.CommonNameRequest) userRequest.CommonNameRequest = {};
                    request.ListRequest[request.ListRequest.length] = { "EntityType": 2, "UserNameRequest": userRequest }
                    serviceMethodsRequested[serviceMethodsRequested.length] = { "EntityType": 2, "ElementType": eleDetails.eleType, "ElementId": eleDetails.eleId }
                    break;
                case "GetAllCompanyNames": //Get all Companys
                    var companysRequest = {};
                    if (serviceCallsFor[sc].additionalRequest)
                        companysRequest = serviceCallsFor[sc].additionalRequest;
                    companysRequest.TenantId = TenantId;
                    companysRequest.UserId = UserId;
                    request.ListRequest[request.ListRequest.length] = { "EntityType": 10, "CompanieNameRequest": companysRequest }
                    serviceMethodsRequested[serviceMethodsRequested.length] = { "EntityType": 10, "ElementType": eleDetails.eleType, "ElementId": eleDetails.eleId }
                    break;
                case "GetAllEmployeeNames":  //Get all Employees   
                    var employeeRequest = {};
                    if (serviceCallsFor[sc].additionalRequest)
                        employeeRequest = serviceCallsFor[sc].additionalRequest;
                    employeeRequest.TenantId = TenantId;
                    employeeRequest.UserId = UserId;
                    request.ListRequest[request.ListRequest.length] = { "EntityType": 12, "EmployeesNameRequest": employeeRequest, "CompanyId": getTenantCompanyId }
                    serviceMethodsRequested[serviceMethodsRequested.length] = { "EntityType": 12, "ElementType": eleDetails.eleType, "ElementId": eleDetails.eleId }
                    break;
                case "GetAllBusinessUnitNames": //Get all Bussiness Unit      
                    var bussinessUnitRequest = {};
                    if (serviceCallsFor[sc].additionalRequest)
                        bussinessUnitRequest = serviceCallsFor[sc].additionalRequest;
                    bussinessUnitRequest.TenantId = TenantId;
                    bussinessUnitRequest.UserId = UserId;
                    if (!bussinessUnitRequest.CommonNameRequest) bussinessUnitRequest.CommonNameRequest = {};
                    bussinessUnitRequest.CommonNameRequest.IsSbuOnly = false;
                    request.ListRequest[request.ListRequest.length] = { "EntityType": 34, "BussinessUnitNameRequest": bussinessUnitRequest }
                    serviceMethodsRequested[serviceMethodsRequested.length] = { "EntityType": 34, "ElementType": eleDetails.eleType, "ElementId": eleDetails.eleId }
                    break;
                case "GetAllContractNames":  //Get all Contracts 
                    var contractsRequest = {};
                    if (serviceCallsFor[sc].additionalRequest)
                        contractsRequest = serviceCallsFor[sc].additionalRequest;
                    contractsRequest.TenantId = TenantId;
                    contractsRequest.UserId = UserId;
                    request.ListRequest[request.ListRequest.length] = { "EntityType": 40, "ContractNameRequest": contractsRequest }
                    serviceMethodsRequested[serviceMethodsRequested.length] = { "EntityType": 40, "ElementType": eleDetails.eleType, "ElementId": eleDetails.eleId }
                    break;
                case "GetAllSourceNames": //Get all Sources    
                    var sourcesRequest = {};
                    if (serviceCallsFor[sc].additionalRequest)
                        sourcesRequest = serviceCallsFor[sc].additionalRequest;
                    sourcesRequest.TenantId = TenantId;
                    sourcesRequest.UserId = UserId;
                    if (!sourcesRequest.CommonNameRequest) sourcesRequest.CommonNameRequest = {};
                    if (!sourcesRequest.CommonNameRequest.SourceType) sourcesRequest.CommonNameRequest.SourceType = 0;
                    request.ListRequest[request.ListRequest.length] = { "EntityType": 15, "SourceNameRequest": sourcesRequest }
                    serviceMethodsRequested[serviceMethodsRequested.length] = { "EntityType": 15, "ElementType": eleDetails.eleType, "ElementId": eleDetails.eleId }
                    break;
                case "GetAllConsultancyNames": //Get all Consultancy         
                    var sourcesConsultancyRequest = {};
                    if (serviceCallsFor[sc].additionalRequest)
                        sourcesConsultancyRequest = serviceCallsFor[sc].additionalRequest;
                    sourcesConsultancyRequest.TenantId = TenantId;
                    sourcesConsultancyRequest.UserId = UserId;
                    request.ListRequest[request.ListRequest.length] = { "EntityType": 39, "ConsultantNameRequest": sourcesConsultancyRequest }
                    serviceMethodsRequested[serviceMethodsRequested.length] = { "EntityType": 39, "ElementType": eleDetails.eleType, "ElementId": eleDetails.eleId }
                    break;
                case "GetAllAssessmentTemplate": //Get all Assessment Template 
                    var AssessmentTemplateRequest = {};
                    if (serviceCallsFor[sc].additionalRequest)
                        AssessmentTemplateRequest = serviceCallsFor[sc].additionalRequest;
                    AssessmentTemplateRequest.TenantId = TenantId;
                    AssessmentTemplateRequest.UserId = UserId;
                    AssessmentTemplateRequest.IsOnlyTeplateName = true;
                    request.ListRequest[request.ListRequest.length] = { "EntityType": 35, "AssessmentTemplateNameRequest": AssessmentTemplateRequest }
                    serviceMethodsRequested[serviceMethodsRequested.length] = { "EntityType": 35, "ElementType": eleDetails.eleType, "ElementId": eleDetails.eleId }
                    break;
                case "GetAllJobNames": //Get all Jobs      
                    var JobsRequest = {};
                    if (serviceCallsFor[sc].additionalRequest)
                        JobsRequest = serviceCallsFor[sc].additionalRequest;
                    JobsRequest.TenantId = TenantId;
                    JobsRequest.UserId = UserId;
                    request.ListRequest[request.ListRequest.length] = { "EntityType": 14, "JobNameRequest": JobsRequest }
                    serviceMethodsRequested[serviceMethodsRequested.length] = { "EntityType": 14, "ElementType": eleDetails.eleType, "ElementId": eleDetails.eleId }
                    break;
                case 42: //Get all Job Approval
                    var jobApprovalRequest = {};
                    if (serviceCallsFor[sc].additionalRequest)
                        jobApprovalRequest = serviceCallsFor[sc].additionalRequest;
                    jobApprovalRequest.TenantId = TenantId;
                    jobApprovalRequest.UserId = UserId;
                    request.ListRequest[request.ListRequest.length] = { "EntityType": 42, "ApprovalNameRequest": jobApprovalRequest }
                    serviceMethodsRequested[serviceMethodsRequested.length] = { "EntityType": 42, "ElementType": eleDetails.eleType, "ElementId": eleDetails.eleId }
                    break;
                case "Catalog": //Get all Catalog     
                    if (!Contains(catalogMaster, eleDetails.BindingCatalog)) {
                        catalogMaster[catalogMaster.length] = eleDetails.BindingCatalog;
                    }
                    catalogNameWithElementId[catalogNameWithElementId.length] = { "CatalogName": eleDetails.BindingCatalog, "ElementId": eleDetails.eleId, "ElementType": eleDetails.eleType }
                    break;
            }
        }
        if (catalogMaster && catalogMaster.length > 0) {
            var catalogRequest = { "TenantId": TenantId, "UserId": UserId };
            catalogRequest.CatalogName = catalogMaster;
            request.ListRequest[request.ListRequest.length] = { "EntityType": 43, "LightCatalogNameRequest": catalogRequest }
            serviceMethodsRequested[serviceMethodsRequested.length] = { "EntityType": 43, "ElementType": "4", "CatalogNameElementId": catalogNameWithElementId }
        }

        if (request && request.ListRequest && request.ListRequest.length > 0)
            callAjaxService("GetListsOfEntityLists", request, callBackServiceCallForCombos, callBackFailMethod);
        else {//if (!usual.PageLoaded)
            if (externalKey && externalKey != "")
                usual.ExternalKeyExecute.push(externalKey);
            usual.isPageLoaded(true);
        }

        function callBackServiceCallForCombos(response) {
            if (response != null && (response.IsException == true || response.IsFailure == true)) {
                ErrorMessageHandler(response.Message);
                disableLoading();
                return;
            }
            if (response && response.ResponseList && response.ResponseList.length > 0 && serviceMethodsRequested && serviceMethodsRequested.length > 0) {
                for (var rl = 0; rl < response.ResponseList.length; rl++) {
                    var elementType;
                    var controlIdToBind;
                    var indexOfCatalog;
                    for (var et = 0; et < serviceMethodsRequested.length; et++) {
                        if (response.ResponseList[rl].EntityType == serviceMethodsRequested[et].EntityType && serviceMethodsRequested[et].EntityType != 43) {
                            elementType = serviceMethodsRequested[et].ElementType;
                            controlIdToBind = serviceMethodsRequested[et].ElementId;
                            break;
                        }
                        else if (serviceMethodsRequested[et].EntityType == 43) {
                            indexOfCatalog = et;
                        }
                    }
                    switch (response.ResponseList[rl].EntityType) {
                        case 11: // all Departments 
                            if (response.ResponseList[rl].DeptNameList && response.ResponseList[rl].DeptNameList.DepartmentCollection && response.ResponseList[rl].DeptNameList.DepartmentCollection.length > 0) {
                                bindDataToCombo(elementType, response.ResponseList[rl].DeptNameList.DepartmentCollection, "Name", "Id", controlIdToBind);
                            }
                            break;
                        case 2: // all Users
                            if (response.ResponseList[rl].UserNameList && response.ResponseList[rl].UserNameList.GetNamesOutputList && response.ResponseList[rl].UserNameList.GetNamesOutputList.length > 0) {
                                bindDataToCombo(elementType, response.ResponseList[rl].UserNameList.GetNamesOutputList, "CommonName", "CommonId", controlIdToBind);
                            }
                            break;
                        case 10: //all Companys 
                            if (response.ResponseList[rl].CompanyNameList && response.ResponseList[rl].CompanyNameList.CompanyList && response.ResponseList[rl].CompanyNameList.CompanyList.length > 0) {
                                bindDataToCombo(elementType, response.ResponseList[rl].CompanyNameList.CompanyList, "Name", "Id", controlIdToBind);
                            }
                            break;
                        case 12: //all Employees 
                            if (response.ResponseList[rl].EmployeesNameList && response.ResponseList[rl].EmployeesNameList.Employees && response.ResponseList[rl].EmployeesNameList.Employees.length > 0) {
                                bindDataToCombo(elementType, response.ResponseList[rl].EmployeesNameList.Employees, "Name", "EmployeeId", controlIdToBind);
                            }
                            break;
                        case 34: //all Bussiness Unit
                            if (response.ResponseList[rl].BussinessUnitNameList && response.ResponseList[rl].BussinessUnitNameList.GetNamesOutputList && response.ResponseList[rl].BussinessUnitNameList.GetNamesOutputList.length > 0) {
                                bindDataToCombo(elementType, response.ResponseList[rl].BussinessUnitNameList.GetNamesOutputList, "CommonName", "CommonId", controlIdToBind);
                            }
                            break;
                        case 40: //all Contracts      
                            if (response.ResponseList[rl].ContractNameList && response.ResponseList[rl].ContractNameList.GetNamesOutputList && response.ResponseList[rl].ContractNameList.GetNamesOutputList.length > 0) {
                                bindDataToCombo(elementType, response.ResponseList[rl].ContractNameList.GetNamesOutputList, "CommonName", "CommonId", controlIdToBind);
                            }
                            break;
                        case 15: //All Sources  
                        case 27:
                        case 28:
                        case 29:
                        case 30:
                        case 31:
                            if (response.ResponseList[rl].SourceNameList && response.ResponseList[rl].SourceNameList.GetNamesOutputList && response.ResponseList[rl].SourceNameList.GetNamesOutputList.length > 0) {
                                bindDataToCombo(elementType, response.ResponseList[rl].SourceNameList.GetNamesOutputList, "CommonName", "CommonId", controlIdToBind);
                            }
                            break;
                        case 39: //all Consultancy  
                            if (response.ResponseList[rl].ConsultantNameList && response.ResponseList[rl].ConsultantNameList.JsonConsultancyNameList && response.ResponseList[rl].ConsultantNameList.JsonConsultancyNameList.length > 0) {
                                bindDataToCombo(elementType, response.ResponseList[rl].ConsultantNameList.JsonConsultancyNameList, "ConsultantName", "ConsultantId", controlIdToBind); // CompanyId
                            }
                            break;
                        case 35: //all Assessment Template  
                            if (response.ResponseList[rl].AssessmentTemplateNameList && response.ResponseList[rl].AssessmentTemplateNameList.JsonAssessmentTemplateList && response.ResponseList[rl].AssessmentTemplateNameList.JsonAssessmentTemplateList.length > 0) {
                                bindDataToCombo(elementType, response.ResponseList[rl].AssessmentTemplateNameList.JsonAssessmentTemplateList, "AssessmentTemplateName", "Id", controlIdToBind);
                            }
                            break;
                        case 14: //all Jobs 
                            if (response.ResponseList[rl].JobNameList && response.ResponseList[rl].JobNameList.JobList && response.ResponseList[rl].JobNameList.JobList.length > 0) {
                                bindDataToCombo(elementType, response.ResponseList[rl].JobNameList.JobList, "JobName", "JobId", controlIdToBind);
                            }
                            break;
                        case 42: //all Job Approval   
                            if (response.ResponseList[rl].ApprovalNameList) {
                                bindDataToCombo(elementType, collection, propertyValue, propertyId, controlIdToBind);
                            }
                            break;
                        case 43: //all Catalog                             
                            if (response.ResponseList[rl].LightCatalogNameList && response.ResponseList[rl].LightCatalogNameList.CatalogMasterList) {
                                var cataloMasterList = response.ResponseList[rl].LightCatalogNameList.CatalogMasterList;
                                if (serviceMethodsRequested[indexOfCatalog] && serviceMethodsRequested[indexOfCatalog].CatalogNameElementId) {
                                    var internalServiceRequest = serviceMethodsRequested[indexOfCatalog].CatalogNameElementId;
                                    for (var cc = 0; cc < cataloMasterList.length; cc++) {
                                        for (ct = 0; ct < internalServiceRequest.length; ct++) {
                                            if (internalServiceRequest[ct].CatalogName == cataloMasterList[cc].Name)
                                                bindDataToCombo(internalServiceRequest[ct].ElementType, cataloMasterList[cc].CatalogValues, "Name", "CatalogValueId", internalServiceRequest[ct].ElementId);
                                        }
                                    }
                                }
                            }
                            break;
                    }
                }
                if (externalKey && externalKey != "")
                    usual.ExternalKeyExecute.push(externalKey);
                usual.isPageLoaded(true);

            }
        }



        function bindDataToCombo(elementType, collection, propertyValue, propertyId, controlIdToBind) {
            if (elementType == 4) { // Bind to Combo select 
                var comboSelect = document.getElementById(controlIdToBind);
                $("#" + controlIdToBind).css("width", "240px");
                $("#" + controlIdToBind).html("");
                if (collection && comboSelect) {
                    var optionChoose = document.createElement("option");
                    optionChoose.value = "9999";
                    optionChoose.innerHTML = "Choose";
                    optionChoose.title = "Choose";
                    comboSelect.appendChild(optionChoose);
                    for (var i = 0; i < collection.length; i++) {
                        var option = document.createElement("option");
                        option.value = collection[i][propertyId];
                        option.innerHTML = collection[i][propertyValue];
                        option.title = collection[i][propertyValue];
                        comboSelect.appendChild(option);
                    }
                }
            }
            else if (elementType == 6) { // Bind to Custom Combo Single select 
                var comboCustomSingle = new Combo(controlIdToBind, SINGLE_SELECT);
                $("#" + controlIdToBind).css("width", "240px");
                if (collection && comboCustomSingle) {
                    comboCustomSingle.AddItem(createComboOption("9999", "Choose"));
                    for (cs = 0; cs < collection.length; cs++) {
                        comboCustomSingle.AddItem(createComboOption(collection[cs][propertyId], collection[cs][propertyValue]));
                    }
                    comboCustomSingle.SetDropDownHeight("200px");
                    comboCustomSingle.SetDropDownWidth("127px");
                }
            }
            else if (elementType == 5) { // Bind to Custom Combo Multi select 
                var comboCustomMulti = new Combo(controlIdToBind, MULTI_SELECT);
                $("#" + controlIdToBind).css("width", "240px");
                if (collection && comboCustomMulti) {
                    for (cs = 0; cs < collection.length; cs++) {
                        comboCustomMulti.AddItem(createComboOption(collection[cs][propertyId], collection[cs][propertyValue]));
                    }
                    comboCustomMulti.SetDropDownHeight("200px");
                    comboCustomMulti.SetDropDownWidth("127px");
                }
            }
        }
    }



    this.BindDataToElements = function (jsonObjWithData) {
        usual = this;
        if (usual.PageLoaded != true) {
            usual.WaitingForPageLoad[usual.WaitingForPageLoad.length] = { "methodName": "BindDataToElements", "request": jsonObjWithData };
            return;
        }
        if (jsonObjWithData && usual.elementTypes && usual.elementTypes.length > 0) {
            for (var el = 0; el < usual.elementTypes.length; el++) {
                var jobjWithData = jsonObjWithData;
                var eleJsonObj = usual.elementTypes[el].jProperty;
                if (usual.elementTypes[el].jProperty && usual.elementTypes[el].jProperty.indexOf(".") != -1) {
                    var splitEleObj = usual.elementTypes[el].jProperty.split(".");
                    for (var so = 0; so < splitEleObj.length - 1; so++) {
                        jobjWithData = jobjWithData[splitEleObj[so]];
                    }
                    eleJsonObj = splitEleObj[splitEleObj.length - 1];
                }
                if (!jobjWithData && jobjWithData == null) {
                    if (usual.elementTypes[el].eleType != "1" && usual.elementTypes[el].eleType != "4" && usual.elementTypes[el].eleType != "5" && usual.elementTypes[el].eleType != "6 ")
                        $("#" + usual.elementTypes[el].eleId).html(usual.DefaultText);
                    continue;
                }

                switch (usual.elementTypes[el].eleType) {
                    case "2":
                    case "7":
                    case "10":
                    case "11":
                    case "12":
                        if (jobjWithData && jobjWithData[eleJsonObj] != undefined)
                            $("#" + usual.elementTypes[el].eleId).val(jobjWithData[eleJsonObj]);
                        break;
                    case "9": // For Label
                        if (jobjWithData && typeof (jobjWithData[eleJsonObj]) === "number" || typeof (jobjWithData[eleJsonObj]) === "string" || typeof (jobjWithData[eleJsonObj]) === "object") {
                            if (jobjWithData[eleJsonObj] != undefined && jobjWithData[eleJsonObj] != "" && typeof (jobjWithData[eleJsonObj]) != "object")
                                $("#" + usual.elementTypes[el].eleId).html(jobjWithData[eleJsonObj]);
                            else if (jobjWithData[eleJsonObj] && typeof (jobjWithData[eleJsonObj]) == "object" && jobjWithData[eleJsonObj].length > 0)
                                $("#" + usual.elementTypes[el].eleId).html(jobjWithData[eleJsonObj].toString());
                            else
                                $("#" + usual.elementTypes[el].eleId).html(usual.DefaultText);
                            break;
                        }
                        else if (usual.elementTypes[el].jtype == "jb") {
                            if (jobjWithData[eleJsonObj])
                                $("#" + usual.elementTypes[el].eleId).html("Yes");
                            else
                                $("#" + usual.elementTypes[el].eleId).html("No");
                        }
                        else {
                            $("#" + usual.elementTypes[el].eleId).html(usual.DefaultText);
                        }
                    case "4": // Html Select Drop Down
                        if (jobjWithData && jobjWithData[eleJsonObj] > 0)
                            $("#" + usual.elementTypes[el].eleId).val(jobjWithData[eleJsonObj]);
                        break;
                    case "5": //Combo-MultiSelect 
                        if (jobjWithData && jobjWithData[eleJsonObj] && jobjWithData[eleJsonObj].length > 0)
                            setSelectedIdsCustomCombo(jobjWithData[eleJsonObj], usual.elementTypes[el].eleId);
                        break;
                    case "6": // Combo-Custom_SingleSelect
                        if (jobjWithData && jobjWithData[eleJsonObj] > 0) {
                            selectedIds = [];
                            selectedIds.push(jobjWithData[eleJsonObj]);
                            setSelectedIdsCustomCombo(selectedIds, usual.elementTypes[el].eleId);
                        }
                        break;
                    case "1": // For Radio Button
                        var element = $("#" + usual.elementTypes[el].eleId);
                        if (jobjWithData && element.val() != "on" && (element.val() == jobjWithData[eleJsonObj] || (usual.elementTypes[el].eleId.split("-")[5] && usual.elementTypes[el].eleId.split("-")[5] == jobjWithData[eleJsonObj])))
                            element[0].setAttribute("checked", "checked");
                        if (usual.elementTypes[el].jtype == "jb" && jobjWithData[eleJsonObj] && element.val() == "true" && usual.elementTypes[el].eleId.indexOf("true") != -1) {
                            element[0].setAttribute("checked", "checked");
                        }
                        break;
                    case "3":  // for TextArea     
                        if (jobjWithData)
                            $("#" + usual.elementTypes[el].eleId).val(jobjWithData[eleJsonObj]);
                        break;
                    case "17": // For Attachment  
                        var param = { "GetFileParam": "TargetItemId", "GetFileMethod": "OpenFile" };
                        if (jobjWithData[eleJsonObj] && jobjWithData[eleJsonObj].Attachments)
                            $("#" + usual.elementTypes[el].eleId).readOnlyCustomAjaxUpload(jobjWithData[eleJsonObj].Attachments, param);
                        else if (jobjWithData[eleJsonObj] && jobjWithData[eleJsonObj].AttachmentId && jobjWithData[eleJsonObj].AttachmentId > 0) {
                            var tempObj = [jobjWithData[eleJsonObj]];
                            $("#" + usual.elementTypes[el].eleId).readOnlyCustomAjaxUpload(tempObj, param);
                        }
                        break;
                    case "18":
                    case "13": // For Audio Palyer
                        if (usual.elementTypes[el].eleType == "13") {
                            var defaultRule = { "Extention": ".mp3,.mp4", "MaxSize": 3072, "CallBackFun": "", "MaxNoOfFiles": 1, "Width": "240" };
                            if (usual.elementTypes[el].rule && usual.elementTypes[el].rule != "" && UsualConstants.AttachementRule[usual.elementTypes[el].rule]) {
                                defaultRule = UsualConstants.AttachementRule[usual.elementTypes[el].rule];
                            }
                            var jsonObjAttachmentControl = { UploadMultiFileLimit: defaultRule.MaxNoOfFiles, Extention: defaultRule.Extention, MaxSize: defaultRule.MaxSize, CallBackFun: defaultRule.CallBackFun, Width: defaultRule.Width };
                            var tempObj = [];
                            $("#" + usual.elementTypes[el].eleId).editModeCustomAjaxUpload(jsonObjAttachmentControl, tempObj);
                        }
                        if (browser.msie) {
                            var tempDiv = $("<div>");
                            tempDiv.html("<br/><object id='" + usual.elementTypes[el].eleId + "AudioReadOnly' classid='CLSID:22d6f312-b0f6-11d0-94ab-0080c74c7e95' FileName=" + jobjWithData[eleJsonObj] + " Enabled='true' width='150' height='46'> " +
                            "<param name='AutoStart' value='false' />" +
                                        "<param name='ShowAudioControls' value='true' />" +
                                        "<param name='ShowPositionControls' value='false' />" +
                                        "<param name='EnablePositionControls' value='false' />" +
                                        "<param name='ShowControls' value='true' />" +
                                        "<param name='EnableTracker' value='true' />" +
                                        "<param name='Duration' value='true'/>" +
                                        "<param name='AllowChangeDisplaySize' value='true' /> </object>");
                            $("#" + usual.elementTypes[el].eleId).parent().append(tempDiv);
                            var audioAttachementTemp = $("#" + usual.elementTypes[el].eleId + "AudioReadOnly");
                            if (audioAttachementTemp && audioAttachementTemp[0]) {
                                $("#" + usual.elementTypes[el].eleId + "AudioReadOnly")[0].FileName = jobjWithData[eleJsonObj];
                                $("#" + usual.elementTypes[el].eleId + "AudioReadOnly")[0].Enabled = true;
                            }
                        }
                        else {
                            var newReadOnlyAudioDiv = $("<div/>").attr("id", usual.elementTypes[el].eleId + "AudioReadOnly");
                            var divEmbedAudioPlayer = document.createElement("embed");
                            divEmbedAudioPlayer.setAttribute("id", "embedAudioPlayer");
                            divEmbedAudioPlayer.setAttribute("type", "application/x-mplayer2");
                            divEmbedAudioPlayer.setAttribute("pluginspage", "http://www.microsoft.com/Windows/MediaPlayer/");
                            divEmbedAudioPlayer.setAttribute("src", this.CandidateAudioPath);
                            divEmbedAudioPlayer.setAttribute("width", "150");
                            divEmbedAudioPlayer.setAttribute("height", "48");
                            divEmbedAudioPlayer.setAttribute("autostart", "0");
                            divEmbedAudioPlayer.setAttribute("showaudiocontrols", "1");
                            divEmbedAudioPlayer.setAttribute("showpositioncontrols", "0");
                            divEmbedAudioPlayer.setAttribute("scale", "tofit");
                            newReadOnlyAudioDiv.append(divEmbedAudioPlayer);
                            $("#" + usual.elementTypes[el].eleId).append(newReadOnlyAudioDiv);
                        }
                        break;
                    case "14": // For Attachment 
                        var defaultRule = { "Extention": ".doc,.txt,.pdf,.docx", "MaxSize": 3072, "CallBackFun": "", "MaxNoOfFiles": 1, "Width": "240" };
                        if (usual.elementTypes[el].rule && usual.elementTypes[el].rule != "" && UsualConstants.AttachementRule[usual.elementTypes[el].rule]) {
                            defaultRule = UsualConstants.AttachementRule[usual.elementTypes[el].rule];
                        }
                        var jsonObjAttachmentControl = { UploadMultiFileLimit: defaultRule.MaxNoOfFiles, Extention: defaultRule.Extention, MaxSize: defaultRule.MaxSize, CallBackFun: defaultRule.CallBackFun, Width: defaultRule.Width };
                        // var param = { "GetFileParam": "TargetItemId", "GetFileMethod": "OpenFile" };
                        var tempObj = [];
                        if (jobjWithData[eleJsonObj] && jobjWithData[eleJsonObj].Attachments)
                            tempObj = jobjWithData[eleJsonObj].Attachments;
                        else if (jobjWithData[eleJsonObj] && jobjWithData[eleJsonObj].AttachmentId && jobjWithData[eleJsonObj].AttachmentId > 0)
                            tempObj = [jobjWithData[eleJsonObj]];

                        if (tempObj && tempObj.length > 0) {
                            for (var att = 0; att < tempObj.length; att++) {
                                tempObj[att].GetFileParam = "TargetItemId";
                                tempObj[att].GetFileMethod = "OpenFile";
                            }
                            $("#" + usual.elementTypes[el].eleId).editModeCustomAjaxUpload(jsonObjAttachmentControl, tempObj);
                        }
                        break;
                }
            }
        }
    }



    var getElementAttributes = function (id) {
        var allAdditionalAttr = [];
        var eleObj = {};
        var ele = id.split("-");
        var eleOtherProperty = [];
        var attrExits;
        if (id && id != "") {
            if ($("#" + id)[0]) {
                var name = $("#" + id)[0].getAttribute("name");
                var clas = $("#" + id)[0].getAttribute("class");
            }
            if (name && name.indexOf("$") != -1) {
                attrExits = name;
            }
            if (clas && clas.indexOf("$") != -1) {
                var clss = clas;
                if (clas.indexOf(" ") != -1) {
                    var clasArray = clas.split(" ");
                    for (var c = 0; c < clasArray.length; c++) {
                        if (clasArray[c].indexOf("$") != -1)
                            clss = clasArray[c];
                    }
                }
                if (attrExits)
                    attrExits += "_" + clss;
                else
                    attrExits = clss;
            }
            if (attrExits)
                if (attrExits.indexOf("_") != -1) {
                    var tempAttrCollection = attrExits.split("_");
                    for (var e = 0; e < tempAttrCollection.length; e++) {
                        allAdditionalAttr[tempAttrCollection[e].substring(0, tempAttrCollection[e].indexOf("$"))] = tempAttrCollection[e].substring(tempAttrCollection[e].indexOf("$") + 1).replace(/\*/g, ' ');
                    }
                }
                else {
                    allAdditionalAttr[attrExits.substring(0, attrExits.indexOf("$"))] = attrExits.substring(attrExits.indexOf("$") + 1).replace(/\*/g, ' ');
                }

            eleObj = { "eleId": id, "jProperty": ele[3].replace(/_/g, "."), "jtype": ele[2], "eleType": ele[4], "mandatory": allAdditionalAttr['m'], "rule": allAdditionalAttr['r'], "errorMessage": allAdditionalAttr['e'], "label": allAdditionalAttr['l'], "customMethod": allAdditionalAttr['cm'], "action": allAdditionalAttr['ac'], "BindingMethod": allAdditionalAttr['bm'], "BindingCatalog": allAdditionalAttr["bc"], "BindingEnum": allAdditionalAttr["be"] };
        }
        return eleObj;
    }



    var loadAttachementControl = function (eleId) {
        var defaultRule = { "Extention": ".doc,.txt,.pdf,.docx", "MaxSize": 3072, "CallBackFun": "", "MaxNoOfFiles": 1, "Width": "240" };
        if (usual.elementTypesByEleId[eleId].rule && usual.elementTypesByEleId[eleId].rule != "" && UsualConstants.AttachementRule[usual.elementTypesByEleId[eleId].rule]) {
            defaultRule = UsualConstants.AttachementRule[usual.elementTypesByEleId[eleId].rule];
        }
        $("#" + eleId).customAjaxUpload({ UploadMultiFileLimit: defaultRule.MaxNoOfFiles, Extention: defaultRule.Extention, MaxSize: defaultRule.MaxSize, CallBackFun: defaultRule.CallBackFun, Width: defaultRule.Width });

    }



    var hideControlBasedOnAction = function (checkForAction, attrType) {
        if (checkForAction && checkForAction.length > 0) {
            for (var ca = 0; ca < checkForAction.length; ca++) {
                var keyWithActionKey = checkForAction[ca].getAttribute(attrType);
                if (keyWithActionKey.indexOf(" ") != -1) {
                    var splitForHtmlAttr = keyWithActionKey.split(" ");
                    for (var sc = 0; sc < splitForHtmlAttr.length; sc++) {
                        if (splitForHtmlAttr[sc].indexOf("$") != -1)
                            keyWithActionKey = splitForHtmlAttr[sc];
                    }
                }
                var execute = function (key) { var takeAction = checkWithAction(actionKey); removeOrDisplay(checkForAction[ca].id, takeAction); }

                if (keyWithActionKey.indexOf("ac$") != -1 && keyWithActionKey.indexOf("_") == -1) {
                    var actionKey = keyWithActionKey.substring(keyWithActionKey.indexOf("$") + 1);
                    execute(actionKey);
                }
                else if (keyWithActionKey.indexOf("$") != -1 && keyWithActionKey.indexOf("_") != -1) {
                    var splitaAction = keyWithActionKey.split("_");
                    for (s = 0; s < splitaAction.length; s++) {
                        if (splitaAction[s].indexOf("ac$") != -1) {
                            var actionKey = splitaAction[s].substring(splitaAction[s].indexOf("$") + 1);
                            execute(actionKey);
                        }
                    }
                }
            }
        }
    }



    var removeOrDisplay = function (eleId, takeAction) {
        if (takeAction) {
            $("#" + eleId).css("display", "");
        }
        else {
            if (usual.RemoveElement)
                $("#" + eleId).remove();
            else
                $("#" + eleId).css("display", "none");
        }
    }



    var checkWithAction = function (keys) {
        if (getUserCategory() != "Developer") {
            if (keys && keys.indexOf("$") == -1) { //For Single Actions Key dependency 
                var actionDetails = UsualConstants.Actions[keys];
                if (actionDetails) {
                    if (actionDetails.Visblity == 0 && Contains(Credentials, actionDetails.Action)) {
                        return true;
                    }
                    else if (actionDetails.Visblity == 1 && Contains(Credentials, actionDetails.Action)) {
                        return false;
                    }
                }
            }
            else { //For Muilt Actions Key dependency 
                var ackeys = keys.split("$");
                var takeAction = false;
                for (var a = 0; a < ackeys.length; a++) {
                    var actionDetails = UsualConstants.Actions[ackeys[a]];
                    if (actionDetails) {
                        if (actionDetails.Visblity == 0 && Contains(Credentials, actionDetails.Action)) {
                            takeAction = true;
                        }
                        else if (actionDetails.Visblity == 1 && Contains(Credentials, actionDetails.Action)) {
                            takeAction = false;
                        }
                    }
                }
                return takeAction;
            }
        }
        return false;
    }



    Array.prototype.remove = function (from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };


    var LoadDtpControl = function (dtps) {
        switch (dtps.type) {
            case "1": // Date only where Year starting 18 year before from Current year
                var year = new Date().getFullYear() - 18;
                var date = "01/01/" + year;
                jQuery("#" + dtps.id).dynDateTime({
                    showsTime: true,
                    ifFormat: "%m/%d/%Y",
                    daFormat: "%l;%M %p, %e %m,  %Y",

                    align: "TL",
                    myDate: date,
                    electric: true,
                    singleClick: true,
                    button: ".next('img')"
                });
                break;
            case "11": // with Only Date mm/dd/yyyy
                jQuery("#" + dtps.id).dynDateTime({
                    showsTime: true,
                    ifFormat: "%m/%d/%Y",
                    daFormat: "%l;%M %p, %e %m,  %Y",
                    align: "TL",
                    electric: true,
                    singleClick: true,
                    button: ".next('img')"
                });
                break;
            case "7": // with Date and time mm/dd/yyyy hr:min
                jQuery("#" + dtps.id).dynDateTime({
                    showsTime: true,
                    ifFormat: "%m/%d/%Y %H:%M",
                    daFormat: "%l;%M %p, %e %m,  %Y",
                    align: "TL",
                    electric: true,
                    singleClick: true,
                    button: ".next('img')"
                });
                break;
            case "12": // only Date with out Date Icon on focus DTP pops up
                jQuery("#" + dtps.id).dynDateTime({
                    showsTime: false,
                    ifFormat: "%m/%d/%Y",
                    daFormat: "%l;%M %p, %e %m,  %Y",
                    align: "TL",
                    electric: true,
                    singleClick: true
                });
                break;
            case "10": // Date and time with out Icon on focus DTP pops up
                jQuery("#" + dtps.id).dynDateTime({
                    showsTime: false,
                    ifFormat: "%m/%d/%Y %H:%M",
                    daFormat: "%l;%M %p, %e %m,  %Y",
                    align: "TL",
                    electric: true,
                    singleClick: true
                });
                break;
        }
    }
}


function usualValidate(ele) {
    if (typeof (ele) !== "object")
        ele = $("#" + ele)[0];
    var eleType = usual.elementTypesByEleId[ele.id];
    var message = System.Messages.Usual.Error.notInFormat + eleType.label;
    var valid;
    if (eleType.rule) {
        valid = validateField(ele, eleType.rule);
        return usualDisplayErrorMessage(ele.id, valid, message);
    }
    else {
        ErrorMessageHandler("Validation rule not defined for" + ele.id);
    }
}


function usualDisplayErrorMessage(eleId, valid, errorMessage) {
    var ErrorDisplay = $("#" + eleId.replace("ele", "err"));
    if (!valid) {
        if (ErrorDisplay[0]) {
            ErrorDisplay.css("display", "");
            ErrorDisplay.html(errorMessage);
            //setInterval("msgFade('" + eleId.replace("ele", "err") + "')", 5000);
        }
        else
            ErrorMessageHandler(errorMessage);
        $("#" + eleId)[0].focus();
        disableLoading();
        return true;
    }
    ErrorDisplay.html("");
    return false;
}


this.OpenFile = function (obj) {
    if (typeof (obj) === "string") {
        var objTargetItmeId = JSON.parse(obj);
    } else if (obj && typeof (obj) === "object") {
        var objTargetItmeId = obj;
    }
    if (objTargetItmeId.TargetFileId && objTargetItmeId.TargetFileId > 0) {
        id = objTargetItmeId.TargetFileId;
    } else {
        ErrorMessageHandler("File doesnot exist.");
        return;
    }
    var request =
        {
            "FileId": id,
            "SaveFile": true,
            "ServerPathToStoreTheFile": "/Common/UploadFolder/Candidate/",
            "Encrypt": false,
            "TenantId": tenantInfo.TenantId,
            "UserId": tenantInfo.UserId
        };
    callAjaxService("GetFileById", request, callBackOpenFileSuccess, callBackUsualFail);

    function callBackOpenFileSuccess(response) {
        if (response != null && (response.IsException == true || response.IsFailure == true)) {
            ErrorMessageHandler(response.Message);
            disableLoading();
            return;
        }
        var virtaulDir = usualvirtaulDir();
        if (virtaulDir == null || virtaulDir == "/") {
            virtaulDir = "";
        }
        if (virtaulDir.charAt(virtaulDir.length - 1) == "/") {
            virtaulDir = virtaulDir.substring(0, virtaulDir.length - 1);
        }
        if (response != null) {
            if (response.Message.indexOf("/", 0) == 0) {
                window.open(virtaulDir + "/Secure/Download.aspx?path=" + virtaulDir + response.Message);
            }
            else {
                window.open(virtaulDir + "/Secure/Download.aspx?path=" + virtaulDir + "/" + response.Message);
            }
        }
        disableLoading();
    }
};


function msgFade(id) {
    var msg = document.getElementById(id);
    if (msg) {
        msg.style.display = "none";
    }
}


function usualvirtaulDir() {
    var virtaulDir = getVirtualPathField();
    if (virtaulDir == null || virtaulDir == "/") {
        virtaulDir = "";
    }
    if (virtaulDir.charAt(virtaulDir.length - 1) == "/") {
        virtaulDir = virtaulDir.substring(0, virtaulDir.length - 1);
    }
    return virtaulDir;
}


function callBackUsualFail(response) {
    if (response) {
        alert("Fail");
    }
}