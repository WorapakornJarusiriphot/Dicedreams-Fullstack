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


*** Test Cases ***
TC1501 ยืนยันการเข้าร่วม
    Open Browser    ${URL}    ${Browser}
    login check
    Sleep    ${Delay}
    Wait Until Element Is Visible   id=menu-button    30s
    Click Element    id=menu-button
    Wait Until Element Is Visible    id=notifications-link
    Click Element  id=notifications-link
    Sleep    ${Delay}
    Wait Until Element Is Visible    id=request-tab-button
    Click Element    id=request-tab-button
    Wait Until Element Is Visible    xpath=//*[@id="requests-table"]/tbody/tr/td[3]/button
    Click Element    xpath=//*[@id="requests-table"]/tbody/tr/td[3]/button
    Wait Until Element Is Visible    xpath=//*[@id="root"]/div/main/div/div/div[1]/div/div/div[2]/button[1]
    Click Element    xpath=//*[@id="root"]/div/main/div/div/div[1]/div/div/div[2]/button[1]
    Sleep    ${Delay}
    Wait Until Page Contains     ผู้เข้าร่วมได้รับการอนุมัติแล้ว!
    Sleep    ${Delay}
    Capture Page Screenshot  Photo/Viwearticle/TC1501.png
    Close Browser

TC1502 ยกเลิกการเข้าร่วม
    Open Browser    ${URL}    ${Browser}
    login check
    Sleep    ${Delay}
    Wait Until Element Is Visible   id=menu-button    30s
    Click Element    id=menu-button
    Wait Until Element Is Visible    id=notifications-link
    Click Element  id=notifications-link
    Sleep    ${Delay}
    Wait Until Element Is Visible    id=request-tab-button
    Click Element    id=request-tab-button
    #View Participants
    Wait Until Element Is Visible    xpath=//*[@id="requests-table"]/tbody/tr[1]/td[3]/button
    Click Element    xpath=//*[@id="requests-table"]/tbody/tr[1]/td[3]/button
    #Remove
    Wait Until Element Is Visible    xpath=//*[@id="root"]/div/main/div/div/div[3]/div/div/div[2]/button
    Click Element    xpath=//*[@id="root"]/div/main/div/div/div[3]/div/div/div[2]/button
    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[3]/div/div[2]/button[2]
    Click Element    xpath=/html/body/div[2]/div[3]/div/div[2]/button[2]
    Wait Until Page Contains     ผู้เข้าร่วมถูกลบออก!
    Sleep    ${Delay}
    Capture Page Screenshot  Photo/Viwearticle/TC1502.png
    
    Close Browser