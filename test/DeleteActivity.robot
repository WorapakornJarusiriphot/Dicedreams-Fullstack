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
    Click Button    Delete
    Click Button    Cancel
    Page Should Contain    แสดงข้อลบโพสต์กิจกรรมไม่สำเร็จ
    Capture Page Screenshot
    Close Browser