*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${Browser}  chrome
${URL}   http://localhost:5173/
${Delay}    1s



*** Keywords ***



*** Test Cases ***
TC1501 ยืนยันการเข้าร่วม
    Open Browser    ${URL}    ${Browser}
    Click Button    locator 
    Click Button    locator
    Click Button    locator
    Page Should Contain    คุณได้ทำการยืนยันการเข้าร่วมเสร็จสิ้น
    Capture Page Screenshot
    Close Browser