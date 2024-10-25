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


*** Test Cases ***
TC1702Deleteโพสต์กิจกรรม 
    Open Browser    ${URL}    ${Browser}
    loginStore
    sleep    ${Delay}
    Wait Until Element Is Visible     xpath=//*[@id="root"]/div/main/header[1]/div/div[2]/div
    Click Element    xpath=//*[@id="root"]/div/main/header[1]/div/div[2]/div
    #ที่อยู่โพสต์
    Wait Until Element Is Visible     xpath=//*[@id="root"]/div/main/div/div/div/div[2]/div[2]/div/div[2]/div[1]
    #เมนู
    Wait Until Element Is Visible     id=long-button
    Click Element    id=long-button
    Wait Until Element Is Visible     xpath=//*[@id="long-menu"]/div[3]/ul
    #ลบ
    sleep    ${Delay}
    Scroll Element Into View  xpath=//*[@id="long-menu"]/div[3]/ul/li[2]
    Click Element  xpath=//*[@id="long-menu"]/div[3]/ul/li[2]