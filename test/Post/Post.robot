*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${Browser}  chrome
${URL}   http://localhost:5173/
${URLpost}    http://localhost:5173/create-post
${Delay}    1s



*** Keywords ***



*** Test Cases ***
Search Google
    Open Browser    ${URL}    ${Browser}
    
    Click Button    css=.MuiButton-text
    Open Browser     ${URLpost}
    sleep    ${Delay}
    Click Button   id=name_games
    Input Text      id=name_games    หมาป่า
    Click Button   id=detail_post
    Input Text      id=detail_post    ต้องการจำนวนมากมาเกินที่กำหนดได้
    Click Button   css=#date_meet path
    Click Button  xpath=(//button[@type='button'])[25]
    Click Button   id=num_people
    Input Text      id=num_people    7
    Click Button   xpath=//div[@id='root']/div/main/div/div/div/form/span
    Input Text      css=input:nth-child(7)   C:\fakepath\สีเหลือง สีฟ้า ภาพประกอบ น่ารัก Desktop Wallpaper.png
    sleep    ${Delay}
    Click Button    xpath=//div[@id='root']/div/main/div/div/div[2]/div[3]/button
    sleep    ${Delay}
    Capture Page Screenshot
    Close Browser