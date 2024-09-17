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
    Capture Page Screenshot  Photo/Viwearticle/TC2001.png
    

*** Test Cases ***
TC2001การสมัครสมาชิก
    Open Browser    ${URL}    ${Browser}
    
    Click Button    id=register-button
    Click Button    id=first_name
    Input Text    name=first_name    Nawaporns
    Wait Until Element Is Visible  id=last_name-label
    Input Text    name=last_name    Boongons
    Wait Until Element Is Visible    id=username-label
    Input Text    id=username    dreams 
    Wait Until Element Is Visible    id=phone_number-label
    Input Text    id=phone_number    0987654321
    Wait Until Element Is Visible    xpath=//label[@id='email-label']/span
    Input Text    name=email    nawaboongon@gmail.com
    Wait Until Element Is Visible    id=password-label
    Input Text    id=password    1234567890n
    
    Wait Until Element Is Visible    xpath=//input[@placeholder='MM/DD/YYYY' and @type='text']    timeout=10s
    Click Element    css=#register-form > div:nth-child(6) > div > div > button
    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[2]/div/div/div/div[1]/div[1]/button    20s
    Click Button  xpath=/html/body/div[2]/div[2]/div/div/div/div[1]/div[1]/button
   # Execute JavaScript    document.querySelector('xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[103]/button').scrollIntoView(true);
    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[103]/button    timeout=30s
    Click Element    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[103]/button
    Click Element    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[2]/div/div[3]/button[5]
   # Click Button    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[103]/button
   # Input Text    xpath=//input[@placeholder='MM/DD/YYYY' and @type='text']    09/06/2002
    Click Element    xpath=//input[@name='gender' and @value='other']
    Click Element    xpath=//button[contains(text(),'Register')]
    sleep    ${Delay}
    Check Title blog register 
    sleep    ${Delay}
    Close Browser