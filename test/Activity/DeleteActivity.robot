*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${Browser}  chrome
${URL}    https://dicedreams-eta.vercel.app/sign-in
${Delay}    1s



*** Keywords ***
loginStore1
   # Wait Until Element Is Visible    xpath=(//a[contains(@href, '/sign-in')])[2]
    Execute Javascript    document.getElementById('identifier').click()
    Input Text   xpath=//*[@id="identifier"]  outcast
    Wait Until Element Is Visible    xpath=//*[@id="password-label"]    10s
    Execute JavaScript    document.getElementById("password").click()
    Input Text      name=password   111111 
    Click Button    xpath=/html/body/main/div/form/button


*** Test Cases ***
TC1601ลบโพสต์กิจกรรม
    loginStore1
    Open Browser    ${URL}    ${Browser}
    Click Button    xpath=//*[@id="MoreVertOutlinedIcon"]
    Click Button    xpath=//*[@id="Delete-PostActivity"]
    Click Button    xpath=//*[@id="Delete-Post"]
   
    
    Close Browser

TC1602ลบโพสต์กิจกรรม
    loginStore1
    Open Browser    ${URL}    ${Browser}
    Click Button    xpath=//*[@id="MoreVertOutlinedIcon"]
    Click Button    xpath=//*[@id="Delete-PostActivity"]
    Click Button    xpath=//*[@id="cancel"]
   
    
    Close Browser