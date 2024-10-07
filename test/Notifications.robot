*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${Browser}  chrome
${URL}   https://dicedreams-eta.vercel.app/sign-in
${Delay}    1s



*** Keywords ***
login check11
   # Wait Until Element Is Visible    xpath=(//a[contains(@href, '/sign-in')])[2]
    Execute Javascript    document.getElementById('identifier').click()
    Input Text   xpath=//*[@id="identifier"]  WOJA2
    Wait Until Element Is Visible    xpath=//*[@id="password-label"]    10s
    Execute JavaScript    document.getElementById("password").click()
    Input Text      name=password   111111 
    Click Button    xpath=/html/body/main/div/form/button



*** Test Cases ***
TCแจ้งเตือน
    Open Browser    ${URL}    ${Browser}
    login check11
    sleep    ${Delay}
    Wait Until Element Is Visible    xpath=//*[@id="Notification"]
    Click Element     xpath=//*[@id="Notification"]
    sleep    ${Delay}
    #Page Should Contain  ดีคับ
    #sleep    ${Delay}
    Capture Page Screenshot  Photo/Viwearticle/TCแจ้งเตือน.png

    Close Browser