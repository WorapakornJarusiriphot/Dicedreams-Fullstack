*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${Browser}  chrome
${URL}   https://dicedreams-font-end.vercel.app/
${Delay}    1s



*** Keywords ***
login check
    Click Button    id=login-button
    Wait Until Element Is Visible  xpath=//div[@id='login-form']/div  10s
    Input Text      name=identifier    dream
    Click Button   id=loginPassword
    Input Text      name=loginPassword   00998877n
    Click Button    id=login-submit-button
Check Title blog1
    Page Should Contain   Werewolf1
    Sleep    1
    Capture Page Screenshot  Photo/Viwearticle/TC1600.png


Check Title blog
    Wait Until Page Contains    อัปเดตกิจกรรมสำเร็จแล้ว
    Sleep    1
    


*** Test Cases ***
Editpostชื่อ
    Open Browser    ${URL}    ${Browser}
    login check
    sleep    ${Delay}
    Wait Until Element Is Visible    xpath=//*[@id="root"]/div/main/div/div[2]/div/div/div[6]
    Wait Until Element Is Visible    xpath=//*[@id="event-menu-button-5450c038-d033-4cba-8c48-30d699912f26"]
    Click Element    xpath=//*[@id="event-menu-button-5450c038-d033-4cba-8c48-30d699912f26"]
    Wait Until Element Is Visible    xpath=//*[@id="event-menu-5450c038-d033-4cba-8c48-30d699912f26"]/div[3]
    Wait Until Element Is Visible    xpath=//*[@id="event-menu-edit-5450c038-d033-4cba-8c48-30d699912f26"]
    Click Element    xpath=//*[@id="event-menu-edit-5450c038-d033-4cba-8c48-30d699912f26"]
    Wait Until Element Is Visible    xpath=//*[@id="game-name-input"]
    Click Element    xpath=//*[@id="game-name-input"]
    Input Text    xpath=//*[@id="game-name-input"]  1
    Wait Until Element Is Visible    xpath=//*[@id="save-changes-button"]
    Click Element    xpath=//*[@id="save-changes-button"]
    Wait Until Element Is Visible    xpath=//*[@id="event-name"]
    Check Title blog1
    Close Browser

Editpostระละเอียด
    Open Browser    ${URL}    ${Browser}
    login check
    sleep    ${Delay}
    Wait Until Element Is Visible    xpath=//*[@id="root"]/div/main/div/div[2]/div/div/div[6]
    Wait Until Element Is Visible    xpath=//*[@id="event-menu-button-5450c038-d033-4cba-8c48-30d699912f26"]
    Click Element    xpath=//*[@id="event-menu-button-5450c038-d033-4cba-8c48-30d699912f26"]
    Wait Until Element Is Visible    xpath=//*[@id="event-menu-5450c038-d033-4cba-8c48-30d699912f26"]/div[3]
    Wait Until Element Is Visible    xpath=//*[@id="event-menu-edit-5450c038-d033-4cba-8c48-30d699912f26"]
    Click Element    xpath=//*[@id="event-menu-edit-5450c038-d033-4cba-8c48-30d699912f26"]
    #รายละเอียด
    Wait Until Element Is Visible    xpath=//*[@id="details-input"]
    Click Element    xpath=//*[@id="details-input"]
    Input Text    xpath=//*[@id="details-input"]    มือใหม่หัดเล่น
    #บันทึก
    Wait Until Element Is Visible    xpath=//*[@id="save-changes-button"]
    Click Element    xpath=//*[@id="save-changes-button"]
    Check Title blog
    Capture Page Screenshot  Photo/Viwearticle/TC1601.png
    Close Browser

EditpostDay
    Open Browser    ${URL}    ${Browser}
    login check
    sleep    ${Delay}
    Wait Until Element Is Visible    xpath=//*[@id="root"]/div/main/div/div[2]/div/div/div[6]
    Wait Until Element Is Visible    xpath=//*[@id="event-menu-button-5450c038-d033-4cba-8c48-30d699912f26"]
    Click Element    xpath=//*[@id="event-menu-button-5450c038-d033-4cba-8c48-30d699912f26"]
    Wait Until Element Is Visible    xpath=//*[@id="event-menu-5450c038-d033-4cba-8c48-30d699912f26"]/div[3]
    Wait Until Element Is Visible    xpath=//*[@id="event-menu-edit-5450c038-d033-4cba-8c48-30d699912f26"]
    Click Element    xpath=//*[@id="event-menu-edit-5450c038-d033-4cba-8c48-30d699912f26"]
    #day
    Wait Until Element Is Visible    xpath=//*[@id="edit-post-form"]/div[1]/div[3]/div/div/div/button
    Click Element    xpath=//*[@id="edit-post-form"]/div[1]/div[3]/div/div/div/button
    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[2]/div/div[5]/button[5]
    Click Element     xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[2]/div/div[5]/button[5]
    #บันทึก
    Wait Until Element Is Visible    xpath=//*[@id="save-changes-button"]
    Click Element    xpath=//*[@id="save-changes-button"]
    Check Title blog
    Capture Page Screenshot  Photo/Viwearticle/TC1602.png
    Close Browser
Editpostเวลา
    Open Browser    ${URL}    ${Browser}
    login check
    sleep    ${Delay}
    Wait Until Element Is Visible    xpath=//*[@id="root"]/div/main/div/div[2]/div/div/div[6]
    Wait Until Element Is Visible    xpath=//*[@id="event-menu-button-5450c038-d033-4cba-8c48-30d699912f26"]
    Click Element    xpath=//*[@id="event-menu-button-5450c038-d033-4cba-8c48-30d699912f26"]
    Wait Until Element Is Visible    xpath=//*[@id="event-menu-5450c038-d033-4cba-8c48-30d699912f26"]/div[3]
    Wait Until Element Is Visible    xpath=//*[@id="event-menu-edit-5450c038-d033-4cba-8c48-30d699912f26"]
    Click Element    xpath=//*[@id="event-menu-edit-5450c038-d033-4cba-8c48-30d699912f26"]
    #เวลา
    Wait Until Element Is Visible    xpath=//*[@id="edit-post-form"]/div[1]/div[4]/div/div/div/button
    Click Element    xpath=//*[@id="edit-post-form"]/div[1]/div[4]/div/div/div/button
    sleep    ${Delay}
    Click Element        xpath=/html/body/div[2]/div[2]/div/div[1]/div/div[1]/div/div[1]
    sleep    ${Delay}
    Wait Until Element Is Visible     xpath=/html/body/div[2]/div[2]/div/div[2]/button    10
    Click Element        xpath=/html/body/div[2]/div[2]/div/div[2]/button
    #บันทึก
    Wait Until Element Is Visible    xpath=//*[@id="save-changes-button"]
    Click Element    xpath=//*[@id="save-changes-button"]
    Check Title blog
    Capture Page Screenshot  Photo/Viwearticle/TC1603.png
    Close Browser

