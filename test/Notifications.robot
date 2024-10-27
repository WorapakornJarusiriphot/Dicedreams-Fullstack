*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${Browser}  chrome
${URL}   https://dicedreams-font-end.vercel.app/
${Delay}    1s



*** Keywords ***
login check1
    Click Button    id=login-button
    Wait Until Element Is Visible  xpath=//div[@id='login-form']/div  10s
    Input Text      name=identifier    WOJA2
    Click Button   id=loginPassword
    Input Text      name=loginPassword   111111
    Click Button    id=login-submit-button



*** Test Cases ***
TCแจ้งเตือน
    Open Browser    ${URL}    ${Browser}
    login check1
    Sleep    ${Delay}
    Wait Until Element Is Visible   id=menu-button    30s
    Click Element    id=menu-button
    Wait Until Element Is Visible    id=notifications-link   30s
    Click Element  id=notifications-link
    Sleep    ${Delay}
    Sleep    ${Delay}
    Sleep    ${Delay}
    Wait Until Element Is Visible    //*[@id="notification-message-0"]
    Sleep    ${Delay}
    Page Should Contain  Message
    Capture Page Screenshot  Photo/Viwearticle/TCแจ้งเตือน.png

    Close Browser