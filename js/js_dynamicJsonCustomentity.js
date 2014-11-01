System.CandidateEntityInfo = [];
var Testdata = [{ "ObjectId": "1", "PropertyName": "Name", "PropertyType": "js" },
                { "ObjectId": "2", "PropertyName": "Email", "PropertyType": "js" },
                { "ObjectId": "3", "PropertyName": "Email2", "PropertyType": "js" },
                { "ObjectId": "4", "PropertyName": "DateOfBirth", "PropertyType": "js" },
                { "ObjectId": "5", "PropertyName": "Gender", "PropertyType": "je" },
                { "ObjectId": "6", "PropertyName": "Gender", "PropertyType": "je" },
                { "ObjectId": "7", "PropertyName": "MaritalStatus", "PropertyType": "je" },
                { "ObjectId": "8", "PropertyName": "MaritalStatus", "PropertyType": "je" },
                { "ObjectId": "9", "PropertyName": "CountryCode", "PropertyType": "js" },
                { "ObjectId": "10", "PropertyName": "Phone", "PropertyType": "js" },
                { "ObjectId": "11", "PropertyName": "PhoneOffice", "PropertyType": "js" },
                { "ObjectId": "12", "PropertyName": "Address1", "PropertyType": "js" },
                { "ObjectId": "13", "PropertyName": "PassportNo", "PropertyType": "js" },
                { "ObjectId": "14", "PropertyName": "PanNo", "PropertyType": "js" },
                { "ObjectId": "15", "PropertyName": "LocationId", "PropertyType": "ji" },
                { "ObjectId": "16", "PropertyName": "OrganizationId", "PropertyType": "ji" },
                { "ObjectId": "17", "PropertyName": "SourcerId", "PropertyType": "ji" },
                { "ObjectId": "18", "PropertyName": "CollegeId", "PropertyType": "ji" },
                { "ObjectId": "19", "PropertyName": "DegreeTypeId", "PropertyType": "ji" },
                { "ObjectId": "20", "PropertyName": "DegreeId", "PropertyType": "ji" },
                { "ObjectId": "21", "PropertyName": "EndYear", "PropertyType": "js" },
                { "ObjectId": "22", "PropertyName": "Percentage", "PropertyType": "jf" },
                { "ObjectId": "23", "PropertyName": "Technologies", "PropertyType": "jai" },
                { "ObjectId": "24", "PropertyName": "ExperienceInYears", "PropertyType": "ji" },
                { "ObjectId": "25", "PropertyName": "ExperienceInMonths", "PropertyType": "ji" },
                { "ObjectId": "26", "PropertyName": "DesignationId", "PropertyType": "ji" },
                { "ObjectId": "27", "PropertyName": "ExpertiseId", "PropertyType": "ji" },
                { "ObjectId": "28", "PropertyName": "CurrentSalary", "PropertyType": "js" },
                { "ObjectId": "29", "PropertyName": "", "PropertyType": "" },
                { "ObjectId": "30", "PropertyName": "SourceId", "PropertyType": "ji" },
                { "ObjectId": "31", "PropertyName": "Notes", "PropertyType": "js" },
                { "ObjectId": "32", "PropertyName": "DesiredSalaryFrom", "PropertyType": "jf" },
                { "ObjectId": "33", "PropertyName": "DesiredSalaryTo", "PropertyType": "jf" },
                { "ObjectId": "34", "PropertyName": "IsWillingToRelocate", "PropertyType": "jb" },
                { "ObjectId": "35", "PropertyName": "NoticePeriod", "PropertyType": "ji" },
                { "ObjectId": "36", "PropertyName": "LocationPreferences", "PropertyType": "jai" },
                { "ObjectId": "37", "PropertyName": "Notes", "PropertyType": "js" },
                { "ObjectId": "38", "PropertyName": "Attachement", "PropertyType": "jat"}];

function getHtmlOfDynamicCustomEntity(path, type) {
    //path = "~/UploadFolder/2.14_candidate.ascx"; //"~/Customization/ConfigureDynamicCustomEntity.ascx"
    callAjaxService("GetHtmlOfModalWindowControl", { "Path": path }, function (response) { callbackgetHtmlOfDynamicCustomEntity(response, type) }, callBackFail, "xml");
}
function callbackgetHtmlOfDynamicCustomEntity(response, type) {
    if (customTenantEntityInfo)
        customTenantEntityInfo = null;

    if (response != null) {

        var mifWidth = MifRequired();
        modal = new Modal();
        modal.HeaderText = "Entity Configuration";
        modal.ModalId = "modalWindowDivControl";

        if (mifWidth && SelectedComboText == "Candidate properties") {
            modal.Height = 600;
            modal.Width = 1020;
        }
        else {
            modal.Height = 600;
            modal.Width = 1020;
        }
        if (response.text) {
            modal.HTML = response.text;
        }
        else {
            modal.HTML = response.childNodes[0].textContent;
        }
        modal.Open();
        if (type == "false") {
            modal.Height = 1000;
            modal.Width = 2250;
            customEntity = new DynamicCustomEntity();
            customEntity.LoadCustomEntity();
        }
        else {
            LoadAllEntityInfo();
        }
    }
    disableLoading();
}

