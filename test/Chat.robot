*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${Browser}  chrome
${URL}   https://dicedreams-eta.vercel.app/sign-in
${Delay}    1s



*** Keywords ***
login check11
   # Wait Until Element Is Visible    xpath=(//a[contains(@href, '/sign-in')])[2]
    Execute Javascript    document.getElementById('identifier').click()
    Input Text   xpath=//*[@id="identifier"]  WOJA2
    Wait Until Element Is Visible    xpath=//*[@id="password-label"]    10s
    Execute JavaScript    document.getElementById("password").click()
    Input Text      name=password   111111 
    Click Button    xpath=/html/body/main/div/form/button


*** Test Cases ***
TC11พูดคุยเข้าผ่านแจ้งเตือน
    Open Browser    ${URL}    ${Browser}
    login check11
    sleep    ${Delay}
    Wait Until Element Is Visible    xpath=//*[@id="Notification"]
    Click Element     xpath=//*[@id="Notification"]
    Wait Until Element Is Visible    xpath=//div[2]/div[2]/h6/span[2]
    Click Element     xpath=//div[2]/div[2]/h6/span[2]       
    Wait Until Element Is Visible    xpath=//div[@id='__next']/div[2]/div[6]/form/div/div   30s
    Click Element     xpath=//div[@id='__next']/div[2]/div[6]/form/div/div
    Input Text    id=chat-section   ดีครับ
    Wait Until Element Is Visible    id=chat-section
    Click Element    id=chat-section
    sleep    ${Delay}
   # Capture Page Screenshot  Photo/Viwearticle/TC11พูดคุย.png
    Close Browser

TC11พูดคุยผ่านปุ่มแชท
     Open Browser    ${URL}    ${Browser}
    login check11
    sleep    ${Delay}
    Wait Until Element Is Visible    id=chat
    Click Element     id=chat
    Wait Until Element Is Visible    xpath=//*[@id="__next"]/div[2]/div[7]/form/div/div
   Click Element     xpath=//*[@id="__next"]/div[2]/div[7]/form/div/div
   # Wait Until Element Is Visible    xpath=//*[@id="__next"]/div[2]/div[9]/form/div/div  30s
   # Click Element    xpath=//*[@id="__next"]/div[2]/div[9]/form/div/div  30s
    Input Text    id=chat-section   เกมนี้เป็นตัวเกมใหม่ไม่จำเป็นต้องเล่นเ็นครับ
    Wait Until Element Is Visible    id=Send-Chat
    Click Element    id=Send-Chat
    sleep    ${Delay}
   # Capture Page Screenshot  Photo/Viwearticle/TC11พูดคุย.png
    Close Browser