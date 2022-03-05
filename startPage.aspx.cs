/*
 NAME: Dhruvanshi Ghiya, Deep Patel
 PROJECT        :   startPage.cs
 ASSIGNMENT     :   Assignment 07
 FIRST VERSION  :   December 4, 2021
 DESCRIPTION    :   This contains all the methods required to create the text editor. 
                    Use of JSON and jQUery to move data between server and client side. 

Functions and Main() use code from:

TITLE           : JSON and jQuery Examples
AUTHOR          : Sean Clarke
DATE            : 2021-11-12
VERSION         : Unknown
AVAILABILITY    : https://conestoga.desire2learn.com/d2l/le/content/483723/Home?itemIdentifier=TOC
*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using System.IO;
using System.Diagnostics;
using Newtonsoft.Json;

namespace ASPNET_Example
{
    /*
     * Class:       _default
     * Purpose:     The purpose of this class is to make fantastic text editor. And to create awesome experince  for user.
     */

    public partial class _default : System.Web.UI.Page
    {
        // METHOD            :   OpenFile
        // DESCRIPTION       :   Opens the file specified by the parameter and then sends
        //                      the data back as a key pair containing the status and the
        //                      data itself.
        //
        // PARAMETERS        :
        // string fileToLoad :   contains the filename to open
        //                       - remember that since the "parameter" is being passed to this method using AJAX/JSON
        //                         then the parameter name in this method *must* be the same that the "key" value used
        //                         in the $.ajax() (jQuery) call in JavaScript
        //
        // RETURNS           :
        //  string           :   JSON structure holding the (1) file open status and (2) file contents
        //
        [WebMethod]
        //#pragma warning disable CS0108 // Member hides inherited member; missing new keyword
        //#pragma warning restore CS0108 // Member hides inherited member; missing new keyword
        public static new string OpenFile(string fileToLoad)
        {
            string returnData;  // final JSON return value
            string fileStatus;
            string fileContents;
            string filepath;
            int characters;

            try
            {
                filepath = HttpContext.Current.Server.MapPath("MyFiles");
                filepath = filepath + @"\" + fileToLoad;


                if (File.Exists(filepath))
                {
                    fileStatus = "Success";
                    fileContents = File.ReadAllText(filepath);
                    characters = fileContents.ToString().Length;
                }
                else
                {
                    fileStatus = "Failure";
                    fileContents = "File doesn't exist";

                    characters = 0;
                }
            }
            catch (Exception e)
            {
                // I need to return something in the JSON value to indicate the exception/hold some
                // useful information for the user ...
                fileStatus = "Exception";
                fileContents = "Something bad happened : " + e.ToString();
                characters = 0;
            }

            returnData = JsonConvert.SerializeObject(new { status = fileStatus, description = fileContents, length = characters });
            return returnData;
        }






        // METHOD            :   GetList
        // DESCRIPTION       :   Gets the list of of files and uses JSON to get file specified by the parameter and then sends
        //                       the data back as a key pair containing the status and the
        //                       data itself.
        //
        // PARAMETERS        :  NONE
        // RETURNS           :  NONE
        //  string           :  JSON structure holding the (1) file open status and (2) file contents
        //
        [WebMethod]
        public static string GetList()
        {
            string returnData;  // final JSON return value
            string[] fileContents;
            string filepath;

            try
            {
                //Filepath to get contents of file
                filepath = HttpContext.Current.Server.MapPath("MyFiles");

                DirectoryInfo d = new DirectoryInfo(filepath);

                FileInfo[] Files = d.GetFiles("*.*");

                //If file exists
                if (Directory.Exists(filepath))
                {
                    string fileContent = "";
                    // Parse file name
                    foreach (FileInfo file in Files)
                    {
                        fileContent = fileContent + "," + file.Name;
                    }
                    //Split when ","
                    string[] words = fileContent.Split(',');
                    words = words.Skip(1).ToArray();

                    fileContents = words;
                }
                else
                {
                    //If file does not exist
                    fileContents = new string[] { "File does not exist." };
                }
            }
            catch (Exception e)
            {
                // I need to return something in the JSON value to indicate the exception/hold some
                // useful information for the user ...
                fileContents = new string[] { "File does not exist.", e.ToString() };
            }
            //Serialize object to convert to Json
            returnData = JsonConvert.SerializeObject(new { description = fileContents });
            return returnData;
        }




        // METHOD            :  SaveFile
        // DESCRIPTION       :  Gets the list of files chosen to save.  
        // PARAMETERS        :  NONE
        // RETURNS           :  NONE
        // STRING            :  JSON structure holding the (1) file data and (2) file to load

        [WebMethod]
        public static string SaveFile(string fileData, string fileToLoad)
        {
            string returnData;  // final JSON return value
            string fileStatus; 
            string fileContents;
            string filepath;
            int characters; 

            try
            {
                // Filepath
                filepath = HttpContext.Current.Server.MapPath("MyFiles");
                filepath = filepath + @"\" + fileToLoad;

                //If file exists
                if (File.Exists(filepath))
                {
                    //If file saved
                    //File message
                    fileStatus = "Saved!!";
                    //Writes to file
                    File.WriteAllText(filepath, fileData);
                    //reads file
                    fileContents = File.ReadAllText(filepath);
                    //Character count
                    characters = fileContents.ToString().Length;
                }
                else
                //If file doesn't exist
                {
                    fileStatus = "Failed!!";
                    fileContents = "File doesn't exist";

                    characters = 0;
                }

            }
            catch (Exception e)
            {
                // I need to return something in the JSON value to indicate the exception/hold some useful information for the user
                fileStatus = "Exception!!";
                // Error message
                fileContents = "Something bad happened : " + e.ToString();
                //Character count
                characters = 0;
            }

            //Serialize object
            returnData = JsonConvert.SerializeObject(new { status = fileStatus, description = fileContents, length = characters });
            return returnData;
        }


        // METHOD            :  SaveAsFile
        // DESCRIPTION       :  Gets the list of files chosen to save in any folder user wants to.  
        // PARAMETERS        :  NONE
        // RETURNS           :  NONE
        // STRING            :  JSON structure holding the (1) file data and (2) file to load

        [WebMethod]
        public static string SaveAsFile(string fileData, string fileToLoad)
        {
            string returnData;  // final JSON return value
            string fileStatus;
            string fileContents;
            string filepath;
            int characters;

            try
            {
                //FilePath
                filepath = HttpContext.Current.Server.MapPath("MyFiles");
                filepath = filepath + @"\" + fileToLoad;
                //StatusMessage
                fileStatus = "Saved!!";
                //Write text 
                File.WriteAllText(filepath, fileData);
                //Read all text
                fileContents = File.ReadAllText(filepath);
                //Character count
                characters = fileContents.ToString().Length;

            }
            catch (Exception e)
            {
                // I need to return something in the JSON value to indicate the exception/hold some
                // useful information for the user ...
                fileStatus = "Exception!!";
                fileContents = "Something bad happened : " + e.ToString();
                characters = 0;
            }

            //Serialixze object to convert to JSON
            returnData = JsonConvert.SerializeObject(new { status = fileStatus, description = fileContents, length = characters });
            return returnData;
        }
    }
}