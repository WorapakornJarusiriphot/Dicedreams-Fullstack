*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${Browser}  chrome
#${URL}   https://dicedreams-eta.vercel.app/sign-in
${URL}    https://dicedreams-font-end.vercel.app/
${Delay}    1s



*** Keywords ***
login check
    Click Button    id=login-button
    Wait Until Element Is Visible  xpath=//div[@id='login-form']/div  10s
    Input Text      name=identifier    dream
    Click Button   id=loginPassword
    Input Text      name=loginPassword   00998877n
    Click Button    id=login-submit-button
#login check1
   # Wait Until Element Is Visible    xpath=(//a[contains(@href, '/sign-in')])[2]
#    Execute Javascript    document.getElementById('identifier').click()
#    Input Text   xpath=//*[@id="identifier"]  WOJA2
#    Wait Until Element Is Visible    xpath=//*[@id="password-label"]    10s
#    Execute JavaScript    document.getElementById("password").click()
#    Input Text      name=password   111111 
#    Click Button    xpath=/html/body/main/div/form/button


*** Test Cases ***
#TC13.2ลบโพสต์นัดเล่น
#    Open Browser    ${URL}    ${Browser}
#    login check1
 #   sleep    ${Delay}
 #   Wait Until Element Is Visible    xpath=//*[@id="MoreVertOutlinedIcon"]/svg    timeout=30s

    # ลองใช้การคลิกแบบ JavaScript ถ้า element ไม่สามารถคลิกได้
#    Scroll Element Into View    xpath=//*[@id="MoreVertOutlinedIcon"]/svg

    # หรือใช้คำสั่ง Click Element ปกติ
#    Click Element    xpath=//*[@id="MoreVertOutlinedIcon"]/svg
#    Run Keyword If    xpath=//*[@id="MoreVertOutlinedIcon"]/svg is False    Execute JavaScript    document.querySelector('//*[@id="MoreVertOutlinedIcon"]/svg').click()
    #Page Should Contain    โพสต์นัดนี้ได้ถูกลบเป็นที่เรียบร้อยแล้ว
    #Capture Page Screenshot  Photo/Viwearticle/TC13
#    Close Browser

TC1301.2ลบโพสต์นัดเล่น
    Open Browser    ${URL}    ${Browser}
    login check
    sleep    ${Delay}
    #ที่อยู่ของโพส
    Wait Until Element Is Visible    xpath=//*[@id="event-card-header-0f8fd5b1-e235-4fac-b265-c7bcec8785b2"]
    #Wait Until Element Is Visible    xpath=//*[@id="root"]/div/main/div/div[2]/div/div/div[2]
    #Wait Until Element Is Visible    xpath=//*[@id="root"]/div/main/div/div[2]/div/div/div[3]
    #ปู่มเมนู
    Wait Until Element Is Visible    xpath=//*[@id="event-menu-button-0f8fd5b1-e235-4fac-b265-c7bcec8785b2"]
    Click Element    xpath=//*[@id="event-menu-button-0f8fd5b1-e235-4fac-b265-c7bcec8785b2"]
    #ลบโพสต์
    Wait Until Element Is Visible    xpath=//*[@id="event-menu-0f8fd5b1-e235-4fac-b265-c7bcec8785b2"]/div[3]/ul
    Wait Until Element Is Visible    xpath=//*[@id="event-menu-end-0f8fd5b1-e235-4fac-b265-c7bcec8785b2"]
    Click Element    xpath=//*[@id="event-menu-end-0f8fd5b1-e235-4fac-b265-c7bcec8785b2"]
    Click Button    xpath=/html/body/div[3]/div[3]/div/div[2]/button[2]
    Wait Until Page Contains    สิ้นสุดการโพสต์เรียบร้อยแล้ว
    Capture Page Screenshot  Photo/Viwearticle/TC13.png
    Close Browser
    