var CandProp = [];
var customEntity = new function DynamicCustomEntity() {
    this.READ_ONLY_MODE = "ReadOnly";
    this.EDIT_MODE = "Edit";
    this.CurrentMode = this.EDIT_MODE;
    this.CustomEntityList = [];
    this.NonCutomEntityList = [];
    this.TenantInformation = {TenantId : 123, UserId : "321"}; //getTenantAdamInfo();
    this.CatalogMasterEnity = null;
    this.EntityUtilized = [];
    this.RemovedFields = [];
    this.OriginalEntityUtilized = [];
    This = this;
    this.MandatoryType = { "None": 0, "AlwaysMandatory": 1, "AlwaysNonMandatory": 2, "OptionalMandatory": 3 };
    this.PropertyType = { "Choose": 9999, "Bool": "jb", "Enum": "je", "Float": "jf", "Int": "ji", "String": "js", "Null-Float": 5, "Null-Int": 6, "Array-Float": 7, "Array-Int": "jai", "Array-String": 9 };
    // this.ElementType = { "CheckBox": 0, "Radio": 1, "TextBox": 2, "TextArea": 3, "Combo-SingleSelect": 4, "Combo-MultiSelect": 5, "Combo-Custom_SingleSelect": 6, "DTPicker": 7, "Grid": 8, "Label": 9 };
    //this.Catalogs = { "Enum": ["Gender", "Marital Status"], "Catalog": ["Location", "SkillSet"], "Methods": ["GetAllUserName", "GetAllJobNames"] };
    this.SaveData = [];
    this.SaveDataCount = 1;
    this.GroupName = [];
    this.LoadCustomEntity = function () {
        var getAllCatalogMasterRequest =
                                {
                                    "TenantId": this.TenantInformation.TenantId,
                                    "UserId": this.TenantInformation.UserId,
                                    "IsSystemCatalogRequired": false,
                                    PagingCriteria:
                                    {
                                        PageNo: 1,
                                        MaxResults: 1000
                                    }
                            };
        var getAllEntityRequest =
                                {
                                    "EntityType": $("#selectModule").val(),
                                    "TenantId": this.TenantInformation.TenantId,
                                    "UserId": this.TenantInformation.UserId
                                };
        this.ResetValue();
        $("#EntityConfigurationdiv").html("");
        $("#divProperty").html("");
        var ascm = new AsynchronousServiceCallManager(callBackGetAllEntityInfo);
        var getCatalogReq = { Request: getAllCatalogMasterRequest, ServiceCallMethodName: "GetAllCatalogMasters" };
        ascm.AddService(getCatalogReq);
        ascm.Execute();
        loadPropertyType(0);
        ConstructCustomEntityPropertyGrid(null);

        function callBackGetAllEntityInfo(webresponse) {
            if (webresponse) {
                var response = null;
                if (webresponse.length > 0) {
                    response = webresponse[0].Response;
                }
                if (response != null && (response.IsException == true || response.IsFailure == true)) {
                    ErrorMessageHandlerForModelWindow(document.getElementById("FailedModelTextMessage"), document.getElementById("message_b_small"), response.Message);
                    disableLoading();
                    return;
                }

                if (response && response.JsonCatalogMasterCollection) {
                    for (var i = 0; i < response.JsonCatalogMasterCollection.length; i++) {
                        UsualConstants.Catalogs.Catalog[response.JsonCatalogMasterCollection[i].Name] = response.JsonCatalogMasterCollection[i].Name;
                    }
                }
            }
            // CandProp = [];
            if (System.CandidateEntityInfo[$("#selectMode").val()] && System.CandidateEntityInfo[$("#selectMode").val()].length) {
                CandProp = System.CandidateEntityInfo[$("#selectMode").val()];
                ConstructCustomEntityPropertyGrid(CandProp);
            }
            else {
                for (var count = 1; count <= Testdata.length - 1; count++) {
                    Testdata[count].ObjectId = count;
                    CandProp.push(Testdata[count]);
                }

                ConstructCustomEntityPropertyGrid(CandProp);
            }

        }

    }

    function ConstructCustomEntityPropertyGrid(dataItem) {
        var otherInfoToConstructGrid =
                {
                    "IsHierarchical": false,
                    "DelegateForDataBound": function (row, dataItem, rowIndex, rowType) { ConstructCustomEntityProprtyGridOnRowDataBound(row, dataItem, rowIndex, rowType) }
                };
        var columnCollection = [];

        var columnObjectId = createColumnForColumnCollection("Id", "String", true, "ObjectId", false, null, "0%", "String", true, "javascript:void(0)", true, true, null, true, null, null, false, null);
        columnCollection[columnCollection.length] = columnObjectId;

        var columnName = createColumnForColumnCollection("Json Property Name", "String", false, "PropertyName", false, null, "9%", "String", true, "javascript:void(0)", true, true, null, false, null, null, false, null);
        columnCollection[columnCollection.length] = columnName;

        var columnLabel = createColumnForColumnCollection("Label", "String", false, "LabelText", false, null, "9%", "String", true, "javascript:void(0)", true, true, null, false, null, null, false, null);
        columnCollection[columnCollection.length] = columnLabel;

        var columnLabel = createColumnForColumnCollection("Json Property Type", "String", false, "PropertyType", false, null, "6%", "String", true, "javascript:void(0)", true, true, null, false, null, null, false, null);
        columnCollection[columnCollection.length] = columnLabel;

        var columnElementType = createColumnForColumnCollection("Element Type", "String", false, "ElementType", false, null, "10%", "String", false, "javascript:void(0)", false, null, null, false, null, null, false, null);
        columnCollection[columnCollection.length] = columnElementType;

        var columnMaxLength = createColumnForColumnCollection("Max Length", "String", false, "MaxLength", false, null, "5%", "String", false, "javascript:void(0)", false, null, null, false, null, null, false, null);
        columnCollection[columnCollection.length] = columnMaxLength;

        var columnEditableCheckBox = createColumnForColumnCollection("Visibility", "CheckBox", false, "IsEditable", false, null, "2%", "CheckBox", false, "javascript:void(0)", false, null, null, false, null, null, false, null);
        columnCollection[columnCollection.length] = columnEditableCheckBox;

        var columnMandatoryCheckBox = createColumnForColumnCollection("Mandatory", "CheckBox", false, "IsMandatory", false, null, "2%", "CheckBox", false, "javascript:void(0)", false, null, null, false, null, null, false, null);
        columnCollection[columnCollection.length] = columnMandatoryCheckBox;

        var columnLinkTo = createColumnForColumnCollection("Link To", "String", false, "LinkToText", false, null, "9%", "String", false, "javascript:void(0)", false, null, null, false, null, null, false, null);
        columnCollection[columnCollection.length] = columnLinkTo;

        var columnRule = createColumnForColumnCollection("Rule", "String", false, "RuleText", false, null, "9%", "String", false, "javascript:void(0)", false, null, null, false, null, null, false, null);
        columnCollection[columnCollection.length] = columnRule;

        var columnError = createColumnForColumnCollection("Custom Error", "String", false, "ErrorText", false, null, "9%", "String", false, "javascript:void(0)", false, null, null, false, null, null, false, null);
        columnCollection[columnCollection.length] = columnError;

        var columnCatalogType = createColumnForColumnCollection("Catalog Type", "String", false, "CatalogType", false, null, "10%", "String", true, "javascript:void(0)", true, true, null, false, null, null, false, null);
        columnCollection[columnCollection.length] = columnCatalogType;

        var columnCatalogType = createColumnForColumnCollection("Custom Method", "String", false, "CustomValidation", false, null, "9%", "String", true, "javascript:void(0)", true, true, null, false, null, null, false, null);
        columnCollection[columnCollection.length] = columnCatalogType;

        var columnCatalogType = createColumnForColumnCollection("Action Name", "String", false, "ActionName", false, null, "9%", "String", true, "javascript:void(0)", true, true, null, false, null, null, false, null);
        columnCollection[columnCollection.length] = columnCatalogType;

        var columnGroupName = createColumnForColumnCollection("Group Name", "String", false, "GroupName", false, null, "9%", "String", true, "javascript:void(0)", true, true, null, false, null, null, false, null);
        columnCollection[columnCollection.length] = columnGroupName;

        var columnGroupName = createColumnForColumnCollection("", "String", false, "EditButton", false, null, "10%", "String", true, "javascript:void(0)", true, true, null, false, null, null, false, null);
        columnCollection[columnCollection.length] = columnGroupName;

        var table = constructGrid(columnCollection, dataItem, "PropertyGridCustom", false, otherInfoToConstructGrid);
        table.setAttribute("width", "100%");
        table.setAttribute("cellspacing", "0");
        table.setAttribute("cellpadding", "2");
        table.setAttribute("border", "0");
        table.className = "zero_border";
        var tempDiv = $('<div>');
        tempDiv.html(table);

        $("#EntityConfigurationdiv").html(tempDiv.html());
        if (dataItem) {
            for (var count = 0; count < dataItem.length; count++) {
                loadElementTypeInDropdown(dataItem[count].ObjectId, dataItem[count]);
            }
        }
    }

    function ConstructCustomEntityProprtyGridOnRowDataBound(row, dataItem, rowIndex, rowType) {
        if (rowType == "HeaderRow") {
            var tdcheckMandatory = getCellFromRow(row, "DataValueField", "IsMandatory");
            if (tdcheckMandatory) {
                var chk = tdcheckMandatory.getElementsByTagName("input");
                if (chk && chk[0]) {
                    tdcheckMandatory.removeChild(chk[0]);
                }
                tdcheckMandatory.setAttribute("align", "left");
                tdcheckMandatory.setAttribute("title", tdcheckMandatory.innerHTML);
            }
            var tdcheckSearch = getCellFromRow(row, "DataValueField", "IsEditable");
            if (tdcheckSearch) {
                var chk = tdcheckSearch.getElementsByTagName("input");
                if (chk && chk[0]) {
                    tdcheckSearch.removeChild(chk[0]);
                }
                tdcheckSearch.setAttribute("align", "left");
                tdcheckSearch.setAttribute("title", tdcheckSearch.innerHTML);
            }
            var tdCombo = getCellFromRow(row, "DataValueField", "ComboColumn");
            if (tdCombo) {
                var chk = tdCombo.getElementsByTagName("input");
                if (chk && chk[0]) {
                    tdCombo.removeChild(chk[0]);
                }
                tdCombo.setAttribute("align", "left");
            }
        }
        var table = row.parentNode;
        if (rowType == "DataRow") {
            if (dataItem.IsDefaultField == true) {
                row.style.display = 'none';

            }
            var isChecked = false;
            var tdName = getCellFromRow(row, "DataValueField", "LabelText");
            var tdcheck = getCellFromRow(row, "DataValueField", "IsEditable");
            if (tdcheck) {
                var chk = tdcheck.getElementsByTagName("input");
                if (chk && chk[0]) {
                    chk[0].setAttribute("id", "EditableCheckBox" + dataItem.ObjectId);
                    chk[0].setAttribute("utilizingId", "IsEditable");
                    chk[0].setAttribute("isCutom", "true");
                    chk[0].setAttribute("mandatoryAlways", "false");
                    //chk[0].setAttribute("mode", "Edit" + dataItem.ObjectId);
                    if (dataItem.IsEditable && dataItem.IsEditable == "Yes")
                        $(chk[0]).attr("CHECKED", "");
                }
                $(chk).css("display", "none");
                var label = $("<label/>").attr("id", "lbl_EditableCheckBox" + dataItem.ObjectId);
                $(label).html(dataItem.IsEditable);
                //label[0].setAttribute("mode", "ReadOnly" + dataItem.ObjectId);
                tdcheck.appendChild($(label)[0]);
            }
            var tdEditButton = getCellFromRow(row, "DataValueField", "EditButton");
            if (tdEditButton) {
                var btn = $("<a/>").addClass("positive_a").attr({ "id": "EditButton" + dataItem.ObjectId, "href": "javascript:customEntity.ChangeRowMode('Edit','" + dataItem.ObjectId + "')" }).html("Edit");
                $(tdEditButton).append($("<div/>").addClass("buttons").append(btn));
                var btn = $("<a/>").addClass("positive_a").attr({ "id": "RemoveButton" + dataItem.ObjectId, "href": "javascript:customEntity.RemoveRow('" + dataItem.ObjectId + "')" }).html("Remove");
                $(tdEditButton).append($("<div/>").addClass("buttons fright").append(btn));
            }
            var tdcheck = getCellFromRow(row, "DataValueField", "IsMandatory");
            if (tdcheck) {
                var chk = tdcheck.getElementsByTagName("input");
                if (chk && chk[0]) {
                    chk[0].setAttribute("id", "MandatoryCheckBox" + dataItem.ObjectId);
                    chk[0].setAttribute("utilizingId", "IsMandatory");
                    chk[0].setAttribute("IsPresent", "true");
                    chk[0].setAttribute("mode", "Edit" + dataItem.ObjectId);
                    if (dataItem.IsMandatory && dataItem.IsMandatory == "Yes")
                        $(chk[0]).attr("CHECKED", "");
                }
                $(chk).css("display", "none");
                var label = $("<label/>").attr("id", "lbl_MandatoryCheckBox" + dataItem.ObjectId);
                $(label).html(dataItem.IsMandatory);
                label[0].setAttribute("mode", "ReadOnly" + dataItem.ObjectId);
                tdcheck.appendChild($(label)[0]);
            }
            var tdLabelText = getCellFromRow(row, "DataValueField", "LabelText");
            if (tdLabelText) {
                var txtBox = document.createElement("input");
                txtBox.setAttribute("type", "textbox");
                txtBox.setAttribute("mode", "Edit" + dataItem.ObjectId);
                if (dataItem.LabelText && dataItem.LabelText != "" && dataItem.LabelText != "-")
                    txtBox.setAttribute("value", dataItem.LabelText);
                txtBox.setAttribute("id", "txt_LabelText" + dataItem.ObjectId);
                $(txtBox).css("display", "none");
                tdLabelText.appendChild(txtBox);
                var label = $("<label/>").attr("id", "lbl_LabelText" + dataItem.ObjectId);
                $(label).html(dataItem.LabelText);
                label[0].setAttribute("mode", "ReadOnly" + dataItem.ObjectId);
                tdLabelText.appendChild($(label)[0]);
            }
            var tdPropertyName = getCellFromRow(row, "DataValueField", "PropertyName");
            if (tdPropertyName) {
                var txtBox = document.createElement("input");
                txtBox.setAttribute("type", "textbox");
                txtBox.setAttribute("mode", "Edit" + dataItem.ObjectId);
                if (dataItem.PropertyName && dataItem.PropertyName != "" && dataItem.PropertyName != "-")
                    txtBox.setAttribute("value", dataItem.PropertyName);
                txtBox.setAttribute("id", "txt_PropertyName" + dataItem.ObjectId);
                $(txtBox).css("display", "none");
                tdPropertyName.appendChild(txtBox);
                var label = $("<label/>").attr("id", "lbl_PropertyName" + dataItem.ObjectId);
                $(label).html(dataItem.PropertyName);
                label[0].setAttribute("mode", "ReadOnly" + dataItem.ObjectId);
                tdPropertyName.appendChild($(label)[0]);
            }
            var tdLinkToText = getCellFromRow(row, "DataValueField", "LinkToText");
            if (tdLinkToText) {
                var txtBox = document.createElement("input");
                txtBox.setAttribute("type", "textbox");
                txtBox.setAttribute("mode", "Edit" + dataItem.ObjectId);
                if (dataItem.LinkToText && dataItem.LinkToText != "" && dataItem.LinkToText != "-")
                    txtBox.setAttribute("value", dataItem.LinkToText);
                txtBox.setAttribute("id", "txt_LinkToText" + dataItem.ObjectId);
                $(txtBox).css("display", "none");
                tdLinkToText.appendChild(txtBox);
                var label = $("<label/>").attr("id", "lbl_LinkToText" + dataItem.ObjectId);
                $(label).html(dataItem.LinkToText);
                label[0].setAttribute("mode", "ReadOnly" + dataItem.ObjectId);
                tdLinkToText.appendChild($(label)[0]);
            }
            var tdActionName = getCellFromRow(row, "DataValueField", "ActionName");
            if (tdActionName) {
                var txtBox = document.createElement("input");
                txtBox.setAttribute("type", "textbox");
                txtBox.setAttribute("mode", "Edit" + dataItem.ObjectId);
                if (dataItem.ActionName && dataItem.ActionName != "" && dataItem.ActionName != "-")
                    txtBox.setAttribute("value", dataItem.ActionName);
                txtBox.setAttribute("id", "txt_ActionName" + dataItem.ObjectId);
                $(txtBox).css("display", "none");
                tdActionName.appendChild(txtBox);
                var label = $("<label/>").attr("id", "lbl_ActionName" + dataItem.ObjectId);
                $(label).html(dataItem.ActionName);
                label[0].setAttribute("mode", "ReadOnly" + dataItem.ObjectId);
                tdActionName.appendChild($(label)[0]);
            }
            var tdCustomValidation = getCellFromRow(row, "DataValueField", "CustomValidation");
            if (tdCustomValidation) {
                var txtBox = document.createElement("input");
                txtBox.setAttribute("type", "textbox");
                txtBox.setAttribute("mode", "Edit" + dataItem.ObjectId);
                if (dataItem.CustomValidation && dataItem.CustomValidation != "" && dataItem.CustomValidation != "-")
                    txtBox.setAttribute("value", dataItem.CustomValidation);
                txtBox.setAttribute("id", "txt_CustomValidation" + dataItem.ObjectId);
                $(txtBox).css("display", "none");
                tdCustomValidation.appendChild(txtBox);
                var label = $("<label/>").attr("id", "lbl_CustomValidation" + dataItem.ObjectId);
                $(label).html(dataItem.CustomValidation);
                label[0].setAttribute("mode", "ReadOnly" + dataItem.ObjectId);
                tdCustomValidation.appendChild($(label)[0]);
            }
            var tdRuleText = getCellFromRow(row, "DataValueField", "RuleText");
            if (tdRuleText) {
                var txtBox = document.createElement("input");
                txtBox.setAttribute("type", "textbox");
                txtBox.setAttribute("mode", "Edit" + dataItem.ObjectId);
                if (dataItem.RuleText && dataItem.RuleText != "" && dataItem.RuleText != "-")
                    txtBox.setAttribute("value", dataItem.RuleText);
                txtBox.setAttribute("id", "txt_RuleText" + dataItem.ObjectId);
                $(txtBox).css("display", "none");
                tdRuleText.appendChild(txtBox);
                var label = $("<label/>").attr("id", "lbl_RuleText" + dataItem.ObjectId);
                $(label).html(dataItem.RuleText);
                label[0].setAttribute("mode", "ReadOnly" + dataItem.ObjectId);
                tdRuleText.appendChild($(label)[0]);
            }
            var tdErrorText = getCellFromRow(row, "DataValueField", "ErrorText");
            if (tdErrorText) {
                var txtBox = document.createElement("input");
                txtBox.setAttribute("type", "textbox");
                txtBox.setAttribute("mode", "Edit" + dataItem.ObjectId);
                if (dataItem.ErrorText && dataItem.ErrorText != "" && dataItem.ErrorText != "-")
                    txtBox.setAttribute("value", dataItem.ErrorText);
                txtBox.setAttribute("id", "txt_ErrorText" + dataItem.ObjectId);
                $(txtBox).css("display", "none");
                tdErrorText.appendChild(txtBox);
                var label = $("<label/>").attr("id", "lbl_ErrorText" + dataItem.ObjectId);
                $(label).html(dataItem.ErrorText);
                label[0].setAttribute("mode", "ReadOnly" + dataItem.ObjectId);
                tdErrorText.appendChild($(label)[0]);
            }
            var tdMaxLength = getCellFromRow(row, "DataValueField", "MaxLength");
            if (tdMaxLength) {
                var txtBox = document.createElement("input");
                txtBox.setAttribute("type", "textbox");
                txtBox.setAttribute("mode", "Edit" + dataItem.ObjectId);
                if (dataItem.MaxLength && dataItem.MaxLength != "" && dataItem.MaxLength != "-")
                    txtBox.setAttribute("value", dataItem.MaxLength);
                txtBox.setAttribute("id", "txt_MaxLength" + dataItem.ObjectId);
                txtBox.setAttribute("maxlength", "3");
                tdMaxLength.appendChild(txtBox);
                txtBox.setAttribute("onkeypress", "return validate_int_only(event)");
                $(txtBox).css("display", "none");
                var label = $("<label/>").attr("id", "lbl_MaxLength" + dataItem.ObjectId);
                $(label).html(dataItem.MaxLength);
                label[0].setAttribute("mode", "ReadOnly" + dataItem.ObjectId);
                tdMaxLength.appendChild($(label)[0]);
            }
            var tdGroupName = getCellFromRow(row, "DataValueField", "GroupName");
            if (tdGroupName) {
                var txtBox = document.createElement("input");
                txtBox.setAttribute("type", "textbox");
                txtBox.setAttribute("mode", "Edit" + dataItem.ObjectId);
                if (dataItem.GroupName && dataItem.GroupName != "" && dataItem.GroupName != "-")
                    txtBox.setAttribute("value", dataItem.GroupName);
                txtBox.setAttribute("id", "txt_GroupName" + dataItem.ObjectId);
                $(txtBox).css("display", "none");
                tdGroupName.appendChild(txtBox);
                var label = $("<label/>").attr("id", "lbl_GroupName" + dataItem.ObjectId);
                $(label).html(dataItem.GroupName);
                label[0].setAttribute("mode", "ReadOnly" + dataItem.ObjectId);
                tdGroupName.appendChild($(label)[0]);
            }

            var tdCatalogType = getCellFromRow(row, "DataValueField", "PropertyType");
            if (tdCatalogType) {
                var selectCatalogType = document.createElement("select");
                $(selectCatalogType).css("width", "90%");
                tdCatalogType.appendChild(selectCatalogType);
                selectCatalogType.id = "dropDown_PropertyType" + dataItem.ObjectId;
                for (var i in UsualConstants.JsonType) {
                    if (dataItem.PropertyType != undefined && dataItem.PropertyType != null && dataItem.PropertyType != "9999" && dataItem.PropertyType == UsualConstants.JsonType[i])
                        $(selectCatalogType).append("<option selected = 'selected' value=" + UsualConstants.JsonType[i] + " >" + i + "</option>");
                    else
                        $(selectCatalogType).append("<option value=" + UsualConstants.JsonType[i] + " >" + i + "</option>");
                }
                selectCatalogType.setAttribute("onchange", "loadElementTypeInDropdown(" + dataItem.ObjectId + ")");
                selectCatalogType.setAttribute("mode", "Edit" + dataItem.ObjectId);
                $(selectCatalogType).css("display", "none");
                var label = $("<label/>").attr("id", "lbl_PropertyType" + dataItem.ObjectId);
                $(label).html(selectCatalogType.options[selectCatalogType.selectedIndex].text);
                label[0].setAttribute("mode", "ReadOnly" + dataItem.ObjectId);
                tdCatalogType.appendChild($(label)[0]);
            }

            var tdCatalogType = getCellFromRow(row, "DataValueField", "ElementType");
            if (tdCatalogType) {
                var selectCatalogType = document.createElement("select");
                $(selectCatalogType).css("width", "90%");
                tdCatalogType.appendChild(selectCatalogType);
                selectCatalogType.id = "dropDown_ElementType" + dataItem.ObjectId;
                selectCatalogType.setAttribute("onchange", "loadCatalogTypeInDropdown(" + dataItem.ObjectId + ")");
                selectCatalogType.setAttribute("mode", "Edit" + dataItem.ObjectId);
                $(selectCatalogType).css("display", "none");
                var label = $("<label/>").attr("id", "lbl_ElementType" + dataItem.ObjectId);
                label[0].setAttribute("mode", "ReadOnly" + dataItem.ObjectId);
                tdCatalogType.appendChild($(label)[0]);
                //loadCatalogInDropdown(selectCatalogType, dataItem);

            }
            var tdCatalogType = getCellFromRow(row, "DataValueField", "CatalogType");
            if (tdCatalogType) {
                var selectCatalogType = document.createElement("select");
                $(selectCatalogType).css("width", "90%");
                tdCatalogType.appendChild(selectCatalogType);
                selectCatalogType.id = "dropDown_CatalogType" + dataItem.ObjectId;
                selectCatalogType.setAttribute("mode", "Edit" + dataItem.ObjectId);
                $(selectCatalogType).css("display", "none");
                var label = $("<label/>").attr("id", "lbl_CatalogType" + dataItem.ObjectId);
                label[0].setAttribute("mode", "ReadOnly" + dataItem.ObjectId);
                tdCatalogType.appendChild($(label)[0]);
            }
            loadElementTypeInDropdown(dataItem.ObjectId, dataItem);
            //This.ChangeRowMode('ReadOnly', dataItem.ObjectId);
        }

    }


    this.UpdateCustomEntity = function () {
        var grpAdded = false;
        this.SaveData = [];
        this.GroupName = [];
        $("#div_groupId").html("");
        $("#div_groupIdReadOnly").html("");
        for (i = 0; i < CandProp.length; i++) {
            if ($("#EditableCheckBox" + CandProp[i].ObjectId).is(':checked')) {
                var SavDataFormat = { "ObjectId": null, "PropertyName": null, "PropertyType": null, "LabelText": null, "LinkToText": null, "RuleText": null, "ElementType": null, "IsEditable": null, "IsMandatory": null, "CatalogType": null, "GroupName": null, "ActionName": null, "CustomValidation": null, "ErrorText": null };
                SavDataFormat.ObjectId = CandProp[i].ObjectId;
                SavDataFormat.PropertyName = CandProp[i].PropertyName.trim();

                if ($("#dropDown_PropertyType" + CandProp[i].ObjectId).val())
                    SavDataFormat.PropertyType = $("#dropDown_PropertyType" + CandProp[i].ObjectId).val().trim();

                if ($("#txt_LabelText" + CandProp[i].ObjectId).val() && $("#txt_LabelText" + CandProp[i].ObjectId).val() != "")
                    SavDataFormat.LabelText = $("#txt_LabelText" + CandProp[i].ObjectId).val().trim();
                else
                    SavDataFormat.LabelText = CandProp[i].PropertyName.trim();
                if ($("#txt_LinkToText" + CandProp[i].ObjectId).val())
                    SavDataFormat.LinkToText = $("#txt_LinkToText" + CandProp[i].ObjectId).val().trim();
                if ($("#txt_ErrorText" + CandProp[i].ObjectId).val())
                    SavDataFormat.ErrorText = $("#txt_ErrorText" + CandProp[i].ObjectId).val().trim();
                if ($("#txt_MaxLength" + CandProp[i].ObjectId).val())
                    SavDataFormat.MaxLength = $("#txt_MaxLength" + CandProp[i].ObjectId).val().trim();
                if ($("#txt_RuleText" + CandProp[i].ObjectId).val())
                    SavDataFormat.RuleText = $("#txt_RuleText" + CandProp[i].ObjectId).val().trim();
                if ($("#dropDown_ElementType" + CandProp[i].ObjectId).val())
                    SavDataFormat.ElementType = $("#dropDown_ElementType" + CandProp[i].ObjectId).val().trim();
                if ($("#dropDown_CatalogType" + CandProp[i].ObjectId).val() != '9999')
                    SavDataFormat.CatalogType = $("#dropDown_CatalogType" + CandProp[i].ObjectId).val().trim() + "_" + $("#dropDown_CatalogType" + CandProp[i].ObjectId).find(":selected").parent().attr("label");
                if ($("#txt_ActionName" + CandProp[i].ObjectId).val())
                    SavDataFormat.ActionName = $("#txt_ActionName" + CandProp[i].ObjectId).val().trim();
                if ($("#txt_CustomValidation" + CandProp[i].ObjectId).val())
                    SavDataFormat.CustomValidation = $("#txt_CustomValidation" + CandProp[i].ObjectId).val().trim();
                if ($("#EditableCheckBox" + CandProp[i].ObjectId).is(':checked'))
                    SavDataFormat.IsEditable = "Yes";
                else
                    SavDataFormat.IsEditable = "No";
                if ($("#MandatoryCheckBox" + CandProp[i].ObjectId).is(':checked'))
                    SavDataFormat.IsMandatory = "Yes";
                else
                    SavDataFormat.IsMandatory = "No";
                if ($("#txt_GroupName" + CandProp[i].ObjectId).val() && $("#txt_GroupName" + CandProp[i].ObjectId).val() != "") {
                    SavDataFormat.GroupName = $("#txt_GroupName" + CandProp[i].ObjectId).val().trim();
                    this.GroupName[SavDataFormat.GroupName] = SavDataFormat.GroupName; grpAdded = true;
                }

                this.SaveData.push(SavDataFormat);
            }
        }
        this.GroupName["main"] = "main";
        System.CandidateEntityInfo[$("#selectMode").val()] = this.SaveData;
        this.GenerateHTML("CandidatetableTemplate", "Candidatetable");
    }

    this.ResetValue = function () {
        this.CustomEntityList = [];
        this.NonCutomEntityList = [];
        this.CatalogMasterEnity = null;
        this.EntityUtilized = [];
        this.RemovedFields = [];
        this.OriginalEntityUtilized = [];
    }

    this.AddEntitiesToGrid = function (objectId) {
        if ($("#EditableCheckBox0").is(':checked')) {
            var SavDataFormat = { "ObjectId": null, "PropertyName": null, "PropertyType": null, "LabelText": null, "LinkToText": null, "RuleText": null, "ElementType": null, "IsEditable": null, "IsMandatory": null, "CatalogType": null, "GroupName": null, "ActionName": null, "CustomValidation": null, "ErrorText": null };
            if (CandProp && CandProp.length > 0) {
                SavDataFormat.ObjectId = CandProp[CandProp.length - 1].ObjectId + 1;
            }
            else {
                SavDataFormat.ObjectId = 1;
            }
            if ($("#txt_PropertyName0").val() != "") {
                SavDataFormat.PropertyName = $("#txt_PropertyName0").val().trim();
            }
            else {
                ErrorMessageHandler("PropertyName is mandatory");
                return;
            }

            if ($("#dropDown_PropertyType0").val())
                SavDataFormat.PropertyType = $("#dropDown_PropertyType0").val().trim();

            if ($("#txt_LabelText0").val() && $("#txt_LabelText0").val() != "")
                SavDataFormat.LabelText = $("#txt_LabelText0").val().trim();
            else
                SavDataFormat.LabelText = SavDataFormat.PropertyName.trim();
            if ($("#txt_LinkToText0").val() && $("#txt_LinkToText0").val() != "")
                SavDataFormat.LinkToText = $("#txt_LinkToText0").val().trim();
            else
                SavDataFormat.LinkToText = "-";
            if ($("#txt_ErrorText0").val() && $("#txt_ErrorText0").val() != "")
                SavDataFormat.ErrorText = $("#txt_ErrorText0").val().trim();
            else
                SavDataFormat.ErrorText = "-";
            if ($("#txt_MaxLength0").val() && $("#txt_MaxLength0").val() != "")
                SavDataFormat.MaxLength = $("#txt_MaxLength0").val().trim();
            else
                SavDataFormat.MaxLength = "-";
            if ($("#txt_RuleText0").val() && $("#txt_RuleText0").val() != "")
                SavDataFormat.RuleText = $("#txt_RuleText0").val().trim();
            else
                SavDataFormat.RuleText = "-";
            if ($("#dropDown_ElementType0").val())
                SavDataFormat.ElementType = $("#dropDown_ElementType0").val().trim();
            if ($("#dropDown_CatalogType0").val() && $("#dropDown_CatalogType0").val() != '9999')
                SavDataFormat.CatalogType = $("#dropDown_CatalogType0").val().trim() + "_" + $("#dropDown_CatalogType0").find(":selected").parent().attr("label");
            else
                SavDataFormat.CatalogType = "-";
            if ($("#txt_ActionName0").val() && $("#txt_ActionName0").val() != "")
                SavDataFormat.ActionName = $("#txt_ActionName0").val().trim();
            else
                SavDataFormat.ActionName = "-";
            if ($("#txt_CustomValidation0").val() && $("#txt_CustomValidation0").val() != "")
                SavDataFormat.CustomValidation = $("#txt_CustomValidation0").val().trim();
            else
                SavDataFormat.CustomValidation = "-";
            if ($("#EditableCheckBox0").is(':checked'))
                SavDataFormat.IsEditable = "Yes";
            else
                SavDataFormat.IsEditable = "No";
            if ($("#MandatoryCheckBox0").is(':checked'))
                SavDataFormat.IsMandatory = "Yes";
            else
                SavDataFormat.IsMandatory = "No";
            if ($("#txt_GroupName0").val() && $("#txt_GroupName0").val() != "") {
                SavDataFormat.GroupName = $("#txt_GroupName0").val().trim();
            }
            else
                SavDataFormat.GroupName = "-";
            CandProp.push(SavDataFormat);
            $("#EntityConfigurationdiv").html("");
            ConstructCustomEntityPropertyGrid(CandProp);
            ClearTemplateRowItemValues();
        }
    }
    this.RemoveRow = function (objectId) {
        for (var i = 0; i < CandProp.length; i++) {
            if (CandProp[i].ObjectId == objectId) {
                CandProp.splice(i, 1);
                break;
            }
        }
        if (CandProp.length == 0) {
            ConstructCustomEntityPropertyGrid(null);
        }
        $("#DataRow" + (objectId - 1) + "PropertyGridCustom").remove();
    }
    function ClearTemplateRowItemValues() {
        $("#txt_PropertyName0").val("");
        $("#txt_LabelText0").val("");
        $("#txt_LinkToText0").val("");
        $("#txt_ErrorText0").val("");
        $("#txt_MaxLength0").val("");
        $("#txt_RuleText0").val("");
        $("#dropDown_CatalogType0").val('9999');
        $("#txt_ActionName0").val("");
        $("#txt_CustomValidation0").val("");
        $("#EditableCheckBox0").removeAttr('checked');
        $("#MandatoryCheckBox0").removeAttr('checked');
        $("#txt_GroupName0").val("");
    }
    this.UpdateRow = function (objectId) {
        for (var i = 0; i < CandProp.length; i++) {
            if (CandProp[i].ObjectId == objectId) {
                var SavDataFormat = { "ObjectId": null, "PropertyName": null, "PropertyType": null, "LabelText": null, "LinkToText": null, "RuleText": null, "ElementType": null, "IsEditable": null, "IsMandatory": null, "CatalogType": null, "GroupName": null, "ActionName": null, "CustomValidation": null, "ErrorText": null };
                SavDataFormat.ObjectId = CandProp[i].ObjectId;
                if ($("#txt_PropertyName" + objectId).val() != "") {
                    SavDataFormat.PropertyName = $("#txt_PropertyName" + objectId).val().trim();
                    $("#lbl_PropertyName" + objectId).html(SavDataFormat.PropertyName);
                }
                else {
                    ErrorMessageHandler("PropertyName is mandatory");
                    return;
                }
                if ($("#dropDown_PropertyType" + objectId).val()) {
                    SavDataFormat.PropertyType = $("#dropDown_PropertyType" + objectId).val().trim();
                    $("#lbl_PropertyType" + objectId).html($("#dropDown_PropertyType" + objectId + " :selected").text());
                }
                else {
                    $("#lbl_PropertyType" + objectId).html("-");
                }
                if ($("#txt_LabelText" + objectId).val() && $("#txt_LabelText" + objectId).val() != "")
                    SavDataFormat.LabelText = $("#txt_LabelText" + objectId).val().trim();
                else
                    SavDataFormat.LabelText = SavDataFormat.PropertyName.trim();
                $("#lbl_LabelText" + objectId).html(SavDataFormat.LabelText);
                if ($("#txt_LinkToText" + objectId).val()) {
                    SavDataFormat.LinkToText = $("#txt_LinkToText" + objectId).val().trim();
                    $("#lbl_LinkToText" + objectId).html(SavDataFormat.LinkToText);
                }
                else {
                    $("#lbl_LinkToText" + objectId).html("-");
                }
                if ($("#txt_ErrorText" + objectId).val()) {
                    SavDataFormat.ErrorText = $("#txt_ErrorText" + objectId).val().trim();
                    $("#lbl_ErrorText" + objectId).html(SavDataFormat.ErrorText);
                }
                else {
                    $("#lbl_ErrorText" + objectId).html("-");
                }
                if ($("#txt_MaxLength" + objectId).val()) {
                    SavDataFormat.MaxLength = $("#txt_MaxLength" + objectId).val().trim();
                    $("#lbl_MaxLength" + objectId).html(SavDataFormat.MaxLength);
                }
                else {
                    $("#lbl_MaxLength" + objectId).html("-");
                }
                if ($("#txt_RuleText" + objectId).val()) {
                    SavDataFormat.RuleText = $("#txt_RuleText" + objectId).val().trim();
                    $("#lbl_RuleText" + objectId).html(SavDataFormat.RuleText);
                }
                else {
                    $("#lbl_RuleText" + objectId).html("-");
                }
                if ($("#dropDown_ElementType" + objectId).val()) {
                    SavDataFormat.ElementType = $("#dropDown_ElementType" + objectId).val().trim();
                    $("#lbl_ElementType" + objectId).html($("#dropDown_ElementType" + objectId + " :selected").text());
                }
                else {
                    $("#lbl_ElementType" + objectId).html("-");
                }
                if ($("#dropDown_CatalogType" + objectId).val() != '9999') {
                    SavDataFormat.CatalogType = $("#dropDown_CatalogType" + objectId).val().trim() + "_" + $("#dropDown_CatalogType" + objectId).find(":selected").parent().attr("label");
                    $("#lbl_CatalogType" + objectId).html($("#dropDown_CatalogType" + objectId + " :selected").text());
                }
                else {
                    $("#lbl_CatalogType" + objectId).html("-");
                }
                if ($("#txt_ActionName" + objectId).val()) {
                    SavDataFormat.ActionName = $("#txt_ActionName" + objectId).val().trim();
                    $("#lbl_ActionName" + objectId).html(SavDataFormat.ActionName);
                }
                else {
                    $("#lbl_ActionName" + objectId).html("-");
                }
                if ($("#txt_CustomValidation" + objectId).val()) {
                    SavDataFormat.CustomValidation = $("#txt_CustomValidation" + objectId).val().trim();
                    $("#lbl_CustomValidation" + objectId).html(SavDataFormat.CustomValidation);
                }
                else {
                    $("#lbl_CustomValidation" + objectId).html("-");
                }
                if ($("#EditableCheckBox" + objectId).is(':checked'))
                    SavDataFormat.IsEditable = "Yes";
                else
                    SavDataFormat.IsEditable = "No";
                $("#lbl_EditableCheckBox" + objectId).html(SavDataFormat.IsEditable);
                if ($("#MandatoryCheckBox" + objectId).is(':checked'))
                    SavDataFormat.IsMandatory = "Yes";
                else
                    SavDataFormat.IsMandatory = "No";
                $("#lbl_MandatoryCheckBox" + objectId).html(SavDataFormat.IsMandatory);
                if ($("#txt_GroupName" + objectId).val() && $("#txt_GroupName" + objectId).val() != "") {
                    SavDataFormat.GroupName = $("#txt_GroupName" + objectId).val().trim();
                    $("#lbl_GroupName" + objectId).html(SavDataFormat.GroupName);
                }
                else {
                    $("#lbl_GroupName" + objectId).html("-");
                }
                CandProp[i] = SavDataFormat;
                this.ChangeRowMode("ReadOnly", objectId);
                break;
            }
        }
    }
    this.ChangeRowMode = function (mode, objectId) {
        if (mode == "Edit") {
            $("#EntityConfigurationdiv").find("[mode=Edit" + objectId + "]").css("display", "");
            $("#EntityConfigurationdiv").find("[mode=ReadOnly" + objectId + "]").css("display", "none");
            $("#EntityConfigurationdiv").find("[id=EditButton" + objectId + "]").attr("href", "javascript:customEntity.UpdateRow('" + objectId + "')").html("Update");
        }
        else {
            $("#EntityConfigurationdiv").find("[mode=Edit" + objectId + "]").css("display", "none");
            $("#EntityConfigurationdiv").find("[mode=ReadOnly" + objectId + "]").css("display", "");
            $("#EntityConfigurationdiv").find("[id=EditButton" + objectId + "]").attr("href", "javascript:customEntity.ChangeRowMode('Edit','" + objectId + "')").html("Edit");
        }
    }
    this.GenerateHTML = function (SourceTable, DestinationTable) {
        var table = document.getElementById(SourceTable);
        //var DestTable = document.getElementById(DestinationTable);
        var groupDivId = $("#div_groupId");
        var groupDivIdReadOnly = $("#div_groupIdReadOnly");
        var mode = $("#selectMode").val();
        var moduleType = $("#selectModule").val();
        var InsertDiv = $("<div id=InM" + moduleType + "/>");
        var ReadOnlyDiv = $("<div id=RoM" + moduleType + "/>");
        var tr;
        if (table) {
            tr = table.rows[0];
            var blankTr = table.rows[1];
            if (tr && tr.getAttribute("template") == "Yes" && blankTr) {
                if (System.CandidateEntityInfo[mode] && System.CandidateEntityInfo[mode].length) {
                    for (var k in this.GroupName) {
                        //if (k != "sortNum" && k != "find") {
                        if (typeof (this.GroupName[k]) !== "function") {
                            k = k.replace(" ", "");
                            if ($("#selectMode").val() != "1") {
                                var div = $("<div/>");
                                div[0].setAttribute("id", moduleType + "_" + k);
                                var DestTable = $("<table/>");
                                DestTable[0].setAttribute("tableGroupName", "table$" + k);
                                if (k != "main") {
                                    $(groupDivId).append(div);
                                    $(div).append(DestTable);
                                    $(DestTable).html("<tr><td colspan='2'><span class='darkblue font14'><b>" + k + "</b></span></td></tr>");
                                }
                                else {
                                    $(groupDivId).append(DestTable);
                                }
                            }
                            if ($("#selectMode").val() != "0") {
                                var div = $("<div/>");
                                div[0].setAttribute("id", k + "_RO");
                                var DestTable = $("<table/>");
                                DestTable[0].setAttribute("tableGroupName", "table$" + k + "$RO");
                                if (k != "main") {
                                    $(groupDivIdReadOnly).append(div);
                                    $(div).append(DestTable);
                                    $(DestTable).html("<tr><td colspan='2'><span class='darkblue font14'><b>" + k + "</b></span></td></tr>");
                                }
                                else {
                                    $(groupDivIdReadOnly).append(DestTable);
                                }
                            }
                        }
                    }
                    var linkToArray = []; var counter = 0;
                    var linkToArrayReadOnly = [];
                    for (var i = 0; i < System.CandidateEntityInfo[mode].length; i++) {
                        if (System.CandidateEntityInfo[mode][i].IsEditable == "Yes") {
                            if (!System.CandidateEntityInfo[mode][i].GroupName || System.CandidateEntityInfo[mode][i].GroupName == "") {
                                grpname = "main";
                            }
                            else {
                                grpname = System.CandidateEntityInfo[mode][i].GroupName;
                            }
                            grpname.replace(" ", "");
                            var idProperty = System.CandidateEntityInfo[mode][i].PropertyType.replace(/\./g, "_") + "-" + System.CandidateEntityInfo[mode][i].PropertyName.replace(/\./g, "_");
                            var elementToAppendId = "ele-" + moduleType + "-" + idProperty + "-" + System.CandidateEntityInfo[mode][i].ElementType;
                            if (mode == "1" || mode == "3") {
                                var DestTableReadOnly = groupDivIdReadOnly.find("[tableGroupName=table$" + grpname + "$RO]");
                                var labelToAppend = $("#" + SourceTable + " [elementType=label]").clone(true);
                                var Clonetr = blankTr.cloneNode(true);
                                var newTD = $("<td/>");
                                Clonetr.setAttribute("id", "tr" + moduleType + System.CandidateEntityInfo[mode][i].PropertyName.replace(/\./g, "_") + "RO");
                                $(newTD).attr("id", "td" + moduleType + System.CandidateEntityInfo[mode][i].PropertyName.replace(/\./g, "_") + "RO");
                                $(newTD).append($("<label/>").attr("id", (elementToAppendId + "-labelRO")));
                                $(labelToAppend).attr("id", "td" + moduleType + System.CandidateEntityInfo[mode][i].PropertyName.replace(/\./g, "_") + "ROlabel");
                                if (System.CandidateEntityInfo[mode][i].ActionName && System.CandidateEntityInfo[mode][i].ActionName != "") {
                                    newTD[0].setAttribute("name", UsualConstants.ElementRule["Action"] + "$" + System.CandidateEntityInfo[mode][i].ActionName.replace(/\,/g, "$").replace(/ /g, ""));
                                    labelToAppend[0].setAttribute("name", UsualConstants.ElementRule["Action"] + "$" + System.CandidateEntityInfo[mode][i].ActionName.replace(/\,/g, "$").replace(/ /g, ""));
                                }
                                $(labelToAppend).html(System.CandidateEntityInfo[mode][i].LabelText);
                                var isRowadded = false;
                                if (System.CandidateEntityInfo[mode][i].LinkToText && System.CandidateEntityInfo[mode][i].LinkToText != "") {
                                    if (!linkToArrayReadOnly[System.CandidateEntityInfo[mode][i].LinkToText]) {
                                        linkToArrayReadOnly[System.CandidateEntityInfo[mode][i].LinkToText] = System.CandidateEntityInfo[mode][i].LinkToText;
                                        $(labelToAppend).html(System.CandidateEntityInfo[mode][i].LinkToText);
                                    }
                                    else {
                                        isRowadded = true;
                                    }
                                }
                                if (!isRowadded) {
                                    $(Clonetr).append(labelToAppend);
                                    $(Clonetr).append(newTD);
                                    $(DestTableReadOnly).append(Clonetr);
                                }
                                if (mode == "1") {
                                    continue;
                                }
                            }
                            var DestTable = groupDivId.find("[tableGroupName=table$" + grpname + "]");
                            var labelToAppend = $("#" + SourceTable + " [elementType=label]").clone(true);
                            var Clonetr = blankTr.cloneNode(true);
                            var linkToAdded = false;
                            var newTD = $("<td/>");
                            Clonetr.setAttribute("id", "tr" + moduleType + System.CandidateEntityInfo[mode][i].PropertyName.replace(/\./g, "_"));
                            $(newTD).attr("id", "td" + moduleType + System.CandidateEntityInfo[mode][i].PropertyName.replace(/\./g, "_"));
                            $(labelToAppend).attr("id", "td" + moduleType + System.CandidateEntityInfo[mode][i].PropertyName.replace(/\./g, "_") + "label");
                            //                            if (System.CandidateEntityInfo[mode][i].ActionName && System.CandidateEntityInfo[mode][i].ActionName != "")
                            //                                Clonetr.setAttribute("name", moduleType + "$" + System.CandidateEntityInfo[mode][i].ActionName.replace(",", "$").replace(" ", ""));
                            if (System.CandidateEntityInfo[mode][i].ActionName && System.CandidateEntityInfo[mode][i].ActionName != "") {
                                newTD[0].setAttribute("name", UsualConstants.ElementRule["Action"] + "$" + System.CandidateEntityInfo[mode][i].ActionName.replace(/\,/g, "$").replace(/ /g, ""));
                                labelToAppend[0].setAttribute("name", UsualConstants.ElementRule["Action"] + "$" + System.CandidateEntityInfo[mode][i].ActionName.replace(/\,/g, "$").replace(/ /g, ""));
                            }
                            $(labelToAppend).html(System.CandidateEntityInfo[mode][i].LabelText);
                            if (System.CandidateEntityInfo[mode][i].LinkToText && System.CandidateEntityInfo[mode][i].LinkToText != "") {
                                if (!linkToArray[System.CandidateEntityInfo[mode][i].LinkToText]) {
                                    linkToArray[System.CandidateEntityInfo[mode][i].LinkToText] = System.CandidateEntityInfo[mode][i].LinkToText;
                                    $(labelToAppend).html(System.CandidateEntityInfo[mode][i].LinkToText);
                                    newTD[0].setAttribute("linkTo", System.CandidateEntityInfo[mode][i].LinkToText);
                                }
                                else {
                                    linkToAdded = true;
                                    counter++;
                                }
                            }
                            var elementId = "";
                            if (System.CandidateEntityInfo[mode][i].IsMandatory && System.CandidateEntityInfo[mode][i].IsMandatory == "Yes") {
                                elementId = UsualConstants.ElementRule.Mandatory + "$1_";
                            }
                            if (System.CandidateEntityInfo[mode][i].RuleText && System.CandidateEntityInfo[mode][i].RuleText != "") {
                                elementId += UsualConstants.ElementRule.Rule + "$" + System.CandidateEntityInfo[mode][i].RuleText + "_";
                            }
                            if (System.CandidateEntityInfo[mode][i].ErrorText && System.CandidateEntityInfo[mode][i].ErrorText != "") {
                                elementId += UsualConstants.ElementRule.Error + "$" + System.CandidateEntityInfo[mode][i].ErrorText.replace(/ /g, "").replace(/\,/g, "$") + "_";
                            }
                            if (System.CandidateEntityInfo[mode][i].CustomValidation && System.CandidateEntityInfo[mode][i].CustomValidation != "") {
                                elementId += UsualConstants.ElementRule.CustomMethod + "$" + System.CandidateEntityInfo[mode][i].CustomValidation.replace(/ /g, "").replace(/\,/g, "$") + "_";
                            }
                            if (System.CandidateEntityInfo[mode][i].ElementType == "1" || System.CandidateEntityInfo[mode][i].ElementType == "4" || System.CandidateEntityInfo[mode][i].ElementType == "5" || System.CandidateEntityInfo[mode][i].ElementType == "6") {
                                if (System.CandidateEntityInfo[mode][i].CatalogType && System.CandidateEntityInfo[mode][i].CatalogType != "") {
                                    var catalogParent = System.CandidateEntityInfo[mode][i].CatalogType.split("_");
                                    if (catalogParent[1] == "Enum") {
                                        elementId += UsualConstants.ElementRule.BindingEnum + "$" + catalogParent[0] + "_";
                                    }
                                    else if (catalogParent[1] == "Catalog") {
                                        elementId += UsualConstants.ElementRule.BindingCatalog + "$" + catalogParent[0] + "_";
                                    }
                                    else if (catalogParent[1] == "Methods") {
                                        elementId += UsualConstants.ElementRule.BindingMethod + "$" + catalogParent[0] + "_";
                                    }
                                }
                            }
                            if (System.CandidateEntityInfo[mode][i].ElementType == "11" || System.CandidateEntityInfo[mode][i].ElementType == "12") {
                                elementId += UsualConstants.ElementRule.DTPickerDate + "_";
                            }
                            if (System.CandidateEntityInfo[mode][i].ElementType == "7" || System.CandidateEntityInfo[mode][i].ElementType == "10") {
                                elementId += UsualConstants.ElementRule.DTPicker + "_";
                            }
                            if (System.CandidateEntityInfo[mode][i].LabelText && System.CandidateEntityInfo[mode][i].LabelText != "") {
                                elementId += UsualConstants.ElementRule.Label + "$" + System.CandidateEntityInfo[mode][i].LabelText.replace(/ /g, "*");
                            }
                            elementToAppendId = elementToAppendId + "-" + counter;
                            var eleToAppend = null;
                            var maxLengthSpan = null;
                            switch (System.CandidateEntityInfo[mode][i].ElementType) {
                                case "0": //CheckBox
                                    eleToAppend = $("#" + SourceTable + " [elementType=CheckBox]").clone(true);
                                    $(eleToAppend).attr("id", elementToAppendId);
                                    break;
                                case "1": //Radio
                                    eleToAppend = $("#" + SourceTable + " [elementType=Radio]").clone(true);
                                    if (System.CandidateEntityInfo[mode][i].LinkToText && System.CandidateEntityInfo[mode][i].LinkToText != "") {
                                        $(eleToAppend).attr("name", System.CandidateEntityInfo[mode][i].LinkToText.replace(/ /g, ""));
                                    }
                                    $(eleToAppend).attr("id", elementToAppendId);
                                    if (elementId.indexOf(UsualConstants.ElementRule.BindingEnum + "$") > -1) {
                                        eleToAppend[0].setAttribute("value", "1");
                                    }
                                    break;
                                case "2": //TextBox
                                    eleToAppend = $("#" + SourceTable + " [elementType=TextBox]").clone(true);
                                    if (System.CandidateEntityInfo[mode][i].MaxLength && System.CandidateEntityInfo[mode][i].MaxLength != "") {
                                        $(eleToAppend).attr("maxlength", System.CandidateEntityInfo[mode][i].MaxLength.replace(/ /g, ""));
                                    }
                                    if (System.CandidateEntityInfo[mode][i].PropertyType == UsualConstants.JsonType.Int || System.CandidateEntityInfo[mode][i].PropertyType == "jni") {
                                        eleToAppend[0].setAttribute("onkeypress", "return validate_int_only(event)");
                                    }
                                    if (System.CandidateEntityInfo[mode][i].PropertyType == UsualConstants.JsonType.Float || System.CandidateEntityInfo[mode][i].PropertyType == "jnf") {
                                        eleToAppend[0].setAttribute("onkeypress", "return validate_double_only(event)");
                                    }
                                    $(eleToAppend).attr("id", elementToAppendId);
                                    break;
                                case "3": //TextArea
                                    eleToAppend = $("#" + SourceTable + " [elementType=TextArea]").clone(true);
                                    if (eleToAppend && eleToAppend[0]) {
                                        eleToAppend[0].setAttribute("cols", "10");
                                        if (System.CandidateEntityInfo[mode][i].MaxLength && System.CandidateEntityInfo[mode][i].MaxLength != "") {
                                            eleToAppend[0].setAttribute("onkeydown", "return validate_stringLength(event,'" + System.CandidateEntityInfo[mode][i].MaxLength.replace(/ /g, "") + "')");
                                            eleToAppend[0].setAttribute("onkeyup", "return validate_stringLength_onKeyUp(event,'" + System.CandidateEntityInfo[mode][i].MaxLength.replace(/ /g, "") + "')");
                                            maxLengthSpan = $("#" + SourceTable + " [elementType=MaxLengthSpan]").clone(true);
                                            var valueToAppend = "Max " + System.CandidateEntityInfo[mode][i].MaxLength.replace(/ /g, "") + " characters:" + "<span id=SML_" + elementToAppendId + " style='color: Red; padding-left: 5px;'>0</span>";
                                            $(maxLengthSpan).html(valueToAppend);
                                        }
                                    }
                                    $(eleToAppend).attr("id", elementToAppendId);
                                    break;
                                case "4": //Combo-SingleSelect
                                    eleToAppend = $("#" + SourceTable + " [elementType=SingleCombo]").clone(true);
                                    $(eleToAppend).attr("id", elementToAppendId);
                                    break;
                                case "5": //Combo-MultiSelect
                                    eleToAppend = $("#" + SourceTable + " [elementType=Combo]").clone(true);
                                    $(eleToAppend).attr("id", elementToAppendId);
                                    break;
                                case "6": //Combo-Custom_SingleSelect
                                    eleToAppend = $("#" + SourceTable + " [elementType=Combo]").clone(true);
                                    $(eleToAppend).attr("id", elementToAppendId);
                                    break;
                                case "7": //DTPicker
                                case "11":
                                    eleToAppend = $("#" + SourceTable + " [elementType=DTPicker]").clone(true);
                                    if (eleToAppend && eleToAppend[0]) {
                                        var input = eleToAppend[0].getElementsByTagName("input");
                                        if (input[0]) {
                                            input[0].setAttribute("name", elementId);
                                            input[0].setAttribute("id", elementToAppendId);
                                        }
                                    }
                                    break;
                                case "10": //DTPicker
                                case "12":
                                    eleToAppend = $("#" + SourceTable + " [elementType=DTPickerNoImg]").clone(true);
                                    if (eleToAppend && eleToAppend[0]) {
                                        var input = eleToAppend[0].getElementsByTagName("input");
                                        if (input[0]) {
                                            input[0].setAttribute("name", elementId);
                                            input[0].setAttribute("id", elementToAppendId);
                                        }
                                    }
                                    break;
                                case "13":
                                    eleToAppend = $("#" + SourceTable + " [elementtype=Attachment]").clone(true);
                                    $(eleToAppend).attr("id", elementToAppendId);
                                    break;

                            }

                            var required = null;
                            if (System.CandidateEntityInfo[mode][i].IsMandatory == "Yes") {
                                required = $("#" + SourceTable + " [elementType=Mandatory]").clone(true);
                            }
                            var errorSpan = null;
                            if (elementId.indexOf(UsualConstants.ElementRule.Rule + "$") > -1 || elementId.indexOf(UsualConstants.ElementRule.Mandatory + "$1") > -1) {
                                errorSpan = $("#" + SourceTable + " [elementType=ErrorText]").clone(true);
                                $(errorSpan).attr("id", "err-" + moduleType + "-" + idProperty + "-" + System.CandidateEntityInfo[mode][i].ElementType);
                            }
                            if (System.CandidateEntityInfo[mode][i].ElementType != "1" && System.CandidateEntityInfo[mode][i].ElementType != "7") {
                                if (eleToAppend && eleToAppend[0]) {
                                    eleToAppend[0].setAttribute("name", elementId);
                                }
                            }
                            else if (System.CandidateEntityInfo[mode][i].ElementType == "1") {
                                if (eleToAppend && eleToAppend[0]) {
                                    eleToAppend[0].setAttribute("class", elementId);
                                }
                            }
                            var label = $("<label/>");
                            $(label).html(System.CandidateEntityInfo[mode][i].LabelText);
                            $(Clonetr).append(labelToAppend);
                            if (linkToAdded) {
                                if (DestTable.find("[linkTo=" + System.CandidateEntityInfo[mode][i].LinkToText + "] [elementType=Mandatory]").length) {
                                    $(eleToAppend).insertBefore(DestTable.find("[linkTo=" + System.CandidateEntityInfo[mode][i].LinkToText + "] [elementType=Mandatory]"));
                                    $(label).insertBefore(DestTable.find("[linkTo=" + System.CandidateEntityInfo[mode][i].LinkToText + "] [elementType=Mandatory]"));
                                }
                                else {
                                    DestTable.find("[linkTo=" + System.CandidateEntityInfo[mode][i].LinkToText + "]").append(eleToAppend);
                                    DestTable.find("[linkTo=" + System.CandidateEntityInfo[mode][i].LinkToText + "]").append(label);
                                    DestTable.find("[linkTo=" + System.CandidateEntityInfo[mode][i].LinkToText + "]").append(required);
                                    if (DestTable.find("[linkTo=" + System.CandidateEntityInfo[mode][i].LinkToText + "] [elementType=ErrorText]").length) {
                                        DestTable.find("[linkTo=" + System.CandidateEntityInfo[mode][i].LinkToText + "]").append(errorSpan);
                                    }
                                }
                                $(eleToAppend).removeAttr("elementtype");
                                $(labelToAppend).removeAttr("elementtype");
                            }
                            else {
                                $(newTD).append(eleToAppend);
                                if (System.CandidateEntityInfo[mode][i].LinkToText && System.CandidateEntityInfo[mode][i].LinkToText != "") {
                                    $(newTD).append(label);
                                }
                                $(newTD).append(required);
                                $(newTD).append(errorSpan);
                                $(newTD).append(maxLengthSpan);
                                $(Clonetr).append(newTD);
                                $(DestTable).append(Clonetr);
                                $(eleToAppend).removeAttr("elementtype");
                                $(labelToAppend).removeAttr("elementtype");
                                $(maxLengthSpan).removeAttr("elementtype");
                            }
                        }

                    }
                }
            }
            //$(groupDivId).append(DestTable);
            //This htmlString needs to divided in to 8000 charter because browser will not support the data more then 8192 charters for each property 

            var htmlGenerated = $(groupDivId).html();
            $(InsertDiv).html(htmlGenerated);
            htmlGenerated = $(groupDivIdReadOnly).html();
            $(ReadOnlyDiv).html(htmlGenerated);
            var mainDiv = $("<div id=Main" + moduleType + "/>");
            $(mainDiv).append(InsertDiv);
            $(mainDiv).append(ReadOnlyDiv);
            var tempDiv = $("<div/>");
            $(tempDiv).append(mainDiv);
            htmlGenerated = $(tempDiv).html();
            var htmlString = [];
            var arrayLength = (htmlGenerated.toString().length / 8000);
            if (arrayLength == 1 || arrayLength == 0) {
                htmlString.push(htmlGenerated);
            }
            else {
                for (var i = 0; i < arrayLength; i++) {
                    htmlString.push(htmlGenerated.toString().substr(i * 8000, 8000));
                }
            }
            var tenantInfo = {TenantId : 123, UserId : "321"}; // getTenantAdamInfo();
            var controlControlFileName = "candidate";
            var SaveHtmlControlRequest = { "htmlString": htmlString, "htmlFileName": controlControlFileName, "TenantId": tenantInfo.TenantId, "UserId": tenantInfo.UserId, "TenantAlias": getTenantAlias() };
            callAjaxService("SaveHtmlControl", SaveHtmlControlRequest, callBackSaveHtmlControl, callBackFailUsual);
        }
        function callBackSaveHtmlControl(response) {
            if (response) {
            }
        }
    }
}

