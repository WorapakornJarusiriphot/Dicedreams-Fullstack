*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${Browser}  chrome
${URL}   https://dicedreams-eta.vercel.app/

${Delay}    1s



*** Keywords ***

login check
    Wait Until Element Is Visible    xpath=(//a[contains(@href, '/sign-in')])[2]
    Wait Until Page Contains Element    xpath=//div[@class='form-group']    20s

    Wait Until Element Is Visible    xpath=//div[@class='form-group']    15s
    Click Element                    xpath=//div[@class='form-group']

    Input Text                       xpath=/html/body/main/div/form/div[1]/div    111111
    Wait Until Element Is Visible   id=password-label
    Input Text      name=password   111111 
    Click Button    xpath=//button[@type='submit']
    Close Browser
    


*** Test Cases ***
Search Google
    Open Browser    ${URL}    ${Browser}
    login check
    Wait Until Element Is Visible    xpath=//a[contains(@href, '/post-play')]    10s
    Click Element                    xpath=//a[contains(@href, '/post-play')]
    sleep    ${Delay}
    Click Button   id=:R8pkl9uuja:
    Input Text      name=nameGames    หมาป่า
    Click Button   id=:R99kl9uuja:-label
    Input Text      name=detailPost   ต้องการจำนวนมากมาเกินที่กำหนดได้
    
    Close Browser