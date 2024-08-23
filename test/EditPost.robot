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
    Click Button    css=.MuiButton-text
    Click Button     -
    Click Button     -
    Click Button   id=name_games
    Input Text      name=name_games  Werewolf
    Click Button   id=detail_post
    Input Text      name=detail_post  เอา Werewolf ตัวเสริมมาด้วยก็ดีนะ เพราะเรามีแค่ตัวหลัก
    Click Button   id=num_people
    Input Text      name=num_people  3
    Click Button   id=date_meet
    Input Text      name=date_meet  07/13/2024
    Click Button   id=time_meet
    Input Text      name=time_meet  18:00:00
    Click Button   id=games_image
    Input Text      name=games_image  2e0c0d0a-b71c-486b-a57f-7d85b6f7d558.jpeg
    Click Button     -
    Page Should Contain    แก้ไขโพสต์นัดเล่น สำเร็จ
    Capture Page Screenshot
    Close Browser