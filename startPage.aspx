<!-- 
 NAME: Dhruvanshi Ghiya, Deep Patel
 PROJECT        :   startPage.cs
 ASSIGNMENT     :   Assignment 07
 FIRST VERSION  :   December 4, 2021
 DESCRIPTION    :   This ASP.NET page creates a text editor and 
                    contains all the non- functionality of the code project

Functions and Main() use code from:

TITLE           : JSON and jQuery Examples
AUTHOR          : Sean Clarke
DATE            : 2021-11-12
VERSION         : Unknown
AVAILABILITY    : https://conestoga.desire2learn.com/d2l/le/content/483723/Home?itemIdentifier=TOC

TITLE           : JSON Introduction
AUTHOR          : Mukesh Mehta
DATE            : 2021-11-12
VERSION         : Unknown
AVAILABILITY    : https://www.w3schools.com/js/js_json_intro.asp
-->

<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="startPage.aspx.cs" Inherits="ASPNET_Example._default" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head runat="server">
        <title>ASP.NET jQuery/JSON Example</title>
        <link rel="stylesheet" type="text/css" href="texteditor.css"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script type = "text/javascript" src = "jQueryFunctionCalls.js"></script>
    </head>
    <body>
        <form runat="server">
            <p class="header">MAGIC Text Editor</p>
            <input type="button" name="save" id="save" value="Save" disabled="disabled"/>
			<input type="button" name="saveAs" id="saveAs" value="SaveAs" disabled="disabled"/>
            <asp:DropDownList class="select" id="filesList" runat="server"/>
            <input type="text" id="nameOfTheFile" name="nameOfTheFile"/>
            <div>
                <div>
                    <textarea id="textContentArea" class="textbox" onclick="clearSaveAsError()"></textarea>
                    <p id="characterCount" class="characterCountText"></p>
                    <p id="statusMessage" class="statusBarText"></p>
                </div>
            </div>
        </form>
    </body>
</html>