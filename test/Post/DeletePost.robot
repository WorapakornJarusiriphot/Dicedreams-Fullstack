*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${Browser}  chrome
${URL}   http://localhost:5173/
${Delay}    1s



*** Keywords ***



*** Test Cases ***
Search Google
    Open Browser    ${URL}    ${Browser}
    Click Button    locator
    Click Button    locator
    Click Button    locator
    Page Should Contain    ลบโพสต์นัดเล่นสำเร็จ
    Capture Page Screenshot
    Close Browser