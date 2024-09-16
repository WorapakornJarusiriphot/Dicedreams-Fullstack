*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${Browser}  chrome
${URL}   https://dicedreams-eta.vercel.app/sign-in

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

    Open Browser    ${URL}    ${Browser}
    login check
    Wait Until Element Is Visible    xpath=//a[contains(@href, '/post-play')]    10s
    Click Element                    xpath=//a[contains(@href, '/post-play')]
    sleep    ${Delay}
    Click Button  id=name_games
    Input Text      name=nameGames    หมาป่า
    Execute JavaScript    console.log('Testing JavaScript');
    Input Text      name=detailPost  ต้องการจำนวนมากมาเกินที่กำหนดได้
    Wait Until Element Is Visible     xpath=//*[@id="num_people"]    10s
    Input Text    xpath=//*[@id="num_people"]    5

   

    Close Browser