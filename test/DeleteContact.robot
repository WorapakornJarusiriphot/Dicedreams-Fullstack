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
    Click Button    Delete
    Click Button    Cancel
    Page Should Contain    บัญชีผู้ใช้ถูกลบออกจากระบบแล้ว
    Capture Page Screenshot
    Close Browser