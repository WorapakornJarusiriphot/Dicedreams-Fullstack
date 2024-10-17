*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${Browser}  chrome
${URL}   https://dicedreams-font-end.vercel.app/
${Delay}    1s



*** Keywords ***
loginStore
   # Wait Until Element Is Visible    xpath=(//a[contains(@href, '/sign-in')])[2]
    Click Button    id=login-button
    Wait Until Element Is Visible  xpath=//div[@id='login-form']/div  10s
    Input Text      name=identifier   Outcast
    Click Button   id=loginPassword
    Input Text      name=loginPassword   111111
    Click Button    id=login-submit-button

Check Title blog
    Wait Until Page Contains    File uploaded and activity saved successfully.
    Sleep    1


*** Test Cases ***
TC1601สร้างโพสต์กิจกรรม 
    Open Browser    ${URL}    ${Browser}
    loginStore
    sleep    ${Delay}
    Wait Until Element Is Visible     id=username
    Click Element  id=username
    Wait Until Element Is Visible     xpath=//*[@id="root"]/div/main/div/div/div/div[2]/div[2]/div/div[1]/button
    Click Element  xpath=//*[@id="root"]/div/main/div/div/div/div[2]/div[2]/div/div[1]/button