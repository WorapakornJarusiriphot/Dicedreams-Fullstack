*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${Browser}  chrome
${URL}   https://dicedreams-font-end.vercel.app/
${Delay}    1s



*** Keywords ***
 
    

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
    Scroll Element Into View    xpath=//button[contains(text(), 'สมัครสมาชิก')]
    Wait Until Element Is Visible    xpath=//button[contains(text(), 'สมัครสมาชิก')]    10s
    Click Button                     xpath=//button[contains(text(), 'สมัครสมาชิก')]




    Close Browser