*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${Delay}    2s
*** Test Cases ***
Search Google
    Open Browser    http://localhost:5173/    chrome
    
    Click Button    css=.MuiButton-text
    sleep    ${Delay}
    Input Text      name=usernameOrEmail    Worapakorn5
    sleep    ${Delay}
     Click Button    xpath=//*[@id="root"]/div/main/div/div/div[2]/div[3]/button[2]
     sleep    ${Delay}
    Close Browser