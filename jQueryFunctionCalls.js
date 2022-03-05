/*
 NAME: Dhruvanshi Ghiya, Deep Patel
 PROJECT        :   jQueryExamples.js
 ASSIGNMENT     :   Assignment 07
 FIRST VERSION  :   December 4, 2021
 DESCRIPTION    :   Contains all the methods required to opn files, read it, save it and save As functionality

Functions and Main() use code from:

TITLE           : JSON and jQuery Examples
AUTHOR          : Sean Clarke
DATE            : 2021-11-12
VERSION         : Unknown
AVAILABILITY    : https://conestoga.desire2learn.com/d2l/le/content/483723/Home?itemIdentifier=TOC

TITLE           : jQuery Introduction
AUTHOR          : Mukesh Mehta
DATE            : 2021-11-12
VERSION         : Unknown
AVAILABILITY    : https://www.w3schools.com/js/js_json_intro.asp
*/

// global variable - for use in jQuery (AJAX) calls
var jQueryXMLHttpRequest;
var jQueryXMLHttpRequest2;


//jquery activate only when ready
//does the intial call to get the file list on document ready
$(document).ready(function () {
    getAllFilesList();
    $("#filesList").click(getAllFilesList);
    $(".select").change(openAndReadFileContents);
    $("#textContentArea").change(buttonsEnable);
    $("#nameOfTheFile").change(buttonsEnable);
    $("#save").click(SaveFileContents);
    $("#saveAs").click(SaveAsContents);
});






/*
* FUNCTION    : getAllFilesList()
* DESCRIPTION : This function gets all files from the system. It uses an ajax call to access the code
*               behind web method to do the file IO and return the data.
* PARAMETERS  : Nothing.
* RETURNS     : Nothing.
*/
function getAllFilesList() {

    //build the outgoing JSON parameter being passed in the C# (code behind) entry point
    var jsonData = {};
    var jsonString = JSON.stringify(jsonData);

    jQueryXMLHttpRequest2 = $.ajax({
        type: "POST",
        url: "default.aspx/GetList",
        data: jsonString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data.d != null) {
                var response;
                //If file list is empty
                $("#filesList").empty();
                //Append
                $("#filesList").append("<option value=\"NULL\">-- Select a File --</option>");

                response = $.parseJSON(data.d);
                document.getElementById("statusMessage").innerHTML = "File loading status : <b>" + response.status + "</b>";
                //Get file description
                fileName = response.description;

                //parse
                $.each(fileName, function (i, contents) {
                    var fileNames = contents; 
                    $("#filesList").append("<option value='" + fileNames + "'>" + fileNames + "</option>");
                })
                
            }
        },
        fail: function () {
            //Error Message 
            document.getElementById("statusMessage").innerHTML = "The call to the WebMethod failed!";
        }

    });
}



/*
* FUNCTION    : openAndReadFileContents()
* DESCRIPTION : This function opens a file from the system. It uses an ajax call to access the code
*               behind webmethod OpenFile to do the file IO and return the data.
* PARAMETERS  : Nothing.
* RETURNS     : Nothing.
*/
function openAndReadFileContents() {
    // this example comes prepackaged with a file called "mySampleFile.txt" - if you want to try and run 
    // the page with an example of not finding/opening the file - then change "openfileData" to any other value
    //

    var file = this.value;
    openfileData = file; // name of file to open
    document.getElementById("nameOfTheFile").value = openfileData;
    var openFileData = "";                  // variable to hold the file's contents (if opened)

    //build the outgoing JSON parameter being passed in the C# (code behind) entry point
    var jsonData = { fileToLoad: openfileData };
    var jsonString = JSON.stringify(jsonData);

    

    // jQuery AJAX call to OpenFile webmethod (code behind) for sending and receiving JSON
    // In the following call:
    //  - the "URL" is the "entry point" (i.e. WebMethod) in the .CS file that will be called
    //  - the "data" is the outgoing JSON structure containing the filename to be opened
    //    - because the outgoing data is JSON, the "contentType" must be set accordingly
    //  - the "dataType" is set to JSON, because this JavaScript function expects the return value to be
    //    sent in JSON format as well
    //
    jQueryXMLHttpRequest = $.ajax({
        type: "POST",
        url: "default.aspx/OpenFile",
        data: jsonString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data.d != null) {
                //Variable declaration
                var response;
                //we need to parse it to JSON - this code is used if the file is found and also if the file is not found
                response = $.parseJSON(data.d);
                //Status message
                document.getElementById("statusMessage").innerHTML = "File loading status : <b>" + response.status + "</b>";
                //Character count
                document.getElementById("characterCount").innerHTML = "Characters Count: " + response.length;
                //File Description
                document.getElementById("textContentArea").value = response.description;
                

            }
        },
        fail: function () {
            // Error message
            document.getElementById("statusMessage").innerHTML = "The call to the WebMethod failed!";
        }

    });


}


