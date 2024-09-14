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
    Click Button    post
    Click Button   id=name_activity
    Input Text      name=name_activity  Board Game Night
    Click Button   id=status_post
    Input Text      name=status_post  active
    Click Button   id=creation_date
    Input Text      name=creation_date  07/13/2024 02:50:00
    Click Button   id=detail_post
    Input Text      name=detail_post  มาร่วมสนุกกับเกมกระดานยามค่ำคืนกับเรา
    Click Button   id=date_activity
    Input Text      name=date_activity  07/13/2024
    Click Button   id=time_activity
    Input Text      name=time_activity  18:00:00
    Click Button   id=post_activity_image
    Input Text      name=post_activity_image  1cd2498d-07fa-4ea5-83ef-c71781bc8cdf.jpeg
    Click Button     -
    Page Should Contain    คุณได้ทำการสร้างโพสต์กิจกรรมสำเร็จแล้ว
    Capture Page Screenshot
    Close Browser