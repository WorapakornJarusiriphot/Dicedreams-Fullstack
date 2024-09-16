*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${Browser}  chrome
${URL}   https://dicedreams-font-end.vercel.app/
${Delay}    1s



*** Keywords ***
 Check Title blog register 
    Wait Until Page Contains    10s
    Sleep    1
    Capture Page Screenshot  Photo/Viwearticle/TC1001.png
    

*** Test Cases ***
TC2001การสมัครสมาชิก
    Open Browser    ${URL}    ${Browser}
    
    Click Button    id=register-button
    Click Button    id=first_name
    Input Text    name=first_name    nawaporn
    Wait Until Element Is Visible  id=last_name-label
    Input Text    name=last_name    boongon
    Wait Until Element Is Visible    id=username-label
    Input Text    id=username    dream  
    Wait Until Element Is Visible    id=phone_number-label
    Input Text    id=phone_number    0987654321
    Wait Until Element Is Visible    xpath=//label[@id='email-label']/span
    Input Text    name=email    dream@gmail.com
    Wait Until Element Is Visible    id=password-label
    Input Text    id=password    1234567890n
    Wait Until Element Is Visible    xpath=//input[@placeholder='MM/DD/YYYY' and @type='text']    timeout=10s
    Click Element    xpath=//input[@placeholder='MM/DD/YYYY' and @type='text']
    Input Text    xpath=//input[@placeholder='MM/DD/YYYY' and @type='text']    09/06/2002
    Click Element    xpath=//input[@name='gender' and @value='other']
    Click Element    xpath=//button[contains(text(),'Register')]
    sleep    ${Delay}
    Close Browser