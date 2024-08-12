*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${Browser}  chrome
${URL}   http://localhost:5173/
${Delay}    1s



*** Keywords ***



*** Test Cases ***
Search Google
    Open Browser    ${URL}    ${Browser}
    
    Click Button    css=.MuiButton-text
    sleep    ${Delay}
    Click Button   id=identifier
    Input Text      name=identifier    Worapakorn5
    Click Button   id=loginPassword
    Input Text      name=loginPassword   111111 
    sleep    ${Delay}
     Click Button    xpath=//div[@id='root']/div/main/div/div/div[2]/div[3]/button
     sleep    ${Delay}
     Capture Page Screenshot
    Close Browser