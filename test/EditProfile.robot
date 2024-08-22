*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${Browser}  chrome
${URL}   http://localhost:5173/
${URLEdit}  http://localhost:5173/profile/edit
${Delay}    1s


*** Test Cases ***
Search Google
    Open Browser    ${URL}    ${Browser}

    Click Button    css=.MuiButton-text
    sleep    ${Delay}
    Click Button   id=identifier
    Input Text      name=identifier   nawa2
    Click Button   id=loginPassword
    Input Text      name=loginPassword   12345678b
    Click Button    xpath=//div[@id='root']/div/main/div/div/div[2]/div[3]/button
    Click Button    xpath=/html/body/div/div/main/header[1]/div/div[2]/button[1]
    Click Button   xpath=//input[@id=':r1:']
    Input Text      name=//input[@id=':r1:']   nawaporns
    Click Button   xpath=//input[@id=':r2:']
    Input Text      name=//input[@id=':r2:']   boongons
    Click Button   xpath=//input[@id=':r4:']
    Click Button    id=":r2m:"
    Input Text    id=":r2m:"    nawa2
    Input Text      name=//input[@id=':r4:']   nawaporn1@gmail.com
    Click Button   xpath=//input[@id=':r9:']
    Input Text      name=//input[@id=':r9:']  หาเพื่อนเล่นเกม มือใหม่ยังเล่นไม่ค่อยเก่ง -v-
    Click Button    xpath=(//button[@type='button'])[6]
    Page Should Contain   nawa2
    Capture Page Screenshot
    Close Browser

   
