*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${Browser}  chrome
${URL}   https://dicedreams-font-end.vercel.app
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
    Page Should Contain   อัปเดตกิจกรรมสำเร็จแล้ว!
    Sleep    1
    Capture Page Screenshot  Photo/Viwearticle/TC1006.png


*** Test Cases ***
#Editpostผ่านปุ่มเมนู
#    Open Browser    ${URL}    ${Browser}
#    login check
#    Wait Until Element Is Visible     id=event-menu-button-fc562aa0-ae48-4fcb-95d1-8914726ed12f    30s
#    Wait Until Element Is Visible     id=event-menu-edit-fc562aa0-ae48-4fcb-95d1-8914726ed12f    30s
#    Click Element     id=event-menu-edit-fc562aa0-ae48-4fcb-95d1-8914726ed12f
#    Wait Until Element Is Visible     name=name_games
#    Click Element    name=name_games
#    Input Text    name=name_games    คำต้องห้าม
#    Click Button        xpath=//button[@type='submit']
#    Check Title blog1
#    Close Browser

Editpostผ่านหน้าโปรไฟล์
    Open Browser    ${URL}    ${Browser}
    login check
    # รอให้องค์ประกอบนั้นปรากฏก่อน
    Wait Until Element Is Visible  xpath=//*[@id='element-id']  10s
    # ใช้คำสั่ง JavaScript เพื่อเลื่อนหน้าเว็บไปยังองค์ประกอบ
    Execute Javascript  document.querySelector("#element-id").scrollIntoView()
    Click Element  xpath=//*[@id='element-id']