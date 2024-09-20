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
TC11พูดคุย
    Open Browser    ${URL}    ${Browser}
    login check11
    sleep    ${Delay}
    Wait Until Element Is Visible    xpath=//*[@id="Notification"]
    Click Element     xpath=//*[@id="Notification"]
    Wait Until Element Is Visible    xpath=/html/body/div[4]/div[3]/div[2]/div/div[1]/div[2]/div/div/div/ul[2]/div[1]
    Click Element     xpath=/html/body/div[4]/div[3]/div[2]/div/div[1]/div[2]/div/div/div/ul[2]/div[1]
    Wait Until Element Is Visible    xpath=//*[@id="__next"]/div[2]/div[9]/form/div/div  30s
    Click Element    xpath=//*[@id="__next"]/div[2]/div[9]/form/div/div  30s
    Input Text    xpath=//*[@id="chat-section"]    เกมนี้เป็นตัวเกมใหม่ไม่จำเป็นต้องเล่นเ็นครับ
    Wait Until Element Is Visible    xpath=//*[@id="Send-Chat"]
    Click Element    xpath=//*[@id="Send-Chat"]
    sleep    ${Delay}
    Capture Page Screenshot  Photo/Viwearticle/TC11พูดคุย.png
    Close Browser