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

login check1
    Click Button    id=login-button
    Wait Until Element Is Visible  xpath=//div[@id='login-form']/div  10s
    Input Text      name=identifier    WOJA2
    Click Button   id=loginPassword
    Input Text      name=loginPassword   111111
    Click Button    id=login-submit-button


Check Title blog1
    Page Should Contain   ดีค้าบ 
    Sleep    1
    Capture Page Screenshot  Photo/Viwearticle/TC1101.png

Check Title blog2
    Page Should Contain   ดีค้าบ 
    Sleep    1
    Capture Page Screenshot  Photo/Viwearticle/TC1102.png
#login check11
   # Wait Until Element Is Visible    xpath=(//a[contains(@href, '/sign-in')])[2]
#    Execute Javascript    document.getElementById('identifier').click()
#    Input Text   xpath=//*[@id="identifier"]  WOJA2
#    Wait Until Element Is Visible    xpath=//*[@id="password-label"]    10s
#    Execute JavaScript    document.getElementById("password").click()
#    Input Text      name=password   111111 
#    Click Button    xpath=/html/body/main/div/form/button


*** Test Cases ***
TC1101พูดคุยเข้าผ่านปุ่มแชท
    Open Browser    ${URL}    ${Browser}
    login check
    sleep    ${Delay}
    Wait Until Element Is Visible   id=chat-button-99375271-5feb-4bdc-908e-8c13b8ec1979  30s
    Click Element     id=chat-button-99375271-5feb-4bdc-908e-8c13b8ec1979
    Wait Until Element Is Visible   xpath=//*[@id="chat-container"]
    Click Element     xpath=//*[@id="chat-container"]
    #Wait Until Element Is Visible   id=chat-button-5450c038-d033-4cba-8c48-30d699912f26 30s
    Wait Until Element Is Visible    id=message-input  30s
    Click Element     id=message-input
    Input Text       id=message-input        ดีค้าบ   
    Click Button  id=send-message-button
    Check Title blog1 
    Close Browser


TC1102พูดคุยเข้าผ่านแจ้งเตือน
   Open Browser    ${URL}    ${Browser}
    login check1
    Sleep    ${Delay}
    Wait Until Element Is Visible   id=menu-button    30s
    Click Element    id=menu-button
    Wait Until Element Is Visible    id=notifications-link   30s
    Click Element  id=notifications-link
    Sleep    ${Delay}
    Sleep    ${Delay}
    Sleep    ${Delay}
    Wait Until Element Is Visible    xpath=//*[@id="notification-message-0"]
    Click Element     xpath=//*[@id="notification-message-0"]
    #พูดคุย
    Wait Until Element Is Visible   xpath=//*[@id="chat-container"]
    Click Element     xpath=//*[@id="chat-container"]
    #Wait Until Element Is Visible   id=chat-button-5450c038-d033-4cba-8c48-30d699912f26 30s
    Wait Until Element Is Visible    id=message-input  30s
    Click Element     id=message-input
    Input Text       id=message-input        ดีค้าบ   
    Click Button  id=send-message-button
    Check Title blog2 
    
    Close Browser

#TC11พูดคุยผ่านปุ่มแชท
#     Open Browser    ${URL}    ${Browser}
#    login check11
#    sleep    ${Delay}
#    Wait Until Element Is Visible    id=chat
#    Click Element     id=chat
#    Wait Until Element Is Visible    xpath=//*[@id="__next"]/div[2]/div[7]/form/div/div
#    Click Element     xpath=//*[@id="__next"]/div[2]/div[7]/form/div/div
   # Wait Until Element Is Visible    xpath=//*[@id="__next"]/div[2]/div[9]/form/div/div  30s
   # Click Element    xpath=//*[@id="__next"]/div[2]/div[9]/form/div/div  30s
#    Input Text    id=chat-section   เกมนี้เป็นตัวเกมใหม่ไม่จำเป็นต้องเล่นเ็นครับ
#    Wait Until Element Is Visible    id=Send-Chat
#    Click Element    id=Send-Chat
#    sleep    ${Delay}
   # Capture Page Screenshot  Photo/Viwearticle/TC11พูดคุย.png
#    Close Browser