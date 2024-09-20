*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${Browser}  chrome
${URL}   https://dicedreams-eta.vercel.app/
${Delay}    1s



*** Keywords ***
login check
   # Wait Until Element Is Visible    xpath=(//a[contains(@href, '/sign-in')])[2]
    Execute Javascript    document.getElementById('identifier').click()
    Input Text   xpath=//*[@id="identifier"]  WOJA2
    Wait Until Element Is Visible    xpath=//*[@id="password-label"]    10s
    Execute JavaScript    document.getElementById("password").click()
    Input Text      name=password   111111 
    Click Button    xpath=/html/body/main/div/form/button


*** Test Cases ***
Search Google
    Open Browser    ${URL}    ${Browser}
    login check
    Click Button    css=.MuiButton-text
    Click Button     xpath=/html/body/main/div/div/div[2]/div[2]/div[2]/div[2]/div[3]/div[1]/div[3]/div/button/svg
    Click Button    xpath=/html/body/div[13]/div[3]/ul/li[1]
    Click Button    locator
    Close Browser