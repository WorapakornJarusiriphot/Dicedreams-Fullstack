*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${Browser}  chrome
${URL}   https://dicedreams-font-end.vercel.app

${Delay}    1s



*** Keywords ***

login check
   Open Browser    ${URL}    ${Browser}

    Click Button    id=login-button
    Wait Until Element Is Visible  xpath=//div[@id='login-form']/div  10s
    Input Text      name=identifier    WOJA2
    Click Button   id=loginPassword
    Input Text      name=loginPassword   111111 
    Click Button    id=login-submit-button
    Wait Until Page Contains  เข้าสู่ระบบสำเร็จ  10s
    Sleep    1
    Capture Page Screenshot  Photo/Viwearticle/TC1001.png
    

Check text Tc9001
    Page Should Contain  สร้างโพสต์สำเร็จ
    sleep    ${Delay}
    Capture Page Screenshot  Photo/Viwearticle/TC9001.png

Check text Tc9002
    Page Should Contain  กรุณากรอกชื่อโพสต์
    sleep    ${Delay}
    Capture Page Screenshot  Photo/Viwearticle/TC9002.png

Check text Tc9003
    Page Should Contain  กรุณากรอกรายละเอียดของโพสต์
    sleep    ${Delay}
    Capture Page Screenshot  Photo/Viwearticle/TC9003.png

Check text Tc9004
    Page Should Contain  กรุณาอัพโหลดรูปภาพด้วย
    sleep    ${Delay}
    Capture Page Screenshot  Photo/Viwearticle/TC9004.png

*** Test Cases ***
TC9001 สร้างโพสต์นัดเล่น

    Open Browser    ${URL}    ${Browser}

    login check
    sleep    ${Delay}
    Wait Until Element Is Visible    id=post-box      10s
    Click Element                    id=post-box
    Wait Until Element Is Visible    id=game-select  10s
    Click Element                    id=game-select 
    Input Text    id=game-select     คำต้องห้าม
    Wait Until Element Is Visible   id=detail-post-input
    Click Element                    id=detail-post-input
    Input Text      name=detail_post     ไม่จำเป็นต้องรู้จักกฏของเกมก่อน มาเล่นๆเอ็นจอยกัน
    Wait Until Element Is Visible     xpath=//*[@id="date-time-picker"]/div[1]/div/div/button  10s
    Click Element                     xpath=//*[@id="date-time-picker"]/div[1]/div/div/button
    Click Button          xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[2]/div/div[3]/button[4]
    #เวลา
    Wait Until Element Is Visible    xpath=//*[@id="date-time-picker"]/div[2]/div    20s
    Click Element        xpath=//*[@id="date-time-picker"]/div[2]/div/div/button
    Click Element        xpath=/html/body/div[2]/div[2]/div/div[1]/div/div[1]/div/div[1]
    Wait Until Element Is Visible     xpath=/html/body/div[2]/div[2]/div/div[2]/button    10
    Click Element        xpath=/html/body/div[2]/div[2]/div/div[2]/button
    #จำนวนผู้เล่น
    sleep    ${Delay}
    Wait Until Element Is Visible  xpath=//*[@id="num-people-select"]  30s
    Click Element      xpath=//*[@id="num-people-select"]  
    Input Text    xpath=//*[@id="num-people-select"]    7
    #ใส่รูป
    Wait Until Element Is Visible  xpath=//*[@id="image-input"]  30s
    Click Element  xpath=//*[@id="image-input"]
    Input Text     xpath=//*[@id="image-input"]   /Users/macbook/Desktop/คำต้องห้าม.jpeg 