/*
* FUNCTION    : buttonsEnable()
* DESCRIPTION : This function enables buttons: "Save", "Save As"
* PARAMETERS  : Nothing.
* RETURNS     : Nothing.
*/
function buttonsEnable()
{
    //Button enable = "Save"
    document.getElementById("save").disabled = false;
    //Button enable = "Save As"
    document.getElementById("saveAs").disabled = false;
}

/*
* FUNCTION    : SaveFileContents()
* DESCRIPTION : This function saves contents of a file.
* PARAMETERS  : Nothing.
* RETURNS     : Nothing.
*/
function SaveFileContents()
{
    //Get name of file
    var openfileData = document.getElementById("nameOfTheFile").value;
    var fileContents = document.getElementById("textContentArea").value;
    var openFileData = ""; // variable to hold the file's contents (if opened)

    //build the outgoing JSON parameter being passed in the C# (code behind) entry point
    var jsonData = { fileData: fileContents, fileToLoad: openfileData };
    //Stringify JSON
    var jsonString = JSON.stringify(jsonData);



    // jQuery AJAX call to OpenFile webmethod (code behind) for sending and receiving JSON
    // In the following call:
    //  - the "URL" is the "entry point" (i.e. WebMethod) in the .CS file that will be called
    //  - the "data" is the outgoing JSON structure containing the filename to be opened
    //    - because the outgoing data is JSON, the "contentType" must be set accordingly
    //  - the "dataType" is set to JSON, because this JavaScript function expects the return value to be
    //    sent in JSON format as well
    //
    jQueryXMLHttpRequest = $.ajax({
        type: "POST",
        url: "default.aspx/SaveFile",
        data: jsonString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data.d != null) {
                var response;

                //we need to parse it to JSON - this code is used if the file is found and also if the file is not found
                response = $.parseJSON(data.d);
                //File status
                document.getElementById("statusMessage").innerHTML = "File Status : <b>" + response.status + "</b>";
                //Character count
                document.getElementById("characterCount").innerHTML = "Characters Count: " + response.length;
                //Content Description
                document.getElementById("textContentArea").value = response.description;


            }
        },
        fail: function () {
            //Error message
            document.getElementById("statusMessage").innerHTML = "The call to the WebMethod failed!";
        }
    });

}


/*
* FUNCTION    : SaveAsContents()
* DESCRIPTION : This function saves a file into a particular folder
* PARAMETERS  : Nothing.
* RETURNS     : Nothing.
*/
function SaveAsContents()
{
    //get name of file 
    var openfileData = document.getElementById("nameOfTheFile").value;
    //Get file contents
    var fileContents = document.getElementById("textContentArea").value;
    var openFileData = ""; // variable to hold the file's contents (if opened)

    //build the outgoing JSON parameter being passed in the C# (code behind) entry point
    var jsonData = { fileData: fileContents, fileToLoad: openfileData };
    var jsonString = JSON.stringify(jsonData);



    // jQuery AJAX call to OpenFile webmethod (code behind) for sending and receiving JSON
    // In the following call:
    //  - the "URL" is the "entry point" (i.e. WebMethod) in the .CS file that will be called
    //  - the "data" is the outgoing JSON structure containing the filename to be opened
    //    - because the outgoing data is JSON, the "contentType" must be set accordingly
    //  - the "dataType" is set to JSON, because this JavaScript function expects the return value to be
    //    sent in JSON format as well
    //
    jQueryXMLHttpRequest = $.ajax({
        type: "POST",
        url: "default.aspx/SaveAsFile",
        data: jsonString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data.d != null) {
                var response;

                //we need to parse it to JSON - this code is used if the file is found and also if the file is not found
                response = $.parseJSON(data.d);
                //Get file status
                document.getElementById("statusMessage").innerHTML = "File Status : <b>" + response.status + "</b>";
                //Character count
                document.getElementById("characterCount").innerHTML = "Characters Count: " + response.length;
                //Content description
                document.getElementById("textContentArea").value = response.description;
            }
        },
        fail: function () {
            // Error message
            document.getElementById("statusMessage").innerHTML = "The call to the WebMethod failed!";
        }

    });
}