function loadElementTypeInDropdown(objectId, dataItem) {
    //divId = document.getElementById(divId);
    var text = $("#dropDown_PropertyType" + objectId + " :selected").text();
    $("#dropDown_ElementType" + objectId).html("");
    var found = false;
    for (var i in UsualConstants.Rule) {
        if (text == i) {
            found = true;
            for (var j = 0; j < UsualConstants.Rule[i].length; j++) {
                $("#dropDown_ElementType" + objectId).append("<option value=" + UsualConstants.ElementType[UsualConstants.Rule[i][j]] + " >" + UsualConstants.Rule[i][j] + "</option>");
                if (dataItem && dataItem.ElementType != undefined && dataItem.ElementType != null && UsualConstants.ElementType[UsualConstants.Rule[i][j]] == dataItem.ElementType) {
                    $("#dropDown_ElementType" + objectId).val(dataItem.ElementType);
                    $("#lbl_ElementType" + objectId).html(UsualConstants.Rule[i][j]);
                }
            }
        }
        if (found)
            break;
    }
    loadCatalogTypeInDropdown(objectId, dataItem);
}
function loadCatalogTypeInDropdown(objectId, dataItem) {
    //divId = document.getElementById(divId);
    var text = $("#dropDown_ElementType" + objectId + " :selected").text();
    $("#dropDown_CatalogType" + objectId).html("");
    $("#dropDown_CatalogType" + objectId).append("<option value='9999'>Choose</option>");
    $("#lbl_CatalogType" + objectId).html("-");
    var found = false;
    for (var i in UsualConstants.CatalogRule) {
        if (text == i) {
            found = true;
            for (var j = 0; j < UsualConstants.CatalogRule[i].length; j++) {
                var optgrp = $("<optgroup label=" + UsualConstants.CatalogRule[i][j] + " />");
                for (var k in UsualConstants.Catalogs[UsualConstants.CatalogRule[i][j]]) {
                    if (dataItem && dataItem.CatalogType != undefined && dataItem.CatalogType != null && dataItem.CatalogType != "" && dataItem.CatalogType.split("_").length > 0 && k == dataItem.CatalogType.split("_")[0]) {
                        $(optgrp).append("<option selected = 'selected' value=" + k + " >" + UsualConstants.Catalogs[UsualConstants.CatalogRule[i][j]][k] + "</option>");
                        $("#lbl_CatalogType" + objectId).html(UsualConstants.Catalogs[UsualConstants.CatalogRule[i][j]][k]);
                    }
                    else {
                        $(optgrp).append("<option value=" + k + " >" + UsualConstants.Catalogs[UsualConstants.CatalogRule[i][j]][k] + "</option>");
                    }
                }
                $("#dropDown_CatalogType" + objectId).append(optgrp);

            }
        }
        if (found)
            break;
    }
}

function callBackFailUsual(request) {

}

function loadPropertyType(objectId) {
    $("#dropDown_PropertyType" + objectId).html("");
    var selectCatalogType = $("#dropDown_PropertyType" + objectId);
    if (selectCatalogType && selectCatalogType.length > 0) {
        for (var i in UsualConstants.JsonType)
            $(selectCatalogType).append("<option value=" + UsualConstants.JsonType[i] + " >" + i + "</option>");
        selectCatalogType[0].setAttribute("onchange", "loadElementTypeInDropdown('0')");
        $(selectCatalogType).css("width", "100%");
    }
    loadElementTypeInDropdown(0);
}